/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getMouseCoordinates;
/* harmony export (immutable) */ __webpack_exports__["a"] = getDistance2d;
/* harmony export (immutable) */ __webpack_exports__["d"] = absMax;
/* harmony export (immutable) */ __webpack_exports__["c"] = createCanvasFullScreenBCR;
/* harmony export (immutable) */ __webpack_exports__["e"] = getAngleBetweenPoints;
function getMouseCoordinates(evt, canvasBCR, devicePxRatio = 1) {
  let toReturn = {};

  toReturn.x = Math.round(((evt.clientX * devicePxRatio) - canvasBCR.left) /
      (canvasBCR.right - canvasBCR.left) * canvasBCR.width);
  toReturn.y = Math.round(((evt.clientY * devicePxRatio) - canvasBCR.top) /
    (canvasBCR.bottom - canvasBCR.top) * canvasBCR.height);

  return toReturn;
};

function getDistance2d(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

function absMax(x, y) {
  return Math.max(Math.abs(x), Math.abs(y));
};

function createCanvasFullScreenBCR(canvas) {
  return {
    top: 0,
    right: canvas.width,
    bottom: canvas.height,
    left: 0,
    width: canvas.width,
    height: canvas.height
  };
};

function getAngleBetweenPoints(x1, y1, x2, y2) {
  // console.log(arguments, (y2 - y1), (x2 - x1));
  return Math.atan2(y2- y1, x2 - x1);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export linear */
/* unused harmony export easeInQuad */
/* harmony export (immutable) */ __webpack_exports__["a"] = easeOutQuad;
/* harmony export (immutable) */ __webpack_exports__["c"] = easeInOutQuad;
/* harmony export (immutable) */ __webpack_exports__["d"] = easeInCubic;
/* unused harmony export easeOutCubic */
/* unused harmony export easeInOutCubic */
/* harmony export (immutable) */ __webpack_exports__["b"] = easeInQuart;
/* unused harmony export easeOutQuart */
/* unused harmony export easeInOutQuart */
/* unused harmony export easeInQuint */
/* unused harmony export easeOutQuint */
/* unused harmony export easeInOutQuint */
function linear(t) {
  return t;
}

// accelerating from zero velocity
function easeInQuad(t) {
  return t * t;
}

// decelerating to zero velocity
function easeOutQuad(t) {
  return t * (2 - t);
}

// acceleration until halfway, then deceleration
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// accelerating from zero velocity
function easeInCubic(t) {
  return t * t * t;
}

// decelerating to zero velocity
function easeOutCubic(t) {
  return --t * t * t + 1;
}

// acceleration until halfway, then deceleration
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// accelerating from zero velocity
function easeInQuart(t) {
  return t * t * t * t;
}

// decelerating to zero velocity
function easeOutQuart(t) {
  return 1 - --t * t * t * t;
}

// acceleration until halfway, then deceleration
function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

// accelerating from zero velocity
function easeInQuint(t) {
  return t * t * t * t * t;
}

// decelerating to zero velocity
function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
}

// acceleration until halfway, then deceleration
function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__easing_js__ = __webpack_require__(1);



class Grid {
  constructor(w, h, gap, baseDotSize) {
    this.width = w;
    this.height = h;
    this.gap = gap;
    this.baseDotSize = baseDotSize;

    // Constants that affect how much the position / size of each dot
    // is affected by the distance from a wave.
    this._posConst = 1/ 20;
    this._sizeConst = 3.5;

    this._distFromWaves = [];
    this.points = [];
  }

  init(w, h, nWaves) {
    this.width = w;
    this.height = h;

    this.points = [];
    this._distFromWaves = [];

    const cols = Math.floor(this.width / this.gap);
    const rows = Math.floor(this.height / this.gap);

    const offsetX = Math.floor((this.width - cols * this.gap) / 2);
    const offsetY = Math.floor((this.height - rows * this.gap) / 2);

    for (let c of [...Array(cols + 1).keys()]) {
      for (let r of [...Array(rows + 1).keys()]) {
        this.points.push({
          x: c * this.gap + offsetX,
          y: r * this.gap + offsetY,
          displayX: null,
          displayY: null,
          size: null
        });

        this._distFromWaves.push(Array(nWaves).fill(null));
      }
    }
  }

  update(waves) {
    for (let [pIndex, p] of this.points.entries()) {

      p.displayX = p.x;
      p.displayY = p.y;
      p.size = this.baseDotSize;

      for (let [wIndex, wave] of waves.entries()) {

        if (!this._distFromWaves[pIndex][wIndex]) {
          this._distFromWaves[pIndex][wIndex] =
              __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* getDistance2d */](p.x, p.y, wave.x, wave.y);
        }
        const distFromCrest = Math.abs(this._distFromWaves[pIndex][wIndex] -
            wave.getEasedCrestValue());

        if (distFromCrest <= wave.crestAOE) {
          const angle = __WEBPACK_IMPORTED_MODULE_0__utils_js__["e" /* getAngleBetweenPoints */](p.x, p.y, wave.x, wave.y);
          const percDist = (wave.crestAOE - distFromCrest) / wave.crestAOE;
          const easedPercDist = __WEBPACK_IMPORTED_MODULE_1__easing_js__["c" /* easeInOutQuad */](percDist) * wave.crestAOE;

          p.displayX -= easedPercDist * this._posConst * Math.cos(angle);
          p.displayY -= easedPercDist * this._posConst * Math.sin(angle);

          p.size += this._sizeConst * __WEBPACK_IMPORTED_MODULE_1__easing_js__["d" /* easeInCubic */](1 - distFromCrest / wave.crestAOE);
        }
      }

      p.displayX -= p.size / 2;
      p.displayY -= p.size / 2;
    }
  }

  addWave() {
    this._distFromWaves.forEach(d => {d.push(null);})
  }

  removeWave(index) {
    this._distFromWaves.forEach(d => {d.splice(index, 1);})
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);


class Wave {
  /**
   * Creates an instance of Wave.
   * @param {number} x
   * @param {number} y
   * @param {number} maxRadius
   * @param {number} easingRadius
   * @param {number} [crestVelocity=10]
   * @param {function} [crestEasingFn=x => x]
   *
   * @memberof Wave
   */
  constructor(x, y, maxRadius, easingRadius, crestVelocity = 10, crestAOE, crestEasingFn = x => x) {
    this.x = x;
    this.y = y;
    this.maxRadius = maxRadius;
    this.easingRadius = easingRadius;
    this.crestVelocity = crestVelocity;
    this.crestAOE = crestAOE;
    this.crestEasingFn = crestEasingFn;

    this.crestRadius = 0;
  }

  /**
   * Grows the size of the wave (i.e moves the crest by the velocity value).
   *
   * @memberof Wave
   */
  grow() {
    this.crestRadius += this.crestVelocity;
  }

  /**
   * Checks if the crest has passed the maxRadius
   *
   * @returns {boolean}
   *
   * @memberof Wave
   */
  isExpired() {
    return this.crestRadius >= this.maxRadius;
  }

  /**
   * Returns the distance of a point from the crest of this wave
   *
   * @param {number} dotX
   * @param {number} dotY
   * @returns {number}
   *
   * @memberof Wave
   */
  distanceFromCrest(dotX, dotY) {
    return Math.abs(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* getDistance2d */](dotX, dotY, this.x, this.y) -
        this.getEasedCrestValue());
  }

  /**
   * Gets eased value, instead of linear increasing value.
   *
   * @returns {number}
   *
   * @memberof Wave
   */
  getEasedCrestValue() {
    // Ease against easingRadius, it makes all waves grow with the same speed.
    return this.crestEasingFn(this.crestRadius / this.easingRadius) * this.maxRadius;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Wave;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__easing_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wave_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__grid_js__ = __webpack_require__(2);





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
  canvasDiagonal = __WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* getDistance2d */](0, 0, canvas.width, canvas.height);
}


