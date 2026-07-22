const frame = document.querySelector(".frame");
const screen = frame?.querySelector("img")?.getAttribute("src") || "";

const interactionStyle = document.createElement("style");
interactionStyle.textContent = `
  html,body { min-height:100%; overflow-x:hidden; }
  body { min-height:100svh; }
  .frame { width:min(100vw,177.7778svh); max-width:100vw; max-height:100svh; }
  .app-hit { position:absolute; z-index:5; display:block; background:transparent; border:0; cursor:pointer; }
  .app-hit:focus-visible { outline:2px solid #fff; outline-offset:3px; }
  .hotspot,.app-hit,.app-settings,.app-dialog button { -webkit-tap-highlight-color:transparent; transition:transform .18s ease,background .18s ease,box-shadow .18s ease,outline-color .18s ease; }
  @media (hover:hover) {
    .hotspot:hover,.app-hit:hover { background:rgba(244,202,99,.16); box-shadow:inset 0 0 0 2px rgba(255,255,255,.88),0 0 18px rgba(244,202,99,.52); border-radius:8px; }
    .hotspot:hover,.app-hit:hover,.app-settings:hover,.app-dialog button:hover { transform:translateY(-2px); }
    .volume-row input:hover { filter:brightness(1.18); }
  }
  .hotspot:active,.app-hit:active,.app-settings:active,.app-dialog button:active { transform:scale(.97); }
  .app-settings { position:absolute; z-index:8; top:2.4%; right:2.2%; display:inline-flex; align-items:center; gap:.25em; padding:.28em .55em; border:1px solid rgba(255,255,255,.7); border-radius:999px; background:rgba(0,0,0,.28); color:#fff; font-family:"온글잎의연체",sans-serif; font-size:min(2.1vw,3.75vh); line-height:1; text-decoration:none; text-shadow:0 1px 2px rgba(0,0,0,.4); }
  .app-settings:hover, .app-settings:focus-visible { background:rgba(255,255,255,.2); outline:2px solid #fff; outline-offset:3px; }
  .animated-fire { position:absolute; z-index:4; display:block; transform-origin:50% 86%; pointer-events:none; animation:fire-flicker 1.15s ease-in-out infinite alternate; will-change:transform,filter; }
  .animated-logo { position:absolute; z-index:4; display:block; transform-origin:50% 52%; pointer-events:none; animation:logo-wiggle 2.8s ease-in-out infinite; will-change:transform,filter; }
  .spark-layer { position:absolute; z-index:5; overflow:visible; pointer-events:none; }
  .cat-id { position:absolute; z-index:6; color:#fff; font-family:"온글잎의연체",sans-serif; font-size:min(1.9vw,3.38vh); line-height:1; white-space:nowrap; text-shadow:0 2px 4px rgba(0,0,0,.78); transform:translateX(-50%); pointer-events:none; }
  .hide-rest { position:absolute; z-index:7; left:70.7%; top:54.4%; width:29.3%; height:5.8%; background:#2e2e2e; pointer-events:none; }
  .spark { position:absolute; bottom:38%; width:4%; aspect-ratio:1; border-radius:50%; background:#ffd36a; box-shadow:0 0 7px 2px rgba(255,124,22,.7); opacity:0; animation:spark-rise var(--duration) ease-out var(--delay) infinite; }
  @keyframes spark-rise { 0% { opacity:0; transform:translate(0,0) scale(.3); } 12% { opacity:1; } 72% { opacity:.85; } 100% { opacity:0; transform:translate(var(--drift),-260%) scale(.05); } }
  @keyframes logo-wiggle { 0%,100% { transform:none; filter:brightness(1); } 24% { transform:none; filter:brightness(1.05); } 49% { transform:none; filter:brightness(1.12); } 73% { transform:none; filter:brightness(1.04); } }
  @keyframes fire-flicker { 0% { transform:none; filter:brightness(1) saturate(1.03) drop-shadow(0 0 5px rgba(255,150,33,.22)); } 30% { transform:none; filter:brightness(1.18) saturate(1.15) drop-shadow(0 0 14px rgba(255,134,20,.42)); } 62% { transform:none; filter:brightness(1.06) saturate(1.08) drop-shadow(0 0 8px rgba(255,150,33,.3)); } 100% { transform:none; filter:brightness(1.23) saturate(1.2) drop-shadow(0 0 17px rgba(255,125,15,.48)); } }
  @media (prefers-reduced-motion: reduce) { .animated-fire,.animated-logo,.spark { animation:none; } .spark { display:none; } }
  .app-toast { position:fixed; z-index:20; left:50%; bottom:7vh; transform:translateX(-50%); padding:14px 22px; border-radius:999px; background:rgba(0,0,0,.78); color:#fff; font-family:"온글잎의연체",sans-serif; font-size:clamp(18px,2.2vw,34px); opacity:0; pointer-events:none; transition:opacity .2s; }
  .app-toast.show { opacity:1; }
  .app-dialog-backdrop { position:fixed; z-index:30; inset:0; display:grid; place-items:center; background:rgba(0,0,0,.46); }
  .app-dialog { width:min(86vw,460px); padding:30px; border:1px solid rgba(255,255,255,.25); border-radius:18px; background:#252525; color:#fff; box-shadow:0 18px 50px rgba(0,0,0,.45); font-family:"온글잎의연체",sans-serif; }
  .app-dialog h2 { margin:0 0 8px; font-size:32px; font-weight:400; }.app-dialog p { margin:0 0 24px; color:#ddd; font-family:sans-serif; }
  .app-dialog-actions { display:flex; justify-content:flex-end; gap:10px; }.app-dialog button { border:0; border-radius:9px; padding:10px 16px; cursor:pointer; font:inherit; font-size:20px; }.app-cancel { background:#555; color:#fff; }.app-confirm { background:#f4ca63; color:#241b00; }
  .volume-ui { position:absolute; z-index:7; left:70.7%; top:18.7%; width:29.3%; padding:1.1% 1.6%; background:#2e2e2e; color:#fff; font-family:"온글잎의연체",sans-serif; }
  .volume-ui h2 { margin:0 0 .28em; font-weight:400; font-size:min(2.6vw,4.63vh); line-height:1; }.volume-row { display:grid; grid-template-columns:1fr 44% auto; align-items:center; gap:.35em; min-height:2.95vw; font-size:min(2.05vw,3.64vh); line-height:1; white-space:nowrap; }.volume-row input { width:100%; accent-color:#f4ca63; cursor:pointer; }.volume-row output { min-width:2.6em; text-align:right; font-family:Arial,sans-serif; font-size:.72em; }
  @media (max-width:700px), (max-height:560px) {
    body { display:grid; place-items:center; background:#111; }
    .frame { width:100vw; max-width:100vw; max-height:none; }
    .app-settings { min-height:44px; padding:.4em .65em; font-size:clamp(12px,3.8vw,18px); }
    .app-toast { bottom:max(24px,env(safe-area-inset-bottom)); font-size:clamp(16px,5vw,22px); padding:12px 18px; }
    .app-dialog { width:min(92vw,420px); padding:24px; }
    .app-dialog h2 { font-size:clamp(24px,7vw,30px); }
    .app-dialog button { min-height:44px; font-size:18px; }
  }
`;
document.head.append(interactionStyle);

