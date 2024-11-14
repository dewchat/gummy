// History.js
import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from './firebaseConfig';

function History({ username }) {
  const [customerProblem, setCustomerProblem] = useState(null);

  useEffect(() => {
    const problemRef = ref(database, `users/${username}/customer_problem`);
    
    // Listen for real-time updates
    const unsubscribe = onValue(problemRef, (snapshot) => {
      if (snapshot.exists()) {
        setCustomerProblem(snapshot.val());
      } else {
        setCustomerProblem(null); // No customer problem found
      }
    }, (error) => {
      console.error("Error fetching customer problem:", error);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [username]);

  return (
    <div id="history-container">
      <h2>Customer Problem History</h2>
      {customerProblem ? (
        <div className="customer-problem">
          <p><strong>Problem Message:</strong> {customerProblem.problemMessage}</p>
          <p><strong>Department:</strong> {customerProblem.department}</p>
          <p><strong>Status:</strong> {customerProblem.status}</p>
          <p><strong>Timestamp:</strong> {new Date(customerProblem.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>No customer problems reported.</p>
      )}
    </div>
  );
}

export default History;
