import React, { useState, useEffect, useRef } from 'react';
import './SongRow.css';
import { usePlayer } from '../../context/PlayerContext';

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

const SongRow = ({ song, index, songs, songIdx, playlistId, onSongRemoved }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { playQueue } = usePlayer();
  const [showMenu, setShowMenu] = useState(false);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowPlaylists(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleShowPlaylists = async () => {
    setShowPlaylists(true);
    if (playlists.length === 0) {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:8080/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Błąd pobierania playlist');
        const data = await res.json();
        setPlaylists(data.playlists || []);
      } catch (err) {
        alert('Błąd pobierania playlist użytkownika');
      }
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:8080/api/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ songId: song.id }),
      });
      if (!res.ok) throw new Error('Błąd dodawania piosenki do playlisty');
      setShowMenu(false);
      setShowPlaylists(false);
      alert('Dodano piosenkę do playlisty!');
    } catch (err) {
      alert('Błąd: ' + err.message);
    }
  };

  const handleRemoveFromPlaylist = async () => {
    if (!playlistId) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:8080/api/playlists/${playlistId}/songs/${song.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Błąd usuwania piosenki z playlisty');
      setShowMenu(false);
      setShowPlaylists(false);
      alert('Usunięto piosenkę z playlisty!');
      if (onSongRemoved) onSongRemoved();
    } catch (err) {
      alert('Błąd: ' + err.message);
    }
  };

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
        <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
          <button className="song-more icon-button" title="Więcej" onClick={() => setShowMenu(m => !m)}>
            <svg viewBox="0 0 24 24" width="22" height="22">
              <circle cx="5" cy="12" r="2" fill="#9370DB" />
              <circle cx="12" cy="12" r="2" fill="#9370DB" />
              <circle cx="19" cy="12" r="2" fill="#9370DB" />
            </svg>
          </button>
          {showMenu && (
            <div className="song-more-menu">
              <button className="song-more-menu-item" onClick={handleShowPlaylists}>Add to playlist</button>
              {playlistId && (
                <button className="song-more-menu-item" style={{color:'#ff6b6b'}} onClick={handleRemoveFromPlaylist}>Remove from this playlist</button>
              )}
              {showPlaylists && (
                <div className="song-playlists-dropdown">
                  {playlists.length === 0 ? (
                    <div className="song-playlists-empty">Brak playlist</div>
                  ) : (
                    playlists.map(pl => (
                      <div key={pl.id} className="song-playlists-item" onClick={() => handleAddToPlaylist(pl.id)}>
                        {pl.title}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongRow; 