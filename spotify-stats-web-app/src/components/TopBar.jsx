import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Box, IconButton, Typography, Tooltip, Avatar, Popper, ClickAwayListener, 
    Grow, MenuList, MenuItem, Paper, Button } from '@mui/material';
import { darkerMainColor, githubUrl, lighterMainColor, mainColor } from '../common';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaSpotify } from 'react-icons/fa';
import { spotifyGreen } from '../common';
import { setLocalAccessToken } from '../common';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile } from '../clients/SpotifyClient';
import { SpotifyPlayButton } from './MaterialComponentsCss';

const TopBar = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState();
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const getProfileWrapper = async () => {
        const response = await getProfile();
        setProfileData(response);
    } 

    getProfileWrapper();
  }, [])

  const handleLogout = () => {
    localStorage.setItem('token', undefined);
    localStorage.setItem('refresh_token', undefined);
    localStorage.setItem('token_expiration_timestamp', undefined);
    navigate('/');
  };

  const handleAvatarClick = () => {
    setOpenProfileMenu(!openProfileMenu);
  }

  const handleProfileMenuClose = () => {
    setOpenProfileMenu(false);
  }

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
            <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Button
                        sx={{
                            color: 'white'
                        }}
                        href={githubUrl}
                        target='_blank'
                    >
                        Github
                    </Button>
                    <IconButton
                        onClick={handleAvatarClick}
                        ref={anchorRef}
                    >
                        <Tooltip
                            title='Account'
                            placement='bottom'
                        >
                            <Avatar
                                src={profileData?.images[1]?.url}
                            />
                        </Tooltip>
                        <Popper
                            open={openProfileMenu}
                            placement='bottom-start'
                            transition
                            anchorEl={anchorRef.current}
                        >
                            {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleProfileMenuClose}>
                                <MenuList
                                    autoFocusItem={openProfileMenu}
                                    sx={{
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        flexDirection: 'column',
                                        backgroundColor: mainColor,
                                        color: 'white'
                                    }}
                                >
                                    <Typography>
                                        {profileData?.display_name}
                                    </Typography>
                                    <Typography>
                                        {`${profileData?.followers.total} followers`}
                                    </Typography>
                                    <MenuItem
                                        component={Link}
                                        to={profileData?.external_urls?.spotify}
                                        target='_blank'
                                    >
                                        Go to your Spotify page
                                    </MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                            )}
                        </Popper>
                    </IconButton>
                <Tooltip
                    title='Log out'
                    placement='bottom'
                >
                    <IconButton
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
            </Box>
        </AppBar>
  )
}

export default TopBar;