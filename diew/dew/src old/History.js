import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from './utils/firebase';

function History() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, 'chatMessages');

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let key in data) {
        loadedMessages.push(data[key]);
      }
      setIssues(loadedMessages);
    });
  }, []);

  return (
    <div className="history">
      <h2>Problem History</h2>
      {issues.map((issue, index) => (
        <div key={index} className="issue">
          <h3>Problem No. #{String(index + 1).padStart(5, '0')}</h3>
          <p><strong>Message:</strong> {issue.text}</p>
          <p><strong>User:</strong> {issue.isUser ? "User" : "Bot"}</p>
          <p><strong>Date/Time:</strong> {new Date(issue.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default History;
