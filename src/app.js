const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 800,
  });

  mainWindow.loadURL('file://' + __dirname + '/renderer/index.html');
})
