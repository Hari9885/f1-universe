// ============================================================
// F1 UNIVERSE — Premium Application Engine
// Active Theory-inspired Three.js + GSAP ScrollTrigger
// Cinematic WebGL · Velocity-Reactive · 60fps Target
// ============================================================

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

// ============================================================
// DATA — 2025 SEASON
// ============================================================
const TEAMS = [
  { id:'mclaren', name:'McLAREN', car:'MCL39', color:'#FF8000', color2:'#3D3D3D', rgb:'255,128,0', drivers:['Lando Norris','Oscar Piastri'], driverNums:[4,81], points:640, engine:'Mercedes' },
  { id:'redbull', name:'RED BULL RACING', car:'RB21', color:'#1B0D3A', color2:'#DC1414', rgb:'27,13,58', drivers:['Max Verstappen','Sergio Pérez'], driverNums:[1,11], points:580, engine:'Honda RBPT' },
  { id:'ferrari', name:'SCUDERIA FERRARI', car:'SF-25', color:'#DC0000', color2:'#FFFFFF', rgb:'220,0,0', drivers:['Lewis Hamilton','Charles Leclerc'], driverNums:[44,16], points:560, engine:'Ferrari' },
  { id:'mercedes', name:'MERCEDES-AMG', car:'W16', color:'#27F4D2', color2:'#C0C0C0', rgb:'39,244,210', drivers:['George Russell','Andrea K. Antonelli'], driverNums:[63,12], points:425, engine:'Mercedes' },
  { id:'aston', name:'ASTON MARTIN', car:'AMR25', color:'#358C75', color2:'#B5CC18', rgb:'53,140,117', drivers:['Fernando Alonso','Lance Stroll'], driverNums:[14,18], points:290, engine:'Mercedes' },
  { id:'alpine', name:'ALPINE', car:'A525', color:'#0093CC', color2:'#FF69B4', rgb:'0,147,204', drivers:['Pierre Gasly','Jack Doohan'], driverNums:[10,7], points:155, engine:'Renault' },
  { id:'williams', name:'WILLIAMS', car:'FW47', color:'#005AFF', color2:'#FFFFFF', rgb:'0,90,255', drivers:['Alex Albon','Carlos Sainz'], driverNums:[23,55], points:120, engine:'Mercedes' },
  { id:'haas', name:'HAAS', car:'VF-25', color:'#B6BABD', color2:'#E8002D', rgb:'182,186,189', drivers:['Oliver Bearman','Esteban Ocon'], driverNums:[87,31], points:95, engine:'Ferrari' },
  { id:'sauber', name:'KICK SAUBER', car:'C45', color:'#52E252', color2:'#060606', rgb:'82,226,82', drivers:['Nico Hülkenberg','Gabriel Bortoleto'], driverNums:[27,5], points:10, engine:'Ferrari' },
  { id:'rb', name:'RB VISA CASH APP', car:'VCARB 02', color:'#1434CB', color2:'#FFD700', rgb:'20,52,203', drivers:['Yuki Tsunoda','Isack Hadjar'], driverNums:[22,6], points:75, engine:'Honda RBPT' },
];

const DRIVERS = [
  { name:'Max Verstappen', num:1, team:'redbull', nat:'NED', wins:62, poles:40, pts:350, fl:33 },
  { name:'Lando Norris', num:4, team:'mclaren', nat:'GBR', wins:8, poles:12, pts:340, fl:10 },
  { name:'Charles Leclerc', num:16, team:'ferrari', nat:'MON', wins:9, poles:25, pts:290, fl:8 },
  { name:'Lewis Hamilton', num:44, team:'ferrari', nat:'GBR', wins:105, poles:104, pts:270, fl:67 },
  { name:'Oscar Piastri', num:81, team:'mclaren', nat:'AUS', wins:4, poles:3, pts:300, fl:4 },
  { name:'George Russell', num:63, team:'mercedes', nat:'GBR', wins:5, poles:7, pts:245, fl:9 },
  { name:'Carlos Sainz', num:55, team:'williams', nat:'ESP', wins:4, poles:6, pts:85, fl:5 },
  { name:'Fernando Alonso', num:14, team:'aston', nat:'ESP', wins:32, poles:22, pts:160, fl:24 },
  { name:'Sergio Pérez', num:11, team:'redbull', nat:'MEX', wins:6, poles:3, pts:130, fl:11 },
  { name:'Andrea K. Antonelli', num:12, team:'mercedes', nat:'ITA', wins:0, poles:1, pts:80, fl:0 },
  { name:'Lance Stroll', num:18, team:'aston', nat:'CAN', wins:0, poles:1, pts:70, fl:0 },
  { name:'Pierre Gasly', num:10, team:'alpine', nat:'FRA', wins:1, poles:0, pts:85, fl:3 },
  { name:'Alex Albon', num:23, team:'williams', nat:'THA', wins:0, poles:0, pts:55, fl:0 },
  { name:'Jack Doohan', num:7, team:'alpine', nat:'AUS', wins:0, poles:0, pts:30, fl:0 },
  { name:'Yuki Tsunoda', num:22, team:'rb', nat:'JPN', wins:0, poles:0, pts:45, fl:1 },
  { name:'Oliver Bearman', num:87, team:'haas', nat:'GBR', wins:0, poles:0, pts:50, fl:0 },
  { name:'Esteban Ocon', num:31, team:'haas', nat:'FRA', wins:1, poles:0, pts:45, fl:0 },
  { name:'Nico Hülkenberg', num:27, team:'sauber', nat:'GER', wins:0, poles:1, pts:8, fl:2 },
  { name:'Isack Hadjar', num:6, team:'rb', nat:'FRA', wins:0, poles:0, pts:20, fl:0 },
  { name:'Gabriel Bortoleto', num:5, team:'sauber', nat:'BRA', wins:0, poles:0, pts:2, fl:0 },
];

const RACES = [
  { name:'Bahrain GP', loc:'Sakhir', date:'MAR 2', lat:26.03, lng:50.51, laps:57, len:'5.412km', corners:15 },
  { name:'Saudi Arabian GP', loc:'Jeddah', date:'MAR 9', lat:21.63, lng:39.10, laps:50, len:'6.174km', corners:27 },
  { name:'Australian GP', loc:'Melbourne', date:'MAR 23', lat:-37.85, lng:144.97, laps:58, len:'5.278km', corners:14 },
  { name:'Japanese GP', loc:'Suzuka', date:'APR 6', lat:34.84, lng:136.54, laps:53, len:'5.807km', corners:18 },
  { name:'Chinese GP', loc:'Shanghai', date:'APR 20', lat:31.34, lng:121.22, laps:56, len:'5.451km', corners:16 },
  { name:'Miami GP', loc:'Miami', date:'MAY 4', lat:25.96, lng:-80.24, laps:57, len:'5.412km', corners:19 },
  { name:'Emilia Romagna GP', loc:'Imola', date:'MAY 18', lat:44.34, lng:11.71, laps:63, len:'4.909km', corners:19 },
  { name:'Monaco GP', loc:'Monte Carlo', date:'MAY 25', lat:43.73, lng:7.42, laps:78, len:'3.337km', corners:19 },
  { name:'Spanish GP', loc:'Barcelona', date:'JUN 1', lat:41.57, lng:2.26, laps:66, len:'4.657km', corners:16 },
  { name:'Canadian GP', loc:'Montréal', date:'JUN 15', lat:45.50, lng:-73.52, laps:70, len:'4.361km', corners:14 },
  { name:'Austrian GP', loc:'Spielberg', date:'JUN 29', lat:47.22, lng:14.76, laps:71, len:'4.318km', corners:10 },
  { name:'British GP', loc:'Silverstone', date:'JUL 6', lat:52.07, lng:-1.02, laps:52, len:'5.891km', corners:18 },
  { name:'Belgian GP', loc:'Spa', date:'JUL 27', lat:50.44, lng:5.97, laps:44, len:'7.004km', corners:19 },
  { name:'Hungarian GP', loc:'Budapest', date:'AUG 3', lat:47.58, lng:19.25, laps:70, len:'4.381km', corners:14 },
  { name:'Dutch GP', loc:'Zandvoort', date:'AUG 31', lat:52.39, lng:4.54, laps:72, len:'4.259km', corners:14 },
  { name:'Italian GP', loc:'Monza', date:'SEP 7', lat:45.62, lng:9.29, laps:53, len:'5.793km', corners:11 },
  { name:'Azerbaijan GP', loc:'Baku', date:'SEP 21', lat:40.37, lng:49.85, laps:51, len:'6.003km', corners:20 },
  { name:'Singapore GP', loc:'Marina Bay', date:'OCT 5', lat:1.29, lng:103.86, laps:62, len:'4.940km', corners:23 },
  { name:'United States GP', loc:'Austin', date:'OCT 19', lat:30.13, lng:-97.64, laps:56, len:'5.513km', corners:20 },
  { name:'Mexico City GP', loc:'Mexico City', date:'OCT 26', lat:19.40, lng:-99.09, laps:71, len:'4.304km', corners:17 },
  { name:'São Paulo GP', loc:'São Paulo', date:'NOV 9', lat:-23.70, lng:-46.70, laps:71, len:'4.309km', corners:15 },
  { name:'Las Vegas GP', loc:'Las Vegas', date:'NOV 22', lat:36.11, lng:-115.17, laps:50, len:'6.201km', corners:17 },
  { name:'Qatar GP', loc:'Lusail', date:'NOV 30', lat:25.49, lng:51.45, laps:57, len:'5.419km', corners:16 },
  { name:'Abu Dhabi GP', loc:'Yas Marina', date:'DEC 7', lat:24.47, lng:54.60, laps:58, len:'5.281km', corners:16 },
];

