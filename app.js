// Hiện lỗi JavaScript (nếu có) ngay trên khung trạng thái để dễ biết nguyên nhân trên từng máy
window.addEventListener('error', e => {
  const s = document.getElementById('status');
  if (s) { s.textContent = 'Lỗi: ' + e.message + ' (dòng ' + e.lineno + ')'; s.style.color = '#ff4d4d'; }
});
window.addEventListener('unhandledrejection', e => {
  const s = document.getElementById('status');
  if (s) { s.textContent = 'Lỗi: ' + ((e.reason && e.reason.message) || e.reason); s.style.color = '#ff4d4d'; }
});
const $ = id => document.getElementById(id);
const video = $('video'), box = $('box'), statusEl = $('status'), stage = $('stage');
const W = 320, H = 240;
const small = document.createElement('canvas'); small.width = W; small.height = H;
const sctx = small.getContext('2d', { willReadFrequently: true });

let stream = null, timer = null, prev = null, facing = 'environment';
let model = null, loadingModel = false, detecting = false;
let lastAlert = 0, wakeLock = null, audioCtx = null;

$('sens').oninput = e => $('vSens').textContent = Number(e.target.value).toFixed(1);
$('cool').oninput = e => $('vCool').textContent = e.target.value;
$('conf').oninput = e => $('vConf').textContent = e.target.value;

let lastStatusKey = '';
function setStatus(t, color) {
  const key = t + '|' + color;
  if (key === lastStatusKey) return;           // không đổi thì khỏi ghi lại DOM 4 lần/giây
  lastStatusKey = key;
  statusEl.textContent = t; statusEl.style.color = color || '#fff';
  $('stext').textContent = t;
  $('sdot').style.background = (color === '#ff4d4d') ? '#ff4d4d' : '#1d5c35';
}

let modelError = '';

// Khóa nút Bật camera cho đến khi mô hình AI tải xong (chỉ khi đang yêu cầu nhận diện người)
function updateStartButton() {
  const need = $('chkPerson').checked && !model;
  const b = $('btnStart');
  b.disabled = need;
  b.textContent = need ? (loadingModel ? '⏳ Đang tải AI...' : '⚠ Chưa có AI') : '▶ Bật camera';
}

async function loadModel() {
  if (model || loadingModel) return;
  modelError = '';
  if (!window.cocoSsd) {
    modelError = 'Chưa tải được thư viện AI. Hãy bật mạng rồi bấm Tải lại, hoặc bỏ tick "Chỉ báo khi là NGƯỜI" để dùng chế độ chuyển động.';
    setStatus(modelError, '#ffb84d'); updateStartButton(); return;
  }
  loadingModel = true; updateStartButton();
  setStatus('Đang tải mô hình AI... (cần mạng)', '#ffb84d');
  try {
    model = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
    if (!stream) setStatus('Đã sẵn sàng. Bấm Bật camera', '#35c46a');
  } catch (e) {
    modelError = 'Chưa tải được mô hình AI. Kiểm tra mạng, app sẽ tự thử lại khi có mạng.';
    setStatus(modelError, '#ffb84d');
  }
  loadingModel = false; updateStartButton();
}

async function start() {
  try {
    if (stream) stream.getTracks().forEach(t => t.stop());
    const vc = { width: { ideal: 1280 }, height: { ideal: 720 } };
    if (deviceId) vc.deviceId = { exact: deviceId }; else vc.facingMode = facing;
    if (eco) vc.frameRate = { ideal: 10 };      // tiết kiệm pin: khoảng 10 khung hình/giây
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: vc, audio: false });
    } catch (e1) {
      if (!vc.frameRate) throw e1;
      delete vc.frameRate;                       // máy không nhận giới hạn khung hình: mở lại bình thường
      stream = await navigator.mediaDevices.getUserMedia({ video: vc, audio: false });
    }
  } catch (e) {
    setStatus('Không mở được camera: ' + e.message, '#ff4d4d');
    if (deviceId) { deviceId = null; $('camSelect').value = ''; saveSettings(); }
    return;
  }
  video.srcObject = stream;
  await video.play();
  await listCameras();
  const st = stream.getVideoTracks()[0].getSettings();
  const lbl = (stream.getVideoTracks()[0].label || '').toLowerCase();
  const isFront = st.facingMode === 'user' || /front|user|trước|truoc/.test(lbl);
  $('chkMirror').checked = isFront;
  applyMirror();
  redrawZones();
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  unlockSpeech();
  Object.keys(SOUNDS).forEach(k => loadSound(k).then(updateVoiceHint));
  if (audioCtx.state === 'suspended') audioCtx.resume();
  try { if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {}
  prev = null;
  $('btnStart').style.display = 'none'; $('btnStop').style.display = '';
  if ($('chkPerson').checked) await loadModel();
  setStatus('Đang giám sát...', '#35c46a');
  clearInterval(timer);
  timer = setInterval(tick, eco ? 500 : 250);   // tiết kiệm pin: kiểm tra 2 lần/giây thay vì 4
}

