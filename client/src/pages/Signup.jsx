import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css"
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    await axios.post('http://localhost:3000/auth/signup', { email, password });
    navigate('/login');
  };

  return (
    <div>
      <h2>Signup</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}
