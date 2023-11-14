import React, { useEffect, useState } from 'react';
import { spotify } from '..';
import Menu from '../components/Menu';
import { checkIfTokenHasExpired, ligherMainColor } from '../common';
import { getTopArtists } from '../clients/ArtistClient';
import MediaCard from '../components/ArtistCard';

const TopArtists = () => {
  const [artists, setArtists] = useState();

  useEffect(() => {
    const getTopArtistsWrapper = async () => {
      const response = await getTopArtists();
      setArtists(response.items);
    }
    getTopArtistsWrapper();
  }, [])
  console.log(artists)
  return (
    <div style={{overflowX: 'hidden', display: 'flex', flexDirection: 'row'}}>
      <Menu/>
      <div style={{marginLeft: 200, height: '100vh', width: '100vw', backgroundColor: ligherMainColor}}>

      </div>
    </div>
  )
}

export default TopArtists;