import * as utils from './utils.js';
import * as easing from './easing.js';

const SVGns = 'http://www.w3.org/2000/svg';

export default class SvgRenderer {
  constructor(rootNode, color) {
    this.diagonal = 0;
    this._dots = [];
    this._ripples = [];

    this._rootNode = rootNode;

    // Clean root node, append canvas.
    while (this._rootNode.firstChild) {
      this._rootNode.removeChild(this._rootNode.firstChild);
    }
    this._svg = document.createElementNS(SVGns, 'svg');
    this._svg.setAttributeNS(null, 'preserveAspectRatio', 'none');
    this._dotsContainer = document.createElementNS(SVGns, 'g');
    this._ripplesContainer = document.createElementNS(SVGns, 'g');
    this._svg.appendChild(this._dotsContainer);
    this._svg.appendChild(this._ripplesContainer);
    this._rootNode.appendChild(this._svg);

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
                easing.easeInQuart(1 - normalisedHalfCrest)})`;

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
