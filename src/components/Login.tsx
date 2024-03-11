
import React, { useState } from 'react';
import { Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  onLogin: (userId: number) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(parseInt(userId));
    navigate('/notes');
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        {/* Assuming RegisterUserForm is accessible via a route or modal */}
        <Typography variant="body2" style={{ marginTop: 20 }}>
          New user? <Link href="/register">Register here</Link>
        </Typography>
      </form>
    </div>
  );
};

export default Login;
