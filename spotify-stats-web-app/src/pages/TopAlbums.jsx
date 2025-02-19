import React, { useState, useEffect } from 'react';
import { getTopSongs } from '../clients/SpotifyClient';
import AlbumCard from '../components/AlbumCard';
import { LOAD_AT_ONCE_LIMIT, OFFSET, lighterMainColor } from '../common';
import { getTopArtists } from '../clients/SpotifyClient';
import ArtistCard from '../components/ArtistCard';
import { Grid } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import BottomBar from '../components/BottomBar';
import { SpotifyPlayButton } from '../components/MaterialComponentsCss';
import LoadMoreButton from '../components/LoadMoreButton';

const TopAlbums = (props) => {
  const [songsInfo, setSongsInfo] = useState();
  const [albums, setAlbums] = useState();
  const [songId, setSongId] = useState();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getTopSongsWrapper = async () => {
      let offsetTemp = offset;
      let response = await getTopSongs(props.albumTerm);
      let result = [];
      result = result.concat(response.items);
      response = await getTopSongs(props.albumTerm, OFFSET);
      result = result.concat(response.items);
      result.splice(OFFSET, 1);
      setSongsInfo(result);
    };

    getTopSongsWrapper();
  }, [props.albumTerm])
  
  useEffect(() => {
    if (songsInfo) {
        let result = {}
        songsInfo.forEach((song, index) => {
            if (song.album.album_type === 'album') {
                if (!(song.album.name in result)) {
                    result[song.album.name] = {
                        indexSum: index,
                        count: 1,
                        image: song.album.images[0].url,
                        id: song.album.id,
                    }
                } else {
                    result[song.album.name].count += 1;
                    result[song.album.name].indexSum += index;
                }
            }     
        })
        const entries = Object.entries(result);
        entries.sort((a, b) => {
            // Sort by count in decreasing order
            if (b[1].count !== a[1].count) {
              return b[1].count - a[1].count;
            }
            // If count is equal, sort by indexSum in decreasing order
            return a[1].indexSum - b[1].indexSum;
        });
        setAlbums(entries);
    }
  }, [songsInfo])

  
  return (
    <div>
      <div 
        className='display-outer-container'
      >
        <div 
          className='display-inner-container'
        >
          <Grid container spacing={1}>
            {albums ? albums.map((album, index) => 
              <Grid item key={index} xs={12} sm={6} md={2}>
                <AlbumCard
                    album={album}
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
};

export default TopAlbums;