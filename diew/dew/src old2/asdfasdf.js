// Chat.js
import React, { useState, useEffect } from 'react';
import { database, ref, set, get, child } from './firebaseConfig'; // นำเข้า Firebase config

function Chat({ username }) {  // รับค่า username มาจาก props (ชื่อผู้ใช้ที่ล็อกอิน)
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');

  // โหลดประวัติข้อความจาก Firebase เมื่อคอมโพเนนต์ถูกแสดง
  useEffect(() => {
    const userMessagesRef = ref(database, `users/${username}/messages`);

    // ใช้ get() เพื่อโหลดข้อมูลข้อความ
    get(userMessagesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // ถ้ามีข้อมูลเก่าจะให้แสดงข้อความนั้น ๆ
          setMessages(snapshot.val());
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [username]); // เรียกใช้ effect เมื่อ username เปลี่ยน

  const addMessage = (text, isUser) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text, isUser }
    ]);
  };

  const saveToDatabase = (question, answer) => {
    const userMessagesRef = ref(database, `users/${username}/messages`);

    get(userMessagesRef)
      .then((snapshot) => {
        let messagesArray = snapshot.exists() ? snapshot.val() : [];  // โหลดข้อมูลเก่า (หากมี) หรือเริ่มต้นเป็น array ว่าง

        // เพิ่มข้อความใหม่ลงใน array
        messagesArray.push({ question, answer, timestamp: Date.now() });

        // บันทึกข้อมูลทั้งหมดลง Firebase
        set(userMessagesRef, messagesArray)
          .catch((error) => {
            console.error("Error saving message to Firebase:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  const fetchAnswer = () => {
    if (question.trim() === '') return;

    // แสดงข้อความของผู้ใช้
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
      // แสดงการตอบกลับของบอท
      addMessage(data.body, false);

      // บันทึกข้อมูลใน Firebase
      saveToDatabase(question, data.body);
    })
    .catch(error => {
      console.error("Error:", error);
      addMessage("เกิดข้อผิดพลาด โปรดลองอีกครั้ง", false);
    });
  };

  return (
    <div id="chat-container">
      <div id="chat">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div id="input-container">
        <input
          type="text"
          id="question"
          placeholder="ถามอะไรสักอย่าง..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchAnswer()}
        />
        <button onClick={fetchAnswer}>ส่ง</button>
      </div>
    </div>
  );
}

export default Chat;