function stop() {
  clearInterval(timer);
  if (stream) stream.getTracks().forEach(t => t.stop());
  stream = null;
  if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; }
  box.style.display = 'none';
  $('btnStart').style.display = ''; $('btnStop').style.display = 'none';
  setStatus('Đã dừng');
}

function motionRatio() {
  sctx.drawImage(video, 0, 0, W, H);
  const d = sctx.getImageData(0, 0, W, H).data;
  const gray = grayBufs[grayIdx];            // dùng lại 2 bộ đệm, không tạo mảng mới mỗi lần
  for (let i = 0, j = 0; i < d.length; i += 4, j++) gray[j] = (d[i] * 77 + d[i+1] * 150 + d[i+2] * 29) >> 8;
  let changed = 0;
  if (prev) for (let j = 0; j < gray.length; j++) if (mask[j] && Math.abs(gray[j] - prev[j]) > 25) changed++;
  const ratio = prev && maskCount ? changed / maskCount * 100 : 0;
  prev = gray;
  grayIdx ^= 1;
  return ratio;
}
const grayBufs = [new Uint8Array(W * H), new Uint8Array(W * H)];
let grayIdx = 0, lastDetect = 0, detectErrors = 0;

async function tick() {
  if (!stream || video.readyState < 2 || detecting) return;
  const ratio = motionRatio();
  const thr = Number($('sens').value);
  if (ratio < thr) { box.style.display = 'none'; stage.classList.remove('alert'); setStatus('Yên tĩnh (' + ratio.toFixed(2) + '%)', '#35c46a'); return; }

  if (!$('chkPerson').checked) { trigger('Có chuyển động', null); return; }
  if (!model) { await loadModel(); return; }

  if (Date.now() - lastDetect < (eco ? 1000 : 500)) return;   // chạy AI tối đa ~2 lần/giây để đỡ nóng máy, tốn pin
  lastDetect = Date.now();
  detecting = true;
  try {
    const preds = await model.detect(video, 20, 0.3);   // 0.3 để thanh độ tin cậy xuống được dưới 50%
    detectErrors = 0;
    const thr = Number($('conf').value) / 100;
    const people = preds.filter(x => x.class === 'person');
    const persons = people.filter(x => x.score >= thr);
    const p = persons.filter(x => bboxInZone(x.bbox)).sort((a, b) => b.score - a.score)[0];
    if (p) trigger('Phát hiện NGƯỜI (' + Math.round(p.score * 100) + '%)', p.bbox);
    else {
      box.style.display = 'none'; stage.classList.remove('alert');
      const best = people.length ? Math.max(...people.map(x => x.score)) : 0;
      setStatus(persons.length ? 'Có người nhưng nằm ngoài vùng giám sát'
        : best ? 'Thấy người ' + Math.round(best * 100) + '% (dưới ngưỡng ' + Math.round(thr * 100) + '%)'
        : 'Có chuyển động, không phải người', '#ffb84d');
    }
  } catch (e) {
    setStatus('Lỗi nhận diện: ' + (e && e.message || e), '#ffb84d');
    // Máy yếu hoặc WebGL lỗi: sau 3 lần lỗi liên tiếp thì chuyển sang chạy bằng CPU
    if (++detectErrors >= 3 && window.tf && tf.getBackend && tf.getBackend() !== 'cpu') {
      detectErrors = 0;
      try { await tf.setBackend('cpu'); await tf.ready(); } catch (e2) {}
    }
  }
  detecting = false;
}

