import React, { useEffect, useState } from "react";
import { MdRecordVoiceOver } from "react-icons/md";
import { FaCameraRetro, FaSpinner } from "react-icons/fa";  // Import FaSpinner for the loading icon
import { IoChatboxEllipses } from "react-icons/io5";
import Chat from "./chat";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filePath, setFilePath] = useState([]);
  const [chat, setChat] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // State to track loading

  const wrapper = document.getElementById("cn-wrapper");

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    if (wrapper) {
      if (menuOpen) wrapper.classList.add("opened-nav");
      else wrapper.classList.remove("opened-nav");
    }
  }, [menuOpen]);

  const takeScreenshot = async () => {
    setIsLoading(true);  // Start loading
    try {
      const response = await window.electron.captureScreen();
      const GameName = localStorage.getItem("GameName");
      const genAiResponse = await window.electron.genAiScreenshotOnly(response, GameName);
      setFilePath(response);
      setAiResponse(genAiResponse);
      setShowResponse(true); // Show the AI response box
    } catch (error) {
      console.error("Failed to capture screen:", error);
      setFilePath("Failed to capture screen");
      setAiResponse("Failed to get AI response");
      setShowResponse(true);
    }
    setIsLoading(false);  // End loading
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
              <a href="#" onClick={takeScreenshot}>
                <span>
                  {isLoading ? <FaSpinner className="fa-spin" /> : <FaCameraRetro />}
                </span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => {setChat(!chat); setMenuOpen(false)}}>
                <span>
                  <IoChatboxEllipses />
                </span>
              </a>
            </li>
          </ul>
        </div>
        {chat && <Chat setMenuOpen={setMenuOpen} setChat={setChat} />}
        {showResponse && (
          <div
            style={{
              backgroundColor: "#fff",
              color: "#333",
              padding: "20px",
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "1000",
              width: "80%",
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <p>{aiResponse}</p>
            <button onClick={() => setShowResponse(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