const toast = document.createElement("div");
toast.className = "app-toast";
toast.setAttribute("role", "status");
document.body.append(toast);
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}
function addHit(bounds, label, handler) {
  if (!frame) return;
  const hit = document.createElement("button");
  hit.type = "button";
  hit.className = "app-hit";
  hit.setAttribute("aria-label", label);
  Object.assign(hit.style, bounds);
  hit.addEventListener("click", handler);
  frame.append(hit);
}
function toggleMessage(hit, on, off) {
  const active = hit.currentTarget.dataset.active === "true";
  hit.currentTarget.dataset.active = String(!active);
  showToast(active ? off : on);
}
function confirmationDialog(title, successMessage) {
  const backdrop = document.createElement("div");
  backdrop.className = "app-dialog-backdrop";
  backdrop.innerHTML = '<section class="app-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><h2 id="confirm-title"></h2><p>계속 진행할까요?</p><div class="app-dialog-actions"><button class="app-cancel" type="button">취소</button><button class="app-confirm" type="button">확인</button></div></section>';
  backdrop.querySelector("#confirm-title").textContent = title;
  backdrop.querySelector(".app-cancel").addEventListener("click", () => backdrop.remove());
  backdrop.querySelector(".app-confirm").addEventListener("click", () => { backdrop.remove(); showToast(successMessage); });
  document.body.append(backdrop);
  backdrop.querySelector(".app-cancel").focus();
}
function reportDialog() { confirmationDialog("신고할까요?", "신고가 접수되었습니다."); }