// ============================================================
// ANIMATION CORE — Singleton RAF loop with smooth scroll
// ============================================================
class F1AnimationCore {
  constructor() {
    this.currentY = 0;
    this.targetY = 0;
    this.velocity = 0;
    this.prevY = 0;
    this.ease = 0.075;
    this.time = 0;
    this.deltaTime = 0;
    this.lastFrameTime = performance.now();
    this.callbacks = [];
    this.running = false;
    this.mouseX = 0;
    this.mouseY = 0;

    // Track normalized mouse
    document.addEventListener('mousemove', e => {
      this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastFrameTime = performance.now();
    this.tick();
  }

  onTick(fn) { this.callbacks.push(fn); }

  tick() {
    const now = performance.now();
    this.deltaTime = Math.min((now - this.lastFrameTime) / 1000, 0.05);
    this.lastFrameTime = now;

    this.prevY = this.currentY;
    this.currentY += (this.targetY - this.currentY) * this.ease;
    this.velocity = Math.abs(this.currentY - this.prevY);
    this.time += this.deltaTime;

    // Publish CSS variables
    const root = document.documentElement;
    root.style.setProperty('--scroll-y', String(this.currentY));
    root.style.setProperty('--scroll-velocity', Math.min(this.velocity / 20, 1).toFixed(4));

    // Cursor velocity state
    const vel = Math.min(this.velocity / 15, 1);
    document.body.classList.toggle('cursor-scroll-fast', vel > 0.25);

    for (const cb of this.callbacks) cb(this.time, this.velocity, this.currentY);

    requestAnimationFrame(() => this.tick());
  }

  setTarget(y) { this.targetY = y; }
}

// ============================================================
// CUSTOM CURSOR — Active Theory elastic feel
// ============================================================
class CursorController {
  constructor() {
    this.dot = document.getElementById('cursor-dot');
    this.ring = document.getElementById('cursor-ring');
    this.text = document.getElementById('cursor-text');
    this.dotX = 0; this.dotY = 0;
    this.ringX = 0; this.ringY = 0;
    this.mouseX = 0; this.mouseY = 0;
    this.visible = false;

    if ('ontouchstart' in window) return;

    document.addEventListener('mousemove', e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      if (!this.visible) {
        this.visible = true;
        this.dotX = e.clientX;
        this.dotY = e.clientY;
        this.ringX = e.clientX;
        this.ringY = e.clientY;
      }
    });

    this.animate();
    this.setupHovers();
  }

  animate() {
    // Dot follows mouse tightly
    this.dotX += (this.mouseX - this.dotX) * 0.45;
    this.dotY += (this.mouseY - this.dotY) * 0.45;
    // Ring follows with elastic lag
    this.ringX += (this.mouseX - this.ringX) * 0.12;
    this.ringY += (this.mouseY - this.ringY) * 0.12;

    if (this.dot) {
      this.dot.style.left = this.dotX + 'px';
      this.dot.style.top = this.dotY + 'px';
    }
    if (this.ring) {
      this.ring.style.left = this.ringX + 'px';
      this.ring.style.top = this.ringY + 'px';
    }
    requestAnimationFrame(() => this.animate());
  }

  setupHovers() {
    // Use event delegation for dynamically created elements
    document.addEventListener('mouseover', e => {
      const el = e.target.closest('a, button, .car-card, .driver-card, .race-card, .tyre-zone, .nav-dot, .speed-rose');
      if (!el) return;
      document.body.classList.add('cursor-hover');
      if (el.classList.contains('car-card')) this.text.textContent = 'INSPECT';
      else if (el.classList.contains('tyre-zone')) this.text.textContent = 'CLICK';
      else if (el.classList.contains('driver-card')) this.text.textContent = 'VIEW';
      else if (el.classList.contains('speed-rose')) this.text.textContent = 'DATA';
      else this.text.textContent = '';
    });

    document.addEventListener('mouseout', e => {
      const el = e.target.closest('a, button, .car-card, .driver-card, .race-card, .tyre-zone, .nav-dot, .speed-rose');
      if (!el) return;
      document.body.classList.remove('cursor-hover');
      this.text.textContent = '';
    });

    document.addEventListener('mouseover', e => {
      const el = e.target.closest('.outro-cta, .pitstop-start-btn, .pitstop-retry-btn');
      if (el) document.body.classList.add('cursor-cta');
    });
    document.addEventListener('mouseout', e => {
      const el = e.target.closest('.outro-cta, .pitstop-start-btn, .pitstop-retry-btn');
      if (el) document.body.classList.remove('cursor-cta');
    });
  }
}

// ============================================================
// AUDIO ENGINE — Layered oscillators
// ============================================================
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.engineOsc = null;
    this.engineOsc2 = null;
    this.muted = true;
    this.initialized = false;

    const btn = document.getElementById('audio-toggle');
    btn.addEventListener('click', () => this.toggle());
  }

  init() {
    if (this.initialized) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.ctx.destination);

    // Primary engine tone
    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.value = 80;
    const engineGain = this.ctx.createGain();
    engineGain.gain.value = 0.12;
    this.engineOsc.connect(engineGain);
    engineGain.connect(this.masterGain);
    this.engineOsc.start();

    // Secondary harmonic
    this.engineOsc2 = this.ctx.createOscillator();
    this.engineOsc2.type = 'triangle';
    this.engineOsc2.frequency.value = 160;
    const engineGain2 = this.ctx.createGain();
    engineGain2.gain.value = 0.06;
    this.engineOsc2.connect(engineGain2);
    engineGain2.connect(this.masterGain);
    this.engineOsc2.start();

    this.initialized = true;
  }

  toggle() {
    if (!this.initialized) this.init();
    this.muted = !this.muted;
    this.masterGain.gain.setTargetAtTime(this.muted ? 0 : 0.25, this.ctx.currentTime, 0.1);

    const btn = document.getElementById('audio-toggle');
    const iconOn = document.getElementById('audio-icon-on');
    const iconOff = document.getElementById('audio-icon-off');
    if (this.muted) {
      btn.classList.remove('active');
      iconOn.style.display = '';
      iconOff.style.display = 'none';
    } else {
      btn.classList.add('active');
      iconOn.style.display = 'none';
      iconOff.style.display = '';
    }
  }

  setVelocity(v) {
    if (!this.initialized || this.muted) return;
    const freq = 80 + v * 350;
    this.engineOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.08);
    if (this.engineOsc2) {
      this.engineOsc2.frequency.setTargetAtTime(freq * 2.02, this.ctx.currentTime, 0.08);
    }
  }

  playClick() {
    if (!this.initialized || this.muted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 900;
    gain.gain.value = 0.25;
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playImpact() {
    if (!this.initialized || this.muted) return;
    // Low thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 50;
    gain.gain.value = 0.5;
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
    // Metal scrape overlay
    const noise = this.ctx.createOscillator();
    const nGain = this.ctx.createGain();
    noise.type = 'sawtooth';
    noise.frequency.value = 200;
    nGain.gain.value = 0.15;
    nGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    noise.connect(nGain);
    nGain.connect(this.masterGain);
    noise.start();
    noise.stop(this.ctx.currentTime + 0.3);
  }

  playSuccess() {
    if (!this.initialized || this.muted) return;
    [523, 659, 784, 1047].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.value = f;
      gain.gain.value = 0.18;
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35 + i * 0.08);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(this.ctx.currentTime + i * 0.06);
      osc.stop(this.ctx.currentTime + 0.35 + i * 0.08);
    });
  }
}

// ============================================================
// LOADING SCREEN
// ============================================================
class LoadingScreen {
  constructor(onComplete) {
    this.el = document.getElementById('loading-screen');
    this.needle = document.getElementById('rev-needle');
    this.percentEl = document.getElementById('loading-percent');
    this.textEl = document.getElementById('loading-text');
    this.onComplete = onComplete;
    this.progress = 0;

    this.buildRevCounter();
    this.startTypewriter();
  }

