import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '..//assets/css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send login credentials to backend
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Redirect to dashboard after successful login
      navigate('/dashboard');  // Update the path to your dashboard page
      alert('Login successful! Welcome ');
    } else {
      alert('Login failed: ' + data.message);
    }
  };

  return (
    <div className='login-form'>
     <div className="inner-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='login-button'>Login</button>
      </form>
      <p className='login-p'>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
     </div>
    </div>
  );
};

export default Login;
