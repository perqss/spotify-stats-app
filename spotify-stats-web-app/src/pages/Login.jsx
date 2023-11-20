import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button } from '@mui/material';
import  { spotifyGreen, getLoginUrl, getTokenFromUrl, setLocalAccessToken, getLocalAccessToken, getCodeFromUrl, getTokens, 
  setLocalRefreshToken, getRefreshToken, checkIfTokenHasExpired } from '../common';
import { useNavigate } from 'react-router-dom';
import TopArtists from './TopArtists';
import { spotify } from '..';

const Login = (props) => {
  const navigate = useNavigate();
  const [loginUrl, setLoginUrl] = useState('');
  //const [token, setToken] = useState('');
  useEffect(() => {
    const code = getCodeFromUrl();
    const afterLogIn = async () => {
        await getTokens(code);
        navigate('/top-artists');
    }
    //const spotifyToken = getTokenFromUrl().access_token;
    
    // if (code) {
    //     authWithCode(code).then(data => data.json())
    //                       .then(response => {
    //                         setLocalAccessToken(response.access_token);
    //                         setLocalRefreshToken(response.refresh_token);
    //                       })
    // }
    console.log(getLocalAccessToken())
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

  // if (token in localstorage) navigate to top artists

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
