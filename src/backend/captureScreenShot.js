const screenshot = require("screenshot-desktop");
const fs = require("fs").promises; // Use the promise-based API of fs
const path = require("path");
const { app } = require("electron");

async function captureScreen() {
  try {
    // Ensure the screenshots directory exists
    const screenshotsDir = path.join(app.getAppPath(), "screenshots");
    await fs.mkdir(screenshotsDir, { recursive: true });

    // Use a timestamp to create a unique filename for each screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filePath = path.join(screenshotsDir, `screenshot-${timestamp}.png`);

    // Use screenshot-desktop to capture the screen
    await screenshot({ filename: filePath });
    console.log(`Screenshot saved to ${filePath}`);
    return filePath;
  } catch (err) {
    console.error("Failed to save screenshot", err);
    return "Failed to save screenshot";
  }
}

module.exports = captureScreen;
