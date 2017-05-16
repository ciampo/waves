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
}

// Interpolate a value between min/max.
function getDotSize(dotX, dotY) {
  let dotSize = 2;

  for (let wave of waves) {
    const crestDist = wave.distanceFromCrest(dotX, dotY);

    if (crestDist <= crestDecay) {
      dotSize += dotSizeFactor * easing.easeInCubic(1 - crestDist / crestDecay);
    }
  }

  return dotSize * DEVICE_PIXEL_RATIO;
}

function getDotOffsetPosition(dotX, dotY) {
  let toReturn = {x: dotX,  y: dotY};

  for (let wave of waves) {
    const crestDist = wave.distanceFromCrest(dotX, dotY);

    if (crestDist <= crestDecay) {
      const angle = utils.getAngleBetweenPoints(dotX, dotY, wave.x, wave.y);


      const moveFactor = easing.easeInOutQuad((crestDecay - crestDist) / crestDecay) * crestDecay * dotPositionFactor;
      // const moveFactor = (crestDecay - crestDist) * dotPositionFactor;

      toReturn.x -= moveFactor * Math.cos(angle);
      toReturn.y -= moveFactor * Math.sin(angle);
    }
  }

  return toReturn;
}

// Draw a grid of dots.
function drawGrid() {
  for (let p of grid.points) {
    const dotPosition = getDotOffsetPosition(p.x, p.y);

    const size = getDotSize(dotPosition.x, dotPosition.y);

    ctx.fillRect(dotPosition.x - size / 2, dotPosition.y - size / 2,
        size, size);
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
    if (wave.isExpired()) waves.splice(index, 1);
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
