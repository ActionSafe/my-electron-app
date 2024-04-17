const path = require('node:path')
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    // 设置菜单
    const menu = Menu.buildFromTemplate([
      {
        label: "通信测试",
        submenu: [
          {
            click: () => win.webContents.send('update-counter', 1),
            label: '发送+1'
          },
          {
            click: () => win.webContents.send('update-counter', -1),
            label: '发送-1'
          }
        ]
      }
    ])
    Menu.setApplicationMenu(menu)

    // 注册事件处理器
    ipcMain.on('set-title', handelSetTitle)
    // 注册模块处理器
    ipcMain.handle('dialog:openFile', handelOpenFile)
    win.loadFile('index.html')
  }

handelOpenFile = async () => {
  const {canceled, filePaths} = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
}

handelSetTitle = (event, title) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

app.whenReady().then(() => {
  createWindow()
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})