import React from 'react';
import './PlaylistCard.css';

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="playlist-card hover-scale">
      <div className="playlist-image">
        <img src={playlist.coverImage} alt={playlist.title} />
        <button className="play-button button button-primary">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
      
      <div className="playlist-info">
        <h3 className="playlist-title">{playlist.title}</h3>
        <p className="playlist-description">{playlist.description}</p>
      </div>
    </div>
  );
};

export default PlaylistCard; 