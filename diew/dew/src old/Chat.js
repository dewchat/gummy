import React, { useState, useEffect } from 'react';
import { database } from './utils/firebase';  // สมมุติว่า firebase ถูกตั้งค่าไว้แล้ว
import { ref, push, onValue } from 'firebase/database';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'chatMessages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = [];
      for (let key in data) {
        messagesArray.push(data[key]);
      }
      setMessages(messagesArray);
    });
  }, []);

  const addMessage = (text, isUser) => {
    const messageObj = { text, isUser, timestamp: Date.now() };
    setMessages(prevMessages => [...prevMessages, messageObj]);

    const messagesRef = ref(database, 'chatMessages');
    push(messagesRef, messageObj);
  };

  const fetchAnswer = () => {
    if (question.trim() === '') return;

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
      addMessage(data.body, false);
    })
    .catch(error => {
      console.error("Error:", error);
      addMessage("เกิดข้อผิดพลาด โปรดลองอีกครั้ง", false);
    });
  };

  return (
    <div>
      <h1>Chat Interface</h1>
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? "user-message" : "bot-message"}>
            <p>{message.text}</p>
            <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      
      <div className="input-section">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
        />
        <button onClick={fetchAnswer}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
