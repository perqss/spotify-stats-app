import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { getReleaseDateYear, grey, lighterMainColor, parseArtists, spotifyGreen } from '../common';
import { getAlbum } from '../clients/SpotifyClient';
import { TailSpin } from 'react-loader-spinner';
import { Button, Typography, Paper, IconButton, List } from '@mui/material';
import { mainColor } from '../common';
import { SpotifyPlayButton } from '../components/MaterialComponentsCss';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Song from '../components/Song';


const AlbumInfo = () => {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [albumInfo, setAlbumInfo] = useState();

  useEffect(() => {
    const getAlbumWrapper = async () => {
      const response = await getAlbum(albumId);
      setAlbumInfo(response);
    }

    getAlbumWrapper();
  }, [])

  return (
    <div style={{overflowX: 'hidden'}}>
      <IconButton
        sx={{
              top: '70px',
              left: '250px',
          }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewIcon
          sx={{
              color: 'white'
          }}
        />
      </IconButton>
      {albumInfo ? <div
       style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '200px',
          height: '100%',
          backgroundColor: lighterMainColor,
      }}
      >
        <div
          style={{display: 'flex'}}
        >
          <Avatar
            sx={{
              width: '25vw',
              height: '55vh',
              marginTop: '80px',
              borderRadius: 0,
              marginLeft: '120px',
            }}
            src={albumInfo.images[1].url}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
            }}
          >
            <Typography
              variant='h4'
              color='white'
              sx={{
                marginTop: '80px'
              }}
            >
              {albumInfo.name}
            </Typography>
            <Typography
              variant='h5'
              color={grey}
            >
              {parseArtists(albumInfo.artists)}
            </Typography>
            <Typography
              variant='h6'
              color={grey}
            >
              {albumInfo.label}
            </Typography>
            <Typography
              variant='h6'
              color={grey}
            >
              {getReleaseDateYear(albumInfo.release_date)}
            </Typography>
            {albumInfo.genres.map((genre, index) =>
              <Typography
                key={index}
                variant='h6'
                color={grey}
              >
                {genre}
              </Typography>
            )}
            <SpotifyPlayButton
                    href={albumInfo.external_urls.spotify}
                    variant='contained'
                    target='_BLANK'
                    sx={{
                      marginTop: '10px'
                    }}
                >
                <Typography
                    variant='h6'
                >
                    Play on Spotify
                </Typography>
            </SpotifyPlayButton>
          </div>
        </div>
        <Typography
            variant='h5'
            color='white'
            sx={{margin: 3}}
          >
            Album tracks
        </Typography>
        <List>
          {albumInfo.tracks.items.map((song, index) => 
            <Song
              key={index}
              songInfo={song}
              index={index + 1}
              length={albumInfo.tracks.items.length}
              albumInfo={albumInfo}
            />
          )}
        </List>
      </div> : <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '200px',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: lighterMainColor,
                }}
            >
                <TailSpin/>
            </div>}
    </div>
  );
}

export default AlbumInfo;