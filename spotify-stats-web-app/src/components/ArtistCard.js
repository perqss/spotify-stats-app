import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mainColor, darkerMainColor, lighterMainColor, spotifyGreen } from '../common';

const ArtistCard = (props) => {
  console.log(props.artistInfo)
  return (
    <Card sx={{backgroundColor: mainColor, margin: 1}}>
      <CardMedia
        sx={{ height: '200px'}}
        image={props.artistInfo.images[0].url}
      />
      <CardContent>
        <Typography gutterBottom variant="h7" color='white'>
          {`${props.index}. ${props.artistInfo.name}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ArtistCard;