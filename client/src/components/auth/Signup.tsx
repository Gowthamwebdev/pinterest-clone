import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignupApi } from '../../api/authApi';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('email', email);
      console.log('pass', password);
      console.log('Birthdate', dateOfBirth);

      const response = await userSignupApi({ email, password, dateOfBirth });
      console.log('Signup Successful:', response.message);
      setError(response.message);
      navigate('/');
    } catch (err) {
      console.error(err.message);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography textAlign="left">
        <h1>Email</h1>
        <TextField
          placeholder="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Typography>

      <Typography textAlign="left">
        <h1>Password</h1>
        <TextField
          placeholder="Create your password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Typography>

      <Typography textAlign="left">
        <h1>Birthdate</h1>
        <TextField
          fullWidth
          margin="normal"
          type="date"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </Typography>

      {error && (
        <Typography color="error" textAlign="left">
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{
          mt: 2,
          bgcolor: '#fb2c36',
          borderRadius: 300,
        }}
        onClick={handleSignup}
      >
        {loading ? 'Signing up...' : 'SignUp'}
      </Button>
    </Box>
  );
};

export default SignUpForm;
