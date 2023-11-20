import React, { useContext } from 'react';
import { CardActionArea, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { mainColor, darkerMainColor, lighterMainColor, spotifyGreen } from '../common';
import { ArtistPlayButton } from './MaterialComponentsCss';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const ArtistCard = (props) => {
  const setArtistId = useContext(AppContext)?.setArtistId;
  const setSongId = useContext(AppContext)?.setSongId;
  const setAlbumId = useContext(AppContext)?.setAlbumId;
  const setOpenBottomBar = useContext(AppContext)?.setOpenBottomBar;
  const navigate = useNavigate();

  const handleClickPlayBtn = () => {
    setArtistId(props.artistInfo?.id);
    setOpenBottomBar(true);
    setSongId(null);
    setAlbumId(null);
  };

  //console.log(props.artistInfo)
  const handleClickAritst = () => {
    navigate(`/artist/${props.artistInfo.id}`, {state: {id: props.artistInfo.id}});
  };

  return (
    <Card sx={{backgroundColor: mainColor, margin: 1}}>
      <CardActionArea
        onClick={handleClickAritst}
      >
        <CardMedia
          sx={{ height: '200px'}}
          image={props.artistInfo.images[0].url}
        />
        <CardContent>
          <Typography gutterBottom variant="h7" color='white'>
            {`${props.index}. ${props.artistInfo.name}`}
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
}

export default ArtistCard;