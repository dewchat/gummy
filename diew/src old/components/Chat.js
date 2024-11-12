import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { app } from '../utils/firebase';
import History from './History';
import Chatbot from './Chatbot';

function Chat() {
  const [chat, setChat] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const database = getDatabase(app);
    const chatRef = ref(database, 'chats');

    // Real-time listener for Firebase data
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const chatHistory = data ? Object.values(data) : [];
      setHistory(chatHistory);
    });
  }, []);

  const handleSendMessage = () => {
    if (!chat.trim()) return; // Prevent sending empty messages

    // Add user message to history
    const database = getDatabase(app);
    const chatRef = ref(database, 'chats');
    const chatData = { message: chat, timestamp: Date.now(), isUser: true };

    push(chatRef, chatData).then(() => {
      setChat(''); // Clear the input field

      // Directly send chatbot response after user message
      const botMessage = "Hello, how can I assist you?"; // Replace with real bot logic
      addMessageToHistory(botMessage, false); // Add bot's response to history
    });
  };

  const addMessageToHistory = (text, isUser) => {
    const database = getDatabase(app);
    const chatRef = ref(database, 'chats');
    const chatData = { message: text, timestamp: Date.now(), isUser };

    push(chatRef, chatData);
  };

  return (
    <div>
      <History history={history} />
      <div id="input-container">
        <input
          type="text"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