function applyMirror() {
  video.style.transform = $('chkMirror').checked ? 'scaleX(-1)' : 'none';
}
$('chkMirror').onchange = () => { applyMirror(); redrawZones(); };

function drawBox(b) {
  if (!b) { box.style.display = 'none'; return; }
  const k = video.clientWidth / video.videoWidth;
  const x = $('chkMirror').checked ? video.videoWidth - b[0] - b[2] : b[0];
  box.style.display = 'block';
  box.style.left = x * k + 'px'; box.style.top = b[1] * k + 'px';
  box.style.width = b[2] * k + 'px'; box.style.height = b[3] * k + 'px';
}

function trigger(msg, bbox) {
  drawBox(bbox);
  stage.classList.add('alert');
  setStatus('⚠ ' + msg, '#ff4d4d');
  const now = Date.now();
  if (now - lastAlert < Number($('cool').value) * 1000) return;
  lastAlert = now;
  $('slast').textContent = 'Báo lần cuối: ' + new Date().toLocaleTimeString('vi-VN');
  // Chụp ảnh trước, và mỗi hành động chạy độc lập: một cái lỗi không được chặn các cái còn lại
  try { snapshot(msg); } catch (e) { setStatus('Lỗi chụp ảnh: ' + (e && e.message || e), '#ffb84d'); }
  try { beep(); } catch (e) {}   // beep() tự im khi công tắc Âm thanh đang TẮT
  try { if ($('chkVibe').checked && navigator.vibrate) navigator.vibrate([250, 120, 250]); } catch (e) {}
  try {
    if ($('chkNotify').checked && typeof Notification !== 'undefined' && Notification.permission === 'granted')
      new Notification('Giám sát camera', { body: msg });
  } catch (e) {}
}

function tone(freq, at, dur, type, vol) {
  const t0 = audioCtx.currentTime + at;
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.03);          // vào nhẹ
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);   // tắt dần
  o.connect(g); g.connect(audioCtx.destination);
  o.start(t0); o.stop(t0 + dur + 0.05);
}

let muted = false;
function setMute(m) {
  muted = m;
  const b = $('btnMute');
  b.classList.toggle('sw-on', !muted);
  b.setAttribute('aria-checked', String(!muted));
  $('muteLabel').textContent = muted ? '🔇 Âm thanh: TẮT' : '🔊 Âm thanh: BẬT';
  $('vol').disabled = muted;
  $('vol').style.opacity = muted ? '0.3' : '';
  $('volLabel').style.opacity = muted ? '0.3' : '';
}

async function beep(bypassCompressor = false) {
  if (muted) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  const v = Number($('vol').value) / 100;
  const style = $('sndStyle').value;
  if (await playSound(style, v, bypassCompressor)) return;
  // Dự phòng khi không giải mã được file
  if (style === 'welcome') speak(v); else { tone(784, 0, 1.2, 'sine', 0.35 * v); tone(988, 0.35, 1.4, 'sine', 0.35 * v); }
}

/* Các file âm báo được nhúng sẵn trong trang (mp3 dạng base64), nên tải cùng trang
   và chạy giống nhau trên mọi máy, kể cả khi mất mạng. */
const SOUNDS = window.APP_SOUNDS || {};   // lấy từ file sounds.js
const sndBuf = {}, sndPromise = {};   // khóa -> AudioBuffer đã giải mã

function loadSound(key) {
  if (!SOUNDS[key] || !audioCtx) return Promise.resolve(null);
  if (!sndPromise[key]) sndPromise[key] = (async () => {
    try {
      const bin = atob(SOUNDS[key]), bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      sndBuf[key] = await audioCtx.decodeAudioData(bytes.buffer);
    } catch (e) {}
    return sndBuf[key] || null;
  })();
  return sndPromise[key];
}

