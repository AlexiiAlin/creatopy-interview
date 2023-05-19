import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Stack, TextField } from '@mui/material';
import { loginSuccess } from '../features/auth/authSlice';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const [_, setCachedUser] = useLocalStorage('user', '');

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      const user = data.login;
      setCachedUser(user);
      dispatch(loginSuccess(user));
      navigate('../items');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Stack sx={{p: 4}} justifyContent={'center'} alignItems={'center'}>
      <Stack sx={{width: '100%', maxWidth: 300}}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{my: 2}}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
