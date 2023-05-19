import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RootState } from '../features/store';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cachedUser, setCachedUser] = useLocalStorage('user', '');
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={() => {navigate('items')}}>
              Items
            </Button>
          </Typography>
          {
            (user || cachedUser) && (
              <Button color="inherit">
                <Stack color="inherit" onClick={() => {
                  dispatch(logout());
                  setCachedUser(null);
                  navigate('login')
                }}>
                  Logout
                </Stack>
              </Button>
            )
          }
          {
            !(user || cachedUser) && (
              <>
                <Button color="inherit">
                  <Stack color="inherit" onClick={() => {navigate('signup')}}>
                    Sign up
                  </Stack>
                </Button>
                <Button color="inherit">
                  <Stack color="inherit" onClick={() => {navigate('login')}}>
                    Login
                  </Stack>
                </Button>
              </>
            )
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}