async function playSound(key, v, bypassCompressor = false) {
  const buf = await loadSound(key);
  if (!buf || !audioCtx) return false;
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  const src = audioCtx.createBufferSource(), g = audioCtx.createGain();
  // Khuếch đại lên tới 2.8x; nút chẩn đoán có thể nối thẳng để so sánh khi bỏ bộ nén.
  src.buffer = buf; g.gain.value = v * 2.8;
  src.connect(g);
  if (bypassCompressor) g.connect(audioCtx.destination);
  else {
    const comp = audioCtx.createDynamicsCompressor();
    comp.threshold.value = -12; comp.knee.value = 12; comp.ratio.value = 8;
    comp.attack.value = 0.003; comp.release.value = 0.15;
    g.connect(comp); comp.connect(audioCtx.destination);
  }
  src.start();
  return true;
}

let viVoice = null;
const VOICE_STYLES = ['welcome'];

function updateVoiceHint() {
  const hasClip = !!sndBuf.welcome;
  $('voiceHint').style.display = (VOICE_STYLES.includes($('sndStyle').value) && !viVoice && !hasClip) ? 'block' : 'none';
}
// Trình duyệt máy tính nạp danh sách giọng chậm, nên phải nghe sự kiện voiceschanged
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices().filter(x => (x.lang || '').toLowerCase().replace('_', '-').startsWith('vi'));
  viVoice = vs.find(x => /natural|online/i.test(x.name)) || vs[0] || null;
  updateVoiceHint();
}
if ('speechSynthesis' in window) {
  try { pickVoice(); } catch (e) {}
  try {
    // Safari cũ không có addEventListener cho speechSynthesis, phải dùng onvoiceschanged
    if (typeof speechSynthesis.addEventListener === 'function') speechSynthesis.addEventListener('voiceschanged', pickVoice);
    else speechSynthesis.onvoiceschanged = pickVoice;
  } catch (e) {}
}
$('sndStyle').addEventListener('change', updateVoiceHint);

function speak(v, text) {
  if (!('speechSynthesis' in window) || !viVoice) {
    // Không có giọng tiếng Việt: không đọc bằng giọng tiếng Anh, dùng chuông thay thế
    tone(784, 0, 1.2, 'sine', 0.35 * v); tone(988, 0.35, 1.4, 'sine', 0.35 * v);
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text || 'Kính chào quý khách');
  u.voice = viVoice; u.lang = viVoice.lang;
  u.volume = v; u.rate = 0.9;
  speechSynthesis.speak(u);
}
// iPhone cần "mở khóa" giọng nói bằng một lần bấm của người dùng
function unlockSpeech() {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(' ');
  u.volume = 0;
  speechSynthesis.speak(u);
}

$('vol').oninput = e => $('vVol').textContent = e.target.value;
$('btnTest').onclick = beep;
$('btnTestNoComp').onclick = () => beep(true);
$('btnMute').onclick = () => { setMute(!muted); saveSettings(); };
$('muteLabel').onclick = () => $('btnMute').click();

function snapshot(msg) {
  if (!video.videoWidth) return;
  const c = document.createElement('canvas');
  c.width = video.videoWidth; c.height = video.videoHeight;
  const cx = c.getContext('2d');
  if ($('chkMirror').checked) { cx.translate(c.width, 0); cx.scale(-1, 1); }
  cx.drawImage(video, 0, 0);
  const fig = document.createElement('figure');
  const img = new Image(); img.src = c.toDataURL('image/jpeg', 0.7);
  const cap = document.createElement('figcaption');
  cap.textContent = new Date().toLocaleTimeString('vi-VN') + ' - ' + msg;
  fig.append(img, cap);
  $('log').prepend(fig);
  trimShots(); // giữ đúng số ảnh mới nhất theo thanh kéo
}

if (!navigator.vibrate) {
  $('chkVibe').checked = false;
  $('chkVibe').disabled = true;
  $('vibeRow').style.opacity = '0.4';
  $('vibeText').textContent = 'Rung (thiết bị/trình duyệt này không hỗ trợ, iPhone không có)';
}
$('chkVibe').onchange = e => { if (e.target.checked && navigator.vibrate) navigator.vibrate(200); };

let saverOn = false, idleTimer = null;

