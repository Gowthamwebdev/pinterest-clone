import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginApi } from '../../api/authApi';
import { useUserStore } from '../../stores/userStore/userStore';
import { useAuthStore } from '../../stores/AuthStore';
import Cookies from 'js-cookie';
import { loginSchema } from '../../Validations/loginSchema';
import { toast } from 'react-hot-toast';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { setAuth } = useAuthStore();
  const { email, setEmail, password, setPassword } = useUserStore();

  const {
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email, password },
  });

  const handleLogin = async () => {
    setLoading(true);
    try {
      await toast.promise(
        userLoginApi({ email, password }).then((res) => {
          console.log('Login response:', res);
          const data = res;
          setAuth({
            accessToken: data.token,
            isAuthenticated: true,
          });
          Cookies.set('token', data.token, { expires: 1 });
          reset();
          navigate('/home');
          return data;
        }),
        {
          loading: 'Logging in...',
          success: 'Login successful!',
          error: (err: Error) => err.message || 'Invalid email or password',
        },
      );
    } catch (err) {
      console.error('Login error:', err);
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
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Typography>

      <Typography textAlign="left">
        <h1>Password</h1>
        <TextField
          placeholder="Password"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Typography>

      <Link
        to="password/reset"
        className="text-black normal-case hover:underline"
      >
        <h1 className="text-sm text-black hover:underline flex justify-start">
          Forgot your password?
        </h1>
      </Link>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{
          mt: 2,
          bgcolor: '#fb2c36',
          borderRadius: 100,
        }}
        onClick={handleLogin}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
