import React, { useState } from 'react';

function Chatbot({ onMessageSend }) {
  const [userMessage, setUserMessage] = useState('');

  const addMessage = (text, isUser) => {
    onMessageSend(text, isUser);
  };

  const fetchAnswer = () => {
    const question = userMessage.trim();
    if (question === "") return;

    // Display user message
    addMessage(question, true);
    setUserMessage('');

    fetch("https://ox2bo5qoa4.execute-api.us-east-1.amazonaws.com/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputText: question }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display bot response
        addMessage(data.body, false);
      })
      .catch((error) => {
        console.error("Error:", error);
        addMessage("An error occurred. Please try again.", false);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={fetchAnswer}>Send</button>
    </div>
  );
}

export default Chatbot;
