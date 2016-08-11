#!/usr/bin/env node

"use strict";

var fs = require('fs');
var path = require('path');
var cleanCSS = require('clean-css');
var uglifyJS = require("uglify-js");

// Load the CSS and minify
function css(fileName) {
  try {
    var cssFile = fs.readFileSync(path.join(__dirname, 'css', fileName), 'utf8');
  } catch(err) {
    console.error('Error reading css:', err);
  }
  try {
    var minified = new cleanCSS().minify(cssFile).styles;
    return minified;
  } catch(err) {
    console.error('Error compressing css:', err);
  }
}

fs.writeFile(path.join(__dirname, 'css', 'portrait-style.min.css'), css('portrait-style.css'), 'utf8',
  function (err) {
    if (err) {
      console.error('Error writing min.css:', err);
    }
  }
);

fs.writeFile(path.join(__dirname, 'css', 'print.min.css'), css('print.css'), 'utf8',
  function (err) {
    if (err) {
      console.error('Error writing min.css:', err);
    }
  }
);

fs.writeFile(path.join(__dirname, 'js', 'perfmatters.min.js'),
  uglifyJS.minify(path.join(__dirname, 'js', 'perfmatters.js')).code, 'utf8',
  function (err) {
    if (err) {
      console.error('Error writing min.js:', err);
    }
  }
);
