function Tabs({ activeTab, setActiveTab }) {
    return (
      <div className="tabs">
        <button onClick={() => setActiveTab('Chat with bot')}>
          Chat with bot
        </button>
        <button onClick={() => setActiveTab('History')}>History</button>
      </div>
    );
  }
  
  export default Tabs;
  