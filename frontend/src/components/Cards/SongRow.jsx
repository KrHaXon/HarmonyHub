import React, { useState } from 'react';
import './SongRow.css';
import { usePlayer } from '../../context/PlayerContext';

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

const SongRow = ({ song, index, songs, songIdx }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { playQueue } = usePlayer();

  return (
    <div className="song-row">
      <div className="song-index">{index}</div>
      <div className="song-cover">
        <img src={song.cover} alt={song.title} />
      </div>
      <div className="song-info">
        <div className="song-title">{song.title}</div>
        <div className="song-artist">{song.author?.stageName || "Nieznany autor"}</div>
      </div>
      <div className="song-duration">{formatDuration(song.duration)}</div>
      <button className="song-play button button-primary" title="Odtwórz" onClick={() => playQueue(songs, songIdx)}>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M8 5v14l11-7z"/>
        </svg>
      </button>
      <div className="song-actions">
        <button className={`song-favorite icon-button${isFavorite ? ' active' : ''}`} title="Ulubione" onClick={() => setIsFavorite(f => !f)}>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path fill={isFavorite ? '#9370DB' : 'none'} stroke="#9370DB" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        <button className="song-share icon-button" title="Udostępnij">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path fill="currentColor" d="M18 8.59V7a4 4 0 0 0-8 0v1.59l-2.29-2.3a1 1 0 1 0-1.42 1.42l4 4a1 1 0 0 0 1.42 0l4-4a1 1 0 1 0-1.42-1.42L14 8.59V7a2 2 0 0 0-4 0v1.59l-2.29-2.3a1 1 0 1 0-1.42 1.42l4 4a1 1 0 0 0 1.42 0l4-4a1 1 0 1 0-1.42-1.42L18 8.59z"/>
            <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        <button className="song-more icon-button" title="Więcej">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <circle cx="5" cy="12" r="2" fill="#9370DB" />
            <circle cx="12" cy="12" r="2" fill="#9370DB" />
            <circle cx="19" cy="12" r="2" fill="#9370DB" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SongRow; 