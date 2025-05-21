import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '@api/authApi';
import { useAuthStore } from '@stores/AuthStore';
import { loginSchema } from '@validations/loginSchema';
import useSnackBar from '@context/SnackBarContext';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { setAuth } = useAuthStore();
  const showSnackBar = useSnackBar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (data: LoginFormData): Promise<void> => {
    startTransition(async () => {
      try {
        const response = await userLogin({
          email: data.email,
          password: data.password,
        });
        if (!response.token) {
          throw new Error('Invalid response from server');
        }
        setAuth({
          isAuthenticated: true,
          accessToken: response.token,
        });
        reset();
        showSnackBar('Login successful', 'success');
        navigate('/home');
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Login failed. Please try again.';
        showSnackBar(errorMessage, 'error');
        console.error('Login error:', err);
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLogin)}>
      <Typography textAlign="left">
        <h1>Email</h1>
        <TextField
          placeholder="Email"
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
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
          required
        />
      </Typography>

      <Link
        to="/password/reset"
        className="text-black normal-case hover:underline"
      >
        <Typography
          variant="body2"
          className="hover:underline"
          textAlign="left"
        >
          Forgot your password?
        </Typography>
      </Link>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        disabled={isPending}
        sx={{
          mt: 2,
          bgcolor: '#fb2c36',
          borderRadius: 100,
        }}
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
