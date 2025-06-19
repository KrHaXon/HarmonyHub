import React from 'react';
import './PlaylistCard.css';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { playQueue } = usePlayer();

  const handleImageClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (playlist.songs && playlist.songs.length > 0) {
      playQueue(playlist.songs, 0);
    }
  };

  return (
    <div className="playlist-card hover-scale">
      <div className="playlist-image" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        <img src={playlist.coverImage} alt={playlist.title} />
        <button className="play-button button button-primary" onClick={handlePlayClick}>
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