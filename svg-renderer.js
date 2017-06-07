import * as utils from './utils.js';
import * as easing from './easing.js';

export default class SvgRenderer {
  constructor(rootNode, color) {
    this.diagonal = 0;
    this._dots = [];

    this._rootNode = rootNode;

    // Clean root node, append canvas.
    while (this._rootNode.firstChild) {
      this._rootNode.removeChild(this._rootNode.firstChild);
    }
    this._svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    this._svg.setAttributeNS(null, 'preserveAspectRatio', 'none');
    this._rootNode.appendChild(this._svg);

    this._initialDotSize;

    this._currentColor;
    this.currentColor = color;
  }

  set currentColor(color) {
    this._currentColor = color;

    this._svg.style.fill = `rgb(${this._currentColor.foreground.r},
                                ${this._currentColor.foreground.g},
                                ${this._currentColor.foreground.b})`;
    this._rootNode.style.backgroundColor =
        `rgb(${this._currentColor.background.r},
             ${this._currentColor.background.g},
             ${this._currentColor.background.b})`;
  }

  get currentColor() {
    return this._currentColor;
  }

  resize(width, height) {
    this.diagonal = utils.getDistance2d(0, 0, width, height);

    this._svg.style.width = `${width}px`;
    this._svg.style.height = `${height}px`;

    // Removing dots means they will be replaced during the next draw() call.
    this._dots = [];
  }

  draw(points, waves) {
    if (!this._dots.length) {
      while (this._svg.firstChild) {
        this._svg.removeChild(this._svg.firstChild);
      }

      this._dots = points.map(p => {
        const r = this._createRect(p.x, p.y, p.size);
        this._svg.appendChild(r);
        return r;
      })
    }

    points.forEach((p, i) => {
      if (!this._initialDotSize) {
        this._initialDotSize = p.size;
      }
      this._dots[i].setAttribute('transform',
          `translate(${p.displayX}, ${p.displayY}) scale(${p.size / this._initialDotSize})`);
    });

    // waves.forEach(wave => {
    //   // Draw wave pulse. Opacity gets lower as the wave grows.
    //   const crestR = wave.getEasedCrestValue();
    //   if (crestR <= wave.easingRadius / 2) {
    //     this._ctx.fillStyle =
    //       `rgba(${this.colors[this.colorMode].r},
    //             ${this.colors[this.colorMode].g},
    //             ${this.colors[this.colorMode].b},
    //             ${this.colors[this.colorMode].waveMaxOpacity *
    //                 easing.easeInQuart(1 - crestR / (wave.easingRadius / 2))})`;

    //     this._ctx.beginPath();
    //     this._ctx.arc(wave.x * this._DPR, wave.y * this._DPR, crestR * this._DPR, 0, Math.PI * 2, true);
    //     this._ctx.closePath();
    //     this._ctx.fill();
    //   }
    // });
  }

  _createRect(x, y, size) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttributeNS(null, 'x', 0);
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', size);
    rect.setAttributeNS(null, 'height', size);
    rect.setAttribute('transform', `translate(${x}, ${y})`);
    rect.style.willChange = 'transform';
    return rect;
  }
}