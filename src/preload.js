const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  captureScreen: async () => await ipcRenderer.invoke("capture-screen"),
  genAiScreenshotOnly: async (filepath, searchValue) =>
    await ipcRenderer.invoke("genAi-screenshot-only", filepath, searchValue),
});
