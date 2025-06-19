import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Chat from './components/Chat';

function Login() {
  const [email, setEmail] = useState('admin@taskflow.com');
  const [password, setPassword] = useState('admin@taskflow');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5100/api/auth/login', {
        userEmail: email,
        userPassword: password,
      }, {
        withCredentials: true,
      });

      const accessToken = response.data?.data?.accessToken;

      if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);
        console.log('Login successful. Token stored in sessionStorage.');
        navigate('/chat');
      } else {
        setError('No access token returned.');
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>Login</h2>
      <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: '#d32f2f', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;