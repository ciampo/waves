import * as easing from './easing.js';
import * as utils from './utils.js';
import Wave from './wave.js';
import Grid from './grid.js';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gridGap = 30 * DEVICE_PIXEL_RATIO;
const gridDotSize = 2;
const radius = 200 * DEVICE_PIXEL_RATIO;
const crestDecay = 400 * DEVICE_PIXEL_RATIO;
const crestVelocity = 12 * DEVICE_PIXEL_RATIO;
const dotSizeFactor = 3;
const dotPositionFactor = 1 / 20;
const dotsOffet = 100;

let grid;
let waves = [];
let canvasDiagonal;

// Compute vars.
function update() {
  canvas.setAttribute('width', `${window.innerWidth * DEVICE_PIXEL_RATIO}px`);
  canvas.setAttribute('height', `${window.innerHeight * DEVICE_PIXEL_RATIO}px`);

  canvasDiagonal = utils.getDistance2d(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';

  // Update grid points.
  if (!grid) {
    grid = new Grid(canvas.width, canvas.height, gridGap, gridDotSize);
  } else {
    grid.width = canvas.width;
    grid.height = canvas.height;
  }
  grid.update();
}


function onPointerUp(evt) {
  const coords = utils.getMouseCoordinates(evt,
      utils.createCanvasFullScreenBCR(canvas), DEVICE_PIXEL_RATIO);
  const maxX = utils.absMax(coords.x, coords.x - canvas.width);
  const maxY = utils.absMax(coords.y, coords.y - canvas.height);

  waves.push(new Wave(coords.x, coords.y,
      Math.sqrt(maxX * maxX + maxY * maxY) + crestDecay,
      canvasDiagonal + crestDecay, 12 * DEVICE_PIXEL_RATIO, easing.easeOutQuad));

  for (let p of grid.points) {
    p.distFromWaves.push(null);
    p.angleFromWaves.push(null);
  }
}

// Draw a grid of dots.
function drawGrid() {
  for (let p of grid.points) {
    let dotPosition = {x: p.x,  y: p.y};
    let dotSize = 2;

    for (let [index, wave] of waves.entries()) {

      if (!p.distFromWaves[index]) {
        p.distFromWaves[index] = utils.getDistance2d(p.x, p.y, wave.x, wave.y);
      }
      const crestDist = Math.abs(p.distFromWaves[index] -
          wave.getEasedCrestValue());

      if (crestDist <= crestDecay) {
        const angle = utils.getAngleBetweenPoints(p.x, p.y, wave.x, wave.y);
        const moveFactor = easing.easeInOutQuad((crestDecay - crestDist) / crestDecay) * crestDecay * dotPositionFactor;
        // const moveFactor = (crestDecay - crestDist) * dotPositionFactor;

        dotPosition.x -= moveFactor * Math.cos(angle);
        dotPosition.y -= moveFactor * Math.sin(angle);

        dotSize += dotSizeFactor * easing.easeInCubic(1 - crestDist / crestDecay);
      }
    }

    dotSize *= DEVICE_PIXEL_RATIO;

    ctx.fillRect(dotPosition.x - dotSize / 2, dotPosition.y - dotSize / 2,
        dotSize, dotSize);
  }
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

  drawGrid();

  // Update waves.
  for (let [index, wave] of waves.entries()) {
    // Draw
    // const crestR = wave.getEasedCrestValue();
    // fillCircle(wave.x, wave.y, crestR);

    wave.grow();
    if (wave.isExpired()) {
      waves.splice(index, 1);
      for (let p of grid.points) {
        p.distFromWaves.splice(index, 1);
        p.angleFromWaves.splice(index, 1);
      }
    }
  }
}

// Draw entry point
function start() {
  update();
  requestAnimationFrame(draw);
}

// Event listeners
window.addEventListener('resize', update, false);
canvas.addEventListener('pointerup', onPointerUp, false);

// Start sketch
start();
