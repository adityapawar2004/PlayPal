const {
  app,
  BrowserWindow,
  ipcMain,
  desktopCapturer,
  dialog,
} = require("electron");
const path = require("node:path");
const fs = require("fs");
const captureScreen = require("./backend/captureScreenShot");
const screenshotOnly = require("./backend/genAiFunctions");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: false,
    },
  });
  mainWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}?window=main`);
};

const createTransparentWindow = () => {
  const transparentWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maxwidth: 800,
    maxheight: 600,
    minwidth: 800,
    minheight: 600,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
  
    alwaysOnTop: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });
  transparentWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}?window=transparent`);
};

app.whenReady().then(() => {
  createMainWindow();
  createTransparentWindow(); // This line creates the additional transparent window

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
      createTransparentWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const handleScreenshotOnly = async (event, filepath) => {
  const res = await screenshotOnly(filepath);
  return res;
};

ipcMain.handle("capture-screen", captureScreen);
ipcMain.handle("genAi-screenshot-only", handleScreenshotOnly);

// Add additional main process code here, or in separate files
