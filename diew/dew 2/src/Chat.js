// Chat.js
import React, { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');

  const addMessage = (text, isUser) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text, isUser }
    ]);
  };

  const fetchAnswer = () => {
    if (question.trim() === '') return;

    // แสดงข้อความของผู้ใช้
    addMessage(question, true);
    setQuestion('');

    fetch("https://ox2bo5qoa4.execute-api.us-east-1.amazonaws.com/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "inputText": question })
    })
    .then(response => response.json())
    .then(data => {
      // แสดงการตอบกลับของบอท
      addMessage(data.body, false);
    })
    .catch(error => {
      console.error("Error:", error);
      addMessage("เกิดข้อผิดพลาด โปรดลองอีกครั้ง", false);
    });
  };

  return (
    <div id="chat-container">
      <div id="chat">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div id="input-container">
        <input
          type="text"
          id="question"
          placeholder=""
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchAnswer()}
        />
        <button onClick={fetchAnswer}>sent</button>
      </div>
    </div>
  );
}

export default Chat;
