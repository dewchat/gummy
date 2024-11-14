// Login.js
import React, { useState } from 'react';
import { database, ref, set } from './firebaseConfig'; // Firebase config
import { getDatabase, child, get } from 'firebase/database';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      // ตรวจสอบว่า user นี้มีข้อมูลใน Firebase หรือไม่
      const dbRef = ref(database);
      const userRef = child(dbRef, `users/${username}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const user = snapshot.val();
        if (user.password === password) {
          onLogin(username);
        } else {
          setError('รหัสผ่านไม่ถูกต้อง');
        }
      } else {
        // ถ้า user ยังไม่เคยลงทะเบียน จะบันทึกชื่อผู้ใช้และรหัสผ่านใน Firebase
        set(ref(database, `users/${username}`), {
          password: password,
        }).then(() => {
          onLogin(username);
        }).catch((err) => {
          setError('เกิดข้อผิดพลาดในการบันทึกข้อมูลลง Firebase');
        });
      }
    } else {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
    }
  };

  return (
    <div className="login-form">
      <h2>เข้าสู่ระบบ</h2>
      <input
        type="text"
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>เข้าสู่ระบบ</button>
    </div>
  );
}

export default Login;
