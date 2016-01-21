'use strict';

let app = require('app');
let BrowserWindow = require('browser-window');

app.on('ready', () => {
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});
