import React, { useState, useEffect } from 'react';
import { getTopSongs } from '../clients/SpotifyClient';
import Menu from '../components/Menu';
import { lighterMainColor } from '../common';
import { List, ListItem } from '@mui/material';
import Song from '../components/Song';
import { TailSpin } from 'react-loader-spinner';
import BottomBar from '../components/BottomBar';


const TopSongs = (props) => {
  const [songsInfo, setSongsInfo] = useState();
  const [songId, setSongId] = useState();

  useEffect(() => {
    const getTopSongsWrapper = async () => {
      setSongsInfo(null);
      const response = await getTopSongs(props.songTerm);
      setSongsInfo(response.items);
    };

    getTopSongsWrapper();
  }, [props.songTerm])

  console.log(songId)
  return (
    <div>
      <div
        className='display-outer-container'
      >
        <div
          className='display-inner-container'
        >
          <List>
            {songsInfo ? songsInfo.map((songInfo, index) => 
              <Song
                key={index}
                songInfo={songInfo}
                index={index + 1}
                length={songsInfo.length}
              />
            ) : 
            <div
              className='loading'
            >
              <TailSpin/>
            </div>
            }
          </List>
        </div>
      </div>
    </div>
  )
};

export default TopSongs;