function enterSaver() {
  if (!stream) return;
  saverOn = true;
  clearTimeout(idleTimer);
  $('saver').style.display = 'flex';
  document.documentElement.style.overflow = 'hidden';   // khóa cuộn trang phía sau lớp đen
  document.body.style.overflow = 'hidden';
}
function exitSaver() {
  saverOn = false;
  $('saver').style.display = 'none';
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  armIdle();
}
$('saver').addEventListener('touchmove', e => e.preventDefault(), { passive: false });
function armIdle() {
  clearTimeout(idleTimer);
  if ($('chkAuto').checked && stream && !saverOn) idleTimer = setTimeout(enterSaver, 30000);
}

$('btnSave').onclick = enterSaver;
$('saver').onclick = exitSaver;
$('chkAuto').onchange = armIdle;
['touchstart', 'click'].forEach(ev => document.addEventListener(ev, armIdle, { passive: true }));

$('btnStart').onclick = async () => { await start(); armIdle(); };
$('btnStop').onclick = () => { stop(); exitSaver(); };
let deviceId = null;

async function listCameras() {
  try {
    const cams = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput');
    const cur = stream && stream.getVideoTracks()[0].getSettings().deviceId;
    const sel = $('camSelect');
    sel.innerHTML = '';
    cams.forEach((c, i) => {
      const o = document.createElement('option');
      o.value = c.deviceId;
      o.textContent = c.label || ('Camera ' + (i + 1));
      sel.appendChild(o);
    });
    if (cur) sel.value = cur;
  } catch (e) {}
}

$('camSelect').onchange = e => { deviceId = e.target.value || null; if (stream) start(); };
$('btnSwitch').onclick = () => {
  facing = facing === 'environment' ? 'user' : 'environment';
  deviceId = null;
  saveSettings();
  if (stream) start();
};
$('chkNotify').onchange = e => { if (e.target.checked && 'Notification' in window) Notification.requestPermission(); };
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && stream && 'wakeLock' in navigator) {
    try { wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {}
  }
});

/* ===== Vùng giám sát (toạ độ chuẩn hoá 0..1 trên hình gốc, không lật) ===== */
let zones = [], drawMode = null, drawing = null, drawStart = null;
let mask = new Uint8Array(W * H).fill(1), maskCount = W * H;
const zc = $('zc');

const inside = (z, nx, ny) => nx >= z.x && nx <= z.x + z.w && ny >= z.y && ny <= z.y + z.h;

function buildMask() {
  const inc = zones.filter(z => z.t === 'in'), exc = zones.filter(z => z.t === 'out');
  maskCount = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const nx = (x + 0.5) / W, ny = (y + 0.5) / H;
    const ok = (inc.length ? inc.some(z => inside(z, nx, ny)) : true) && !exc.some(z => inside(z, nx, ny)) ? 1 : 0;
    mask[y * W + x] = ok; maskCount += ok;
  }
}

// Người được tính nếu chạm vùng canh (nếu có) và tâm không nằm trong vùng bỏ qua
function bboxInZone(b) {
  const vw = video.videoWidth, vh = video.videoHeight;
  const x0 = b[0] / vw, y0 = b[1] / vh, x1 = (b[0] + b[2]) / vw, y1 = (b[1] + b[3]) / vh;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const inc = zones.filter(z => z.t === 'in'), exc = zones.filter(z => z.t === 'out');
  // Người tính là "trong vùng canh" khi chân (giữa đáy khung) hoặc tâm nằm trong vùng
  const fx = cx, fy = y1;
  const hit = inc.length ? inc.some(z => inside(z, fx, fy) || inside(z, cx, cy)) : true;
  return hit && !exc.some(z => inside(z, cx, cy));
}

function redrawZones() {
  const w = video.clientWidth, h = video.clientHeight;
  if (!w || !h) return;
  zc.width = w; zc.height = h;
  const ctx = zc.getContext('2d'), mir = $('chkMirror').checked;
  ctx.font = '13px system-ui'; ctx.lineWidth = 2;
  zones.concat(drawing ? [drawing] : []).forEach(z => {
    const x = (mir ? 1 - z.x - z.w : z.x) * w, y = z.y * h, zw = z.w * w, zh = z.h * h;
    const col = z.t === 'in' ? '53,196,106' : '255,77,77';
    ctx.fillStyle = 'rgba(' + col + ',.22)'; ctx.strokeStyle = 'rgb(' + col + ')';
    ctx.fillRect(x, y, zw, zh); ctx.strokeRect(x, y, zw, zh);
    ctx.fillStyle = 'rgb(' + col + ')';
    ctx.fillText(z.t === 'in' ? 'CANH' : 'BỎ QUA', x + 6, y + 16);
  });
}

