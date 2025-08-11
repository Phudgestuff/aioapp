const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('scanjson', {
    retrieve: (string) => ipcRenderer.invoke('retrieve', string)
});