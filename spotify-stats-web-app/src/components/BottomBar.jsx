import React, {useEffect, useState} from 'react';
import { AppBar, Box, IconButton, Typography, Tooltip } from '@mui/material';
import { darkerMainColor } from '../common';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaSpotify } from 'react-icons/fa';
import { spotifyGreen } from '../common';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const BottomBar = (props) => {

  const chooseSrc = () => {
    if (props.songId) {
        return `https://open.spotify.com/embed/track/${props.songId}?utm_source=generator`;
    } else if (props.artistId) {
        return `https://open.spotify.com/embed/artist/${props.artistId}?utm_source=generator`;
    } else if (props.albumId) {
        return `https://open.spotify.com/embed/album/${props.albumId}?utm_source=generator`;
    }
    return '';
  };

  return (
    <div>
        {props.open && <div style={{marginTop: '70px'}}>
            <iframe
                style={{
                    position: 'fixed',
                    width: '100%',
                    borderRadius: '12px',
                    bottom: -70,
                }}
                src={chooseSrc()}
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
            ></iframe>
            <IconButton 
                sx={{
                    bottom: 70,
                    marginBottom: 1, 
                    marginRight: 'auto', 
                    position: 'fixed'
                }}
                onClick={() => props.setOpen(false)}
            >
                <CancelOutlinedIcon 
                    sx={{color: 'white'}}
                />
            </IconButton>
        </div>}
    </div>
  )
}

export default BottomBar;