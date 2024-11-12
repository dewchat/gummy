import React, { useState } from 'react';
import { database } from "../utils/firebase"; 

import { ref, push } from "firebase/database"; 
function Message() {
    const [title, setTitle] = useState('test');

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };

    const sentMessage = () => {
        const messageRef = ref(database, 'Message'); 
        const message = {
            title,
            complete: false
        };

        push(messageRef, message); 
    };

    return (
        <div>
            <input type="text" onChange={handleOnChange} value={title} />
            <button className="add-btn" onClick={sentMessage}>Sent Message</button>
        </div>
    );
}

export default Message;
