import React, { useState } from "react";

function ScreenShot() {
  const [filePath, setFilePath] = useState([]);
  const takeScreenshot = async () => {
    try 
    {
      const response = await window.electron.captureScreen();
      console.log(response);
      const genAiResponse = await window.electron.genAiScreenshotOnly(response);
      console.log(genAiResponse);
      localStorage.setItem("screenshot", genAiResponse);
      setFilePath(response); 
    } 
    catch (error) 
    {
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
