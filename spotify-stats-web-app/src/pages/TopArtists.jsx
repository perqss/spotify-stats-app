import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { lighterMainColor } from '../common';
import { getTopArtists } from '../clients/SpotifyClient';
import ArtistCard from '../components/ArtistCard';
import { Grid } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import BottomBar from '../components/BottomBar';


const TopArtists = (props) => {
  const [artistsInfo, setArtistsInfo] = useState();
  
  const [artistId, setArtistId] = useState();

  useEffect(() => {
    const getTopArtistsWrapper = async () => {
      setArtistsInfo(null);
      const response = await getTopArtists(props.artistTerm);
      setArtistsInfo(response.items);
    };
    getTopArtistsWrapper();
  }, [props.artistTerm])


  console.log(artistsInfo)
  return (
    <div>
      <div 
        className='display-outer-container'
      >
        <div 
          className='display-inner-container'
        >
          <Grid container spacing={1}>
            {artistsInfo ? artistsInfo.map((itemArray, index) => 
              <Grid item key={index} xs={12} sm={6} md={2}>
                <ArtistCard
                  artistInfo={artistsInfo[index]}
                  index={index + 1}
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