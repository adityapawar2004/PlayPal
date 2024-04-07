const { contextBridge, ipcRenderer } = require("electron");
const { async } = require("regenerator-runtime");

contextBridge.exposeInMainWorld("electron", {
  captureScreen: async () => await ipcRenderer.invoke("capture-screen"),
  genAiScreenshotOnly: async (filepath, searchValue, message) =>
    await ipcRenderer.invoke(
      "genAi-screenshot-only",
      filepath,
      searchValue,
      message
    ),
  setApiKey: async (apiKey) => await ipcRenderer.invoke("set-api-key", apiKey),
});
