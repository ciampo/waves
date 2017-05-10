import Easing from './easing.js';
import * as utils from './utils.js';
import Wave from './wave.js';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gridSize = 20 * DEVICE_PIXEL_RATIO;
const radius = 200 * DEVICE_PIXEL_RATIO;
const decay = 400 * DEVICE_PIXEL_RATIO;
const dotColor = "#ffffff";
const lineColor = "#eeeeee";

let cols, rows;
let offsetX, offsetY;
let mouseX, mouseY;
let waves = [];

// Compute vars.
function setup() {
  canvas.setAttribute('width', `${window.innerWidth * DEVICE_PIXEL_RATIO}px`);
  canvas.setAttribute('height', `${window.innerHeight * DEVICE_PIXEL_RATIO}px`);

  cols = Math.floor(canvas.width / gridSize);
  rows = Math.floor(canvas.height / gridSize);

  offsetX = Math.floor(canvas.width - cols * gridSize) / 2;
  offsetY = Math.floor(canvas.height - rows * gridSize) / 2;
}


function onClick(evt) {
  const coords = utils.getMouseCoordinates(evt, {
    top: 0,
    right: canvas.width,
    bottom: canvas.height,
    left: 0,
    width: canvas.width,
    height: canvas.height
  }, DEVICE_PIXEL_RATIO);

  const maxX = Math.max(Math.abs(coords.x),
      Math.abs(coords.x - canvas.width));
  const maxY = Math.max(Math.abs(coords.y),
      Math.abs(coords.y - canvas.height));

  waves.push(new Wave(coords.x, coords.y,
      Math.sqrt(maxX * maxX + maxY * maxY), 10 * DEVICE_PIXEL_RATIO));
}

// Interpolate a value between min/max.
function getDotSize(dotX, dotY) {
  let dotSize = 1;
  let variableSize = 0;

  for (let wave of waves) {
    const distFromWave = Math.abs(Math.sqrt((dotX - wave.x) * (dotX - wave.x) +
      (dotY - wave.y) * (dotY - wave.y)) - Easing.easeOutQuad(wave.crest) * wave.r);

    if (distFromWave <= decay) {
      dotSize += 8 * Easing.easeInQuint(1 - distFromWave / decay);
    }
  }

  return dotSize * DEVICE_PIXEL_RATIO;
}

// Draw a grid of dots.
function grid() {
  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      const dotX = x * gridSize + offsetX;
      const dotY = y * gridSize + offsetY;
      const size = getDotSize(dotX, dotY);

      ctx.fillRect(dotX - size / 2, dotY - size / 2, size, size);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = dotColor;
  ctx.strokeStyle = "#ff0000";

  grid();

  // Update waves.
  for (let [index, wave] of waves.entries()) {
    // Draw
    // strokeCircle(wave.x, wave.y, Easing.easeOutQuad(wave.crest) * wave.r);

    wave.crest = ((wave.crest * wave.r) + wave.v) / wave.r;
    if (wave.crest >= 1) waves.splice(index, 1);
  }

  requestAnimationFrame(draw);
}

// Draw entry point
function update() {
  setup();
  requestAnimationFrame(draw);
}

// Event listeners
window.addEventListener('resize', update, false);
canvas.addEventListener('click', onClick, false);

// Start sketch
update();
