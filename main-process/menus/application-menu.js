const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
const dialog = electron.dialog
const storage = require('electron-json-storage')
const fs = require('fs');

let doExport = function(key)
    {
        return new Promise((resolve, reject) => {
            storage.get(key, (error, data) => {
                if(error)
                    reject(error);
                else {
                    let res = {};
                    res[key] = data;
                    resolve(res);
                }
            });
        });
    },
    doImport = function(key, value)
    {
        return new Promise((resolve, reject) => {
            storage.set(key, value, (error) => {
                if(error)
                    reject(error);
                else
                    resolve();
            });
        });
    },
    reloadWindow = function(focusedWindow)
    {
        if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
                BrowserWindow.getAllWindows().forEach(function (win) {
                    if (win.id > 1) {
                        win.close()
                    }
                })
            }
            focusedWindow.reload()
        }
    }

let template = [{
  label: 'Edit',
  submenu: [{
      label: 'Find',
      accelerator: 'CmdOrCtrl+F',
      click: () => {
          BrowserWindow.getAllWindows().forEach(function (win) {
              win.send("window-find");
          })
      }
  },{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  },{
    type: 'separator'
  }, {
    label: 'Export',
    accelerator: 'CmdOrCtrl+E',
    click: () => {
      dialog.showOpenDialog({properties: ['openDirectory']}, (filenames) => {
        if(filenames && filenames[0]){
          storage.keys((error, keys) => {
            if (error) throw error;
            let chain = [];
            for (let key of keys) {
                chain.push(doExport(key));
            }
            Promise.all(chain).then((values) => {
                fs.writeFile(filenames[0] + '/back.' + new Date().getTime() + '.hctb', JSON.stringify(values));
            });
          });
        }
      })
    }
  }, {
    label: 'Import',
    accelerator: 'CmdOrCtrl+I',
    click: (item, focusedWindow) => {
        dialog.showOpenDialog({filters: [{name: 'HCT back File Type', extensions: ['hctb']}],properties: ['openFile']}, (filenames) => {
            if(filenames && filenames[0] && fs.existsSync(filenames[0])){
                fs.readFile(filenames[0], (err, data) => {
                    try{
                        let json = JSON.parse(data);

                        storage.clear((err) => {
                            if(!err){
                                let chain = [];
                                for(let i in json){
                                    for(let j in json[i]){
                                        chain.push(doImport(j, json[i][j]));
                                    }
                                }
                                Promise.all(chain).then((value) => {
                                    reloadWindow(focusedWindow);
                                });
                            }
                        });
                    }catch(e){}
                });
            }
        });
    }
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
        reloadWindow(focusedWindow);
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }]
}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: 'Reopen Window',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: function () {
      app.emit('activate')
    }
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'About HCT',
    click: function () {
      electron.shell.openExternal('https://hisune.com')
    }
  }]
}]

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }
  // ,
  //   {
  //   label: 'Checking for Update',
  //   enabled: false,
  //   key: 'checkingForUpdate'
  // }, {
  //   label: 'Check for Update',
  //   visible: false,
  //   key: 'checkForUpdate',
  //   click: function () {
  //     require('electron').autoUpdater.checkForUpdates()
  //   }
  // }, {
  //   label: 'Restart and Install Update',
  //   enabled: true,
  //   visible: false,
  //   key: 'restartToUpdate',
  //   click: function () {
  //     require('electron').autoUpdater.quitAndInstall()
  //   }
  // }
  ]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `About ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `Hide ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})
