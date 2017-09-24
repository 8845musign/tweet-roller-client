const { app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url')

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 800,
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../../html/main.html'),
    protocol: 'file:',
    slashes: true
  }))
})