function onPointerUp(evt) {
  const coords = __WEBPACK_IMPORTED_MODULE_1__utils_js__["b" /* getMouseCoordinates */](evt,
      __WEBPACK_IMPORTED_MODULE_1__utils_js__["c" /* createCanvasFullScreenBCR */](canvas), DEVICE_PIXEL_RATIO);
  const maxX = __WEBPACK_IMPORTED_MODULE_1__utils_js__["d" /* absMax */](coords.x, coords.x - canvas.width);
  const maxY = __WEBPACK_IMPORTED_MODULE_1__utils_js__["d" /* absMax */](coords.y, coords.y - canvas.height);

  waves.push(new __WEBPACK_IMPORTED_MODULE_2__wave_js__["a" /* default */](coords.x, coords.y,
      Math.sqrt(maxX * maxX + maxY * maxY) + WAVE_CREST_DECAY,
      canvasDiagonal + WAVE_CREST_DECAY, WAVE_CREST_VELOCITY, WAVE_CREST_DECAY,
      __WEBPACK_IMPORTED_MODULE_0__easing_js__["a" /* easeOutQuad */]));

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
          __WEBPACK_IMPORTED_MODULE_0__easing_js__["b" /* easeInQuart */](1 - crestR / (wave.easingRadius / 2));
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
  grid = new __WEBPACK_IMPORTED_MODULE_3__grid_js__["a" /* default */](canvas.width, canvas.height, GRID_GAP, GRID_DOT_SIZE);
  onResize();
  requestAnimationFrame(draw);
}

// Event listeners
window.addEventListener('resize', onResize, false);
canvas.addEventListener('pointerup', onPointerUp, false);

// Start sketch
start();


/***/ })
/******/ ]);