// App.js
import React, { useState } from 'react';
import Chat from './Chat';
import History from './History';  // นำเข้า History คอมโพเนนต์
import './styles.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat'); // กำหนดแท็บเริ่มต้นเป็น 'chat'

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
        {activeTab === 'chat' ? <Chat /> : <History />} {/* แสดง History คอมโพเนนต์ */}
      </div>
    </div>
  );
}

export default App;
