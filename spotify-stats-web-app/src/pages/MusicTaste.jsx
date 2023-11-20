import React, { useState, useEffect } from 'react';
import { getTopSongs, getTracksAudioFeatures } from '../clients/SpotifyClient';
import { OFFSET } from '../common';

const MusicTaste = () => {
  const [trackIds, setTrackIds] = useState();
  const [tracksStats, setTracksStats] = useState({
    acousticness: 0,
    danceability: 0,
    energy: 0,
    instrumentalness: 0,
    liveness: 0,
    loudness: 0,
    speechiness: 0,
    tempo: 0,
    valence: 0,
  });
  
  useEffect(() => {
    const getTopSongsWrapper = async () => {
        let response = await getTopSongs('long_term');
        console.log(response);
        let result = response.items;
        result.splice(OFFSET, 1);
        // response = await getTopSongs('long_term', OFFSET);
        // result = result.concat(response.items);
        const newResult = result.map(item => item.id);
        setTrackIds(newResult);
      };
  
      getTopSongsWrapper();
  }, [])

  useEffect(() => {
    const getTracksAudioFeaturesWrapper = async () => {
        const response = await getTracksAudioFeatures(trackIds);
        console.log(response);
      };
      if (trackIds) {
        getTracksAudioFeaturesWrapper();
      }
  }, [trackIds])


  return (
    <div>

    </div>
  )
};

export default MusicTaste;