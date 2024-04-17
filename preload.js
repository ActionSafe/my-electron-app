/*
 * @description: 
 */
const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (e, value) => callback(value))
})