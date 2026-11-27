let language = 'vi';
const UI_EN = {
  'Giám sát camera':'Camera Monitor', '📷 Giám sát phát hiện người':'📷 Person Detection Monitor', 'Chưa bật':'Not started',
  '▶ Bật camera':'▶ Start Camera', '⏳ Đang tải AI...':'⏳ Loading AI...', '⚠ Chưa có AI':'⚠ AI unavailable', '■ Dừng':'■ Stop',
  '🔄 Trước/Sau':'🔄 Front/Back', '🌑 Màn hình đen':'🌑 Black Screen', '🔄 Tải lại':'🔄 Reload',
  'Chọn camera cụ thể (sau thường, góc rộng, zoom...)':'Select a camera (main, ultra-wide, telephoto...)', 'Mặc định':'Default',
  'Lật ngang hình (tự bật với camera trước)':'Mirror image (automatic for front camera)',
  'Tự chuyển sang màn hình đen sau 30 giây không chạm':'Switch to black screen after 30 seconds of inactivity',
  '🔋 Tiết kiệm pin: TẮT':'🔋 Battery saver: OFF', '🔋 Tiết kiệm pin: BẬT':'🔋 Battery saver: ON',
  'Giảm số khung hình camera và kiểm tra thưa hơn. Báo có thể trễ thêm khoảng nửa giây đến một giây.':'Reduces camera frame rate and checks less often. Alerts may be delayed by about 0.5 to 1 second.',
  'Vùng giám sát':'Monitoring Zones', '➕ Vẽ vùng canh':'➕ Draw monitoring zone', '🚫 Vẽ vùng bỏ qua':'🚫 Draw exclusion zone',
  '↩ Xóa vùng cuối':'↩ Undo last zone', '🗑 Xóa hết':'🗑 Clear all',
  'Bật camera, bấm một nút vẽ rồi kéo ngón tay trên hình để khoanh vùng. Có vùng canh (xanh) thì chỉ canh trong vùng đó. Vùng bỏ qua (đỏ) dùng cho TV, gương, đường đi ngoài cổng.':'Turn on the camera, choose a drawing mode, then drag on the image to mark an area. If a green monitoring zone exists, only that area is monitored. Use red exclusion zones for TVs, mirrors, or areas outside the gate.',
  '🎯 Phát hiện':'🎯 Detection', '🔓 Tích để chỉnh phần Phát hiện (bỏ tích là khóa)':'🔓 Check to edit Detection settings (uncheck to lock)',
  'Chỉ báo khi là NGƯỜI':'Alert only when a PERSON is detected', 'Độ tin cậy nhận diện người: từ':'Person detection confidence: at least', '% trở lên mới báo':'% to alert',
  'Độ nhạy chuyển động:':'Motion sensitivity:', '% pixel thay đổi (càng nhỏ càng nhạy)':'% changed pixels (lower is more sensitive)',
  'Thời gian chờ giữa 2 lần báo:':'Alert cooldown:', 'giây':'seconds',
  '🔔 Âm thanh & cảnh báo':'🔔 Sound & Alerts', '🔓 Tích để chỉnh phần Âm thanh & cảnh báo (bỏ tích là khóa)':'🔓 Check to edit Sound & Alerts (uncheck to lock)',
  '🔊 Âm thanh: BẬT':'🔊 Sound: ON', '🔇 Âm thanh: TẮT':'🔇 Sound: OFF', 'Âm lượng:':'Volume:', 'Kiểu âm báo':'Alert sound',
  'Giọng nói: "Kính chào quý khách"':'Voice: “Welcome” (Vietnamese)', 'Còi báo trộm xâm nhập':'Intruder alarm siren',
  'Chuông cổng':'Doorbell', 'Chuông nhắc nhở':'Reminder chime', 'Chuông tin nhắn ting ting':'Message chime', '🔊 Thử âm báo':'🔊 Test alert sound',
  'Không phát được giọng nói trên máy này, app dùng chuông thay.':'Speech is unavailable on this device; a chime will be used instead.',
  'Rung khi phát hiện':'Vibrate on detection', 'Thông báo trình duyệt':'Browser notifications',
  'Ảnh chụp khi phát hiện':'Snapshots on detection', '🔓 Tích để chỉnh phần Ảnh chụp (bỏ tích là khóa)':'🔓 Check to edit Snapshots (uncheck to lock)',
  'Số ảnh giữ lại:':'Snapshots to keep:', '(ảnh cũ nhất bị đè khi vượt)':'(oldest are removed when the limit is exceeded)',
  '⚙ Khác':'⚙ Other', 'Mẹo: cắm sạc, đặt máy cố định, giữ màn hình sáng. Trang cần chạy trên HTTPS. Cài đặt và vùng giám sát được tự lưu trên máy này.':'Tip: plug in the device, keep it steady, and keep the screen on. This page requires HTTPS. Settings and monitoring zones are saved on this device.',
  '♻ Đặt lại toàn bộ cài đặt':'♻ Reset all settings', 'Xóa mọi cài đặt và vùng giám sát đã lưu rồi tải lại trang. Ảnh chụp đang hiện trên trang cũng mất.':'Deletes saved settings and monitoring zones, then reloads the page. Visible snapshots will also be lost.',
  'Đang giám sát':'Monitoring', 'Chạm vào màn hình để thoát':'Tap the screen to exit', 'Giảm':'Decrease', 'Tăng':'Increase',
  'Giao diện sáng hoặc tối':'Light or dark theme', 'Chế độ tiết kiệm pin':'Battery saver', 'Bật/tắt âm thanh':'Toggle sound',
  '⚠ Có chuyển động':'⚠ Motion detected', 'Có chuyển động':'Motion detected', 'Có người nhưng nằm ngoài vùng giám sát':'Person detected outside the monitoring zone',
  'Có chuyển động, không phải người':'Motion detected, but no person', 'Đã dừng':'Stopped', 'Đang giám sát...':'Monitoring...',
  'Đang tải mô hình AI... (cần mạng)':'Loading AI model... (internet required)', 'Đã sẵn sàng. Bấm Bật camera':'Ready. Tap Start Camera',
  'Hãy bật camera trước khi vẽ vùng':'Turn on the camera before drawing a zone', 'Báo lần cuối:':'Last alert:',
  'Không tải được app.js. Kiểm tra đã upload đúng tên file chưa.':'Could not load app.js. Check that the file was uploaded with the correct name.'
};
Object.assign(UI_EN, {
  'Chưa tải được thư viện AI. Hãy bật mạng rồi bấm Tải lại, hoặc bỏ tick "Chỉ báo khi là NGƯỜI" để dùng chế độ chuyển động.':'Could not load the AI library. Connect to the internet and reload, or uncheck "Alert only when a PERSON is detected" to use motion detection.',
  'Chưa tải được mô hình AI. Kiểm tra mạng, app sẽ tự thử lại khi có mạng.':'Could not load the AI model. Check your connection; the app will retry when online.',
  'Xóa toàn bộ cài đặt và vùng giám sát đã lưu?':'Delete all saved settings and monitoring zones?',
  'Tải lại trang sẽ xóa các ảnh chụp đang hiển thị. Tiếp tục?':'Reloading will clear the snapshots currently shown. Continue?',
  'Thiếu file sounds.js nên không có âm báo. Hãy upload đủ 3 file.':'sounds.js is missing, so alerts have no sound. Upload all three files.',
  'Rung (thiết bị/trình duyệt này không hỗ trợ, iPhone không có)':'Vibration (not supported by this device/browser; unavailable on iPhone)',
  'CANH':'MONITOR', 'BỎ QUA':'IGNORE', 'Chọn ngôn ngữ':'Choose language', 'Tiếng Việt':'Vietnamese'
});
const UI_VI = Object.fromEntries(Object.entries(UI_EN).map(([vi, en]) => [en, vi]));
function translateText(value) {
  if (typeof value !== 'string') return value;
  const dict = language === 'en' ? UI_EN : UI_VI;
  if (dict[value]) return dict[value];
  const patterns = language === 'en' ? [
    [/^Yên tĩnh \((.*)\)$/, 'Quiet ($1)'], [/^Thấy người (\d+)% \(dưới ngưỡng (\d+)%\)$/, 'Person detected at $1% (below the $2% threshold)'],
    [/^Phát hiện NGƯỜI \((\d+)%\)$/, 'PERSON detected ($1%)'], [/^⚠ Phát hiện NGƯỜI \((\d+)%\)$/, '⚠ PERSON detected ($1%)'],
    [/^Lỗi nhận diện: (.*)$/, 'Detection error: $1'], [/^Lỗi chụp ảnh: (.*)$/, 'Snapshot error: $1'],
    [/^Không mở được camera: (.*)$/, 'Could not open camera: $1'], [/^Lỗi: (.*) \(dòng (\d+)\)$/, 'Error: $1 (line $2)'],
    [/^Lỗi: (.*)$/, 'Error: $1'], [/^Camera (\d+)$/, 'Camera $1'], [/^Báo lần cuối: (.*)$/, 'Last alert: $1']
  ] : [
    [/^Quiet \((.*)\)$/, 'Yên tĩnh ($1)'], [/^Person detected at (\d+)% \(below the (\d+)% threshold\)$/, 'Thấy người $1% (dưới ngưỡng $2%)'],
    [/^PERSON detected \((\d+)%\)$/, 'Phát hiện NGƯỜI ($1%)'], [/^⚠ PERSON detected \((\d+)%\)$/, '⚠ Phát hiện NGƯỜI ($1%)'],
    [/^Detection error: (.*)$/, 'Lỗi nhận diện: $1'], [/^Snapshot error: (.*)$/, 'Lỗi chụp ảnh: $1'],
    [/^Could not open camera: (.*)$/, 'Không mở được camera: $1'], [/^Error: (.*) \(line (\d+)\)$/, 'Lỗi: $1 (dòng $2)'],
    [/^Error: (.*)$/, 'Lỗi: $1'], [/^Camera (\d+)$/, 'Camera $1'], [/^Last alert: (.*)$/, 'Báo lần cuối: $1']
  ];
  for (const [pattern, replacement] of patterns) if (pattern.test(value)) return value.replace(pattern, replacement);
  return value;
}
let lastStatusText = 'Chưa bật';
function applyLanguage() {
  document.documentElement.lang = language;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const raw = node.nodeValue, core = raw.trim();
    if (core) node.nodeValue = raw.slice(0, raw.indexOf(core)) + translateText(core) + raw.slice(raw.indexOf(core) + core.length);
  }
  for (const el of document.querySelectorAll('[aria-label], [title], [placeholder]')) {
    for (const attr of ['aria-label', 'title', 'placeholder']) if (el.hasAttribute(attr)) el.setAttribute(attr, translateText(el.getAttribute(attr)));
  }
  document.title = translateText(document.title);
  const viButton = document.getElementById('btnLangVi'), enButton = document.getElementById('btnLangEn');
  if (viButton) { viButton.classList.toggle('active', language === 'vi'); viButton.setAttribute('aria-pressed', String(language === 'vi')); }
  if (enButton) { enButton.classList.toggle('active', language === 'en'); enButton.setAttribute('aria-pressed', String(language === 'en')); }
  if (typeof statusEl !== 'undefined' && statusEl) { statusEl.textContent = translateText(lastStatusText); $('stext').textContent = translateText(lastStatusText); }
  if ($('slast')) $('slast').textContent = translateText($('slast').textContent);
  if (typeof updateStartButton === 'function') updateStartButton();
  if (typeof setMute === 'function') setMute(muted);
  if (typeof setEco === 'function') setEco(eco);
}
// Hiện lỗi JavaScript (nếu có) ngay trên khung trạng thái để dễ biết nguyên nhân trên từng máy
window.addEventListener('error', e => {
  const s = document.getElementById('status');
  if (s) { s.textContent = translateText('Lỗi: ' + e.message + ' (dòng ' + e.lineno + ')'); s.style.color = '#ff4d4d'; }
});
window.addEventListener('unhandledrejection', e => {
  const s = document.getElementById('status');
  if (s) { s.textContent = translateText('Lỗi: ' + ((e.reason && e.reason.message) || e.reason)); s.style.color = '#ff4d4d'; }
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
  if (key === lastStatusKey) return;
  lastStatusKey = key; lastStatusText = t;
  const shown = translateText(t);
  statusEl.textContent = shown; statusEl.style.color = color || '#fff';
  $('stext').textContent = shown;
  $('sdot').style.background = (color === '#ff4d4d') ? '#ff4d4d' : '#1d5c35';
}

let modelError = '';

// Khóa nút Bật camera cho đến khi mô hình AI tải xong (chỉ khi đang yêu cầu nhận diện người)
function updateStartButton() {
  const need = $('chkPerson').checked && !model;
  const b = $('btnStart');
  b.disabled = need;
  b.textContent = translateText(need ? (loadingModel ? '⏳ Đang tải AI...' : '⚠ Chưa có AI') : '▶ Bật camera');
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

async function recoverAudioOutput() {
  // iOS Safari đôi khi hạ âm Web Audio sau khi bắt đầu capture; suspend/resume có thể khôi phục mức phát.
  try { if (navigator.audioSession && 'type' in navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
  if (!audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    if (audioCtx.state === 'running') { await audioCtx.suspend(); await audioCtx.resume(); }
  } catch (e) {}
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
  // Safari iOS có thể đổi route âm thanh sau khi bật camera; khôi phục phiên phát nếu API hỗ trợ.
  try { if (navigator.audioSession && 'type' in navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
  Object.keys(SOUNDS).forEach(k => loadSound(k).then(updateVoiceHint));
  await recoverAudioOutput();
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
      new Notification(translateText('Giám sát camera'), { body: translateText(msg) });
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
  $('muteLabel').textContent = translateText(muted ? '🔇 Âm thanh: TẮT' : '🔊 Âm thanh: BẬT');
  $('vol').disabled = muted;
  $('vol').style.opacity = muted ? '0.3' : '';
  $('volLabel').style.opacity = muted ? '0.3' : '';
}

async function beep() {
  if (muted) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  const v = Number($('vol').value) / 100;
  const style = $('sndStyle').value;
  if (await playSound(style, v)) return;
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

async function playSound(key, v) {
  const buf = await loadSound(key);
  if (!buf || !audioCtx) return false;
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  const src = audioCtx.createBufferSource(), g = audioCtx.createGain(), comp = audioCtx.createDynamicsCompressor();
  // Khuếch đại lên tới 2.8x + compressor để bù suy giảm âm lượng trên iPhone khi mở camera mà không bị vỡ tiếng
  src.buffer = buf; g.gain.value = v * 2.8;
  comp.threshold.value = -12; comp.knee.value = 12; comp.ratio.value = 8;
  comp.attack.value = 0.003; comp.release.value = 0.15;
  src.connect(g); g.connect(comp); comp.connect(audioCtx.destination); src.start();
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
  cap.textContent = new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'vi-VN') + ' - ' + translateText(msg);
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
  if (document.visibilityState !== 'visible' || !stream) return;
  await recoverAudioOutput();
  if ('wakeLock' in navigator) {
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
    ctx.fillText(translateText(z.t === 'in' ? 'CANH' : 'BỎ QUA'), x + 6, y + 16);
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
    s.eco = eco; s.language = language;
    localStorage.setItem(SAVE_KEY, JSON.stringify(s));
  } catch (e) {}
}

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (!s) return;
    if (s.language === 'en' || s.language === 'vi') language = s.language;
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
  if (!confirm(translateText('Xóa toàn bộ cài đặt và vùng giám sát đã lưu?'))) return;
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  location.reload();
};

$('btnReload').onclick = () => {
  if ($('log').children.length && !confirm(translateText('Tải lại trang sẽ xóa các ảnh chụp đang hiển thị. Tiếp tục?'))) return;
  location.reload();
};

let eco = false;
function setEco(on) {
  eco = on;
  $('btnEco').classList.toggle('sw-on', eco);
  $('btnEco').setAttribute('aria-checked', String(eco));
  $('ecoLabel').textContent = translateText(eco ? '🔋 Tiết kiệm pin: BẬT' : '🔋 Tiết kiệm pin: TẮT');
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

function setLanguage(next, persist = true) {
  language = next === 'en' ? 'en' : 'vi';
  applyLanguage();
  if (persist) saveSettings();
}
$('btnLangVi').onclick = () => setLanguage('vi');
$('btnLangEn').onclick = () => setLanguage('en');
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
applyLanguage();
window.addEventListener('online', () => { if ($('chkPerson').checked && !model && window.cocoSsd) loadModel(); });
updateStartButton();
if ($('chkPerson').checked) loadModel();

if (!window.APP_SOUNDS) setStatus('Thiếu file sounds.js nên không có âm báo. Hãy upload đủ 3 file.', '#ffb84d');
