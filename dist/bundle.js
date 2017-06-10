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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getMouseCoordinates */
/* harmony export (immutable) */ __webpack_exports__["a"] = getDistance2d;
/* harmony export (immutable) */ __webpack_exports__["b"] = absMax;
/* unused harmony export createCanvasFullScreenBCR */
/* harmony export (immutable) */ __webpack_exports__["c"] = getAngleBetweenPoints;
/* harmony export (immutable) */ __webpack_exports__["d"] = bitwiseRound;
function getMouseCoordinates(evt, canvasBCR, devicePxRatio = 1) {
  let toReturn = {};

  toReturn.x = Math.round(((evt.clientX * devicePxRatio) - canvasBCR.left) /
      (canvasBCR.right - canvasBCR.left) * canvasBCR.width);
  toReturn.y = Math.round(((evt.clientY * devicePxRatio) - canvasBCR.top) /
    (canvasBCR.bottom - canvasBCR.top) * canvasBCR.height);

  return toReturn;
};

function getDistance2d(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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
  return Math.atan2(y2 - y1, x2 - x1);
}

function bitwiseRound(n) {
  return (0.5 + n) << 0;
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
class AbstractRenderer {
  constructor(rootNode, color) {
    if (this.constructor === AbstractRenderer) {
        throw new TypeError(`Abstract class "AbstractRenderer" cannot be
            instantiated directly.`);
    }

    this.rootNode = rootNode;
    this._currentColor = color;

    // Check if all instance methods are implemented.
    if (this.resize === AbstractRenderer.prototype.resize) {
      throw new TypeError('Please implement abstract method "resize".');
    }
    if (this.draw === AbstractRenderer.prototype.draw) {
      throw new TypeError('Please implement abstract method "draw".');
    }
  }

  /**
   * Sets the current color.
   *
   * @param {Object} color New current color.
   *
   * @memberof AbstractRenderer
   */
  set currentColor(color) {
    this._currentColor = color;
  }

  /**
   * Gets the current color
   *
   * @readonly
   *
   * @memberof AbstractRenderer
   */
  get currentColor() {
    return this._currentColor;
  }

  /**
   * Abstract method. Called when the size of the drawing surface has changed.
   *
   * @param {number} width New width of the canvas.
   * @param {number} height New height of the canvas.
   *
   * @memberof AbstractRenderer
   */
  resize(width, height) {}

  /**
   * Abstract method. Called during the rendering loop.
   *
   * @param {Array<Object>} points List of the grid's points.
   * @param {Array<Wave>} waves List of the active waves.
   *
   * @memberof AbstractRenderer
   */
  draw(points, waves) {}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractRenderer;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__easing_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderer_js__ = __webpack_require__(2);




class CanvasRenderer extends __WEBPACK_IMPORTED_MODULE_2__renderer_js__["a" /* default */] {
  constructor(rootNode, color) {
    super(rootNode, color);

    // Clean root node, append canvas.
    while (rootNode.firstChild) {
      rootNode.removeChild(rootNode.firstChild);
    }
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    rootNode.appendChild(this._canvas);

    // Device pixel ratio.
    this._DPR = 1;// window.devicePixelRatio;

    this.currentColor = color;
  }

  set currentColor(color) {
    this._currentColor = color;

    this.rootNode.style.backgroundColor =
        `rgb(${this._currentColor.background.r},
             ${this._currentColor.background.g},
             ${this._currentColor.background.b})`;
  }

  get currentColor() {
    return this._currentColor;
  }

  resize(width, height) {
    this._canvas.style.width = `${width}px`;
    this._canvas.style.height = `${height}px`;
    this._canvas.setAttribute('width', `${width * this._DPR}px`);
    this._canvas.setAttribute('height', `${height * this._DPR}px`);
  }

  draw(points, waves) {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this._ctx.fillStyle = `rgba(${this._currentColor.foreground.r},
                                ${this._currentColor.foreground.g},
                                ${this._currentColor.foreground.b}, 1)`;

    this._ctx.beginPath();
    points.forEach(p => {
      this._ctx.moveTo(p.displayX * this._DPR, p.displayY * this._DPR);
      this._ctx.lineTo(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* bitwiseRound */]((p.displayX + p.size) * this._DPR),
          __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* bitwiseRound */](p.displayY * this._DPR));
      this._ctx.lineTo(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* bitwiseRound */]((p.displayX + p.size) * this._DPR),
          __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* bitwiseRound */]((p.displayY + p.size) * this._DPR));
      this._ctx.lineTo(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* bitwiseRound */](p.displayX  * this._DPR),
          __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* bitwiseRound */]((p.displayY + p.size) * this._DPR));
      this._ctx.lineTo(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* bitwiseRound */](p.displayX * this._DPR),
          __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* bitwiseRound */](p.displayY * this._DPR));
    });
    this._ctx.fill();

    waves.forEach(wave => {
      // Draw wave pulse. Opacity gets lower as the wave grows.
      const crestR = wave.getEasedCrestValue();
      const normalisedHalfCrest = crestR / (wave.easingRadius / 2);

      if (normalisedHalfCrest <= 1) {
        this._ctx.fillStyle =
          `rgba(${this._currentColor.foreground.r},
                ${this._currentColor.foreground.g},
                ${this._currentColor.foreground.b},
                ${this._currentColor.foreground.waveMaxOpacity *
                    __WEBPACK_IMPORTED_MODULE_1__easing_js__["b" /* easeInQuart */](1 - normalisedHalfCrest)})`;

        this._ctx.beginPath();
        this._ctx.arc(wave.x * this._DPR, wave.y * this._DPR, crestR * this._DPR, 0, Math.PI * 2, true);
        this._ctx.closePath();
        this._ctx.fill();
      }
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasRenderer;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__easing_js__ = __webpack_require__(1);



/**
 * A grid of points equally spaced, possibly displaced by waves.
 *
 * @export
 * @class Grid
 */
class Grid {
  /**
   * Creates an instance of Grid.
   * @param {number} gap Space (in px) between each point.
   * @param {numberany} baseDotSize Size (in px) of each point.
   * @param {number} [posConst=1/20] Affects how much a wave's crest can move a dot.
   * @param {number} [sizeConst=3.5] Affects how much a wave's crest can scale a dot.
   *
   * @memberof Grid
   */
  constructor(gap, baseDotSize, posConst = 1 / 20, sizeConst = 3.5) {
    this.gap = gap;
    this.baseDotSize = baseDotSize;
    this.posConst = posConst;
    this.sizeConst = sizeConst

    this._distFromWaves = [];
    this._angleFromWaves = [];

    this._cols;
    this._rows;

    this.points = [];
  }

  /**
   * Called when the grid is resized. Re-computes the position of each point.
   *
   * @param {number} w New width of the grid.
   * @param {number} h New height of the grid.
   * @param {number} nWaves Number of waves currently active in the canvas.
   *
   * @memberof Grid
   */
  resize(w, h, nWaves) {
    this.points = [];
    this._distFromWaves = [];
    this._angleFromWaves = [];

    this._cols = Math.floor(w / this.gap);
    this._rows = Math.floor(h / this.gap);

    for (const c of [...Array(this._cols + 1).keys()]) {
      for (const r of [...Array(this._rows + 1).keys()]) {
        this.points.push({
          x: c * this.gap + Math.floor((w - this._cols * this.gap) / 2),
          y: r * this.gap + Math.floor((h - this._rows * this.gap) / 2),
          displayX: null,
          displayY: null,
          size: null
        });

        this._distFromWaves.push(Array(nWaves).fill(null));
        this._angleFromWaves.push(Array(nWaves).fill(null));
      }
    }
  }

  /**
   * Updates position and size of each point based on the proximity to a wave.
   *
   * @param {Array<Wave>} waves
   *
   * @memberof Grid
   */
  update(waves) {
    let distFromCrest, angle, percDist, easedPercDist;

    this.points.forEach((p, pIndex) => {
      p.displayX = p.x;
      p.displayY = p.y;
      p.size = this.baseDotSize;

      waves.forEach((wave, wIndex) => {
        distFromCrest = Math.abs(
            this._getDistFromWave(pIndex, p, wIndex, wave) -
            wave.getEasedCrestValue());

        if (distFromCrest <= wave.crestAOE) {
          angle = this._getAngleFromWave(pIndex, p, wIndex, wave);
          percDist = (wave.crestAOE - distFromCrest) / wave.crestAOE;
          easedPercDist = __WEBPACK_IMPORTED_MODULE_1__easing_js__["c" /* easeInOutQuad */](percDist) * wave.crestAOE;

          p.displayX -= easedPercDist * this.posConst * Math.cos(angle);
          p.displayY -= easedPercDist * this.posConst * Math.sin(angle);

          p.size += this.sizeConst * __WEBPACK_IMPORTED_MODULE_1__easing_js__["d" /* easeInCubic */](1 - distFromCrest / wave.crestAOE);
        }
      });

      p.displayX -= p.size / 2;
      p.displayY -= p.size / 2;
    });
  }

  /**
   * Computes (and stores) the distance from a point and a wave's center.
   *
   * @param {number} pIndex Index of the point
   * @param {Object} p Point object
   * @param {number} wIndex Index of the wave
   * @param {Wave} wave Wave object
   * @returns {number} Disance from a point and a wave's center (in px).
   *
   * @memberof Grid
   */
  _getDistFromWave(pIndex, p, wIndex, wave) {
    if (this._distFromWaves[pIndex][wIndex] === null) {
      this._distFromWaves[pIndex][wIndex] =
          __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* getDistance2d */](p.x, p.y, wave.x, wave.y);
    }
    return this._distFromWaves[pIndex][wIndex];
  }

    /**
   * Computes (and stores) the angle from a point and a wave's center.
   *
   * @param {number} pIndex Index of the point
   * @param {Object} p Point object
   * @param {number} wIndex Index of the wave
   * @param {Wave} wave Wave object
   * @returns {number} Angle from a point and a wave's center (in radians).
   *
   * @memberof Grid
   */
  _getAngleFromWave(pIndex, p, wIndex, wave) {
    if (this._angleFromWaves[pIndex][wIndex] === null) {
      this._angleFromWaves[pIndex][wIndex] =
          __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* getAngleBetweenPoints */](p.x, p.y, wave.x, wave.y);
    }
    return this._angleFromWaves[pIndex][wIndex];
  }

  /**
   * Adds an entry in the stored distances and angles. Needs to be called
   * every time a wave is added to the scene, in order to keep values in sync.
   *
   * @memberof Grid
   */
  addWave() {
    this._distFromWaves.forEach(d => {d.push(null);})
    this._angleFromWaves.forEach(d => {d.push(null);})
  }

  /**
   * Removes an entry from the stored distances and angles. Needs to be called
   * every time a wave is removed from the scene, in order to keep values in sync.
   *
   * @param {number} index Index of the removed wave.
   *
   * @memberof Grid
   */
  removeWave(index) {
    this._distFromWaves.forEach(d => {d.splice(index, 1);})
    this._angleFromWaves.forEach(d => {d.splice(index, 1);})
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__easing_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderer_js__ = __webpack_require__(2);




const SVGns = 'http://www.w3.org/2000/svg';

class SvgRenderer extends __WEBPACK_IMPORTED_MODULE_2__renderer_js__["a" /* default */] {
  constructor(rootNode, color) {
    super(rootNode, color);

    this._dots = [];
    this._ripples = [];

    // Clean root node, append canvas.
    while (this.rootNode.firstChild) {
      this.rootNode.removeChild(this.rootNode.firstChild);
    }
    this._svg = document.createElementNS(SVGns, 'svg');
    this._svg.setAttributeNS(null, 'preserveAspectRatio', 'none');
    this._dotsContainer = document.createElementNS(SVGns, 'g');
    this._ripplesContainer = document.createElementNS(SVGns, 'g');
    this._svg.appendChild(this._dotsContainer);
    this._svg.appendChild(this._ripplesContainer);
    this.rootNode.appendChild(this._svg);

    this.currentColor = color;
  }

  set currentColor(color) {
    this._currentColor = color;

    this._svg.style.fill = `rgb(${this._currentColor.foreground.r},
                                ${this._currentColor.foreground.g},
                                ${this._currentColor.foreground.b})`;
    this.rootNode.style.backgroundColor =
        `rgb(${this._currentColor.background.r},
             ${this._currentColor.background.g},
             ${this._currentColor.background.b})`;
  }

  get currentColor() {
    return this._currentColor;
  }

  resize(width, height) {
    this._svg.style.width = `${width}px`;
    this._svg.style.height = `${height}px`;
  }

  draw(points, waves) {
    // Recycle dots elements, or add only new dots only if necessary.
    while (this._dots.length < points.length) {
      const d = this._createDot();
      this._dotsContainer.appendChild(d);
      this._dots.push(d);
    }
    while (this._dots.length > points.length) {
      this._dotsContainer.removeChild(this._dotsContainer.lastChild);
      this._dots.pop();
    }

    points.forEach((p, i) => {
      this._dots[i].setAttribute('transform',
          `translate(${p.displayX}, ${p.displayY}) scale(${p.size})`);
    });

    // Recycle ripple elements, or add only new ripples only if necessary.
    while (this._ripples.length < waves.length) {
      const r = this._createRipple();
      this._ripplesContainer.appendChild(r);
      this._ripples.push(r);
    }
    while (this._ripples.length > waves.length) {
      this._ripplesContainer.removeChild(this._ripplesContainer.lastChild);
      this._ripples.pop();
    }

    // loop over waves -> ripples
    waves.forEach((wave, i) => {
      // Draw wave pulse. Opacity gets lower as the wave grows.
      const crestR = wave.getEasedCrestValue();
      const ripple = this._ripples[i];
      const normalisedHalfCrest = crestR / (wave.easingRadius / 2);

      if (normalisedHalfCrest <= 1) {
        ripple.style.fill = `rgba(${this._currentColor.foreground.r},
            ${this._currentColor.foreground.g},
            ${this._currentColor.foreground.b},
            ${this._currentColor.foreground.waveMaxOpacity *
                __WEBPACK_IMPORTED_MODULE_1__easing_js__["b" /* easeInQuart */](1 - normalisedHalfCrest)})`;

        ripple.setAttribute('transform',
            `translate(${wave.x}, ${wave.y}) scale(${crestR})`);
      } else {
        ripple.setAttribute('transform', 'scale(0)');
      }
    });
  }

  _createDot() {
    const rect = document.createElementNS(SVGns, 'rect');
    rect.setAttributeNS(null, 'x', 0);
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', 1);
    rect.setAttributeNS(null, 'height', 1);
    return rect;
  }

  _createRipple() {
    const circle = document.createElementNS(SVGns, 'circle');
    circle.setAttributeNS(null, 'cx', 0);
    circle.setAttributeNS(null, 'cy', 0);
    circle.setAttributeNS(null, 'r', 1);
    return circle;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SvgRenderer;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);


/**
 * A wave, whose crest grows from its center and has a circular shape.
 *
 * @export
 * @class Wave
 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__easing_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wave_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__grid_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__canvas_renderer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__svg_renderer_js__ = __webpack_require__(5);







// Constants
// it may as well be always 1 as everything is squar-y
const GRID_GAP = 40;
const GRID_DOT_SIZE = 2;
const WAVE_CREST_VELOCITY = 12;
const WAVE_CREST_DECAY = 400;
const COLOR_MODE_DARK = 'dark';
const COLOR_MODE_LIGHT = 'light';
const COLORS = {
  [COLOR_MODE_DARK]: {
    background: {r: 40, g: 40, b: 40, waveMaxOpacity: 0.02},
    foreground: {r: 255, g: 255, b: 255, waveMaxOpacity: 0.02}
  },
  [COLOR_MODE_LIGHT]: {
    background: {r: 240, g: 240, b: 240, waveMaxOpacity: 0.02},
    foreground: {r: 40, g: 40, b: 40, waveMaxOpacity: 0.02}
  }
};

// Variables
const root = document.getElementById('root');
let currentColorPalette = COLOR_MODE_LIGHT;
let renderer = new __WEBPACK_IMPORTED_MODULE_4__canvas_renderer_js__["a" /* default */](root, COLORS[currentColorPalette]);
const grid = new __WEBPACK_IMPORTED_MODULE_3__grid_js__["a" /* default */](GRID_GAP, GRID_DOT_SIZE);
const sketchSize = {w: 0, h: 0, diagonal: 0};

let options = {
  renderer: 'canvas'
};

let waves = [];

let maxX, maxY;

function onResize() {
  sketchSize.w = window.innerWidth;
  sketchSize.h = window.innerHeight;
  sketchSize.diagonal = __WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* getDistance2d */](0, 0, sketchSize.w, sketchSize.h);

  renderer.resize(sketchSize.w, sketchSize.h);
  grid.resize(sketchSize.w, sketchSize.h, waves.length);
}

function onPointerUp(evt) {
  maxX = __WEBPACK_IMPORTED_MODULE_1__utils_js__["b" /* absMax */](evt.clientX, evt.clientX - sketchSize.w);
  maxY = __WEBPACK_IMPORTED_MODULE_1__utils_js__["b" /* absMax */](evt.clientY, evt.clientY - sketchSize.h);

  waves.push(new __WEBPACK_IMPORTED_MODULE_2__wave_js__["a" /* default */](evt.clientX, evt.clientY,
      Math.sqrt(maxX * maxX + maxY * maxY) + WAVE_CREST_DECAY,
      sketchSize.diagonal + WAVE_CREST_DECAY, WAVE_CREST_VELOCITY, WAVE_CREST_DECAY,
      __WEBPACK_IMPORTED_MODULE_0__easing_js__["a" /* easeOutQuad */]));

  grid.addWave();
}

function onKeyDown(evt) {
  // 'c' key pressed.
  if (evt.keyCode === 67) {
    currentColorPalette = currentColorPalette === COLOR_MODE_LIGHT ?
        COLOR_MODE_DARK : COLOR_MODE_LIGHT;
    renderer.currentColor = COLORS[currentColorPalette];
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
  const gui = new dat.GUI();
  var controller = gui.add(options, 'renderer', ['canvas', 'svg']);

  controller.onFinishChange(function(value) {
    switch(value) {
      case 'svg':
        renderer = new __WEBPACK_IMPORTED_MODULE_5__svg_renderer_js__["a" /* default */](root, COLORS[currentColorPalette]);
        onResize();
        break;
      case 'canvas':
        renderer = new __WEBPACK_IMPORTED_MODULE_4__canvas_renderer_js__["a" /* default */](root, COLORS[currentColorPalette]);
        onResize();
        break;
    }
  });

  onResize();
  requestAnimationFrame(draw);
}

// Event listeners
window.addEventListener('resize', onResize, false);
root.addEventListener('pointerup', onPointerUp, false);
document.addEventListener('keydown', onKeyDown, false);

// Start sketch
start();


/***/ })
/******/ ]);