import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  return (
    <div style={{ width: "400px", backgroundColor: "lightblue", margin: "auto", marginTop: "40px", borderRadius: "10px", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Chat</h1>
      </div>
      <div style={{ marginBottom: "10px", minHeight: "200px", maxHeight: "300px", overflowY: "auto", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: "10px", textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ backgroundColor: message.sender === 'user' ? '#3f51b5' : '#f50057', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{message.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          name="message"
          id="message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px 20px", borderRadius: "5px", backgroundColor: "#3f51b5", color: "white", border: "none", cursor: "pointer" }}>Send</button>
      </div>
    </div>
  );
};

export default Chat;