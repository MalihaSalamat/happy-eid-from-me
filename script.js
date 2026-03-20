/* ═══════════════════════════════════════════
   EID MUBARAK — script.js
   Developed by Maliha
═══════════════════════════════════════════ */

/* ── GLOBAL STATE ── */
let _name = '', _gender = '';

/* ══════════════════════════════════════════
   CANVAS BACKGROUND — Stars, Moon, Mosque
══════════════════════════════════════════ */
const bgC = document.getElementById('bgC');
const bgX = bgC.getContext('2d');

function resizeBg() {
  bgC.width  = innerWidth;
  bgC.height = innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);

/* Star data */
const STARS = Array.from({ length: 130 }, () => ({
  x:  Math.random() * innerWidth,
  y:  Math.random() * innerHeight,
  r:  Math.random() * 1.8 + .2,
  ph: Math.random() * Math.PI * 2,
  sp: Math.random() * .009 + .003
}));

/* Large decorative stars */
const BSTARS = Array.from({ length: 12 }, () => ({
  x:  Math.random() * innerWidth,
  y:  Math.random() * innerHeight * .68,
  sz: Math.random() * 12 + 7,
  ph: Math.random() * Math.PI * 2,
  sp: Math.random() * .005 + .002
}));

/* Floating gold dust */
const PARTS = Array.from({ length: 32 }, () => ({
  x:  Math.random() * innerWidth,
  y:  Math.random() * innerHeight + innerHeight,
  vx: (Math.random() - .5) * .35,
  vy: -(Math.random() * .5 + .18),
  sz: Math.random() * 3.5 + 1,
  op: Math.random() * .55 + .1
}));

const MOON = { x: .78, y: .13, ph: 0 };
let TT = 0;

/* Draw a 5-pointed star shape */
function s5(x, y, r, rot) {
  bgX.save();
  bgX.translate(x, y);
  bgX.rotate(rot);
  bgX.beginPath();
  for (let i = 0; i < 5; i++) {
    const oa = (i * 4 * Math.PI / 5) - Math.PI / 2;
    const ia = oa + Math.PI / 5;
    if (i === 0) bgX.moveTo(Math.cos(oa) * r, Math.sin(oa) * r);
    else          bgX.lineTo(Math.cos(oa) * r, Math.sin(oa) * r);
    bgX.lineTo(Math.cos(ia) * r * .42, Math.sin(ia) * r * .42);
  }
  bgX.closePath();
  bgX.restore();
}

/* Main background animation loop */
(function animBg() {
  requestAnimationFrame(animBg);
  TT += .016;

  /* Sky gradient */
  const g = bgX.createLinearGradient(0, 0, 0, bgC.height);
  g.addColorStop(0,   '#020A05');
  g.addColorStop(.35, '#051208');
  g.addColorStop(.75, '#081C0E');
  g.addColorStop(1,   '#0B2E18');
  bgX.fillStyle = g;
  bgX.fillRect(0, 0, bgC.width, bgC.height);

  /* Subtle aurora bands */
  const a1 = bgX.createLinearGradient(0, bgC.height * .1, bgC.width, bgC.height * .5);
  a1.addColorStop(0,   'transparent');
  a1.addColorStop(.35, 'rgba(13,80,45,.06)');
  a1.addColorStop(.65, 'rgba(212,175,55,.04)');
  a1.addColorStop(1,   'transparent');
  bgX.fillStyle = a1;
  bgX.fillRect(0, 0, bgC.width, bgC.height);

  /* Moon halo glow */
  const mx = bgC.width * MOON.x, my = bgC.height * MOON.y;
  MOON.ph += .003;
  const mh = bgX.createRadialGradient(mx, my, 0, mx, my, 110);
  mh.addColorStop(0,  'rgba(212,175,55,.18)');
  mh.addColorStop(.4, 'rgba(212,175,55,.07)');
  mh.addColorStop(1,  'transparent');
  bgX.fillStyle = mh;
  bgX.beginPath();
  bgX.arc(mx, my, 110, 0, Math.PI * 2);
  bgX.fill();

  /* Crescent moon */
  bgX.save();
  bgX.shadowBlur = 32;
  bgX.shadowColor = 'rgba(212,175,55,.85)';
  const mb = bgX.createRadialGradient(mx - 5, my - 5, 5, mx, my, 44);
  mb.addColorStop(0,  '#FFFFF0');
  mb.addColorStop(.5, '#F5D76E');
  mb.addColorStop(1,  '#D4AF37');
  bgX.fillStyle = mb;
  bgX.beginPath();
  bgX.arc(mx, my, 44, 0, Math.PI * 2);
  bgX.fill();
  bgX.fillStyle = '#020A05';
  bgX.beginPath();
  bgX.arc(mx + 21, my - 6, 37, 0, Math.PI * 2);
  bgX.fill();
  bgX.restore();

  /* Twinkling star beside moon */
  bgX.save();
  bgX.shadowBlur = 16;
  bgX.shadowColor = 'rgba(212,175,55,.95)';
  bgX.fillStyle = '#F5D76E';
  s5(mx + 72, my - 32, 10 + Math.sin(TT * .8) * 1.6, TT * .32);
  bgX.fill();
  bgX.restore();

  /* Small twinkling stars */
  STARS.forEach(s => {
    s.ph += s.sp;
    const a = .25 + Math.sin(s.ph) * .42 + .33;
    bgX.save();
    bgX.shadowBlur  = 6;
    bgX.shadowColor = `rgba(212,175,55,${a * .75})`;
    bgX.fillStyle   = `rgba(245,215,110,${a})`;
    bgX.beginPath();
    bgX.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    bgX.fill();
    bgX.restore();
  });

  /* Large decorative stars */
  BSTARS.forEach(s => {
    s.ph += s.sp;
    const a = .35 + Math.sin(s.ph) * .32;
    bgX.save();
    bgX.shadowBlur  = 22;
    bgX.shadowColor = `rgba(212,175,55,${a})`;
    bgX.fillStyle   = `rgba(245,215,110,${a})`;
    s5(s.x, s.y, s.sz + Math.sin(s.ph) * 2.2, s.ph * .2);
    bgX.fill();
    bgX.restore();
  });

  /* Floating gold dust particles */
  PARTS.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -10) { p.y = bgC.height + 10; p.x = Math.random() * bgC.width; }
    const pa = p.op * (0.5 + Math.sin(TT + p.x) * .5);
    bgX.save();
    bgX.fillStyle = `rgba(212,175,55,${pa})`;
    bgX.beginPath();
    bgX.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
    bgX.fill();
    bgX.restore();
  });

  drawMosque();
})();

