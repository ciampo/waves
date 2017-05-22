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
const colorMode = document.body.classList.contains('dark-mode') ?
    'dark' : 'light';

let grid;
let waves = [];
let svg = document.getElementById('svg');
let sketchW, sketchH;
let sketchDiagonal;
let dots = [];

// Compute vars.
function onResize() {
  sketchW = window.innerWidth * DEVICE_PIXEL_RATIO;
  sketchH = window.innerHeight * DEVICE_PIXEL_RATIO;
  dots = [];

  grid.init(sketchW, sketchH, waves.length);
  sketchDiagonal = utils.getDistance2d(0, 0, sketchW, sketchH);

  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  for (const p of grid.points) {
    const r = createRect(p.x, p.y, GRID_DOT_SIZE);
    svg.appendChild(r);
    dots.push(r);
  }
}


function onPointerUp(evt) {
  const maxX = utils.absMax(evt.clientX, evt.clientX - sketchW);
  const maxY = utils.absMax(evt.clientY, evt.clientY - sketchH);

  waves.push(new Wave(evt.clientX, evt.clientY,
      Math.sqrt(maxX * maxX + maxY * maxY) + WAVE_CREST_DECAY,
      sketchDiagonal + WAVE_CREST_DECAY, WAVE_CREST_VELOCITY, WAVE_CREST_DECAY,
      easing.easeOutQuad));

  grid.addWave();
}

function createRect(x, y, size) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  rect.setAttributeNS(null, 'x', 0);
  rect.setAttributeNS(null, 'y', 0);
  rect.setAttributeNS(null, 'width', size);
  rect.setAttributeNS(null, 'height', size);
  rect.setAttribute('transform', `translate(${x}, ${y})`);
  rect.style.willChange = 'transform';
  return rect;
}

function fillCircle(x, y, r) {
  // ctx.beginPath();
  // ctx.arc(x, y, r, 0, Math.PI * 2, true);
  // ctx.closePath();
  // ctx.fill();
}

// Draw entry point (rendering loop).
function draw(ts) {
  requestAnimationFrame(draw);


  // Draw the grid.
  // ctx.fillStyle = `rgba(${COLOR_FG[colorMode][0]},
  //                       ${COLOR_FG[colorMode][1]},
  //                       ${COLOR_FG[colorMode][2]}, 1)`;
  grid.update(waves);
  grid.points.forEach((p, i) => {
    dots[i].setAttribute('transform',
        `translate(${p.translateX}, ${p.translateY}) scale(${p.scale})`);
  });

  // console.log('transform',
  //       `translateX(${grid.points[0].translateX})`);

  for (let [index, wave] of waves.entries()) {
    // Draw wave pulse.
    const crestR = wave.getEasedCrestValue();
    if (crestR <= wave.easingRadius / 2) {
      const opacity = WAVE_PULSE_MAX_OPACITY *
          easing.easeInQuart(1 - crestR / (wave.easingRadius / 2));
      // ctx.fillStyle = `rgba(${COLOR_FG[colorMode][0]},
      //                       ${COLOR_FG[colorMode][1]},
      //                       ${COLOR_FG[colorMode][2]},
      //                       ${opacity})`;
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
  grid = new Grid(sketchW, sketchH, GRID_GAP, GRID_DOT_SIZE);
  onResize();
  requestAnimationFrame(draw);
}

// Event listeners
window.addEventListener('resize', onResize, false);
window.addEventListener('pointerup', onPointerUp, false);

// Start sketch
start();
