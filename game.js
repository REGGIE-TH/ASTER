const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ASSETS = {
  chain: "assets/sprites/chain_girl_sheet.svg",
  lily: "assets/sprites/lily_boy_sheet.svg",
  wraith: "assets/sprites/wraith_sheet.svg",
  spike: "assets/sprites/spike.svg",
  pillar: "assets/sprites/pillar.svg",
  spotlight: "assets/sprites/spotlight.svg",
  bgFar: "assets/background/far.svg",
  bgMid: "assets/background/mid.svg",
};

function loadImages(entries) {
  const out = {};
  const tasks = Object.entries(entries).map(([k, src]) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        out[k] = img;
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    })
  );
  return Promise.all(tasks).then(() => out);
}

const WORLD = { gravity: 1900, groundY: 610, speed: 280, clearDistance: 2600 };
const input = new Set();
window.addEventListener("keydown", (e) => {
  if (["ArrowLeft", "ArrowRight", "Space", "KeyZ", "KeyX"].includes(e.code)) e.preventDefault();
  input.add(e.code);
});
window.addEventListener("keyup", (e) => input.delete(e.code));

const state = {
  t: 0,
  distance: 0,
  gameOver: false,
  clear: false,
  player: {
    x: 250,
    y: WORLD.groundY,
    vy: 0,
    hp: 100,
    energy: 100,
    score: 0,
    chainGirl: true,
    swapTimer: 0,
    dashTimer: 0,
    spotlightTimer: 0,
    hurtCd: 0,
  },
  obstacles: [],
  enemies: [],
};

function spawnObstacle() {
  const spike = Math.random() > 0.45;
  state.obstacles.push({
    kind: spike ? "spike" : "pillar",
    x: canvas.width + Math.random() * 420,
    y: WORLD.groundY,
    w: spike ? 72 : 95,
    h: spike ? 72 : 170,
  });
}

function spawnEnemy() {
  state.enemies.push({
    x: canvas.width + Math.random() * 360,
    y: WORLD.groundY - 30,
    hp: 36,
    r: 30,
    vx: -(130 + Math.random() * 120),
    phase: Math.random() * Math.PI * 2,
    weak: 0,
  });
}

for (let i = 0; i < 6; i++) spawnObstacle();
for (let i = 0; i < 4; i++) spawnEnemy();

function hit(dmg) {
  if (state.player.hurtCd > 0) return;
  state.player.hp = Math.max(0, state.player.hp - dmg);
  state.player.hurtCd = 0.6;
  if (state.player.hp <= 0) state.gameOver = true;
}

function update(dt) {
  const p = state.player;
  if (state.gameOver || state.clear) {
    if (input.has("Space")) location.reload();
    return;
  }

  state.t += dt;
  p.swapTimer += dt;
  p.hurtCd = Math.max(0, p.hurtCd - dt);
  p.dashTimer = Math.max(0, p.dashTimer - dt);
  p.spotlightTimer = Math.max(0, p.spotlightTimer - dt);

  const dir = (input.has("ArrowRight") ? 1 : 0) - (input.has("ArrowLeft") ? 1 : 0);
  const moveSpeed = WORLD.speed + (p.dashTimer > 0 ? 260 : 0);
  p.x += dir * moveSpeed * dt;
  p.x = Math.max(120, Math.min(580, p.x));

  if (input.has("Space") && p.y >= WORLD.groundY) p.vy = -830;
  if (input.has("KeyZ") && p.energy >= 25 && p.dashTimer <= 0) {
    p.energy -= 25;
    p.dashTimer = 0.3;
  }
  if (input.has("KeyX") && p.energy >= 30 && p.spotlightTimer <= 0) {
    p.energy -= 30;
    p.spotlightTimer = 2;
  }

  p.vy += WORLD.gravity * dt;
  p.y += p.vy * dt;
  if (p.y > WORLD.groundY) {
    p.y = WORLD.groundY;
    p.vy = 0;
  }

  if (p.swapTimer >= 8) {
    p.swapTimer = 0;
    p.chainGirl = !p.chainGirl;
  }

  p.energy = Math.min(100, p.energy + dt * 10);
  state.distance += WORLD.speed * dt;
  p.score += dt * (p.spotlightTimer > 0 ? 22 : 14);

  for (const o of state.obstacles) o.x -= WORLD.speed * dt;
  for (const e of state.enemies) {
    e.x += e.vx * dt;
    e.phase += dt * 6;

    if (Math.abs(e.x - p.x) < 280 && p.spotlightTimer > 0) {
      e.weak = 0.25;
      e.hp -= 20 * dt;
    }
    e.weak = Math.max(0, e.weak - dt);

    if (Math.abs(e.x - p.x) < 50 && Math.abs(e.y - p.y) < 120) {
      e.hp -= (p.chainGirl ? (e.weak > 0 ? 45 : 24) : 12) * dt;
      hit(12 * dt);
    }
  }

  for (const o of state.obstacles) {
    if (Math.abs(o.x - p.x) < o.w * 0.45 + 18 && p.y > WORLD.groundY - o.h) hit(18);
  }

  state.obstacles = state.obstacles.filter((o) => o.x > -180);
  state.enemies = state.enemies.filter((e) => e.x > -180 && e.hp > 0);
  while (state.obstacles.length < 7) spawnObstacle();
  while (state.enemies.length < 5) spawnEnemy();

  if (state.distance >= WORLD.clearDistance) state.clear = true;
}