  buildRevCounter() {
    const majorTicks = document.getElementById('major-ticks');
    const minorTicks = document.getElementById('minor-ticks');
    const nums = document.getElementById('rpm-numbers');

    for (let i = 0; i <= 15; i++) {
      const angle = -135 + (i / 15) * 270;
      const rad = angle * Math.PI / 180;
      const cx = 150, cy = 150, r1 = 125, r2 = 136, rNum = 112;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx + r1 * Math.cos(rad));
      line.setAttribute('y1', cy + r1 * Math.sin(rad));
      line.setAttribute('x2', cx + r2 * Math.cos(rad));
      line.setAttribute('y2', cy + r2 * Math.sin(rad));
      majorTicks.appendChild(line);

      const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      txt.setAttribute('x', cx + rNum * Math.cos(rad));
      txt.setAttribute('y', cy + rNum * Math.sin(rad) + 4);
      txt.textContent = i;
      if (i >= 13) txt.setAttribute('fill', '#E8002D');
      nums.appendChild(txt);

      if (i < 15) {
        for (let j = 1; j <= 4; j++) {
          const mAngle = -135 + ((i + j / 5) / 15) * 270;
          const mRad = mAngle * Math.PI / 180;
          const ml = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          ml.setAttribute('x1', cx + 129 * Math.cos(mRad));
          ml.setAttribute('y1', cy + 129 * Math.sin(mRad));
          ml.setAttribute('x2', cx + 136 * Math.cos(mRad));
          ml.setAttribute('y2', cy + 136 * Math.sin(mRad));
          minorTicks.appendChild(ml);
        }
      }
    }

    const redStart = -135 + (13 / 15) * 270;
    const redEnd = -135 + (15 / 15) * 270;
    const arc = document.getElementById('redline-arc');
    arc.setAttribute('d', this.describeArc(150, 150, 132, redStart, redEnd));
  }

  describeArc(cx, cy, r, startAngle, endAngle) {
    const startRad = startAngle * Math.PI / 180;
    const endRad = endAngle * Math.PI / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  startTypewriter() {
    const messages = [
      'INITIALISING TELEMETRY SYSTEMS...',
      'LOADING AERODYNAMIC PROFILES...',
      'CALIBRATING DRS ACTIVATION...',
      'COMPILING SHADER PIPELINES...',
      'ESTABLISHING PIT WALL LINK...',
      'SYSTEMS NOMINAL. LIGHTS OUT.'
    ];
    let msgIdx = 0, charIdx = 0;

    const type = () => {
      if (msgIdx >= messages.length) return;
      const msg = messages[msgIdx];
      if (charIdx <= msg.length) {
        this.textEl.textContent = msg.slice(0, charIdx) + '█';
        charIdx++;
        setTimeout(type, 30);
      } else {
        setTimeout(() => { charIdx = 0; msgIdx++; type(); }, 500);
      }
    };
    type();
  }

  setProgress(p) {
    this.progress = Math.min(p, 1);
    const angle = -135 + this.progress * 270;
    this.needle.setAttribute('transform', `rotate(${angle}, 150, 150)`);
    this.percentEl.textContent = Math.round(this.progress * 100) + '%';
    this.el.setAttribute('aria-valuenow', Math.round(this.progress * 100));

    const arc = document.getElementById('progress-arc');
    if (this.progress > 0.01) {
      arc.setAttribute('d', this.describeArc(150, 150, 138, -135, -135 + this.progress * 270));
    }
  }

  complete() {
    this.setProgress(1);
    setTimeout(() => {
      this.el.classList.add('flash');
      setTimeout(() => {
        this.el.classList.add('hidden');
        this.onComplete();
      }, 350);
    }, 600);
  }
}

// ============================================================
// THREE.JS — RENDERER & SCENES
// ============================================================
let renderer, clock;
let heroScene, heroCamera, heroComposer;
let globeScene, globeCamera, globeRenderer;
let outroScene, outroCamera;
let carMesh, trackMesh, sparkParticles;
let globeMesh, atmosphereMesh, racePins;
let starField;
let activeSceneId = 'hero';
let heroProgress = 0;
let shockwaveActive = false;
let shockwaveStartTime = 0;

const shaderUniforms = {
  uTime: { value: 0 },
  uScrollVelocity: { value: 0 },
  uImpactTime: { value: -10 },
};

function setupRenderer() {
  const canvas = document.getElementById('webgl');
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  clock = new THREE.Clock();

  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    [heroCamera, globeCamera, outroCamera].forEach(cam => {
      if (cam) { cam.aspect = w / h; cam.updateProjectionMatrix(); }
    });
    if (heroComposer) heroComposer.setSize(w, h);
  });
}

// ============================================================
// PROCEDURAL F1 CAR — Team-colored factory
// ============================================================
function createF1Car(primary = '#E8002D', secondary = '#FFFFFF') {
  const car = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: primary, metalness: 0.75, roughness: 0.2,
    envMapIntensity: 1.2
  });
  const bodyMat2 = new THREE.MeshStandardMaterial({
    color: secondary, metalness: 0.5, roughness: 0.3,
    envMapIntensity: 0.8
  });
  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x111111, metalness: 0.35, roughness: 0.65
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc, metalness: 0.95, roughness: 0.05,
    envMapIntensity: 1.5
  });
  const tyreMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.96 });

  // Main chassis body
  const bodyGeo = new THREE.BoxGeometry(0.5, 0.18, 4.2);
  const pos = bodyGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const z = pos.getZ(i);
    const x = pos.getX(i);
    if (z < -1.5) {
      const t = (z + 2.1) / 0.6;
      pos.setX(i, x * (0.25 + 0.75 * Math.max(0, t)));
    }
    if (z > 1.2) {
      const t = (2.1 - z) / 0.9;
      pos.setX(i, x * (0.45 + 0.55 * Math.max(0, t)));
    }
  }
  pos.needsUpdate = true;
  bodyGeo.computeVertexNormals();
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.18;
  car.add(body);

  // Nose cone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.8, 8), bodyMat);
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, 0.14, -2.5);
  car.add(nose);

  // Front wing
  const fw = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.012, 0.35), bodyMat);
  fw.position.set(0, 0.06, -2.35);
  car.add(fw);
  for (let i = 0; i < 3; i++) {
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.008, 0.05), bodyMat2);
    flap.position.set(0.42, 0.08 + i * 0.018, -2.28 + i * 0.04);
    car.add(flap);
    const flapR = flap.clone();
    flapR.position.x = -0.42;
    car.add(flapR);
  }
  [-0.85, 0.85].forEach(x => {
    const ep = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.1, 0.4), bodyMat2);
    ep.position.set(x, 0.1, -2.35);
    car.add(ep);
  });

  // Sidepods
  [-1, 1].forEach(side => {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.14, 1.35), bodyMat);
    sp.position.set(side * 0.38, 0.22, 0.1);
    car.add(sp);
  });

  // Engine cover + airbox
  const ec = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 1.6), bodyMat);
  ec.position.set(0, 0.32, 0.6);
  car.add(ec);
  const airbox = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.24, 0.18), carbonMat);
  airbox.position.set(0, 0.48, -0.2);
  car.add(airbox);

  // Halo
  const haloGeo = new THREE.TorusGeometry(0.17, 0.015, 8, 24, Math.PI);
  const halo = new THREE.Mesh(haloGeo, metalMat);
  halo.rotation.set(0, Math.PI, 0);
  halo.position.set(0, 0.38, -0.5);
  car.add(halo);
  const strut = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.015, 0.34), metalMat);
  strut.position.set(0, 0.38, -0.5);
  car.add(strut);

  // Cockpit
  const cockpit = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.04, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x030303, roughness: 0.9 })
  );
  cockpit.position.set(0, 0.3, -0.5);
  car.add(cockpit);

  // Rear wing
  const rw = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.012, 0.16), bodyMat);
  rw.position.set(0, 0.6, 1.85);
  car.add(rw);
  const rwFlap = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.008, 0.08), bodyMat2);
  rwFlap.position.set(0, 0.65, 1.82);
  car.add(rwFlap);
  [-0.35, 0.35].forEach(x => {
    const ep = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.26, 0.22), bodyMat);
    ep.position.set(x, 0.52, 1.85);
    car.add(ep);
  });
  [-0.14, 0.14].forEach(x => {
    const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.28, 0.015), carbonMat);
    pylon.position.set(x, 0.42, 1.85);
    car.add(pylon);
  });

  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.01, 3.8), carbonMat);
  floor.position.set(0, 0.04, -0.1);
  car.add(floor);

  // Diffuser
  const diff = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.1, 0.18), carbonMat);
  diff.position.set(0, 0.1, 2.0);
  diff.rotation.x = 0.3;
  car.add(diff);

  // Wheels + Tyres
  const wheelData = [
    { x: -0.62, z: -1.4, rTyre: 0.165, rRim: 0.1, w: 0.06 },
    { x: 0.62, z: -1.4, rTyre: 0.165, rRim: 0.1, w: 0.06 },
    { x: -0.64, z: 1.3, rTyre: 0.19, rRim: 0.12, w: 0.07 },
    { x: 0.64, z: 1.3, rTyre: 0.19, rRim: 0.12, w: 0.07 },
  ];
  wheelData.forEach(wd => {
    const wg = new THREE.Group();
    const tyre = new THREE.Mesh(new THREE.TorusGeometry(wd.rTyre, wd.w, 12, 24), tyreMat);
    tyre.rotation.y = Math.PI / 2;
    wg.add(tyre);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(wd.rRim, wd.rRim, wd.w * 1.4, 16), metalMat);
    rim.rotation.z = Math.PI / 2;
    wg.add(rim);
    wg.position.set(wd.x, wd.rTyre + 0.02, wd.z);
    car.add(wg);
  });

  // Suspension arms
  wheelData.forEach(wd => {
    const armGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.32, 6);
    const arm = new THREE.Mesh(armGeo, metalMat);
    arm.rotation.z = Math.PI / 2;
    arm.position.set(wd.x * 0.6, wd.rTyre + 0.04, wd.z);
    car.add(arm);
  });

  car.scale.set(1.2, 1.2, 1.2);
  return car;
}

