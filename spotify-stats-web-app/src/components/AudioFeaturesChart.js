import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend,
LogarithmicScale,
);

const labels = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'];  
const data = {
  labels: labels,
  datasets: [
      {
          borderWidth: 1,
          data: [],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 87, 34, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 87, 34, 1)',
          ],
      },
  ],
};

const AudioFeaturesChart = (props) => {
  data.datasets[0].data = [];
  data.datasets[0].data = labels.map(label => props.audioFeatures[label]);
  console.log(data.datasets[0].data)

  return (
    <div
        style={{
            height: '400px',
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
        }}
    > 
        <Bar
            data={data}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                    display: false,
                }
            },
                scales: {
                    y: {
                        type: 'linear'
                    }
                }
                
            }}
        />
    </div>
  )
};

export default AudioFeaturesChart;