function setDrawMode(m) {
  if (m && !stream) { setStatus('Hãy bật camera trước khi vẽ vùng', '#ffb84d'); return; }
  drawMode = (drawMode === m) ? null : m;
  $('btnZoneIn').classList.toggle('on', drawMode === 'in');
  $('btnZoneOut').classList.toggle('on', drawMode === 'out');
  zc.style.pointerEvents = drawMode ? 'auto' : 'none';
  zc.style.touchAction = drawMode ? 'none' : 'auto';
}

function relPos(e) {
  const r = zc.getBoundingClientRect();
  let nx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  const ny = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
  if ($('chkMirror').checked) nx = 1 - nx;
  return [nx, ny];
}

zc.onpointerdown = e => {
  if (!drawMode) return;
  zc.setPointerCapture(e.pointerId);
  drawStart = relPos(e);
  drawing = { x: drawStart[0], y: drawStart[1], w: 0, h: 0, t: drawMode };
};
zc.onpointermove = e => {
  if (!drawing) return;
  const p = relPos(e);
  drawing.x = Math.min(drawStart[0], p[0]); drawing.y = Math.min(drawStart[1], p[1]);
  drawing.w = Math.abs(p[0] - drawStart[0]); drawing.h = Math.abs(p[1] - drawStart[1]);
  redrawZones();
};
zc.onpointerup = zc.onpointercancel = () => {
  if (!drawing) return;
  if (drawing.w > 0.02 && drawing.h > 0.02) zones.push(drawing);
  drawing = null;
  buildMask(); redrawZones(); saveSettings();
};

$('btnZoneIn').onclick = () => setDrawMode('in');
$('btnZoneOut').onclick = () => setDrawMode('out');
$('btnZoneUndo').onclick = () => { zones.pop(); buildMask(); redrawZones(); saveSettings(); };
$('btnZoneClear').onclick = () => { zones = []; buildMask(); redrawZones(); saveSettings(); };

video.addEventListener('loadedmetadata', redrawZones);
window.addEventListener('resize', redrawZones);
try { if (window.ResizeObserver) new ResizeObserver(redrawZones).observe(stage); } catch (e) {}

/* ===== Lưu / đọc cài đặt ===== */
const SAVE_KEY = 'camSettings.v1';
const SAVE_VALUES = ['sens', 'cool', 'vol', 'sndStyle', 'shots', 'conf'];
const SAVE_CHECKS = ['chkPerson', 'chkVibe', 'chkAuto', 'chkEditDetect', 'chkEditSound', 'chkEditShots'];

function saveSettings() {
  try {
    const s = {};
    SAVE_VALUES.forEach(id => s[id] = $(id).value);
    SAVE_CHECKS.forEach(id => { if (!(id === 'chkVibe' && !navigator.vibrate)) s[id] = $(id).checked; });
    s.chkNotify = $('chkNotify').checked && typeof Notification !== 'undefined' && Notification.permission === 'granted';
    s.muted = muted; s.facing = facing; s.deviceId = deviceId; s.zones = zones;
    s.light = document.documentElement.classList.contains('light');
    s.eco = eco;
    localStorage.setItem(SAVE_KEY, JSON.stringify(s));
  } catch (e) {}
}

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (!s) return;
    SAVE_VALUES.forEach(id => { if (s[id] !== undefined) $(id).value = s[id]; });
    if (!$('sndStyle').value) $('sndStyle').selectedIndex = 0;
    SAVE_CHECKS.forEach(id => {
      if (s[id] !== undefined && !(id === 'chkVibe' && !navigator.vibrate)) $(id).checked = s[id];
    });
    if (s.chkNotify && typeof Notification !== 'undefined' && Notification.permission === 'granted') $('chkNotify').checked = true;
    $('vSens').textContent = Number($('sens').value).toFixed(1);
    $('vCool').textContent = $('cool').value;
    $('vConf').textContent = $('conf').value;
    $('vVol').textContent = $('vol').value;
    if (typeof s.light === 'boolean') setTheme(s.light);
    if (typeof s.eco === 'boolean') setEco(s.eco);
    setMute(!!s.muted || s.chkSound === false);   // cài đặt cũ đã bỏ tích 'Phát âm báo' thì coi như tắt tiếng
    if (s.facing === 'user' || s.facing === 'environment') facing = s.facing;
    deviceId = s.deviceId || null;
    if (Array.isArray(s.zones)) {
      zones = s.zones.filter(z => z && (z.t === 'in' || z.t === 'out') && [z.x, z.y, z.w, z.h].every(Number.isFinite));
    }
  } catch (e) {}
}

