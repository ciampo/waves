# Waves
Code experiment on 2d graphics. The aim is to reproduce the propagation of
waves across a grid of dots, seen fro a bird's eye perspective.

As an exercise, the scene will be rendered with different techniques:
- regular canvas ('2d' context)
- offscreenCanvas (on a separate thread)
- SVG
- DOM
- WebGL (with shaders)

TODO:
- refactor code and split canvas renderer on a separate class
- investigate perf problems (possible memory leak, rendering canvas grid in one pass by using paths)
- implement other renderers