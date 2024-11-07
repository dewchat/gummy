import React, { useState } from 'react';
import Tabs from './Components/Tabs';
import MessageContainer from './Components/MessageContainer';
import InputBar from './Components/InputBar';

function App() {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('Chat with bot');

  const handleSend = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="chat-app">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <MessageContainer messages={messages} activeTab={activeTab} />
      <InputBar onSend={handleSend} />
    </div>
  );
}

export default App;
