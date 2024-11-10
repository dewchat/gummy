import React, { useEffect, useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { app } from '../utils/firebase';
import History from './History';

function Chat() {
    const [chat, setChat] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        handleSendMessage();
    },[]);

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
            <input type="text" value={chat} onChange={(e) => setChat(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>

            <History history={history} />  {/* ใช้ History component */}
        </div>
    );
}

export default Chat;
