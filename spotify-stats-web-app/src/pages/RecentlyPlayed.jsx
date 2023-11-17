import React, { useState, useEffect, useContext } from 'react';
import { getRecentlyPlayed } from '../clients/SpotifyClient';
import Menu from '../components/Menu';
import { List } from '@mui/material';
import Song from '../components/Song';
import { TailSpin } from 'react-loader-spinner';
import BottomBar from '../components/BottomBar';
import { AppContext } from '../App';


const RecentlyPlayed = (props) => {
  const [songsInfo, setSongsInfo] = useState();
  const [songId, setSongId] = useState();
  //const setId = useContext(AppContext);

  useEffect(() => {
    const getRecentlyPlayedWrapper = async () => {
      setSongsInfo(null);
      const response = await getRecentlyPlayed();
      setSongsInfo(response.items);
    };

    getRecentlyPlayedWrapper();
  }, [])

  const handleSongClickRecentlyPlayed = (id) => {
    setSongId(id);
  };

  console.log(songId)
  return (
    <div>
        <div
        className='display-outer-container'
        >
            {/* <Menu
                componentIndex={2}
            /> */}
            <div
                className='display-inner-container'
            >
                <List>
                {songsInfo ? songsInfo.map((songInfo, index) => 
                    <Song
                        key={index}
                        songInfo={songInfo.track}
                        index={index + 1}
                        length={songsInfo.length}
                        handleSongClick={handleSongClickRecentlyPlayed}
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

export default RecentlyPlayed;