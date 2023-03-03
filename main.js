const electron = require('electron')
const { app, BrowserWindow } = electron

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  const DISPLAY = electron.screen.getPrimaryDisplay()
  const WIDTH = DISPLAY.workAreaSize.width;
  const HEIGHT = DISPLAY.workAreaSize.height;

  appWidth = 360;
  mainWindow = new BrowserWindow({
    width: appWidth, height: 80, resizable: false,
    frame: false, alwaysOnTop: true,
    skipTaskbar: true, 
    type: 'notification'
  })

  mainWindow.setPosition( WIDTH - appWidth - 20, 40);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  if(process.argv.includes('-d'))
    mainWindow.openDevTools({ mode: 'detach' })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
