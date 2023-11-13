import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button } from '@mui/material';
import  { spotifyGreen, getLoginUrl, getTokenFromUrl, setLocalAccessToken, getLocalAccessToken, getCodeFromUrl, authWithCode, setLocalRefreshToken } from '../common';
import { useNavigate } from 'react-router-dom';
import TopArtists from './TopArtists';

const Login = (props) => {
  const navigate = useNavigate();
  const [loginUrl, setLoginUrl] = useState('');
  useEffect(() => {
    const code = getCodeFromUrl();
    const fetchAuthWithCode = async () => {
        const response = await authWithCode(code);
        const responseJson = await response.json();
        console.log(responseJson);
        setLocalAccessToken(responseJson.access_token);
        setLocalRefreshToken(responseJson.refresh_token);
        console.log(localStorage.getItem('token'));
    }
    //const spotifyToken = getTokenFromUrl().access_token;
    
    // if (code) {
    //     authWithCode(code).then(data => data.json())
    //                       .then(response => {
    //                         setLocalAccessToken(response.access_token);
    //                         setLocalRefreshToken(response.refresh_token);
    //                       })
    // }
    if (code) {
        fetchAuthWithCode();
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
