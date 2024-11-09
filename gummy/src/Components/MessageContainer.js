import MessageBubble from './MessageBubble';

function MessageContainer({ messages, activeTab }) {
  return (
    <div className="message-container">
      {activeTab === 'Chat with bot' ? (
        <>
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
}

export default MessageContainer;
