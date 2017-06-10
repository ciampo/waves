import * as utils from './utils.js';
import * as easing from './easing.js';
import AbstractRenderer from './renderer.js';

export default class CanvasRenderer extends AbstractRenderer {
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
      this._ctx.lineTo(utils.bitwiseRound((p.displayX + p.size) * this._DPR),
          utils.bitwiseRound(p.displayY * this._DPR));
      this._ctx.lineTo(utils.bitwiseRound((p.displayX + p.size) * this._DPR),
          utils.bitwiseRound((p.displayY + p.size) * this._DPR));
      this._ctx.lineTo(utils.bitwiseRound(p.displayX  * this._DPR),
          utils.bitwiseRound((p.displayY + p.size) * this._DPR));
      this._ctx.lineTo(utils.bitwiseRound(p.displayX * this._DPR),
          utils.bitwiseRound(p.displayY * this._DPR));
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
                    easing.easeInQuart(1 - normalisedHalfCrest)})`;

        this._ctx.beginPath();
        this._ctx.arc(wave.x * this._DPR, wave.y * this._DPR, crestR * this._DPR, 0, Math.PI * 2, true);
        this._ctx.closePath();
        this._ctx.fill();
      }
    });
  }
}