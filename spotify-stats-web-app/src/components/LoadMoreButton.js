import React from 'react';
import { SpotifyPlayButton } from './MaterialComponentsCss';

const LoadMoreButton = (props) => {
  return (
    <div
        style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '15px'
        }}
    >
        <SpotifyPlayButton
            onClick={props.onClick}
        >
            Load More
        </SpotifyPlayButton>
    </div>
  )
};

export default LoadMoreButton;