// ============================================================
// HERO SCENE SETUP
// ============================================================
function setupHeroScene() {
  heroScene = new THREE.Scene();
  heroScene.fog = new THREE.FogExp2(0x000000, 0.015);

  heroCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  heroCamera.position.set(0, 30, 0);
  heroCamera.lookAt(0, 0, 0);

  // Lighting — cinematic three-point
  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4);
  heroScene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffeedd, 1.8);
  keyLight.position.set(5, 12, -5);
  keyLight.castShadow = false;
  heroScene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x4488cc, 0.5);
  fillLight.position.set(-5, 5, 5);
  heroScene.add(fillLight);

  const rimLight = new THREE.PointLight(0xE8002D, 3, 25);
  rimLight.position.set(0, 2, 10);
  heroScene.add(rimLight);

  // Secondary rim for depth
  const rimLight2 = new THREE.PointLight(0x0067FF, 1.5, 15);
  rimLight2.position.set(-3, 1, -5);
  heroScene.add(rimLight2);

  // Track
  const trackGeo = new THREE.PlaneGeometry(30, 200, 80, 80);
  // Add subtle vertex displacement for asphalt texture feel
  const trackPos = trackGeo.attributes.position;
  for (let i = 0; i < trackPos.count; i++) {
    trackPos.setZ(i, trackPos.getZ(i) + (Math.random() - 0.5) * 0.005);
  }
  trackPos.needsUpdate = true;
  trackGeo.computeVertexNormals();

  const trackMat = new THREE.MeshStandardMaterial({
    color: 0x161616,
    roughness: 0.88,
    metalness: 0.08,
  });
  trackMesh = new THREE.Mesh(trackGeo, trackMat);
  trackMesh.rotation.x = -Math.PI / 2;
  trackMesh.position.y = 0;
  heroScene.add(trackMesh);

  // Track markings — center dashed line
  for (let z = -100; z < 100; z += 3) {
    const dashGeo = new THREE.PlaneGeometry(0.08, 1.2);
    const dashMat = new THREE.MeshBasicMaterial({ color: 0x282828 });
    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(0, 0.005, z);
    heroScene.add(dash);
  }

  // Kerb stripes — improved with alternating red/white
  [-4.8, 4.8].forEach(x => {
    for (let z = -100; z < 100; z += 1.5) {
      const kerbGeo = new THREE.PlaneGeometry(0.45, 0.6);
      const isRed = Math.floor(z / 1.5) % 2 === 0;
      const kerbMat = new THREE.MeshStandardMaterial({
        color: isRed ? 0xE8002D : 0xf5f5f5,
        roughness: 0.7,
        metalness: 0.1,
      });
      const kerb = new THREE.Mesh(kerbGeo, kerbMat);
      kerb.rotation.x = -Math.PI / 2;
      kerb.position.set(x, 0.006, z);
      heroScene.add(kerb);
    }
  });

  // Track edge lines
  [-4.2, 4.2].forEach(x => {
    const lineGeo = new THREE.PlaneGeometry(0.06, 200);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(x, 0.005, 0);
    heroScene.add(line);
  });

  // F1 Car — starts Ferrari red
  carMesh = createF1Car('#E8002D', '#FFFFFF');
  carMesh.position.set(0, 50, 0);
  carMesh.rotation.y = Math.PI;
  heroScene.add(carMesh);

  // Enhanced spark particles — 3000
  const sparkCount = 3000;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkVelocities = new Float32Array(sparkCount * 3);
  const sparkAges = new Float32Array(sparkCount);
  const sparkColors = new Float32Array(sparkCount * 3);
  const sparkSizes = new Float32Array(sparkCount);

  for (let i = 0; i < sparkCount; i++) {
    sparkPositions[i * 3] = 0;
    sparkPositions[i * 3 + 1] = -100;
    sparkPositions[i * 3 + 2] = 0;
    sparkAges[i] = 1.0;
    sparkSizes[i] = Math.random() * 0.08 + 0.02;
  }

  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
  sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

  const sparkMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  sparkParticles = new THREE.Points(sparkGeo, sparkMat);
  sparkParticles._velocities = sparkVelocities;
  sparkParticles._ages = sparkAges;
  sparkParticles._count = sparkCount;
  heroScene.add(sparkParticles);

  // Post-processing pipeline
  heroComposer = new EffectComposer(renderer);
  heroComposer.addPass(new RenderPass(heroScene, heroCamera));

  // Bloom — cinematic threshold
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.6, 0.35, 0.88
  );
  heroComposer.addPass(bloomPass);

  // Custom chromatic aberration + vignette + film grain + shockwave
  const postShader = {
    uniforms: {
      tDiffuse: { value: null },
      uIntensity: { value: 0.0 },
      uVignette: { value: 0.35 },
      uTime: { value: 0 },
      uShockwave: { value: 0.0 },
      uShockCenter: { value: new THREE.Vector2(0.5, 0.5) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float uIntensity;
      uniform float uVignette;
      uniform float uTime;
      uniform float uShockwave;
      uniform vec2 uShockCenter;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;

        // Shockwave displacement
        if (uShockwave > 0.0) {
          float dist = distance(uv, uShockCenter);
          float ring = smoothstep(uShockwave - 0.05, uShockwave, dist) *
                       smoothstep(uShockwave + 0.05, uShockwave, dist);
          uv += normalize(uv - uShockCenter) * ring * 0.02;
        }

        vec2 center = uv - 0.5;
        float dist = length(center);

        // Chromatic aberration — velocity-driven
        float caStr = uIntensity * 0.015;
        float r = texture2D(tDiffuse, uv + center * caStr).r;
        float g = texture2D(tDiffuse, uv).g;
        float b = texture2D(tDiffuse, uv - center * caStr).b;
        vec3 color = vec3(r, g, b);

        // Vignette — darker edges
        float vig = 1.0 - smoothstep(0.25, 0.85, dist * (1.0 + uVignette * 0.8));
        color *= mix(0.85, 1.0, vig);

        // Film grain — subtle animated
        float grain = fract(sin(dot(vUv * (uTime * 80.0 + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
        color += (grain - 0.5) * 0.025;

        // Subtle color grade — slightly warm highlights, cool shadows
        color.r *= 1.02;
        color.b *= 0.98;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  };
  const postPass = new ShaderPass(postShader);
  heroComposer.addPass(postPass);
  heroComposer._postPass = postPass;
}

// ============================================================
// HERO SCENE ANIMATION — Cinematic camera choreography
// ============================================================
function updateHeroScene(progress, time, velocity) {
  heroProgress = progress;
  const vel = Math.min(velocity / 12, 1);

  // Update post-processing uniforms
  if (heroComposer._postPass) {
    heroComposer._postPass.uniforms.uIntensity.value = vel * 4;
    heroComposer._postPass.uniforms.uVignette.value = 0.3 + vel * 0.6;
    heroComposer._postPass.uniforms.uTime.value = time;

    // Shockwave decay
    if (shockwaveActive) {
      const sw = (time - shockwaveStartTime) * 0.8;
      if (sw > 1.5) {
        shockwaveActive = false;
        heroComposer._postPass.uniforms.uShockwave.value = 0;
      } else {
        heroComposer._postPass.uniforms.uShockwave.value = sw;
      }
    }
  }

  // Camera + car animation phases
  if (progress < 0.08) {
    // Phase 1: Dark void, coordinates visible
    heroCamera.position.set(0, 30, 0);
    heroCamera.lookAt(0, 0, 0);
    carMesh.position.y = 55;
    heroScene.fog.density = 0.1;
  } else if (progress < 0.28) {
    // Phase 2: Dawn — scene brighten, track emerges
    const t = (progress - 0.08) / 0.2;
    const eased = 1 - Math.pow(1 - t, 2);
    heroScene.fog.density = 0.1 - eased * 0.08;
    heroCamera.position.set(
      Math.sin(t * 0.3) * 1.5,
      30 - eased * 6,
      eased * 5
    );
    heroCamera.lookAt(0, 0, 0);
    carMesh.position.y = 55 - eased * 12;
  } else if (progress < 0.52) {
    // Phase 3: THE DROP — car falls with velocity blur
    const t = (progress - 0.28) / 0.24;
    const eased = 1 - Math.pow(1 - t, 4); // aggressive ease out
    carMesh.position.y = 43 - eased * 42.7;
    heroScene.fog.density = 0.02;

    // Camera transitions from top-down to angled
    const camT = Math.min(t * 1.2, 1);
    heroCamera.position.set(
      Math.sin(camT * 0.6) * 4,
      24 - camT * 19,
      camT * 9
    );
    heroCamera.lookAt(carMesh.position.x, Math.max(carMesh.position.y, 0.5), carMesh.position.z);

    // Trigger shockwave on impact
    if (t > 0.92 && !shockwaveActive) {
      shockwaveActive = true;
      shockwaveStartTime = time;
      if (heroComposer._postPass) {
        heroComposer._postPass.uniforms.uShockCenter.value.set(0.5, 0.5);
      }
      audio.playImpact();
      emitSparks(new THREE.Vector3(0, 0.1, 0), 120);
    }

    // Spark emission during fall
    if (t > 0.85) {
      emitSparks(carMesh.position, 30);
    }
  } else if (progress < 0.62) {
    // Phase 4: Camera snap to chase position
    const t = (progress - 0.52) / 0.1;
    carMesh.position.y = 0.3;
    const targetPos = new THREE.Vector3(0, 2.2, 7.5);
    heroCamera.position.lerp(targetPos, 0.06 + t * 0.12);
    heroCamera.lookAt(0, 0.5, -6);
    heroScene.fog.density = 0.012;
  } else {
    // Phase 5: Speed run — acceleration feel
    const t = (progress - 0.62) / 0.38;
    carMesh.position.y = 0.3;

    // Camera chase with subtle breathing motion
    heroCamera.position.set(
      Math.sin(time * 0.4) * 0.25,
      2.0 + Math.sin(time * 0.25) * 0.08,
      6.5 - t * 0.5
    );
    heroCamera.lookAt(0, 0.4, -6);
    heroScene.fog.density = 0.008;

    // Speed-line track scroll
    trackMesh.position.z = (t * 60) % 2;

    // Emit speed sparks based on velocity
    if (vel > 0.03) {
      emitSparks(new THREE.Vector3(
        (Math.random() - 0.5) * 0.7,
        0.03,
        carMesh.position.z + 2.2
      ), Math.floor(vel * 12));
    }
  }

  // Update HUD
  const hud = document.getElementById('hero-hud');
  const speedEl = document.getElementById('speed-value');
  const gearEl = document.getElementById('gear-value');
  const throttleBar = document.getElementById('throttle-bar');
  const brakeBar = document.getElementById('brake-bar');
  const drs = document.getElementById('drs-indicator');
  const scrollHint = document.getElementById('scroll-hint');

  if (progress > 0.28) {
    hud.classList.add('visible');
    scrollHint.style.opacity = '0';
    const speed = Math.round(progress > 0.52 ? ((progress - 0.52) / 0.48) * 340 : 0);
    speedEl.textContent = speed;
    const gear = speed < 30 ? 'N' : speed < 80 ? '1' : speed < 130 ? '2' :
                 speed < 170 ? '3' : speed < 210 ? '4' : speed < 260 ? '5' :
                 speed < 300 ? '6' : speed < 330 ? '7' : '8';
    gearEl.textContent = gear;

    const throttle = progress > 0.52 ? Math.min((progress - 0.52) / 0.18 * 100, 100) : 0;
    throttleBar.style.width = throttle + '%';
    brakeBar.style.width = (progress > 0.92 ? (progress - 0.92) / 0.08 * 85 : 0) + '%';

    if (progress > 0.75) drs.classList.add('active');
    else drs.classList.remove('active');
  } else {
    hud.classList.remove('visible');
  }

  // Rotate wheels
  carMesh.children.forEach(child => {
    if (child.children && child.children.length > 0) {
      child.rotation.x += vel * 0.6;
    }
  });

  updateSparks();
}

// ============================================================
// SPARK PARTICLE SYSTEM — Enhanced
// ============================================================
let sparkEmitIndex = 0;

function emitSparks(pos, count) {
  const positions = sparkParticles.geometry.attributes.position.array;
  const velocities = sparkParticles._velocities;
  const ages = sparkParticles._ages;
  const total = sparkParticles._count;

  for (let i = 0; i < count; i++) {
    const idx = (sparkEmitIndex++) % total;
    const i3 = idx * 3;
    positions[i3] = pos.x + (Math.random() - 0.5) * 0.4;
    positions[i3 + 1] = pos.y + Math.random() * 0.25;
    positions[i3 + 2] = pos.z + (Math.random() - 0.5) * 0.4;

    // Radial outward + upward velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.1 + Math.random() * 0.25;
    velocities[i3] = Math.cos(angle) * speed;
    velocities[i3 + 1] = Math.random() * 0.2 + 0.04;
    velocities[i3 + 2] = Math.sin(angle) * speed;
    ages[idx] = 0;
  }
}

function updateSparks() {
  const positions = sparkParticles.geometry.attributes.position.array;
  const colors = sparkParticles.geometry.attributes.color.array;
  const velocities = sparkParticles._velocities;
  const ages = sparkParticles._ages;
  const total = sparkParticles._count;

  for (let i = 0; i < total; i++) {
    if (ages[i] >= 1) continue;
    ages[i] += 0.018;
    const i3 = i * 3;
    positions[i3] += velocities[i3];
    positions[i3 + 1] += velocities[i3 + 1];
    positions[i3 + 2] += velocities[i3 + 2];
    velocities[i3] *= 0.94;
    velocities[i3 + 1] -= 0.004;
    velocities[i3 + 2] *= 0.94;

    // Color: white-hot → orange → dark red → fade
    const age = ages[i];
    colors[i3] = 1.0;
    colors[i3 + 1] = Math.max(0, 0.85 - age * 1.0);
    colors[i3 + 2] = Math.max(0, 0.35 - age * 0.6);

    if (ages[i] >= 1) {
      positions[i3 + 1] = -100;
    }
  }
  sparkParticles.geometry.attributes.position.needsUpdate = true;
  sparkParticles.geometry.attributes.color.needsUpdate = true;
}

// ============================================================
// GLOBE SCENE — Enhanced with continents outline
// ============================================================
function setupGlobeScene() {
  globeScene = new THREE.Scene();
  globeCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  globeCamera.position.set(0, 2, 12);
  globeCamera.lookAt(0, 0, 0);

  globeScene.add(new THREE.AmbientLight(0x223355, 0.5));
  const dirLight = new THREE.DirectionalLight(0x7788bb, 1.5);
  dirLight.position.set(5, 3, 5);
  globeScene.add(dirLight);

  // Earth — dark globe with subtle surface
  const earthGeo = new THREE.SphereGeometry(4, 64, 64);
  const earthMat = new THREE.MeshStandardMaterial({
    color: 0x080818,
    wireframe: false,
    metalness: 0.25,
    roughness: 0.75,
  });
  globeMesh = new THREE.Mesh(earthGeo, earthMat);
  globeScene.add(globeMesh);

  // Wireframe overlay — subtle grid
  const wireGeo = new THREE.SphereGeometry(4.01, 40, 40);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x1a2a5e,
    wireframe: true,
    transparent: true,
    opacity: 0.1,
  });
  globeScene.add(new THREE.Mesh(wireGeo, wireMat));

  // Latitude lines
  const gridMat = new THREE.LineBasicMaterial({ color: 0x152a5e, transparent: true, opacity: 0.15 });
  for (let lat = -60; lat <= 60; lat += 30) {
    const points = [];
    const phi = (90 - lat) * Math.PI / 180;
    for (let lng = 0; lng <= 360; lng += 4) {
      const theta = lng * Math.PI / 180;
      points.push(new THREE.Vector3(
        4.02 * Math.sin(phi) * Math.cos(theta),
        4.02 * Math.cos(phi),
        4.02 * Math.sin(phi) * Math.sin(theta)
      ));
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    globeScene.add(new THREE.Line(lineGeo, gridMat));
  }

  // Atmosphere — Fresnel glow
  const atmosGeo = new THREE.SphereGeometry(4.35, 48, 48);
  const atmosMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float fresnel = pow(1.0 - dot(vNormal, vViewDir), 3.5);
        gl_FragColor = vec4(0.15, 0.35, 1.0, fresnel * 0.45);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
  });
  atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
  globeScene.add(atmosphereMesh);

  // Race location pins — enhanced with glow
  const pinPositions = [];
  RACES.forEach(race => {
    const phi = (90 - race.lat) * Math.PI / 180;
    const theta = (race.lng + 180) * Math.PI / 180;
    const r = 4.05;
    pinPositions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  });
  const pinGeo = new THREE.BufferGeometry();
  pinGeo.setAttribute('position', new THREE.Float32BufferAttribute(pinPositions, 3));
  const pinMat = new THREE.PointsMaterial({
    color: 0xE8002D,
    size: 0.18,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  racePins = new THREE.Points(pinGeo, pinMat);
  globeScene.add(racePins);

  // Glow ring around pins
  const glowPinMat = new THREE.PointsMaterial({
    color: 0xE8002D,
    size: 0.35,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glowPins = new THREE.Points(pinGeo.clone(), glowPinMat);
  globeScene.add(glowPins);
}

// ============================================================
// OUTRO SCENE — Star field with twinkle
// ============================================================
function setupOutroScene() {
  outroScene = new THREE.Scene();
  outroCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
  outroCamera.position.set(0, 0, 5);

  const starCount = 15000;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const r = 40 + Math.random() * 200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i * 3 + 2] = r * Math.cos(phi);

    // Slight warmth variation
    const warmth = 0.85 + Math.random() * 0.15;
    starColors[i * 3] = warmth;
    starColors[i * 3 + 1] = warmth;
    starColors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 0.6,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
  });
  starField = new THREE.Points(starGeo, starMat);
  outroScene.add(starField);

  // Red nebula glow
  const nebulaGeo = new THREE.SphereGeometry(30, 16, 16);
  const nebulaMat = new THREE.MeshBasicMaterial({
    color: 0xE8002D,
    transparent: true,
    opacity: 0.015,
    side: THREE.BackSide,
  });
  outroScene.add(new THREE.Mesh(nebulaGeo, nebulaMat));
}

// ============================================================
// CAR CAROUSEL — 10 Team Cars
// ============================================================
function initCarCarousel() {
  const track = document.getElementById('carousel-track');
  TEAMS.forEach((team, i) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.style.setProperty('--team-color', team.color);
    card.style.setProperty('--team-color-rgb', team.rgb);
    card.innerHTML = `
      <div class="car-card-visual">
        <div class="car-silhouette">${String(i + 1).padStart(2, '0')}</div>
      </div>
      <div class="car-card-info">
        <div class="car-team-name">${team.name}</div>
        <div class="car-name">${team.car}</div>
        <div class="car-drivers">
          ${team.drivers.map(d => `<span class="car-driver-chip">${d}</span>`).join('')}
        </div>
      </div>
      <div class="car-card-stats">
        <div class="stat-item"><span class="stat-label">ENGINE</span><span class="stat-value">${team.engine}</span></div>
        <div class="stat-item"><span class="stat-label">POINTS</span><span class="stat-value">${team.points}</span></div>
      </div>
    `;
    track.appendChild(card);
  });

  // Calculate total width after DOM is ready
  requestAnimationFrame(() => {
    const totalWidth = track.scrollWidth - window.innerWidth;
    if (totalWidth > 0) {
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: '#car-carousel',
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });
    }
  });

  // Animate car names — SplitText-style character reveal
  track.querySelectorAll('.car-name').forEach(name => {
    const text = name.textContent;
    name.innerHTML = text.split('').map(c =>
      `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`
    ).join('');
    gsap.from(name.querySelectorAll('.char'), {
      y: 45, rotateX: -90, opacity: 0,
      stagger: 0.025, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: name, start: 'top 85%' }
    });
  });
}

