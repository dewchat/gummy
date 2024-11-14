import React, { useState, useEffect, useRef } from 'react';
import { database, ref, set, get, onValue } from './firebaseConfig'; // นำเข้า Firebase config

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const endOfMessagesRef = useRef(null);  // สร้าง ref สำหรับเลื่อนไปยังข้อความสุดท้าย

  // ฟังก์ชันเพิ่มข้อความลงใน messages array
  const addMessage = (text, isUser) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text, isUser }
    ]);
  };

  // ฟังก์ชันบันทึกข้อความไปยัง Firebase
  const saveToDatabase = (User, Bot) => {
    const userMessagesRef = ref(database, `users/${username}/messages`);

    // โหลดข้อมูลเก่าในฐานข้อมูลเพื่อรักษาประวัติ
    get(userMessagesRef)
      .then((snapshot) => {
        let messagesArray = snapshot.exists() ? snapshot.val() : [];  // โหลดข้อมูลเก่า (หากมี) หรือเริ่มต้นเป็น array ว่าง

        // เพิ่มข้อความใหม่ลงใน array
        messagesArray.push({ User, Bot, timestamp: Date.now() });

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

  // ฟังก์ชันดึงคำตอบจาก API
  const fetchAnswer = () => {
    if (question.trim() === '') return;

    // แสดงข้อความของผู้ใช้ (แต่ตอนนี้จะเป็น 'bot-message' แทน)
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
      addMessage(data.body, false);  

      // บันทึกข้อมูลใน Firebase
      saveToDatabase(question, data.body);
    })
    .catch(error => {
      console.error("Error:", error);
      addMessage("เกิดข้อผิดพลาด โปรดลองอีกครั้ง", false);
    });
  };

  // ฟังก์ชันดึงประวัติข้อความจาก Firebase เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const userMessagesRef = ref(database, `users/${username}/messages`);

    // ใช้ onValue เพื่อฟังการเปลี่ยนแปลงข้อมูลใน Firebase
    onValue(userMessagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const loadedMessages = snapshot.val();
        const formattedMessages = [];

        loadedMessages.forEach((msg) => {
          if (msg.User != null && msg.User != ""){
          formattedMessages.push({ text: msg.User, isUser: true });  
          }
          if (msg.Bot != null && msg.Bot != ""){
          formattedMessages.push({ text: msg.Bot, isUser: false });     
          }
        });

        // ตั้งค่า messages ที่ได้รับการจัดรูปแบบแล้ว
        setMessages(formattedMessages);
      }
    });

    // ลบการฟังเมื่อคอมโพเนนต์ถูกทำลาย
    return () => {
      // ฟังก์ชันที่จะหยุดฟังเมื่อคอมโพเนนต์ถูกทำลาย
    };
  }, [username]);  // เมื่อ username เปลี่ยน หรือเมื่อคอมโพเนนต์โหลดใหม่

  // ใช้ useEffect เพื่อเลื่อนหน้าจอไปที่ข้อความสุดท้ายทุกครั้งที่ messages เปลี่ยนแปลง
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);  // เมื่อ messages เปลี่ยนแปลง (เพิ่มข้อความใหม่) ให้เลื่อนหน้าจอ

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
        <div ref={endOfMessagesRef} />  {/* ใช้ ref นี้เพื่อเลื่อนจอไปที่นี่ */}
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
