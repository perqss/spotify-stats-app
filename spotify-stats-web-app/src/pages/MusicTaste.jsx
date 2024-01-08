import React, { useState, useEffect } from 'react';
import { getTopSongs, getTracksAudioFeatures } from '../clients/SpotifyClient';
import { OFFSET, lighterMainColor } from '../common';
import { labels } from '../components/AudioFeaturesChart';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';

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
  const allLabels = ['high acousticness', 'high danceability', 'high energy', 'high instrumentalness', 'high liveness', 'high loudnes', 'high speechiness', 'high tempo', 'high valence'];
  const [barData, setBarData] = useState();
  
  useEffect(() => {
    const getTopSongsWrapper = async () => {
        let response = await getTopSongs('long_term');
        let result = response.items;
        result.splice(OFFSET, 1);
        response = await getTopSongs('long_term', OFFSET);
        result = result.concat(response.items);
        const newResult = result.map(item => item.id);
        setTrackIds(newResult);
      };
  
      getTopSongsWrapper();
  }, [])

  useEffect(() => {
    const getTracksAudioFeaturesWrapper = async () => {
        const response = await getTracksAudioFeatures(trackIds);
        const audioFeatures = response.audio_features
        audioFeatures.forEach(audioFeature => {
          Object.keys(audioFeature).forEach(key => {
            if (labels.includes(key) && audioFeature[key] > 0.5) {
              tracksStats[key]++;
            } else if (key === 'loudness' && audioFeature[key] >= -6) {
              tracksStats[key]++;
            }  else if (key === 'tempo' && audioFeature[key] >= 120) {
              tracksStats[key]++;
            }
          })
        })
        Object.keys(tracksStats).forEach(key => {
          tracksStats[key] = Math.round(tracksStats[key] / 99 * 100);
        })
        
        setBarData(Object.keys(tracksStats).map(key => tracksStats[key]));
      };
      if (trackIds) {
        getTracksAudioFeaturesWrapper();
      }
  }, [trackIds])

  const data = {
    labels: allLabels,
    datasets: [
      {
        borderWidth: 1,
        data: barData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', 
          'rgba(54, 162, 235, 0.2)', 
          'rgba(255, 206, 86, 0.2)', 
          'rgba(75, 192, 192, 0.2)', 
          'rgba(255, 159, 64, 0.2)', 
          'rgba(153, 102, 255, 0.2)', 
          'rgba(255, 0, 0, 0.2)', 
          'rgba(0, 128, 0, 0.2)',
          'rgba(128, 128, 128, 0.2)', 
        ],
        borderColor: [
          'rgba(255, 99, 132, 1.0)',
          'rgba(54, 162, 235, 1.0)',
          'rgba(255, 206, 86, 1.0)',
          'rgba(75, 192, 192, 1.0)',
          'rgba(255, 159, 64, 1.0)',
          'rgba(153, 102, 255, 1.0)',
          'rgba(255, 0, 0, 1.0)',
          'rgba(0, 128, 0, 1.0)',
          'rgba(128, 128, 128, 1.0)',
        ]

      }
    ]
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',

        backgroundColor: lighterMainColor,
      }}
    >
      <Typography
        variant='h5'
        color={'white'}
        sx={{
          marginTop: '70px',
          position: 'absolute',
          marginLeft: '45vw'
        }}
      >
        Your favourite tracks in percentages
      </Typography>
      {barData ? 
        <Bar
          data={data}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            plugins: {
              legend: {
                  display: false,
              },
              tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (context.parsed.x !== null) {
                            if (context.label === allLabels[0]) {
                              label += ` ${context.parsed.x}% of your favourite tracks are acoustic`;
                            }
                            else if (context.label === allLabels[3]) {
                              label += ` ${context.parsed.x}% of your favourite tracks are instrumental`;
                            }
                            else if (context.label === allLabels[4]) {
                              label += ` ${context.parsed.x}% of your favourite tracks have an audience in the recording`;
                            }
                            else if (context.label === allLabels[6]) {
                              label += ` ${context.parsed.x}% of your favourite tracks contain spoken word`;
                            }
                            else if (context.label === allLabels[8]) {
                              label += ` ${context.parsed.x}% of your favourite tracks sound positive`;
                            } else {
                              label += ` ${context.parsed.x}% of your favourite tracks have ${context.label}`;
                            }
                        }
                        return label;
                    }
                }
            }
            },
            scales: {
              y: {
                  ticks: {
                      color: 'white'
                  },
                  grid: {
                      color: 'rgba(255, 255, 255, 0.1)', 
                    },
              },
              x: {
                  min: 0,
                  max: 100,
                  ticks: {
                      color: 'white',
                      callback: (value, index, values) => value + '%'
                  },
                  grid: {
                      color: 'rgba(255, 255, 255, 0.1)', 
                    },
              }
          },
          
          }}
          style={{
            marginLeft: '200px',
            marginTop: '100px',
            position: 'absolute'
          }}

        /> : 
        <div
          className='loading'
          style={{
            width: '100vw',
          }}
        >
        <TailSpin/>
      </div>}
    </div>
  )
};

export default MusicTaste;