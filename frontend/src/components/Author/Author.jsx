import React, { useEffect, useState } from 'react';
import './Author.css';
import SongRow from '../../components/Cards/SongRow';
import { useParams } from 'react-router-dom';


function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const [authorRes, songsRes] = await Promise.all([
          fetch(`http://localhost:8080/api/authors/${id}`),
          fetch(`http://localhost:8080/api/songs`),
        ]);

        if (!authorRes.ok) throw new Error('Błąd ładowania autora');
        if (!songsRes.ok) throw new Error('Błąd ładowania piosenek');

        const authorData = await authorRes.json();
        const songsData = await songsRes.json();

        const filteredSongs = songsData.filter(song => song.author?.id === Number(id));

        setAuthor(authorData);
        setSongs(filteredSongs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  const totalDuration = songs.reduce((acc, song) => acc + song.duration, 0);

  if (loading) return <div className="author-page container">Ładowanie...</div>;
  if (error) return <div className="author-page container">Błąd: {error}</div>;
  if (!author) return <div className="author-page container">Autor nie znaleziony.</div>;

  return (
    
    <div className="author-page container">
 

      <section className="author-header">
        <div className="author-profile">
          <img src={author.profileImageUrl} alt={author.stageName} />
        </div>
        <div className="author-meta">
          <h1 className="author-name">{author.stageName}</h1>
          <p className="author-realname">Prawdziwe imię: {author.realName}</p>
          <p className="author-country">Kraj: {author.nationality}</p>
          <p className="author-bio">{author.biography}</p>
          <div className="author-info">
            <span>{songs.length} utworów</span>
            <span className="dot">•</span>
            <span>{formatDuration(totalDuration)}</span>
          </div>
        </div>
               <button
  className={`button favorite-button${isFavorite ? ' active' : ''}`}
  title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
  onClick={() => setIsFavorite(f => !f)}
>
  <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: 8 }}>
    <path
      fill={isFavorite ? '#fff' : 'none'}
      stroke={isFavorite ? '#fff' : '#9370DB'}
      strokeWidth="2"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
         3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
         6.86-8.55 11.54L12 21.35z"
    />
  </svg>
  {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
</button>
      </section>

      <section className="author-songs">
        {songs.length === 0 ? (
          <div className="no-songs">Brak utworów tego autora.</div>
        ) : (
          <div className="songs-list">
            {songs.map((song, index) => (
              <SongRow key={song.id} song={song} index={index + 1} songs={songs} songIdx={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Author;