function drawBg(imgs) {
  const loopFar = (state.t * 20) % canvas.width;
  const loopMid = (state.t * 80) % canvas.width;
  ctx.drawImage(imgs.bgFar, -loopFar, 0, canvas.width, canvas.height);
  ctx.drawImage(imgs.bgFar, canvas.width - loopFar, 0, canvas.width, canvas.height);
  ctx.drawImage(imgs.bgMid, -loopMid, 0, canvas.width, canvas.height);
  ctx.drawImage(imgs.bgMid, canvas.width - loopMid, 0, canvas.width, canvas.height);
}

function drawPlayer(imgs) {
  const p = state.player;
  const sprite = p.chainGirl ? imgs.chain : imgs.lily;
  const frameW = 128;
  const frameH = 128;
  const runFrame = Math.floor(state.t * (p.dashTimer > 0 ? 20 : 12)) % 8;
  const jumpFrame = 4;
  const frame = p.y < WORLD.groundY ? jumpFrame : runFrame;

  if (p.spotlightTimer > 0) {
    ctx.globalAlpha = 0.8;
    ctx.drawImage(imgs.spotlight, p.x - 220, p.y - 300, 440, 440);
    ctx.globalAlpha = 1;
  }

  if (p.hurtCd > 0 && Math.floor(state.t * 20) % 2 === 0) ctx.globalAlpha = 0.6;
  ctx.drawImage(sprite, frame * frameW, 0, frameW, frameH, p.x - 65, p.y - 175, 130, 130);
  ctx.globalAlpha = 1;
}

function drawObstacles(imgs) {
  for (const o of state.obstacles) {
    if (o.kind === "spike") {
      ctx.drawImage(imgs.spike, o.x - o.w / 2, WORLD.groundY - o.h, o.w, o.h);
    } else {
      ctx.drawImage(imgs.pillar, o.x - o.w / 2, WORLD.groundY - o.h, o.w, o.h);
    }
  }
}

function drawEnemies(imgs) {
  const frameW = 128;
  const frameH = 128;
  for (const e of state.enemies) {
    const frame = Math.floor((state.t * 10 + e.phase) % 6);
    if (e.weak > 0) {
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = "#fff5ae";
      ctx.beginPath();
      ctx.arc(e.x, e.y - 45, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.drawImage(imgs.wraith, frame * frameW, 0, frameW, frameH, e.x - 62, e.y - 126, 124, 124);
  }
}

function drawHud() {
  const p = state.player;
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(20, 18, 430, 130);
  ctx.fillStyle = "#fff";
  ctx.font = "20px sans-serif";
  ctx.fillText("HP", 38, 52);
  ctx.fillText("ENERGY", 38, 86);
  ctx.fillText(`SCORE ${Math.floor(p.score)}`, 38, 122);

  ctx.fillStyle = "#5b2333";
  ctx.fillRect(140, 36, 280, 16);
  ctx.fillStyle = "#ff7998";
  ctx.fillRect(140, 36, (280 * p.hp) / 100, 16);

  ctx.fillStyle = "#1f3e60";
  ctx.fillRect(140, 70, 280, 16);
  ctx.fillStyle = "#74d3ff";
  ctx.fillRect(140, 70, (280 * p.energy) / 100, 16);

  ctx.fillStyle = "#dbe7ff";
  ctx.fillText(p.chainGirl ? "ACTIVE: 사슬 소녀" : "ACTIVE: 백합 소년", 480, 50);
  ctx.fillText(`진행도 ${Math.floor((state.distance / WORLD.clearDistance) * 100)}%`, 480, 80);
}

function drawEnd() {
  if (!state.gameOver && !state.clear) return;
  ctx.fillStyle = "rgba(0,0,0,0.62)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "54px sans-serif";
  ctx.fillText(state.clear ? "클리어! 성역을 지켜냈다!" : "실패... 다시 도전", canvas.width / 2, 300);
  ctx.font = "26px sans-serif";
  ctx.fillText(`최종 점수: ${Math.floor(state.player.score)}`, canvas.width / 2, 355);
  ctx.fillText("Space로 재시작", canvas.width / 2, 398);
  ctx.textAlign = "left";
}

loadImages(ASSETS)
  .then((imgs) => {
    let prev = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      update(dt);
      drawBg(imgs);
      drawObstacles(imgs);
      drawEnemies(imgs);
      drawPlayer(imgs);
      drawHud();
      drawEnd();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  })
  .catch(() => {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "28px sans-serif";
    ctx.fillText("에셋 로딩 실패: 파일 경로를 확인해주세요.", 100, 160);
  });