document.addEventListener('change', saveSettings);
document.addEventListener('input', saveSettings);
$('btnReset').onclick = () => {
  if (!confirm('Xóa toàn bộ cài đặt và vùng giám sát đã lưu?')) return;
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  location.reload();
};

$('btnReload').onclick = () => {
  if ($('log').children.length && !confirm('Tải lại trang sẽ xóa các ảnh chụp đang hiển thị. Tiếp tục?')) return;
  location.reload();
};

let eco = false;
function setEco(on) {
  eco = on;
  $('btnEco').classList.toggle('sw-on', eco);
  $('btnEco').setAttribute('aria-checked', String(eco));
  $('ecoLabel').textContent = eco ? '🔋 Tiết kiệm pin: BẬT' : '🔋 Tiết kiệm pin: TẮT';
}
$('btnEco').onclick = () => {
  setEco(!eco);
  saveSettings();
  if (stream) start();      // mở lại camera để áp dụng số khung hình mới
};
$('ecoLabel').onclick = () => $('btnEco').click();

function trimShots() {
  const n = Number($('shots').value);
  $('vShots').textContent = n;
  while ($('log').children.length > n) $('log').lastChild.remove();
}
$('shots').addEventListener('input', trimShots);

function setTheme(light) {
  document.documentElement.classList.toggle('light', light);
  $('btnTheme').classList.toggle('sw-on', light);
  $('btnTheme').setAttribute('aria-checked', String(light));
}
$('btnTheme').onclick = () => {
  setTheme(!document.documentElement.classList.contains('light'));
  saveSettings();
};
// Mặc định theo giao diện của điện thoại, nếu bạn đã chọn thì dùng lựa chọn đã lưu
try { setTheme(!!(window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches)); } catch (e) {}

/* ===== Thanh trượt mới =====
   Chỉ kéo được khi chạm đúng vào núm tròn; chạm hay vuốt lên thanh để cuộn trang không làm nhảy số.
   Có nút − và + để chỉnh từng nấc. Ô <input type="range"> gốc được giữ (ẩn) làm nơi lưu giá trị. */
