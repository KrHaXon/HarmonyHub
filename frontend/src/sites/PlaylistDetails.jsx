import React, { useState, useMemo, useEffect } from 'react';
import './PlaylistDetails.css';
import SongRow from '../components/Cards/SongRow';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { usePlayer } from '../context/PlayerContext';

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
  const { id } = useParams();
  const { reorderQueue } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('added');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshPlaylist, setRefreshPlaylist] = useState(() => () => {});
  const [dragSongs, setDragSongs] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/playlists');
        if (!response.ok) throw new Error('Błąd pobierania playlist');
        const playlists = await response.json();
        const selected = playlists.find(p => p.id === parseInt(id));
        if (!selected) throw new Error('Nie znaleziono playlisty');
        setPlaylist(selected);
        setDragSongs(selected.songs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
    setRefreshPlaylist(() => fetchPlaylist);
  }, [id]);

  useEffect(() => {
    if (playlist && playlist.songs) setDragSongs(playlist.songs);
  }, [playlist]);

  const filteredSongs = useMemo(() => {
    if (!dragSongs) return [];
    let songs = dragSongs.filter(song =>
      song.title?.toLowerCase().includes(search.toLowerCase()) ||
      song.author?.stageName?.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case 'title':
        songs = songs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'authors':
        songs = songs.sort((a, b) => a.author?.stageName.localeCompare(b.author?.stageName));
        break;
      case 'duration':
        songs = songs.sort((a, b) => a.duration - b.duration);
        break;
      default:
        break;
    }
    return songs;
  }, [search, sort, dragSongs]);

  const totalDuration = dragSongs ? dragSongs.reduce((acc, song) => acc + song.duration, 0) : 0;

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(dragSongs);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setDragSongs(reordered);
    reorderQueue(reordered);
    // Wyślij nową kolejność na backend
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:8080/api/playlists/${id}/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ songIds: reordered.map(s => s.id) }),
      });
      setRefreshPlaylist(() => () => {}); // wymuś odświeżenie
      setPlaylist(p => ({ ...p, songs: reordered }));
    } catch (err) {
      alert('Błąd zmiany kolejności');
    }
  };

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
            <span>{dragSongs ? dragSongs.length : 0} utworów</span>
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="playlist-songs-droppable">
              {(provided) => (
                <div className="songs-list" ref={provided.innerRef} {...provided.droppableProps}>
                  {filteredSongs.map((song, idx) => (
                    <Draggable key={song.id} draggableId={song.id.toString()} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            background: snapshot.isDragging ? '#2d2950' : '',
                            borderRadius: 8,
                            marginBottom: 6,
                          }}
                        >
                          <SongRow song={song} index={idx + 1} songs={filteredSongs} songIdx={idx} playlistId={playlist.id} onSongRemoved={refreshPlaylist} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </section>
    </div>
  );
};

export default PlaylistDetails; 