import React, { useEffect, useState } from 'react';
import { spotify } from '..';
import Menu from '../components/Menu';
import { checkIfTokenHasExpired, lighterMainColor } from '../common';
import { getTopArtists } from '../clients/ArtistClient';
import ArtistCard from '../components/ArtistCard';
import { List, ListItem, Grid } from '@mui/material';

const TopArtists = () => {
  const [artistsInfo, setArtistsInfo] = useState([]);
  const [term, setTerm] = useState('long_term');

  useEffect(() => {
    const getTopArtistsWrapper = async () => {
      const response = await getTopArtists(term);
      setArtistsInfo(response.items);
    }
    getTopArtistsWrapper();
  }, [term])

  console.log(artistsInfo)
  return (
    <div style={{overflowX: 'hidden', overflowY: 'hidden', display: 'flex', flexDirection: 'row'}}>
      <Menu
        setTerm={setTerm}
      />
      <div style={{height: '100%', width: '100%', backgroundColor: lighterMainColor, marginTop: '60px', marginLeft: '200px'}}>
        <Grid container spacing={1}>
          {artistsInfo.map((itemArray, index) => 
            <Grid item key={index} xs={12} sm={6} md={2}>
              <ArtistCard
                artistInfo={artistsInfo[index]}
                index={index + 1}
              />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default TopArtists;