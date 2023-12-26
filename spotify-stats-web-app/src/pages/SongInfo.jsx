import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Paper, Typography, Box, IconButton } from '@mui/material';
import { lighterMainColor } from '../common';
import { TailSpin } from 'react-loader-spinner';
import { mainColor } from '../common';
import { parseArtists } from '../common';
import { SpotifyPlayButton } from '../components/MaterialComponentsCss';
import { grey } from '../common';
import { getTrackAudioFeatures, getTrackAudioAnalysis } from '../clients/SpotifyClient';
import AudioFeaturesChart from '../components/AudioFeaturesChart';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';


const SongInfo = () => {
  const location = useLocation();
  const songInfo = location?.state?.songInfo;
  const [audioFeatures, setAudioFeatures] = useState();
  const [audioAnalysis, setAudioAnalysis] = useState();
  const navigate = useNavigate();

  const getReleaseDateYear = (releaseDate) => {
    return releaseDate.substring(0, 4);
  };

  useEffect(() => {
    const getTrackAudioFeaturesWrapper = async () => {
      const response = await getTrackAudioFeatures(songInfo.id);
      setAudioFeatures(response);
    };

    getTrackAudioFeaturesWrapper();
  }, [])

  useEffect(() => {
    const getTrackAudioAnalysisWrapper = async () => {
      const response = await getTrackAudioAnalysis(songInfo.id);
      setAudioAnalysis(response);
    };

    getTrackAudioAnalysisWrapper();
  }, [])

  return (
    <div>
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
      {songInfo ? 
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '200px',
                height: '100%',
                backgroundColor: lighterMainColor,
            }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          > 
            <Avatar
                sx={{
                    width: '25vw',
                    height: '55vh',
                    marginTop: '80px',
                    marginLeft: '120px',
                    borderRadius: 0,
                }}
                src={songInfo.album.images[0].url}
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
                      marginTop: '80px',
                    }}
                >
                    {songInfo.name}
                </Typography>
                <Typography
                    variant='h5'
                    color={grey}
                >
                    {songInfo.album.name}
                </Typography>
                <Typography
                    variant='h6'
                    color={grey}
                >
                    {parseArtists(songInfo.artists)}
                </Typography>
                <Typography
                    variant='h6'
                    color={grey}
                >
                    {getReleaseDateYear(songInfo.album.release_date)}
                </Typography>
                <SpotifyPlayButton
                    href={songInfo.external_urls.spotify}
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
            Track's audio features
          </Typography>
          {audioFeatures ? <AudioFeaturesChart
            audioFeatures={audioFeatures}
          /> : 
          <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: lighterMainColor,
            }}
          >
          <TailSpin/>
        </div>}
            
        </div> : 
            <div
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
  )
};

export default SongInfo;