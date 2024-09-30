import React, { useState } from 'react';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    
    if (username === '21k-4896' && password === '4896') {
      login(username);
      setError(''); 
    } else {
      setError('Invalid username or password.'); 
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Login</h2>
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mt-3"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="text-danger mt-3">{error}</p>} {}
    </div>
  );
};

export default Login;
