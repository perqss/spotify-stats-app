import React from 'react';
import { AppBar, Box, IconButton, Typography, Tooltip } from '@mui/material';
import { darkerMainColor } from '../common';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaSpotify } from 'react-icons/fa';
import { spotifyGreen } from '../common';
import { setLocalAccessToken } from '../common';

const TopBar = () => {

  const handleLogout = () => {
    localStorage.setItem('token', undefined);
    localStorage.setItem('refresh_token', undefined);
  };

  return (
        <AppBar
            sx={{
                position: 'fixed',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: darkerMainColor,
                height: '60px',
                top: '0px',
                width: '100%'
            }}
        >
            <FaSpotify
                size={60}
                color={spotifyGreen}
                style={{
                    backgroundColor: darkerMainColor,
                    marginLeft: 10
                }}
             />
            <Typography
                sx={{
                    margin: 2
                }}
            >
                Spotify Stats
            </Typography>
            <Tooltip
                title='Log out'
                placement='bottom'
            >
                <IconButton
                    sx={{
                        marginLeft: 'auto',
                    }}
                    onClick={handleLogout}
                >
                    <LogoutIcon
                        sx={{
                            fontSize: 30,
                            color: 'white'
                        }}
                    />
                </IconButton>
            </Tooltip>
        </AppBar>
  )
}

export default TopBar;