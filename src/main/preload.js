const { contextBridge, ipcRenderer } = require('electron');
window.ipcRenderer = ipcRenderer;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(method, ...args) {
      ipcRenderer.send('sql', method, args);
    },
    on(channel, func) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    once(channel, func) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    },
  },
});