function enhanceRange(input) {
  const min = Number(input.min), max = Number(input.max), step = Number(input.step) || 1;
  const dec = (String(input.step).split('.')[1] || '').length;
  const w = document.createElement('div');
  w.className = 'rs';
  w.innerHTML = '<button type="button" class="rs-b" aria-label="Giảm">−</button>' +
    '<div class="rs-track"><div class="rs-bar"></div><div class="rs-fill"></div>' +
    '<div class="rs-thumb" role="slider" tabindex="0"><i></i></div></div>' +
    '<button type="button" class="rs-b" aria-label="Tăng">+</button>';
  input.style.display = 'none';
  input.after(w);
  const minus = w.querySelectorAll('.rs-b')[0], plus = w.querySelectorAll('.rs-b')[1];
  const track = w.querySelector('.rs-track'), thumb = w.querySelector('.rs-thumb');
  const clamp = v => Math.min(max, Math.max(min, v));
  const snap = v => Number((Math.round((clamp(v) - min) / step) * step + min).toFixed(dec));

  function sync() {
    const v = clamp(Number(input.value));
    w.style.setProperty('--p', (v - min) / (max - min));
    thumb.setAttribute('aria-valuemin', min);
    thumb.setAttribute('aria-valuemax', max);
    thumb.setAttribute('aria-valuenow', v);
  }
  function setVal(v, final) {
    v = snap(v);
    if (v !== Number(input.value)) { input.value = v; input.dispatchEvent(new Event('input', { bubbles: true })); }
    if (final) input.dispatchEvent(new Event('change', { bubbles: true }));
    sync();
  }

  // Ô gốc đang bị khóa (disabled) thì mọi cách chỉnh, kể cả bàn phím, đều không có tác dụng
  minus.onclick = () => { if (!input.disabled) setVal(Number(input.value) - step, true); };
  plus.onclick = () => { if (!input.disabled) setVal(Number(input.value) + step, true); };

  let dragging = false, grab = 0;
  thumb.addEventListener('pointerdown', e => {
    if (input.disabled) return;
    dragging = true;
    const tb = thumb.getBoundingClientRect();
    grab = e.clientX - (tb.left + tb.width / 2);   // chạm lệch tâm núm bao nhiêu thì giữ nguyên độ lệch, núm không giật
    try { thumb.setPointerCapture(e.pointerId); } catch (err) {}
    thumb.classList.add('on');
    e.preventDefault();
  });
  thumb.addEventListener('pointermove', e => {
    if (!dragging) return;
    const r = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (e.clientX - grab - r.left - 18) / (r.width - 36)));
    setVal(min + p * (max - min), false);
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    thumb.classList.remove('on');
    setVal(Number(input.value), true);
  };
  thumb.addEventListener('pointerup', end);
  thumb.addEventListener('pointercancel', end);
  thumb.addEventListener('keydown', e => {
    const dir = (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? -1 : 0;
    if (dir && !input.disabled) { e.preventDefault(); setVal(Number(input.value) + dir * step, true); }
  });

  input._sync = sync;
  sync();
}
function syncRanges() {
  document.querySelectorAll('input[type=range]').forEach(i => { if (i._sync) i._sync(); });
}
['sens', 'conf', 'cool', 'vol', 'shots'].forEach(id => enhanceRange($(id)));

// Khóa/mở khóa phần Phát hiện: có tích mới chỉnh được, bỏ tích thì mọi ô trong khung bị khóa
function applyDetectLock() {
  const editable = $('chkEditDetect').checked;
  ['chkPerson', 'conf', 'sens', 'cool'].forEach(id => { $(id).disabled = !editable; });
  $('detectCard').classList.toggle('locked', !editable);
}
$('chkEditDetect').addEventListener('change', applyDetectLock);

// Khóa/mở khóa phần Âm thanh & cảnh báo: bỏ tích thì cả khung mờ đi, không chạm và không dùng bàn phím được
function applyInertLock(cardId, chkId) {
  const card = $(cardId), editable = $(chkId).checked;
  card.classList.toggle('locked', !editable);
  [...card.children].forEach(c => {
    if (c.tagName === 'B' || c.classList.contains('keep')) return;   // tiêu đề, ô tích và vùng nội dung giữ nguyên
    if (editable) c.removeAttribute('inert'); else c.setAttribute('inert', '');
  });
}
function applySoundLock() { applyInertLock('soundCard', 'chkEditSound'); }
function applyShotsLock() { applyInertLock('shotsCard', 'chkEditShots'); }
$('chkEditSound').addEventListener('change', applySoundLock);
$('chkEditShots').addEventListener('change', applyShotsLock);

loadSettings();
syncRanges();
applyDetectLock();
applySoundLock();
applyShotsLock();
buildMask();
trimShots();
updateVoiceHint();

$('chkPerson').addEventListener('change', () => {
  if ($('chkPerson').checked && !model) loadModel(); else updateStartButton();
});
window.addEventListener('online', () => { if ($('chkPerson').checked && !model && window.cocoSsd) loadModel(); });
updateStartButton();
if ($('chkPerson').checked) loadModel();

if (!window.APP_SOUNDS) setStatus('Thiếu file sounds.js nên không có âm báo. Hãy upload đủ 3 file.', '#ffb84d');
