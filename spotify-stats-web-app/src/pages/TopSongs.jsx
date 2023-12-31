import React, { useState, useEffect } from 'react';
import { getTopSongs } from '../clients/SpotifyClient';
import Menu from '../components/Menu';
import { OFFSET, lighterMainColor } from '../common';
import { List, ListItem } from '@mui/material';
import Song from '../components/Song';
import { TailSpin } from 'react-loader-spinner';
import BottomBar from '../components/BottomBar';
import { LOAD_AT_ONCE_LIMIT } from '../common';
import LoadMoreButton from '../components/LoadMoreButton';


const TopSongs = (props) => {
  const [songsInfo, setSongsInfo] = useState();
  const [songId, setSongId] = useState();
  const [loadAtOnce, setLoadAtOnce] = useState(OFFSET);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getTopSongsWrapper = async () => {
      const response = await getTopSongs(props.songTerm);
      response.items.splice(OFFSET, 1);
      setLoadAtOnce(OFFSET);
      setSongsInfo(response.items);
    };

    getTopSongsWrapper();
  }, [props.songTerm])

  useEffect(() => {
    const getNextTopSongs = async () => {
      if (loadAtOnce > OFFSET && songsInfo) {
        let offsetTemp = offset;
        let result = songsInfo;
        let response;
        while (offsetTemp < loadAtOnce) {
          response = await getTopSongs(props.songTerm, offsetTemp);
          result = result.concat(response.items);
          offsetTemp += OFFSET;
        }
        setSongsInfo(result);
      }
    }

    getNextTopSongs();
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
          {songsInfo && loadAtOnce < LOAD_AT_ONCE_LIMIT && 
            <LoadMoreButton
              onClick={handleClickLoadMore}
            />}
        </div>
      </div>
    </div>
  )
};

export default TopSongs;