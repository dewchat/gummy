import React from 'react';

function History({ history }) {
  const groupedMessages = history.reduce((acc, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedMessages).map((date) => (
        <div key={date} style={{ marginBottom: '10px' }}>
          <div
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            {date}
          </div>
          {groupedMessages[date].map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px',
                backgroundColor: msg.isUser ? '#D3F8D3' : '#E4E4E4', // Different background for user and bot
              }}
            >
              <span>{msg.message}</span>
              <span style={{ fontSize: '0.8em', color: 'gray' }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default History;