// ============================================================
// DRIVER PROFILES — Holographic Cards with rainbow refraction
// ============================================================
function initDriverProfiles() {
  const grid = document.getElementById('drivers-grid');
  const maxPts = Math.max(...DRIVERS.map(d => d.pts));

  DRIVERS.forEach(driver => {
    const team = TEAMS.find(t => t.id === driver.team);
    const card = document.createElement('div');
    card.className = 'driver-card';
    card.style.setProperty('--team-color', team.color);
    card.style.setProperty('--team-color-rgb', team.rgb);

    const ptsPercent = maxPts > 0 ? (driver.pts / maxPts * 100) : 0;
    card.innerHTML = `
      <div class="driver-card-inner">
        <div class="driver-card-accent"></div>
        <div class="driver-number-watermark">${driver.num}</div>
        <div class="driver-portrait">
          <div class="driver-portrait-placeholder"></div>
        </div>
        <div class="driver-info">
          <div class="driver-name">${driver.name.toUpperCase()}</div>
          <div class="driver-team">${team.name}</div>
          <div class="driver-stats">
            <div class="driver-stat"><span class="driver-stat-value">${driver.wins}</span><span class="driver-stat-label">WINS</span></div>
            <div class="driver-stat"><span class="driver-stat-value">${driver.poles}</span><span class="driver-stat-label">POLES</span></div>
            <div class="driver-stat"><span class="driver-stat-value">${driver.pts}</span><span class="driver-stat-label">PTS</span></div>
            <div class="driver-stat"><span class="driver-stat-value">${driver.fl}</span><span class="driver-stat-label">FL</span></div>
          </div>
        </div>
        <svg class="driver-points-arc" width="48" height="48" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(61,61,61,0.3)" stroke-width="1.5"/>
          <circle cx="25" cy="25" r="20" fill="none" stroke="${team.color}" stroke-width="2"
            stroke-dasharray="${ptsPercent * 1.26} 126"
            stroke-dashoffset="31.5" stroke-linecap="round"
            style="transition: stroke-dasharray 1.2s cubic-bezier(0.16, 1, 0.3, 1)"/>
        </svg>
      </div>
    `;
    grid.appendChild(card);

    // Holographic tilt effect
    const inner = card.querySelector('.driver-card-inner');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      inner.style.setProperty('--tilt-x', `${y * -18}deg`);
      inner.style.setProperty('--tilt-y', `${x * 18}deg`);
      inner.style.setProperty('--shine-x', `${(x + 0.5) * 100}%`);
      inner.style.setProperty('--shine-y', `${(y + 0.5) * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      inner.style.setProperty('--tilt-x', '0deg');
      inner.style.setProperty('--tilt-y', '0deg');
      inner.style.setProperty('--shine-x', '50%');
      inner.style.setProperty('--shine-y', '50%');
    });
  });

  // Staggered scroll reveal
  gsap.utils.toArray('.driver-card').forEach((card, i) => {
    gsap.from(card, {
      y: 70, opacity: 0, scale: 0.88,
      duration: 0.7, delay: (i % 4) * 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%' }
    });
  });
}

// ============================================================
// RACE CALENDAR — Globe + Cards
// ============================================================
function initGlobeCalendar() {
  const list = document.getElementById('race-list');
  RACES.forEach((race, i) => {
    const card = document.createElement('div');
    card.className = 'race-card';
    card.innerHTML = `
      <div class="race-round">${String(i + 1).padStart(2, '0')}</div>
      <div class="race-info">
        <h3>${race.name.toUpperCase()}</h3>
        <div class="race-location">${race.loc.toUpperCase()}</div>
        <div class="race-details">
          <span class="race-detail">${race.laps} LAPS</span>
          <span class="race-detail">${race.len}</span>
          <span class="race-detail">${race.corners} CORNERS</span>
        </div>
      </div>
      <div class="race-date">${race.date}</div>
    `;
    list.appendChild(card);

    gsap.from(card, {
      x: -30, opacity: 0, duration: 0.5,
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        onEnter: () => {
          if (globeMesh) {
            const targetRotY = -race.lng * Math.PI / 180;
            const targetRotX = -race.lat * Math.PI / 180 * 0.5;
            gsap.to(globeMesh.rotation, {
              y: targetRotY, x: targetRotX,
              duration: 1.6, ease: 'power2.inOut'
            });
          }
        }
      }
    });
  });
}

// ============================================================
// TELEMETRY DASHBOARD — Enhanced with draggable cursor
// ============================================================
function initTelemetry() {
  const dash = document.getElementById('telemetry-dashboard');

  const channels = [
    { name: 'SPEED', unit: 'KM/H', color: '#0067FF', max: 340 },
    { name: 'THROTTLE', unit: '%', color: '#52E252', max: 100 },
    { name: 'BRAKE', unit: '%', color: '#E8002D', max: 100 },
    { name: 'GEAR', unit: '', color: '#FF9B00', max: 8 },
    { name: 'LATERAL G', unit: 'G', color: '#00D2BE', max: 5 },
  ];

  // Generate realistic telemetry data
  channels.forEach(ch => {
    const points = 120;
    const data = [];
    let val = ch.max * 0.3;
    for (let i = 0; i < points; i++) {
      const noise = (Math.random() - 0.48) * ch.max * 0.12;
      val += noise;
      // Clamp with smooth bounds
      val = Math.max(ch.max * 0.02, Math.min(ch.max * 0.98, val));
      data.push(val);
    }
    ch.data = data;
  });

  // Track mini-map
  const trackSvg = `
    <svg viewBox="0 0 300 200" width="100%" height="100%">
      <path d="M50 150 Q30 150 30 130 L30 70 Q30 50 50 50 L100 50 Q120 50 130 35 L160 35 Q180 35 190 50 L250 50 Q270 50 270 70 L270 130 Q270 150 250 150 L200 150 Q180 150 170 140 L130 140 Q120 150 100 150 Z"
        fill="none" stroke="rgba(61,61,61,0.5)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50 150 Q30 150 30 130 L30 70 Q30 50 50 50 L100 50 Q120 50 130 35 L160 35 Q180 35 190 50 L250 50 Q270 50 270 70 L270 130 Q270 150 250 150 L200 150 Q180 150 170 140 L130 140 Q120 150 100 150 Z"
        fill="none" stroke="rgba(61,61,61,0.2)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle id="telemetry-dot" cx="50" cy="150" r="5" fill="#E8002D">
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="150" r="10" fill="none" stroke="#E8002D" opacity="0.2">
        <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
  const trackDiv = document.createElement('div');
  trackDiv.className = 'telemetry-track-mini';
  trackDiv.innerHTML = trackSvg;
  dash.appendChild(trackDiv);

  // Channel charts
  channels.forEach(ch => {
    const div = document.createElement('div');
    div.className = 'telemetry-channel';
    const chartW = 1000, chartH = 70;
    const points = ch.data.map((v, i) =>
      `${(i / (ch.data.length - 1)) * chartW},${chartH - (v / ch.max) * (chartH - 4) - 2}`
    ).join(' ');

    const pathLen = ch.data.length * 10;

    // Create gradient area fill path
    const areaPoints = `0,${chartH} ${points} ${chartW},${chartH}`;

    div.innerHTML = `
      <div class="channel-header">
        <span class="channel-name" style="color:${ch.color}">${ch.name}</span>
        <span class="channel-value" style="color:${ch.color}">${ch.data[ch.data.length - 1].toFixed(ch.name === 'GEAR' ? 0 : 1)} ${ch.unit}</span>
      </div>
      <div class="channel-chart">
        <svg viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-${ch.name}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${ch.color}" stop-opacity="0.15"/>
              <stop offset="100%" stop-color="${ch.color}" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <polygon points="${areaPoints}" fill="url(#grad-${ch.name})" opacity="0.6"/>
          <polyline points="${points}" stroke="${ch.color}" stroke-dasharray="${pathLen}" stroke-dashoffset="${pathLen}" class="telemetry-line"/>
        </svg>
      </div>
    `;
    dash.appendChild(div);

    // Animate stroke on scroll
    gsap.to(div.querySelector('.telemetry-line'), {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: div, start: 'top 82%' }
    });
  });
}

// ============================================================
// SPEED WALL — Radial polar plot data art
// ============================================================
function initSpeedWall() {
  const grid = document.getElementById('speed-wall-grid');

  RACES.forEach((race, idx) => {
    const div = document.createElement('div');
    div.className = 'speed-rose';
    div.style.setProperty('--team-color-rgb', TEAMS[idx % TEAMS.length].rgb);

    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 220;
    div.appendChild(canvas);

    const label = document.createElement('div');
    label.className = 'speed-rose-label';
    label.textContent = race.loc.toUpperCase();
    div.appendChild(label);
    grid.appendChild(div);

    // Generate corner speeds
    const cornerSpeeds = [];
    for (let c = 0; c < race.corners; c++) {
      cornerSpeeds.push(70 + Math.random() * 220);
    }

    function drawRose(hoverColor = null, animProgress = 1) {
      const ctx = canvas.getContext('2d');
      const cx = 110, cy = 110, maxR = 90;
      ctx.clearRect(0, 0, 220, 220);

      // Background rings
      for (let r = 22; r <= maxR; r += 22) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,245,245,0.035)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Radial lines
      for (let i = 0; i < race.corners; i++) {
        const angle = (i / race.corners) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
        ctx.strokeStyle = 'rgba(245,245,245,0.02)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Rose petals — smooth curve
      ctx.beginPath();
      const drawCorners = Math.floor(cornerSpeeds.length * animProgress);
      for (let i = 0; i <= drawCorners; i++) {
        const angle = (i / race.corners) * Math.PI * 2 - Math.PI / 2;
        const r = (cornerSpeeds[i % cornerSpeeds.length] / 300) * maxR;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      if (animProgress >= 1) ctx.closePath();

      // Fill
      const fillColor = hoverColor || 'rgba(245,245,245,0.04)';
      if (hoverColor) {
        ctx.fillStyle = hoverColor + '18'; // hex alpha
      } else {
        ctx.fillStyle = fillColor;
      }
      ctx.fill();

      // Stroke
      ctx.strokeStyle = hoverColor || 'rgba(245,245,245,0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Corner dots
      for (let i = 0; i <= drawCorners && i < cornerSpeeds.length; i++) {
        const angle = (i / race.corners) * Math.PI * 2 - Math.PI / 2;
        const r = (cornerSpeeds[i] / 300) * maxR;
        ctx.beginPath();
        ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 2.5, 0, Math.PI * 2);
        ctx.fillStyle = hoverColor || '#666';
        ctx.fill();
      }
    }

    drawRose();

    const teamColor = TEAMS[idx % TEAMS.length].color;
    div.addEventListener('mouseenter', () => drawRose(teamColor));
    div.addEventListener('mouseleave', () => drawRose());

    gsap.from(div, {
      scale: 0.6, opacity: 0, duration: 0.5,
      delay: (idx % 6) * 0.04,
      scrollTrigger: { trigger: div, start: 'top 92%' }
    });
  });
}

// ============================================================
// CONSTRUCTOR STANDINGS — Animated bars
// ============================================================
function initConstructorStandings() {
  const container = document.getElementById('standings-container');
  const sorted = [...TEAMS].sort((a, b) => b.points - a.points);
  const maxPts = sorted[0].points;

  sorted.forEach((team, i) => {
    const row = document.createElement('div');
    row.className = 'standing-row';
    row.style.setProperty('--team-color', team.color);
    row.style.setProperty('--team-color-rgb', team.rgb);
    const barWidth = (team.points / maxPts * 100).toFixed(1);
    row.innerHTML = `
      <div class="standing-pos">${i + 1}</div>
      <div class="standing-team" style="color:${team.color}">${team.name}</div>
      <div class="standing-bar-container">
        <div class="standing-bar" data-width="${barWidth}" style="background: linear-gradient(90deg, ${team.color}, ${team.color}aa)"></div>
      </div>
      <div class="standing-points">${team.points}</div>
    `;
    container.appendChild(row);

    const bar = row.querySelector('.standing-bar');
    gsap.to(bar, {
      width: barWidth + '%',
      duration: 1.6,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 88%' }
    });

    gsap.from(row, {
      x: -40, opacity: 0, duration: 0.6,
      delay: i * 0.07,
      scrollTrigger: { trigger: row, start: 'top 92%' }
    });
  });
}

// ============================================================
// PIT STOP GAME — Enhanced
// ============================================================
function initPitStopGame() {
  const sequence = ['FL', 'FR', 'RL', 'RR'];
  let gameState = 'idle';
  let currentStep = 0;
  let startTime = 0;
  let timerInterval = null;
  let bestTimes = JSON.parse(localStorage.getItem('f1_pitstop_times') || '[]');

  const timeEl = document.getElementById('pitstop-time');
  const startBtn = document.getElementById('pitstop-start');
  const retryBtn = document.getElementById('pitstop-retry');
  const resultDiv = document.getElementById('pitstop-result');
  const resultTime = document.getElementById('result-time');
  const resultMsg = document.getElementById('result-message');
  const instructionsEl = document.getElementById('pitstop-instructions');

  function updateLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    bestTimes.sort((a, b) => a - b).slice(0, 10).forEach((t, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="lb-rank">#${i + 1}</span><span class="lb-time">${t.toFixed(2)}s</span>`;
      list.appendChild(li);
    });
  }
  updateLeaderboard();

  function resetTyres() {
    sequence.forEach(pos => {
      const tyre = document.getElementById(`tyre-${pos}`);
      tyre.classList.remove('done', 'active', 'waiting');
    });
  }

  function highlightNext() {
    sequence.forEach((pos, i) => {
      const tyre = document.getElementById(`tyre-${pos}`);
      tyre.classList.remove('active', 'waiting', 'done');
      if (i < currentStep) tyre.classList.add('done');
      else if (i === currentStep) tyre.classList.add('active');
      else tyre.classList.add('waiting');
    });
  }

  function startGame() {
    gameState = 'running';
    currentStep = 0;
    startTime = performance.now();
    resultDiv.style.display = 'none';
    startBtn.style.display = 'none';
    instructionsEl.querySelector('p').textContent = `CHANGE TYRE: ${sequence[0]}`;
    highlightNext();

    timerInterval = setInterval(() => {
      const elapsed = (performance.now() - startTime) / 1000;
      timeEl.textContent = elapsed.toFixed(2);
    }, 16);
  }

  function completeTyre(pos) {
    if (gameState !== 'running') return;
    if (pos !== sequence[currentStep]) return;

    audio.playClick();
    currentStep++;
    if (currentStep >= sequence.length) {
      endGame();
    } else {
      instructionsEl.querySelector('p').textContent = `CHANGE TYRE: ${sequence[currentStep]}`;
      highlightNext();
    }
  }

  function endGame() {
    gameState = 'done';
    clearInterval(timerInterval);
    const finalTime = (performance.now() - startTime) / 1000;
    timeEl.textContent = finalTime.toFixed(2);

    sequence.forEach(pos => document.getElementById(`tyre-${pos}`).classList.add('done'));

    bestTimes.push(finalTime);
    localStorage.setItem('f1_pitstop_times', JSON.stringify(bestTimes));
    updateLeaderboard();

    let msg = '';
    if (finalTime < 2.0) msg = 'INCREDIBLE! FASTER THAN RED BULL!';
    else if (finalTime < 2.5) msg = 'WORLD CLASS PIT STOP!';
    else if (finalTime < 3.5) msg = 'SOLID PIT STOP. WELL DONE.';
    else if (finalTime < 5.0) msg = 'DECENT STOP. ROOM FOR IMPROVEMENT.';
    else msg = 'UNSAFE RELEASE! PRACTICE MORE.';

    resultTime.textContent = finalTime.toFixed(2) + 's';
    resultMsg.textContent = msg;
    resultDiv.style.display = 'block';

    audio.playSuccess();
    fireConfetti();
  }

  sequence.forEach(pos => {
    const tyre = document.getElementById(`tyre-${pos}`);
    tyre.addEventListener('click', () => completeTyre(pos));
    tyre.style.cursor = 'none';
  });

  startBtn.addEventListener('click', startGame);
  retryBtn.addEventListener('click', () => {
    resetTyres();
    resultDiv.style.display = 'none';
    startBtn.style.display = '';
    timeEl.textContent = '0.00';
    gameState = 'idle';
    instructionsEl.querySelector('p').textContent = 'CLICK EACH TYRE IN ORDER: FL → FR → RL → RR';
  });
}

// ============================================================
// CONFETTI — Enhanced physics
// ============================================================
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const particles = [];
  const colors = TEAMS.map(t => t.color);
  for (let i = 0; i < 250; i++) {
    particles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 250,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: -Math.random() * 20 - 6,
      w: 7 + Math.random() * 7,
      h: 3 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 18,
      gravity: 0.25 + Math.random() * 0.25,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.rotSpeed;

      if (p.y < canvas.height + 50) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - frame / 140);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });
    frame++;
    if (alive && frame < 180) {
      requestAnimationFrame(animate);
    } else {
      canvas.style.display = 'none';
    }
  }
  animate();
}

