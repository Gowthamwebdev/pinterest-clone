import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '@api/authApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@validations/signupSchema';
import useSnackBar from '@context/SnackBarContext';

interface signUpFormData {
  email: string;
  password: string;
  dateOfBirth: string;
}
const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const showSnackBar = useSnackBar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', dateOfBirth: '' },
  });
  const handleSignup = async (data: signUpFormData): Promise<void> => {
    startTransition(async () => {
      try {
        console.log(data.email);
        const response = await userSignup({
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
        });
        reset();
        showSnackBar('signup successful!', 'success');
        console.log('Signup Successful:', response.message);
        navigate('/');
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSignup)}>
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
          placeholder="Create your password"
          fullWidth
          margin="normal"
          type="password"
          {...register('password')}
          error={!!errors.email}
          helperText={errors.email?.message}
          required
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
          {...register('dateOfBirth')}
          error={!!errors.email}
          helperText={errors.email?.message}
          required
        />
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={isPending}
        type="submit"
        sx={{
          mt: 2,
          bgcolor: '#fb2c36',
          borderRadius: 300,
        }}
      >
        {isPending ? 'Signing up...' : 'SignUp'}
      </Button>
    </Box>
  );
};

export default SignUpForm;
