import React, { useContext } from 'react';
import { CardActionArea, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { mainColor, darkerMainColor, lighterMainColor, spotifyGreen } from '../common';
import { ArtistPlayButton } from './MaterialComponentsCss';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const AlbumCard = (props) => {
    const setSongId = useContext(AppContext)?.setSongId;
    const setArtistId = useContext(AppContext)?.setArtistId;
    const setAlbumId = useContext(AppContext)?.setAlbumId;
    const setOpenBottomBar = useContext(AppContext)?.setOpenBottomBar;
    const navigate = useNavigate();

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        setAlbumId(props.album[1].id);
        setOpenBottomBar(true);
        setSongId(null);
        setArtistId(null);
    };

    const handleClickAlbum = () => {
      navigate(`/album/${props.album[1].id}`);
    }

    return (
        <Card sx={{backgroundColor: mainColor, margin: 1}}>
          <CardActionArea
            onClick={handleClickAlbum}
          >
            <CardMedia
              sx={{ height: '200px'}}
              image={props.album[1].image}
            />
            <CardContent>
              <Typography gutterBottom variant="h7" color='white'>
                {`${props.index}. ${props.album[0]}`}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
            >
            </CardActions>
          </CardActionArea>
          <ArtistPlayButton
            onClick={handleClickPlayBtn}
          >
            <PlayCircleFilledWhiteOutlinedIcon 
              sx={{color: 'white'}}
            />
          </ArtistPlayButton>
        </Card>
      );
};

export default AlbumCard;