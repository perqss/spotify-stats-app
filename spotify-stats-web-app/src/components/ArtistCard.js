import * as React from 'react';
import { CardActionArea, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { mainColor, darkerMainColor, lighterMainColor, spotifyGreen } from '../common';
import { ArtistPlayButton } from './MaterialComponentsCss';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const ArtistCard = (props) => {
  return (
    <Card sx={{backgroundColor: mainColor, margin: 1}}>
      <CardActionArea>
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
            onClick={() => props.handleArtistClick(props.artistInfo.id)}
      >
        <PlayCircleFilledWhiteOutlinedIcon 
          sx={{color: 'white'}}
        />
      </ArtistPlayButton>
    </Card>
  );
}

export default ArtistCard;