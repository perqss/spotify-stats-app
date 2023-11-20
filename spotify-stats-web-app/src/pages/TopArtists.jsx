import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { LOAD_AT_ONCE_LIMIT, OFFSET, lighterMainColor } from '../common';
import { getTopArtists } from '../clients/SpotifyClient';
import ArtistCard from '../components/ArtistCard';
import { Grid } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import BottomBar from '../components/BottomBar';
import { SpotifyPlayButton } from '../components/MaterialComponentsCss';
import LoadMoreButton from '../components/LoadMoreButton';


const TopArtists = (props) => {
  const [artistsInfo, setArtistsInfo] = useState();
  const [loadAtOnce, setLoadAtOnce] = useState(OFFSET);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getTopArtistsWrapper = async () => {
      const response = await getTopArtists(props.artistTerm);
      response.items.splice(OFFSET, 1);
      setLoadAtOnce(OFFSET);
      setArtistsInfo(response.items);
    };
    getTopArtistsWrapper();
  }, [props.artistTerm])

  useEffect(() => {
    const getNextTopArtists = async () => {
      if (loadAtOnce > OFFSET && artistsInfo) {
        let offsetTemp = offset;
        let result = artistsInfo;
        let response;
        while (offsetTemp < loadAtOnce) {
          response = await getTopArtists(props.artistTerm, offsetTemp);
          result = result.concat(response.items);
          offsetTemp += OFFSET;
        }
        setArtistsInfo(result);
      }
    }

    getNextTopArtists();
  }, [loadAtOnce])

  const handleClickLoadMore = () => {
    setLoadAtOnce(LOAD_AT_ONCE_LIMIT);
    setOffset(OFFSET);
  };

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
          {artistsInfo && loadAtOnce < LOAD_AT_ONCE_LIMIT && 
            <LoadMoreButton
              onClick={handleClickLoadMore}
            />}
        </div>
      </div>
    </div>
  )
}

export default TopArtists;