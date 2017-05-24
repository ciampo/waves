import * as easing from './easing.js';
import * as utils from './utils.js';
import Wave from './wave.js';
import Grid from './grid.js';
import CanvasRenderer from './canvas-renderer.js';

// Constants
// it may as well be always 1 as everything is squar-y
const GRID_GAP = 40;
const GRID_DOT_SIZE = 3;
const WAVE_CREST_VELOCITY = 12;
const WAVE_CREST_DECAY = 400;
const DARK_MODE_CLASS = 'dark-mode';
const COLORS_FG = {
  dark: {r: 255, g: 255, b: 255, waveMaxOpacity: 0.02},
  light: {r: 40, g: 40, b: 40, waveMaxOpacity: 0.02}
};

// Variables
const root = document.getElementById('root');
const renderer = new CanvasRenderer(root, COLORS_FG,
    document.body.classList.contains(DARK_MODE_CLASS) ? 'dark' : 'light');
const grid = new Grid(GRID_GAP, GRID_DOT_SIZE);
const sketchSize = {w: 0, h: 0};

let waves = [];

let maxX, maxY;

function onResize() {
  sketchSize.w = window.innerWidth;
  sketchSize.h = window.innerHeight;

  renderer.resize(sketchSize.w, sketchSize.h);
  grid.resize(sketchSize.w, sketchSize.h, waves.length);
}

function onPointerUp(evt) {
  maxX = utils.absMax(evt.clientX, evt.clientX - sketchSize.w);
  maxY = utils.absMax(evt.clientY, evt.clientY - sketchSize.h);

  waves.push(new Wave(evt.clientX, evt.clientY,
      Math.sqrt(maxX * maxX + maxY * maxY) + WAVE_CREST_DECAY,
      renderer.diagonal + WAVE_CREST_DECAY, WAVE_CREST_VELOCITY, WAVE_CREST_DECAY,
      easing.easeOutQuad));

  grid.addWave();
}

function onKeyDown(evt) {
  // 'c' key pressed.
  if (evt.keyCode === 67) {
    document.body.classList.toggle(DARK_MODE_CLASS);
    renderer.colorMode = renderer.colorMode === 'light' ? 'dark' : 'light';
  }
}

// Draw entry point (rendering loop).
function draw(ts) {
  requestAnimationFrame(draw);

  grid.update(waves);
  renderer.draw(grid.points, waves);

  // Grow wave, remove if expired.
  waves.forEach((wave, wIndex) => {
    wave.grow();
    if (wave.isExpired()) {
      waves.splice(wIndex, 1);
      grid.removeWave(wIndex);
    }
  });
}

// Draw entry point
function start() {
  onResize();
  requestAnimationFrame(draw);
}

// Event listeners
window.addEventListener('resize', onResize, false);
document.addEventListener('pointerup', onPointerUp, false);
document.addEventListener('keydown', onKeyDown, false);

// Start sketch
start();
