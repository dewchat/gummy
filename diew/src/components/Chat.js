import React, { useEffect, useState } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { app } from '../utils/firebase';
import History from './History';

function Chat() {
    const [chat, setChat] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const database = getDatabase(app);
        const chatRef = ref(database, 'chats');
        
        // ใช้ onValue เพื่อดึงข้อมูลแบบเรียลไทม์
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            const chatHistory = data ? Object.values(data) : [];
            setHistory(chatHistory);
        });
    }, []);

    const handleSendMessage = () => {
        const database = getDatabase(app);
        const chatRef = ref(database, 'chats');
        const chatData = { message: chat, timestamp: Date.now() };

        push(chatRef, chatData).then(() => {
            setChat('');
        });
    };

    return (
        <div>
            
            <History history={history} /> {}
            
            <input type="text" value={chat} onChange={(e) => setChat(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>

            
        </div>
    );
}

export default Chat;