if (screen.includes("01-main")) {
  addHit({ left:"43%", top:"1.5%", width:"7%", height:"8%" }, "신고", reportDialog);
}
if (screen.includes("04-member") || screen.includes("06-owner") || screen.includes("03-member-menu") || screen.includes("05-owner-menu")) {
  addHit({ left:"86.5%", top:"93%", width:"5%", height:"6%" }, "음소거", (event) => toggleMessage(event, "음소거 되었습니다.", "음소거가 해제되었습니다."));
  addHit({ left:"92%", top:"93%", width:"7%", height:"6%" }, "마이크 끄기", (event) => toggleMessage(event, "마이크가 꺼졌습니다.", "마이크가 켜졌습니다."));
}
if (screen.includes("03-member-menu") || screen.includes("05-owner-menu")) {
  addHit({ left:"71%", top:"59%", width:"15%", height:"6%" }, "신고", reportDialog);
  addHit({ left:"71%", top:"64%", width:"15%", height:"6%" }, "차단", () => confirmationDialog("차단하시겠습니다?", "차단되었습니다."));
  addHit({ left:"71%", top:"69%", width:"18%", height:"6%" }, "서버 나가기", () => { window.location.href = "main.html"; });

  const volume = document.createElement("section");
  volume.className = "volume-ui";
  volume.setAttribute("aria-label", "소리 조절");
  volume.innerHTML = '<h2>소리 조절</h2>' + ["우아한 코끼리", "낭만 고양이", "따뜻한 여우", "친절한 수달", "고요한 토끼"].map((name) => `<label class="volume-row"><span>${name}</span><input type="range" min="0" max="100" value="100" aria-label="${name} 볼륨"><output>100%</output></label>`).join("");
  volume.querySelectorAll("input").forEach((input) => input.addEventListener("input", () => { input.nextElementSibling.value = `${input.value}%`; input.nextElementSibling.textContent = `${input.value}%`; }));
  frame?.append(volume);
  const hideRest = document.createElement("div");
  hideRest.className = "hide-rest";
  hideRest.setAttribute("aria-hidden", "true");
  frame?.append(hideRest);
}
if (frame) {
  const settings = document.createElement("a");
  settings.className = "app-settings";
  settings.href = "05-서버장메뉴.html";
  settings.textContent = "⚙ 설정";
  settings.setAttribute("aria-label", "서버 설정 열기");
  frame.append(settings);
}

const firePositions = {
  "01-main": { left:"38.0729%", top:"44.0741%", width:"23.8650%", height:"47.1584%" },
  "02-main-list": { left:"55.3125%", top:"58.8889%", width:"17.8988%", height:"35.3688%" },
  "03-member-menu": { left:"40.2083%", top:"54.3519%", width:"20.2852%", height:"40.0847%" },
  "04-member": { left:"40.2083%", top:"56.9444%", width:"20.2852%", height:"40.0847%" },
  "05-owner-menu": { left:"37.1875%", top:"57.7778%", width:"20.2852%", height:"40.0847%" },
  "06-owner": { left:"40.2083%", top:"54.3519%", width:"20.2852%", height:"40.0847%" }
};
const firePixels = {
  "01-main": [731,476,458.207,509.311],
  "02-main-list": [1062,636,343.656,381.983],
  "03-member-menu": [772,587,389.476,432.915],
  "04-member": [772,615,389.476,432.915],
  "05-owner-menu": [714,624,389.476,432.915],
  "06-owner": [772,587,389.476,432.915]
};
const fireKey = Object.keys(firePositions).find((key) => screen.includes(key));
if (fireKey && frame) {
  const fire = document.createElement("img");
  fire.className = "animated-fire";
  fire.src = "./figma-assets/fire.svg";
  fire.alt = "";
  Object.assign(fire.style, firePositions[fireKey]);
  frame.append(fire);

  const sparks = document.createElement("div");
  sparks.className = "spark-layer";
  Object.assign(sparks.style, firePositions[fireKey]);
  [
    ["40%", "-70%", "0s", "1.1s"], ["55%", "42%", ".24s", "1.45s"],
    ["67%", "-28%", ".62s", "1.25s"], ["29%", "25%", ".85s", "1.62s"],
    ["50%", "-8%", "1.1s", "1.32s"], ["61%", "73%", "1.46s", "1.7s"]
  ].forEach(([left, drift, delay, duration]) => {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = left;
    spark.style.setProperty("--drift", drift);
    spark.style.setProperty("--delay", delay);
    spark.style.setProperty("--duration", duration);
    sparks.append(spark);
  });
  frame.append(sparks);
}

if (screen.includes("01-main") && frame) {
  const logo = document.createElement("img");
  logo.className = "animated-logo";
  logo.src = "./2026%20점프업_img/도란도란.svg";
  logo.alt = "";
  Object.assign(logo.style, { left:"14.8438%", top:"11.3889%", width:"70.3495%", height:"38.6111%" });
  frame.append(logo);
}

const nicknames = ["우아한 코끼리", "낭만 고양이", "따뜻한 여우", "친절한 수달", "고요한 토끼"];
const catNamePositions = {
  "02-main-list": [["89%","64%"],["77%","45%"],["63%","44%"],["41%","64%"],["52%","47%"]],
  "03-member-menu": [["31%","39%"],["22%","54%"],["52%","32%"],["72%","44%"],["79%","58%"]],
  "04-member": [["28%","42%"],["17%","58%"],["52%","32%"],["72%","36%"],["81%","58%"]],
  "05-owner-menu": [["31%","42%"],["19%","55%"],["53%","34%"],["71%","37%"],["79%","59%"]],
  "06-owner": [["16%","54%"],["31%","39%"],["53%","32%"],["71%","39%"],["80%","58%"]]
};
const catKey = Object.keys(catNamePositions).find((key) => screen.includes(key));
if (catKey && frame) {
  catNamePositions[catKey].forEach(([left, top], index) => {
    const name = document.createElement("span");
    name.className = "cat-id";
    name.textContent = nicknames[index];
    name.style.left = left;
    name.style.top = top;
    frame.append(name);
  });
}
