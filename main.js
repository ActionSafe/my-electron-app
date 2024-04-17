const path = require('node:path')
const { app, BrowserWindow, ipcMain, dialog } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
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