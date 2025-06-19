import React, { useState, useMemo, useEffect } from 'react';
import './PlaylistDetails.css';
import SongRow from '../components/Cards/SongRow';

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

const sortOptions = [
  { value: 'added', label: 'Data dodania' },
  { value: 'title', label: 'Tytuł (A-Z)' },
  { value: 'artist', label: 'Wykonawca' },
  { value: 'duration', label: 'Długość utworu' },
];

const PlaylistDetails = () => {
  const [playlist, setPlaylist] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('added');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/playlists');
        if (!response.ok) throw new Error('Błąd pobierania playlist');
        const playlists = await response.json();
        if (playlists.length === 0) throw new Error('Brak playlist');
        // Zakładam, że API zwraca utwory w polu 'songs' playlisty
        setPlaylist(playlists[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, []);

  const filteredSongs = useMemo(() => {
    if (!playlist || !playlist.songs) return [];
    let songs = playlist.songs.filter(song =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case 'title':
        songs = songs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'artist':
        songs = songs.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      case 'duration':
        songs = songs.sort((a, b) => a.duration - b.duration);
        break;
      default:
        break;
    }
    return songs;
  }, [search, sort, playlist]);

  const totalDuration = playlist && playlist.songs ? playlist.songs.reduce((acc, song) => acc + song.duration, 0) : 0;

  if (loading) return <div className="playlist-details-page container">Ładowanie...</div>;
  if (error) return <div className="playlist-details-page container">Błąd: {error}</div>;
  if (!playlist) return <div className="playlist-details-page container">Brak danych o playliście.</div>;

  return (
    <div className="playlist-details-page container">
      {/* Header section */}
      <section className="playlist-header">
        <div className="playlist-cover">
          <img src={playlist.coverImage} alt={playlist.title} />
        </div>
        <div className="playlist-meta">
          <h1 className="playlist-details-title">{playlist.title}</h1>
          <p className="playlist-description">{playlist.description}</p>
          <div className="playlist-details-info">
            <span>{playlist.songs ? playlist.songs.length : 0} utworów</span>
            <span className="dot">•</span>
            <span>{formatDuration(totalDuration)}</span>
          </div>
        </div>
      </section>

      {/* Search & filter bar */}
      <section className="playlist-filters">
        <input
          type="text"
          className="filter-search"
          placeholder="Szukaj po tytule lub artyście..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </section>

      {/* Song list */}
      <section className="playlist-songs">
        {filteredSongs.length === 0 ? (
          <div className="no-songs">Brak utworów spełniających kryteria.</div>
        ) : (
          <div className="songs-list">
            {filteredSongs.map((song, idx) => (
              <SongRow key={song.id} song={song} index={idx + 1} songs={filteredSongs} songIdx={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PlaylistDetails; 