// ============================================================
// OUTRO — Star field + text reveal
// ============================================================
function initOutro() {
  gsap.utils.toArray('.outro-line').forEach((line, i) => {
    gsap.to(line, {
      y: 0, opacity: 1, duration: 0.9,
      delay: i * 0.18,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#outro', start: 'top 55%' }
    });
  });

  gsap.to('#outro-logo', {
    opacity: 1, scale: 1, duration: 1.2,
    delay: 0.9,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#outro', start: 'top 50%' }
  });

  gsap.to('#outro-cta', {
    opacity: 1, duration: 0.7,
    delay: 1.4,
    scrollTrigger: { trigger: '#outro', start: 'top 50%' }
  });

  // Magnetic hover CTA
  const cta = document.getElementById('outro-cta');
  cta.addEventListener('mousemove', e => {
    const rect = cta.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.18;
    const dy = (e.clientY - cy) * 0.18;
    cta.style.transform = `translate(${dx}px, ${dy}px) scale(1.06)`;
  });
  cta.addEventListener('mouseleave', () => {
    cta.style.transform = '';
  });
}

// ============================================================
// SECTION NAV — Active dot tracking
// ============================================================
function initSectionNav() {
  const dots = document.querySelectorAll('.nav-dot');
  const sections = ['hero', 'car-carousel', 'driver-profiles', 'race-calendar',
                     'telemetry', 'speed-wall', 'constructor-standings', 'pit-stop', 'outro'];

  sections.forEach((id, i) => {
    const section = document.getElementById(id);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveDot(i),
      onEnterBack: () => setActiveDot(i),
    });
  });

  function setActiveDot(idx) {
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    // Map to 3D scene
    if (idx === 0) activeSceneId = 'hero';
    else if (idx === 3) activeSceneId = 'globe';
    else if (idx === 8) activeSceneId = 'outro';
    else activeSceneId = 'none';
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ============================================================
// MAIN RENDER LOOP — Scene switching
// ============================================================
function renderLoop(time, velocity) {
  const vel01 = Math.min(velocity / 20, 1);
  shaderUniforms.uTime.value = time;
  shaderUniforms.uScrollVelocity.value = vel01;

  if (activeSceneId === 'hero' && heroComposer) {
    heroComposer.render();
  } else if (activeSceneId === 'globe' && globeScene && renderer) {
    if (globeMesh) globeMesh.rotation.y += 0.0008;
    // Pulse pin size
    if (racePins) {
      racePins.material.size = 0.18 + Math.sin(time * 2) * 0.04;
    }
    renderer.render(globeScene, globeCamera);
  } else if (activeSceneId === 'outro' && outroScene && renderer) {
    if (starField) {
      starField.rotation.y += 0.00025;
      starField.rotation.x += 0.0001;
      // Twinkle via opacity pulse
      starField.material.opacity = 0.6 + Math.sin(time * 0.3) * 0.1;
    }
    renderer.render(outroScene, outroCamera);
  } else if (renderer && heroScene) {
    renderer.render(heroScene, heroCamera);
  }
}

// ============================================================
// INITIALIZATION
// ============================================================
let animCore, cursor, audio;

async function init() {
  gsap.registerPlugin(ScrollTrigger);

  audio = new AudioEngine();

  const loader = new LoadingScreen(() => {
    document.body.style.overflow = '';
    initHero();
  });

  document.body.style.overflow = 'hidden';
  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += 0.015 + Math.random() * 0.025;
    if (loadProgress >= 1) {
      loadProgress = 1;
      clearInterval(loadInterval);
      setTimeout(() => loader.complete(), 250);
    }
    loader.setProgress(loadProgress);
  }, 70);

  // Setup Three.js
  try {
    setupRenderer();
    setupHeroScene();
    setupGlobeScene();
    setupOutroScene();
  } catch (e) {
    console.warn('[F1] WebGL initialization failed:', e);
  }

  // Animation core
  animCore = new F1AnimationCore();
  animCore.onTick((time, velocity) => {
    audio.setVelocity(Math.min(velocity / 20, 1));
    renderLoop(time, velocity);
  });
  animCore.start();

  // Build DOM sections
  initCarCarousel();
  initDriverProfiles();
  initGlobeCalendar();
  initTelemetry();
  initSpeedWall();
  initConstructorStandings();
  initPitStopGame();
  initOutro();
  initSectionNav();

  // Custom cursor — after DOM settled
  setTimeout(() => { cursor = new CursorController(); }, 400);
}

function initHero() {
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: '+=500%',
    pin: true,
    scrub: 1.2,
    onUpdate: (self) => {
      updateHeroScene(self.progress, animCore.time, animCore.velocity);
    }
  });

  const scrollHint = document.getElementById('scroll-hint');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) scrollHint.style.opacity = '0';
  }, { once: true });

  ScrollTrigger.refresh();
}

// GO!
init();
