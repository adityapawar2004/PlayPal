import React, { useState } from "react";
import Menu from "./menu";

const Chat = ({
  setMenuOpen,
  setChat,
  setAiResponse,
  setIsLoading,
  setShowResponse,
}) => {
  const [messages, setMessages] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const takeScreenshot = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await window.electron.captureScreen();
      const GameName = localStorage.getItem("GameName");
      const genAiResponse = await window.electron.genAiScreenshotOnly(
        response,
        GameName,
        inputMessage
      );
      setAiResponse(genAiResponse);
      setShowResponse(true);
      console.log(genAiResponse);
    } catch (error) {
      console.error("Failed to capture screen:", error);
      setShowResponse(true);
    }
    setIsLoading(false); // End loading
  };

  const sendMessage = () => {
    setMessages(inputMessage);
    setInputMessage("");
    // return the Menu component
    takeScreenshot();
    setChat(false);
    setMenuOpen(true);
  };

  return (
    <div
      style={{
        width: "350px",
        backgroundColor: "rgba(5, 11, 57, 0.933)",
        margin: "auto",
        marginTop: "40px",
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          name="message"
          id="message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={{
            flex: 1,
            width: "300px",
            height: "100px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            height: "50px",
            padding: "8px 20px",
            borderRadius: "5px",
            backgroundColor: "hsl(141, 92%, 42%)",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
