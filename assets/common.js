// 공통 유틸: 토스트, 폭죽, 해시, 잠금/클리어 관리
// (assets/config.js를 먼저 로드해야 합니다)

function ensureEl(id, tag) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement(tag);
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
}

// ===== 토스트 =====
let toastTimer = null;

function showToast(message) {
  const toast = ensureEl("toast", "div");
  toast.textContent = message;
  toast.classList.remove("show");
  void toast.offsetWidth;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

// ===== 축하 문구 (#congrats 요소가 있는 페이지에서만 동작) =====
let congratsTimer = null;

function showCongrats(message) {
  const el = document.getElementById("congrats");
  if (!el) return;
  el.textContent = message;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
  clearTimeout(congratsTimer);
  congratsTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

// ===== 폭죽 =====
const CONFETTI_COLORS = ["#e8632c", "#f4b23e", "#4d9d6a", "#3d7bd9", "#d94f70", "#8a5cc9"];
let confettiCtx = null;
let confettiParticles = [];
let confettiAnimating = false;

function getConfettiCtx() {
  if (!confettiCtx) {
    const canvas = ensureEl("confetti", "canvas");
    confettiCtx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      confettiCtx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
  }
  return confettiCtx;
}

function burst(x, y, count) {
  getConfettiCtx();
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 5 + Math.random() * 9;
    confettiParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 5 + Math.random() * 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      life: 1,
      decay: 0.008 + Math.random() * 0.008,
    });
  }
  if (!confettiAnimating) {
    confettiAnimating = true;
    requestAnimationFrame(confettiTick);
  }
}

function confettiTick() {
  const ctx = getConfettiCtx();
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);

  confettiParticles = confettiParticles.filter(p => p.life > 0 && p.y < h + 30);
  for (const p of confettiParticles) {
    p.vy += 0.18;
    p.vx *= 0.985;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.spin;
    p.life -= p.decay;

    ctx.save();
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  }

  if (confettiParticles.length > 0) {
    requestAnimationFrame(confettiTick);
  } else {
    confettiAnimating = false;
    ctx.clearRect(0, 0, w, h);
  }
}

function fireworks() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  burst(w / 2, h * 0.35, 90);
  setTimeout(() => burst(w * 0.25, h * 0.3, 60), 220);
  setTimeout(() => burst(w * 0.75, h * 0.3, 60), 420);
}

// 피날레용: 화면 곳곳에서 연발
function grandFinale() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      burst(w * (0.15 + Math.random() * 0.7), h * (0.15 + Math.random() * 0.45), 70);
    }, i * 320);
  }
}

// ===== SHA-256 =====
async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// ===== 잠금/클리어 관리 (localStorage, 기기별) =====
const Progress = {
  isUnlocked(n) { return localStorage.getItem("stage-unlock-" + n) === "1"; },
  unlock(n)     { localStorage.setItem("stage-unlock-" + n, "1"); },
  isCleared(n)  { return localStorage.getItem("stage-clear-" + n) === "1"; },
  clear(n)      { localStorage.setItem("stage-clear-" + n, "1"); },
  reset() {
    for (const s of STAGES) {
      localStorage.removeItem("stage-unlock-" + s.n);
      localStorage.removeItem("stage-clear-" + s.n);
    }
  },
};

// ===== 스테이지 페이지 공통 =====
// 비밀번호를 아직 못 맞힌 스테이지에 URL로 직접 들어오면 맵으로 돌려보냄
function initStage(n) {
  if (!Progress.isUnlocked(n)) {
    location.replace("../");
    return null;
  }
  const stage = STAGES.find(s => s.n === n);
  if (stage) document.title = stage.emoji + " " + stage.name;
  return stage;
}

// 게임 클리어 처리 + "맵으로 돌아가기" 버튼 표시
function stageComplete(n) {
  Progress.clear(n);
  const bar = ensureEl("complete-bar", "div");
  bar.innerHTML = '<a href="../">🗺️ 맵으로 돌아가기</a>';
  requestAnimationFrame(() => bar.classList.add("show"));
}
