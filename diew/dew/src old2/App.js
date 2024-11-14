// App.js
import React, { useState } from 'react';
import Chat from './Chat';
import History from './History';
import Login from './Login';
import './styles.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </div>
        <div 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'chat' ? <Chat username={username} /> : <History />}
      </div>
    </div>
  );
}

export default App;
