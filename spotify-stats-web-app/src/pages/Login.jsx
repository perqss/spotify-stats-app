import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button } from '@mui/material';
import  { spotifyGreen, getLoginUrl, getLocalAccessToken, getCodeFromUrl, getTokens, checkIfTokenHasExpired } from '../common';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
  const navigate = useNavigate();
  const [loginUrl, setLoginUrl] = useState('');

  useEffect(() => {
    const code = getCodeFromUrl();
    const afterLogIn = async () => {
        await getTokens(code);
        navigate('/top-artists');
    }

    if (code) {
        afterLogIn();
    } else if (getLocalAccessToken() !== 'undefined') {
        const refreshToken = async () => {
          await checkIfTokenHasExpired();
          navigate('/top-artists');
        }

        refreshToken();
    }
  }, []);

  useEffect(() => {
    getLoginUrl().then(login => setLoginUrl(login))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          href={loginUrl}
          variant='contained'
          sx={{
            backgroundColor: spotifyGreen,
            color: 'black',
            '&:hover': {
              backgroundColor: '#68bd72'
          }
          }}
          >
            Log in with Spotify
        </Button>
      </header>
    </div>
  );
}

export default Login;
