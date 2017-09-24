const { app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url')

module.exports = class TimelineWindow {
  constructor() {
    this.window = null;
    this.start();
  }

  start() {
    app.on('ready', () => {
      this.createWindow();
    });
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 400,
      height: 800,
    });

    this.window.loadURL(url.format({
      pathname: path.join(__dirname, '../../html/main.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
}