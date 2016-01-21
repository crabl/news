'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');

app.on('window-all-closed', () => {
  // if (process.platform != 'darwin') {
  app.quit();
  // }
});

app.on('ready', () => {
  let mainWindow = new BrowserWindow({ width: 1200, height: 600 });
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
