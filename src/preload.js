const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  captureScreen: async () => await ipcRenderer.invoke("capture-screen"),
});
