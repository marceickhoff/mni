# mni
[![Latest Version on NPM](https://img.shields.io/npm/v/mni.svg?style=flat-square)](https://npmjs.com/package/mni)
[![Compiled CSS size](https://img.shields.io/github/size/marceickhoff/mni/dist/css/main.css?label=css&color=blue&style=flat-square)](dist/css/main.css)
[![Compiled JS size](https://img.shields.io/github/size/marceickhoff/mni/dist/js/main.js?label=js&color=blue&style=flat-square)](dist/js/main.js)
[![npm](https://img.shields.io/npm/dt/mni.svg?style=flat-square)](https://www.npmjs.com/package/mni)
[![Software License](https://img.shields.io/npm/l/mni.svg?style=flat-square)](LICENSE)

mni _(as in "mini")_ is a mostly unopinionated SCSS and JavaScript framework built with **simplicity and efficiency** in mind.

The main goal of mni is to **eliminate unnecessary bloat** caused by using conventional frameworks (like Bootstrap) while still providing plenty of common features. This is achieved by a **highly modular** architecture that encourages you, the developer, to use only what you need.

mni is meant to be used as a **base library** for you to extend on and **not a "plug-and-play" production-ready solution**.

## Features

* Minimal styling by default so you **don't waste time overriding vendor styles**
* Interactive CLI **setup tool**
* Easy configuration and compilation via [Laravel Mix](https://laravel-mix.com/)
* Out-of-the-box integration of [Autoprefixer](https://github.com/postcss/autoprefixer), [clean-css](https://github.com/jakubpawlowicz/clean-css) and [Modernizr](https://modernizr.com/)
* **Mobile-first** and responsive styling
* Plenty of **common features** you know and love like a sophisticated [grid system](lib/scss/layout/_grid.scss), responsive [navigation bars](lib/scss/layout/_nav.scss), [buttons](lib/scss/components/_buttons.scss), lightweight and mobile-ready [lazy loading](lib/js/modules/lazy.js) and [lightboxes](lib/js/modules/lightbox.js) for images, and [many more](lib)
* JavaScript components as **ES6 modules**
* **Well documented** and clean code

## Work in progress

This is a WIP and not ready for use in production.

Detailed documentation will follow.