/* Draw detailed mosque silhouette */
function drawMosque() {
  const w = bgC.width, h = bgC.height, bh = 95, by = h - bh;
  bgX.fillStyle = 'rgba(2,8,4,.92)';

  /* Main central dome */
  bgX.beginPath();
  bgX.arc(w * .5, by + 6, 58, Math.PI, 0);
  bgX.lineTo(w * .5 + 58, by + 6);
  bgX.rect(w * .5 - 58, by + 6, 116, bh);
  bgX.fill();

  /* Left side dome */
  bgX.beginPath();
  bgX.arc(w * .5 - 80, by + 18, 28, Math.PI, 0);
  bgX.lineTo(w * .5 - 52, by + 18);
  bgX.rect(w * .5 - 108, by + 18, 56, bh);
  bgX.fill();

  /* Right side dome */
  bgX.beginPath();
  bgX.arc(w * .5 + 80, by + 18, 28, Math.PI, 0);
  bgX.lineTo(w * .5 + 108, by + 18);
  bgX.rect(w * .5 + 52, by + 18, 56, bh);
  bgX.fill();

  /* Left minaret */
  bgX.fillRect(w * .5 - 128, by - 52, 18, bh + 52);
  bgX.beginPath();
  bgX.arc(w * .5 - 119, by - 52, 9, Math.PI, 0);
  bgX.fill();

  /* Right minaret */
  bgX.fillRect(w * .5 + 110, by - 52, 18, bh + 52);
  bgX.beginPath();
  bgX.arc(w * .5 + 119, by - 52, 9, Math.PI, 0);
  bgX.fill();

  /* Gold finials on minarets */
  bgX.fillStyle = 'rgba(212,175,55,.45)';
  bgX.beginPath(); bgX.arc(w * .5,        by - 54, 5,   0, Math.PI * 2); bgX.fill();
  bgX.beginPath(); bgX.arc(w * .5 - 119,  by - 62, 3.5, 0, Math.PI * 2); bgX.fill();
  bgX.beginPath(); bgX.arc(w * .5 + 119,  by - 62, 3.5, 0, Math.PI * 2); bgX.fill();

  /* Ground strip */
  bgX.fillStyle = 'rgba(2,8,4,.92)';
  bgX.fillRect(0, h - 14, w, 14);

  /* Gold horizon line */
  bgX.fillStyle = 'rgba(212,175,55,.18)';
  bgX.fillRect(0, h - bh - 2, w, 1);
}

/* ══════════════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════════════ */
function startGreeting() {
  const n = document.getElementById('nameInput');
  const g = document.querySelector('input[name="gender"]:checked');

  document.getElementById('nameErr').style.display   = 'none';
  document.getElementById('genderErr').style.display = 'none';

  let ok = true;
  if (!n.value.trim()) { document.getElementById('nameErr').style.display   = 'block'; ok = false; }
  if (!g)               { document.getElementById('genderErr').style.display = 'block'; ok = false; }
  if (!ok) return;

  _name   = n.value.trim();
  _gender = g.value;

  const greeting = _gender === 'male'
    ? '🌙 Eid Mubarak ' + _name + ' Bhai! 🌙'
    : '🌸 Eid Mubarak ' + _name + '! 🌸';

  document.getElementById('greetName').textContent = greeting;
  document.getElementById('page1').classList.remove('active');
  document.getElementById('page2').classList.add('active');
  window.scrollTo(0, 0);
  startMusic(); /* auto-start nasheed — this click counts as user gesture */
}

