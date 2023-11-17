import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { lighterMainColor } from '../common';
import { getTopArtists } from '../clients/SpotifyClient';
import ArtistCard from '../components/ArtistCard';
import { Grid } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import BottomBar from '../components/BottomBar';


const TopArtists = () => {
  const [artistsInfo, setArtistsInfo] = useState();
  const [artistTerm, setArtistTerm] = useState('long_term');
  const [artistId, setArtistId] = useState();

  useEffect(() => {
    const getTopArtistsWrapper = async () => {
      setArtistsInfo(null);
      const response = await getTopArtists(artistTerm);
      setArtistsInfo(response.items);
    };
    getTopArtistsWrapper();
  }, [artistTerm])

  const handleSongClickTopArtists = (id) => {
    setArtistId(id);
  };

  //console.log(artistsInfo)
  return (
    <div>
      <div 
        className='display-outer-container'
      >
        <Menu
          setArtistTerm={setArtistTerm}
          componentIndex={0}
        />
        <div 
          className='display-inner-container'
        >
          <Grid container spacing={1}>
            {artistsInfo ? artistsInfo.map((itemArray, index) => 
              <Grid item key={index} xs={12} sm={6} md={2}>
                <ArtistCard
                  artistInfo={artistsInfo[index]}
                  index={index + 1}
                  handleArtistClick={handleSongClickTopArtists}
                />
              </Grid>
            ) : 
              <div
                  className='loading'
              >
                <TailSpin/>
              </div>
              }
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default TopArtists;