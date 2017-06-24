import * as utils from './utils.js';
import * as easing from './easing.js';
import AbstractRenderer from './renderer.js';

const SVGns = 'http://www.w3.org/2000/svg';

export default class DomRenderer extends AbstractRenderer {
  constructor(rootNode, color) {
    super(rootNode, color);

    this._dots = [];
    this._ripples = [];

    // Clean root node, append canvas.
    while (this.rootNode.firstChild) {
      this.rootNode.removeChild(this.rootNode.firstChild);
    }
    this._container = document.createElement('div');
    this.rootNode.appendChild(this._container);

    this.currentColor = color;
  }

  static get RendererType() {
    return 'dom';
  }

  set currentColor(color) {
    this._currentColor = color;

    // Will affect dots color (through the 'currentColor' value).
    this._container.style.color = `rgb(${this._currentColor.foreground.r},
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
    this._container.style.width = `${width}px`;
    this._container.style.height = `${height}px`;
  }

  draw(points, waves) {
    // Recycle dots elements, or add only new dots only if necessary.
    let d;
    while (this._dots.length < points.length) {
      d = this._createDot();
      this._container.appendChild(d);
      this._dots.push(d);
    }
    while (this._dots.length > points.length) {
      this._container.removeChild(this._container.lastChild);
      this._dots.pop();
    }

    // Transform dots.
    points.forEach((p, i) => {
      this._dots[i].style.transform =
          `translate(${p.displayX}px, ${p.displayY}px) scale(${p.size})`;
    });

    // Recycle ripple elements, or add only new ripples only if necessary.
    let r;
    while (this._ripples.length < waves.length) {
      r = this._createRipple();
      this._container.appendChild(r);
      this._ripples.push(r);
    }
    while (this._ripples.length > waves.length) {
      this._container.removeChild(this._container.lastChild);
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

        this._ripples[i].style.transform =
            `translate(${wave.x}px, ${wave.y}px) scale(${crestR})`;
      } else {
        this._ripples[i].style.transform = 'scale(0)';
      }
    });
  }

  _createDot() {
    const rect = this._createShape();
    rect.style.willChange = 'transform';
    return rect;
  }

  _createRipple() {
    const circle = this._createShape();
    circle.style.willChange = 'transform, opacity';
    circle.style.borderRadius = '50%';
    return circle;
  }

  _createShape() {
    const shape = document.createElement('div');
    shape.style.position = 'absolute';
    shape.style.top = '0';
    shape.style.left = '0';
    shape.style.width = '1px';
    shape.style.height = '1px';
    shape.style.backgroundColor = 'currentColor';
    return shape;
  }
}
