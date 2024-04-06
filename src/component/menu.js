import React, { useState } from "react";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filePath, setFilePath] = useState([]);

  const wrapper = document.getElementById("cn-wrapper");
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  React.useEffect(() => {
    if (wrapper) {
      if (menuOpen) wrapper.classList.add("opened-nav");
      else wrapper.classList.remove("opened-nav");
    }
  }, [menuOpen]);

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
    <div className="container csstransforms">
      <div className="component">
        <button className="cn-button" onClick={toggleMenu} id="cn-button">
          Menu
        </button>
        <div className="cn-wrapper" id="cn-wrapper">
          <ul>
            <li>
              <a href="#">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={takeScreenshot}>
                <span>screenshot</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Transport</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Gift</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Clothes</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Games</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
