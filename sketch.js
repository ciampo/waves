import * as easing from './easing.js';
import * as utils from './utils.js';
import Wave from './wave.js';
import Grid from './grid.js';
import CanvasRenderer from './canvas-renderer.js';
import SvgRenderer from './svg-renderer.js';

export default class Sketch {

  static get RendererTypeCanvas() {
    return 'canvas';
  }

  static get RendererTypeSvg() {
    return 'svg';
  }

  static get RendererTypes() {
    return [
      Sketch.RendererTypeCanvas,
      Sketch.RendererTypeSvg
    ];
  }

  static get ColorModeDark() {
    return 'dark';
  }

  static get ColorModeLight() {
    return 'light';
  }

  static get ColorModes() {
    return [
      Sketch.ColorModeDark,
      Sketch.ColorModeLight
    ];
  }

  static getRenderer(rendererType, ...rendererArgs) {
    switch(rendererType) {
      case Sketch.RendererTypeCanvas:
        return new CanvasRenderer(...rendererArgs);
      case Sketch.RendererTypeSvg:
        return new SvgRenderer(...rendererArgs);
    }
  }

  static get DefaultOptions() {
    return {
      gridGap: 40,
      gridDotSize: 2,
      waveCrestVelocity: 12,
      waveCrestDecay: 400,
      colorModes: {
        [Sketch.ColorModeDark]: {
          background: {r: 40, g: 40, b: 40, waveMaxOpacity: 0.02},
          foreground: {r: 255, g: 255, b: 255, waveMaxOpacity: 0.02}
        },
        [Sketch.ColorModeLight]: {
          background: {r: 240, g: 240, b: 240, waveMaxOpacity: 0.02},
          foreground: {r: 40, g: 40, b: 40, waveMaxOpacity: 0.02}
        }
      },
      currentColorMode: Sketch.ColorModeDark,
      rendererType: Sketch.RendererTypes[0]
    };
  }

  constructor(rootEl, options = {}) {
    // From arguments
    this._root = rootEl;
    this.options = Object.assign({}, Sketch.DefaultOptions, options);

    // Public attributs
    this.sketchSize = {w: 0, h: 0, diagonal: 0};
    this.grid = new Grid(this.options.gridGap, this.options.gridDotSize);
    this.waves = [];

    // Private attributes.
    this._drawing = false;

    // Binding functions.
    this.onResize = this.onResize.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.drawFrame = this.drawFrame.bind(this);

    this._root.addEventListener('pointerup', this.onPointerUp, false);


    this._colorMode = this.options.currentColorMode;
    // Triggers the creation of a new renderer.
    this.rendererType = this.options.rendererType;
  }

  set rendererType(r) {
    this._rendererType = r;

    this.renderer = Sketch.getRenderer(this._rendererType,
        this._root, this.options.colorModes[this._colorMode]);
    this.onResize();
  }

  get rendererType() {
    return this._rendererType;
  }

  set colorMode(c) {
    this._colorMode = c;

    this.renderer && (this.renderer.currentColor =
        this.options.colorModes[this._colorMode]);
  }

  get colorMode() {
    return this._colorMode;
  }

  startDrawing() {
    this._drawing = true;
    requestAnimationFrame(this.drawFrame);
  }

  stopDrawing() {
    this._drawing = false;
  }

  switchColorMode() {
    this.colorMode =
        this._colorMode === Sketch.ColorModeDark ?
        Sketch.ColorModeLight : Sketch.ColorModeDark;
  }

  onResize() {
    // Update sketch sizes
    this.sketchSize.w = window.innerWidth;
    this.sketchSize.h = window.innerHeight;
    this.sketchSize.diagonal =
        utils.getDistance2d(0, 0, this.sketchSize.w, this.sketchSize.h);

    // Update grid and renderer.
    this.grid.resize(this.sketchSize.w, this.sketchSize.h, this.waves.length);
    this.renderer.resize(this.sketchSize.w, this.sketchSize.h);
  }

  onPointerUp(evt) {
    const maxX = utils.absMax(evt.clientX, evt.clientX - this.sketchSize.w);
    const maxY = utils.absMax(evt.clientY, evt.clientY - this.sketchSize.h);

    this.waves.push(new Wave(evt.clientX, evt.clientY,
        Math.sqrt(maxX * maxX + maxY * maxY) + this.options.waveCrestDecay,
        this.sketchSize.diagonal + this.options.waveCrestDecay,
        this.options.waveCrestVelocity,
        this.options.waveCrestDecay,
        easing.easeOutQuad));

    this.grid.addWave();
  }

  drawFrame() {
    if (this._drawing) {
      requestAnimationFrame(this.drawFrame);
    }

    this.grid.update(this.waves);
    this.renderer.draw(this.grid.points, this.waves);

    // Grow wave, remove if expired.
    this.waves.forEach((wave, wIndex) => {
      wave.grow();
      if (wave.isExpired()) {
        this.waves.splice(wIndex, 1);
        this.grid.removeWave(wIndex);
      }
    });
  }

};