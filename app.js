import * as easing from './easing.js';
import * as utils from './utils.js';
import Wave from './wave.js';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gridSize = 30 * DEVICE_PIXEL_RATIO;
const radius = 200 * DEVICE_PIXEL_RATIO;
const crestDecay = 400 * DEVICE_PIXEL_RATIO;
const dotSizeFactor = 4;
const dotPositionFactor = 1 / 20;

const dotColor = '#ffffff';
const lineColor = '#ff0000';

const dotsOffet = 100;

let cols, rows;
let offsetX, offsetY;
let mouseX = 0, mouseY = 0;
let waves = [];
let canvasDiagonal;

// Compute vars.
function setup() {
  canvas.setAttribute('width', `${window.innerWidth * DEVICE_PIXEL_RATIO}px`);
  canvas.setAttribute('height', `${window.innerHeight * DEVICE_PIXEL_RATIO}px`);

  cols = Math.floor(canvas.width / gridSize);
  rows = Math.floor(canvas.height / gridSize);

  canvasDiagonal = utils.getDistance2d(0, 0, canvas.width, canvas.height);

  offsetX = Math.floor(canvas.width - cols * gridSize) / 2;
  offsetY = Math.floor(canvas.height - rows * gridSize) / 2;

  ctx.fillStyle = dotColor;
  ctx.strokeStyle = lineColor;
}


function onPointerUp(evt) {
  const coords = utils.getMouseCoordinates(evt,
      utils.createCanvasFullScreenBCR(canvas), DEVICE_PIXEL_RATIO);
  const maxX = utils.absMax(coords.x, coords.x - canvas.width);
  const maxY = utils.absMax(coords.y, coords.y - canvas.height);

  waves.push(new Wave(coords.x, coords.y,
      Math.sqrt(maxX * maxX + maxY * maxY) + crestDecay,
      canvasDiagonal + crestDecay, 8 * DEVICE_PIXEL_RATIO, easing.easeOutQuad));
}

// Interpolate a value between min/max.
function getDotSize(dotX, dotY) {
  let dotSize = 1;

  for (let wave of waves) {
    const crestDist = wave.distanceFromCrest(dotX, dotY);

    if (crestDist <= crestDecay) {
      dotSize += dotSizeFactor * easing.easeInQuart(1 - crestDist / crestDecay);
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
      const moveFactor = (crestDecay - crestDist) * dotPositionFactor;

      toReturn.x -= moveFactor * Math.cos(angle);
      toReturn.y -= moveFactor * Math.sin(angle);
    }
  }

  return toReturn;
}

// Draw a grid of dots.
function drawGrid() {
  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      const dotPosition = getDotOffsetPosition(
          x * gridSize + offsetX, y * gridSize + offsetY);

      const size = getDotSize(dotPosition.x, dotPosition.y);

      ctx.fillRect(dotPosition.x - size / 2, dotPosition.y - size / 2,
          size, size);
    }
  }
}

function strokeCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
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
    // strokeCircle(wave.x, wave.y, crestR);

    wave.grow();
    if (wave.isExpired()) waves.splice(index, 1);
  }
}

// Draw entry point
function update() {
  setup();
  requestAnimationFrame(draw);
}

// Event listeners
window.addEventListener('resize', update, false);
canvas.addEventListener('pointerup', onPointerUp, false);

// Start sketch
update();
