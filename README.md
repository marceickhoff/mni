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
* Interactive CLI **setup tool** with integrated **support for Laravel projects**
* Easy configuration and compilation via [Laravel Mix](https://laravel-mix.com/) (even *without* Laravel!)
* Out-of-the-box integration of [Autoprefixer](https://github.com/postcss/autoprefixer), [clean-css](https://github.com/jakubpawlowicz/clean-css) and [Modernizr](https://modernizr.com/)
* **Mobile-first** and responsive styling
* Plenty of **common features** you know and love like a sophisticated [grid system](lib/scss/layout/_grid.scss), responsive [navigation bars](lib/scss/layout/_nav.scss), [buttons](lib/scss/components/_buttons.scss), lightweight and mobile-ready [lazy loading](lib/js/modules/lazy.js) and [lightboxes](lib/js/modules/lightbox.js) for images, and [many more](lib)
* JavaScript components as **ES6 modules**
* **Well documented** and clean code

## Work in progress

This is a WIP and not ready for use in production.

Detailed documentation will follow.

Please use ``npm run docs`` to generate a sassdoc documentation page in the meantime.

## Installation and setup

First, navigate to the root of your project and run:

```
npm i mni
```

After mni and its dependencies were installed successfully, run the setup:

```
mni setup
```

The setup will ask you to choose the desired paths for the source and destination files and create a boilerplate for your project containing the following files:

* **Public path (location of mix-manifest.json):** This is the directory for the compiled stylesheets and scripts that is publicly available. This is also where the ``mix-manifest.json`` will be created when compiling.
* **Source Sass/SCSS file:** This is the main entry point of your stylesheets. It will already contain imports of everything that mni has to offer. You can choose if you want to use the SCSS or Sass syntax by giving this file the corresponding file extension (``.scss``/``.sass``).
* **Output CSS file:** This is the publicly exposed output CSS file.
* **Source JS file:** This is the main entry point of your JavaScripts. It will already contain imports of every available mni ES6 module.
* **Output JS file:** This is the publicly exposed output JS file.

If you run the setup in the root directory of a Laravel project, the setup will detect that and suggest the default Laravel paths so you can just press <kbd>↵ Enter</kbd>.

Furthermore, the setup script will create these utility files if they don't already exist:

* ``webpack.mix.js``: The main [Laravel Mix configuration file](https://laravel-mix.com/docs/5.0/basic-example) of your project
* ``.browserlistrc``: This contains a [browserslist](https://github.com/browserslist/browserslist) that will be used by [Autoprefixer](https://github.com/postcss/autoprefixer)
* ``.modernizrrc``: The configuration file for your project's [Modernizr](https://github.com/Modernizr/Modernizr) builds