function goBack() {
  document.getElementById('page2').classList.remove('active');
  document.getElementById('page1').classList.add('active');
  window.scrollTo(0, 0);
}

/* Enter key on name input */
document.getElementById('nameInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') startGreeting();
});

/* ══════════════════════════════════════════
   CONFETTI + FIREWORKS ENGINE
══════════════════════════════════════════ */
const CC = document.getElementById('confC');
const CX = CC.getContext('2d');

const COLS = [
  '#D4AF37', '#F5D76E', '#FFD700', '#1E7A52', '#2ecc71',
  '#e74c3c', '#9b59b6', '#3498db', '#FF6B6B', '#FFF8E7',
  '#ff6b9d', '#FFFFF0', '#ff8c00'
];

let cP = [], cRun = false, cRAF = null;

function openSurprise() {
  CC.width  = innerWidth;
  CC.height = innerHeight;
  cP    = [];
  cRun  = true;

  /* Confetti rain — 200 pieces from the top */
  for (let i = 0; i < 200; i++) {
    cP.push({
      x:  Math.random() * CC.width,
      y:  -20 - Math.random() * CC.height * .4,
      vx: (Math.random() - .5) * 8,
      vy: Math.random() * 6 + 3,
      rot: Math.random() * 360,
      rv:  (Math.random() - .5) * 10,
      w:   Math.random() * 13 + 5,
      h:   Math.random() * 7 + 3,
      c:   COLS[Math.floor(Math.random() * COLS.length)],
      a:   1,
      sh:  Math.random() < .28 ? 'c' : 'r'
    });
  }

  /* Firework bursts — 9 waves staggered 260ms apart */
  for (let f = 0; f < 9; f++) {
    setTimeout(() => {
      const fx  = 50 + Math.random() * (CC.width - 100);
      const fy  = 40 + Math.random() * (CC.height * .45);
      const fc  = COLS[Math.floor(Math.random() * COLS.length)];
      const cnt = 30 + Math.floor(Math.random() * 20);

      for (let p = 0; p < cnt; p++) {
        const ang = (p / cnt) * Math.PI * 2;
        const sp  = Math.random() * 7 + 3;
        cP.push({
          x: fx, y: fy,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 1.5,
          rot: 0, rv: 0,
          w: 4 + Math.random() * 4,
          h: 4 + Math.random() * 4,
          c: fc, a: 1, sh: 'c'
        });
      }
    }, f * 260);
  }

  /* Draw loop */
  if (cRAF) cancelAnimationFrame(cRAF);
  (function draw() {
    if (!cRun) { CX.clearRect(0, 0, CC.width, CC.height); return; }
    CX.clearRect(0, 0, CC.width, CC.height);

    cP.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += .12;
      p.vx *= .99;
      p.rot += p.rv;
      if (p.y > CC.height) p.a -= .06;
      if (p.a <= 0) return;

      CX.save();
      CX.translate(p.x, p.y);
      CX.rotate(p.rot * Math.PI / 180);
      CX.globalAlpha = Math.max(0, p.a);
      CX.fillStyle   = p.c;

      if (p.sh === 'c') {
        CX.beginPath();
        CX.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        CX.fill();
      } else {
        CX.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      CX.restore();
    });

    cP = cP.filter(p => p.a > 0);
    if (cP.length > 0) cRAF = requestAnimationFrame(draw);
    else CX.clearRect(0, 0, CC.width, CC.height);
  })();
}

/* ══════════════════════════════════════════
   MUSIC PLAYER
══════════════════════════════════════════ */
const music    = document.getElementById('eidMusic');
const musicBtn = document.getElementById('musicBtn');
let   playing  = false;

music.volume   = 0.5;
music.preload  = 'auto';

/* Called when user clicks "Begin Celebration" — that click IS a gesture,
   so browser allows audio to start. Music plays from page 2 onward. */
function startMusic() {
  if (!playing) {
    music.volume = 0.5;
    music.play().then(() => {
      playing = true;
      musicBtn.textContent = '🎵';
      musicBtn.style.boxShadow = '0 0 22px rgba(212,175,55,.7)';
    }).catch(() => {});
  }
}

function toggleMusic() {
  // if (playing) {
  //   music.pause();
  //   playing = false;
  //   musicBtn.textContent = '🔇';
  //   musicBtn.style.boxShadow = '';
  // }
   
    music.volume = 0.5;
    music.play().catch(() => {});
    playing = true;
    musicBtn.textContent = '🎵';
    musicBtn.style.boxShadow = '0 0 22px rgba(212,175,55,.7)';
  }

