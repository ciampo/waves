import * as easing from './easing.js';
import * as utils from './utils.js';
import Wave from './wave.js';
import Grid from './grid.js';

// Constants
// it may as well be always 1 as everything is squar-y
const DEVICE_PIXEL_RATIO = 1;
const GRID_GAP = 40 * DEVICE_PIXEL_RATIO;
const GRID_DOT_SIZE = 3 * DEVICE_PIXEL_RATIO;
const WAVE_CREST_VELOCITY = 12 * DEVICE_PIXEL_RATIO;
const WAVE_CREST_DECAY = 400 * DEVICE_PIXEL_RATIO;
const WAVE_PULSE_MAX_OPACITY = 0.05;
const COLOR_FG = {
  dark: [255, 255, 255],
  light: [40, 40, 40]
};

// Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorMode = document.body.classList.contains('dark-mode') ?
    'dark' : 'light';
console.log(colorMode);

let grid;
let waves = [];
let canvasDiagonal;

// Compute vars.
function onResize() {
  canvas.setAttribute('width', `${window.innerWidth * DEVICE_PIXEL_RATIO}px`);
  canvas.setAttribute('height', `${window.innerHeight * DEVICE_PIXEL_RATIO}px`);

  grid.init(canvas.width, canvas.height, waves.length);
  canvasDiagonal = utils.getDistance2d(0, 0, canvas.width, canvas.height);
}


function onPointerUp(evt) {
  const coords = utils.getMouseCoordinates(evt,
      utils.createCanvasFullScreenBCR(canvas), DEVICE_PIXEL_RATIO);
  const maxX = utils.absMax(coords.x, coords.x - canvas.width);
  const maxY = utils.absMax(coords.y, coords.y - canvas.height);

  waves.push(new Wave(coords.x, coords.y,
      Math.sqrt(maxX * maxX + maxY * maxY) + WAVE_CREST_DECAY,
      canvasDiagonal + WAVE_CREST_DECAY, WAVE_CREST_VELOCITY, WAVE_CREST_DECAY,
      easing.easeOutQuad));

  grid.addWave();
}

function fillCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// Draw entry point (rendering loop).
function draw(ts) {
  requestAnimationFrame(draw);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the grid.
  ctx.fillStyle = `rgba(${COLOR_FG[colorMode][0]},
                        ${COLOR_FG[colorMode][1]},
                        ${COLOR_FG[colorMode][2]}, 1)`;
  grid.update(waves);
  grid.points.forEach(p => ctx.fillRect(p.displayX, p.displayY, p.size, p.size));

  for (let [index, wave] of waves.entries()) {
    // Draw wave pulse.
    const crestR = wave.getEasedCrestValue();
    if (crestR <= wave.easingRadius / 2) {
      const opacity = WAVE_PULSE_MAX_OPACITY *
          easing.easeInQuart(1 - crestR / (wave.easingRadius / 2));
      ctx.fillStyle = `rgba(${COLOR_FG[colorMode][0]},
                            ${COLOR_FG[colorMode][1]},
                            ${COLOR_FG[colorMode][2]},
                            ${opacity})`;
      fillCircle(wave.x, wave.y, wave.getEasedCrestValue());
    }

    // Grow wave / remove if expired.
    wave.grow();
    if (wave.isExpired()) {
      waves.splice(index, 1);
      grid.removeWave(index);
    }
  }
}

// Draw entry point
function start() {
  grid = new Grid(canvas.width, canvas.height, GRID_GAP, GRID_DOT_SIZE);
  onResize();
  requestAnimationFrame(draw);
}

// Event listeners
window.addEventListener('resize', onResize, false);
canvas.addEventListener('pointerup', onPointerUp, false);

// Start sketch
start();
