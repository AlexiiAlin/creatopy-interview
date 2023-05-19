import React, { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../graphql/mutations';
import { addItem } from '../features/items/itemsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Perform signup logic
    try {
      const { data } = await createUser({ variables: { email, password } });
      navigate('../login');
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
        <Button variant="contained" onClick={handleSignup}>
          Signup
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignupPage;
