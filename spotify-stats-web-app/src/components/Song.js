import React, {useContext} from 'react';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, IconButton, Icon, Divider, MenuItem } from '@mui/material';
import { MenuItemButton, SongPlayButton } from '../components/MaterialComponentsCss';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { grey, parseArtists } from '../common';


const Song = (props) => {
  const setSongId = useContext(AppContext)?.setSongId;
  const setArtistId = useContext(AppContext)?.setArtistId;
  const setAlbumId = useContext(AppContext)?.setAlbumId;
  const setOpenBottomBar = useContext(AppContext)?.setOpenBottomBar;
  const navigate = useNavigate();

  const durationInHrMinSec = (duration) => {
    let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    let result;
    hours === '00' ? result = minutes + ':' + seconds : result = hours + ':' + minutes + ':' + seconds;
    return result;
  };

  const handleClickPlayBtn = (event) => {
    event.stopPropagation();
    setSongId(props.songInfo.id);
    setOpenBottomBar(true);
    setArtistId(null);
    setAlbumId(null);
  }

  const handleSecondary = () => {
    if (props.albumInfo) {
        return `${parseArtists(props.songInfo.artists)}`;
    } else {
        return `${parseArtists(props.songInfo.album.artists)} - ${props.songInfo.album.name}`;
    }
  }
  
  return (
    <div>
        <MenuItemButton
            onClick={() => navigate(`/song/${props.songInfo.id}`)}
        >
            <ListItemAvatar>
                <Avatar
                    src={props.albumInfo ? props.albumInfo.images[1].url : props.songInfo.album.images[2].url}
                />
            </ListItemAvatar>
            <ListItemText
                primary={`${props.index}. ${props.songInfo.name}`}
                primaryTypographyProps={{color: 'white'}}
                secondary={handleSecondary()}
                secondaryTypographyProps={{color: grey}}
            />
            <SongPlayButton
                onClick={handleClickPlayBtn}
            >
                <PlayCircleFilledWhiteOutlinedIcon
                    sx={{color: 'white'}}
                />
            </SongPlayButton>
            <div
                style={{
                    color: 'white'
                    }}
                >
                {durationInHrMinSec(props.songInfo.duration_ms)}
            </div>

        </MenuItemButton>
        {props.index < props.length ? 
            <Divider 
                variant='inset'
                sx={{
                    backgroundColor: 'white'
                }}
            /> : ''
        }
    </div>
  )
};

export default Song;