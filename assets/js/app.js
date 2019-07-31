/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/global.scss');
import 'react-table/react-table.css'

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

// console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './weather/App';
import Archive from './weather/archive';
if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
if (document.getElementById('archive')) {
    ReactDOM.render(<Archive />, document.getElementById('archive'));
}