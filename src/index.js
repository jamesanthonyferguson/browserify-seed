// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var View = require('famous/core/View');

var AppController = require('./views/AppController');

// create the main context
var mainContext = Engine.createContext();

// your app here
var appController = new AppController();


mainContext.add(appController);
