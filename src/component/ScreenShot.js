import React, { useState } from "react";

function ScreenShot() {
  const [filePath, setFilePath] = useState([]);
  const takeScreenshot = async () => {
    try {
      // Assuming "capture-screen" is the channel you're using
      const response = await window.electron.captureScreen();
      console.log(response);
      const genAiResponse = await window.electron.genAiScreenshotOnly(response);
      console.log(genAiResponse);
      setFilePath(response); // Make sure response is the path or error message
    } catch (error) {
      console.error("Failed to capture screen:", error);
      setFilePath("Failed to capture screen");
    }
  };

  return (
    <div>
      <button onClick={takeScreenshot}>Take Screenshot</button>
      {filePath}
    </div>
  );
}

export default ScreenShot;
