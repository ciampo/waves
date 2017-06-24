import * as utils from './utils.js';
import * as easing from './easing.js';
import AbstractRenderer from './renderer.js';

const SVGns = 'http://www.w3.org/2000/svg';

export default class SvgRenderer extends AbstractRenderer {
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
    this.rootNode.appendChild(this._svg);

    this.currentColor = color;
  }

  static get RendererType() {
    return 'svg';
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
    let d;
    while (this._dots.length < points.length) {
      d = this._createDot();
      this._svg.appendChild(d);
      this._dots.push(d);
    }
    while (this._dots.length > points.length) {
      this._svg.removeChild(this._svg.lastChild);
      this._dots.pop();
    }

    // Transform dots.
    points.forEach((p, i) => {
      this._dots[i].setAttribute('transform',
          `translate(${p.displayX}, ${p.displayY}) scale(${p.size})`);
    });

    // Recycle ripple elements, or add only new ripples only if necessary.
    let r;
    while (this._ripples.length < waves.length) {
      r = this._createRipple();
      this._svg.appendChild(r);
      this._ripples.push(r);
    }
    while (this._ripples.length > waves.length) {
      this._svg.removeChild(this._svg.lastChild);
      this._ripples.pop();
    }

    // loop over waves -> ripples
    let crestR, normalisedHalfCrest;
    waves.forEach((wave, i) => {
      // Draw wave pulse. Opacity gets lower as the wave grows.
      crestR = wave.getEasedCrestValue();
      normalisedHalfCrest = crestR / (wave.easingRadius / 2);

      if (normalisedHalfCrest <= 1) {
        this._ripples[i].style.opacity =
            this._currentColor.foreground.waveMaxOpacity *
                easing.easeInQuart(1 - normalisedHalfCrest);

        this._ripples[i].setAttribute('transform',
            `translate(${wave.x}, ${wave.y}) scale(${crestR})`);
      } else {
        this._ripples[i].setAttribute('transform', 'scale(0)');
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
