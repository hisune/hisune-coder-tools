const path = require('path')
const glob = require('glob')
const electron = require('electron')
const ipc = electron.ipcMain
const Menu = electron.Menu
const Tray = electron.Tray
const autoUpdater = require('./auto-updater')

const BrowserWindow = electron.BrowserWindow
const app = electron.app


const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Electron APIs')

var mainWindow = null

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) {
    mainWindow.show()
    mainWindow.focus()
  }
})

ipc.on('search-action', (event, arg) => {
  mainWindow.webContents.findInPage(arg);
});
ipc.on('search-done', (event) => {
  mainWindow.webContents.stopFindInPage('clearSelection');
});
ipc.on('document-is-ready', () => {
  mainWindow.show();
});
function initialize () {
  var shouldQuit = makeSingleInstance()
  if (shouldQuit) return app.quit()

  loadDemos()

  function createWindow () {
    var windowOptions = {
      width: 1280,
      minWidth: 680,
      height: 890,
      title: app.getName(),
      show: false
    }

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
    }
    mainWindow.on('close', function(event){
      event.preventDefault()
      mainWindow.hide()
    });
    mainWindow.on('closed', function () {
      mainWindow = null
    })
  }

  app.on('ready', function () {
    createWindow()
    const iconName = process.platform === 'win32' ? '/main-process/native-ui/tray/windows-icon.png' : '/main-process/native-ui/tray/iconTemplate.png'
    const iconPath = path.join(__dirname, iconName)
    appIcon = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([{
      label: 'Show',
      click: function () {
        mainWindow.show()
      }
    },{
      label: 'Hide',
      click: function () {
        mainWindow.hide()
      }
    },{
      label: 'Quit',
      click: function () {
        app.exit(1)
      }
    }])
    appIcon.setToolTip('Hisune Coder Tool')
    appIcon.setContextMenu(contextMenu)
    appIcon.on('click', function(){
      if(mainWindow.isVisible()){
        mainWindow.hide()
      }else{
        mainWindow.show()
      }
    });
    autoUpdater.initialize()
  })

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
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return false

  return app.makeSingleInstance(function () {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadDemos () {
  var files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach(function (file) {
    require(file)
  })
  autoUpdater.updateMenu()
}

// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
  case '--squirrel-install':
    autoUpdater.createShortcut(function () { app.quit() })
    break
  case '--squirrel-uninstall':
    autoUpdater.removeShortcut(function () { app.quit() })
    break
  case '--squirrel-obsolete':
  case '--squirrel-updated':
    app.quit()
    break
  default:
    initialize()
}
