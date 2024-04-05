const {
  app,
  BrowserWindow,
  ipcMain,
  desktopCapturer,
  dialog,
} = require("electron");
const path = require("node:path");
const fs = require("fs");
const captureScreen = require("./functions/captureScreenShot");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maxwidth: 800,
    maxheight: 600,
    minwidth: 800,
    minheight: 600,

    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true, // It's important for security reasons
      enableRemoteModule: false, // It's recommended to keep this disabled for security reasons
    },
    // frame:false,
    // autoHideMenuBar:true,
    // transparent:true,
    // alwaysOnTop:true,
  });

  
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("capture-screen", captureScreen);

// Add additional main process code here, or in separate files
