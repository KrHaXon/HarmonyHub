import React, { useEffect, useState } from 'react';
import PlaylistCard from '../Cards/PlaylistCard';
import './MainContent.css';

const MainContent = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/playlists');
        if (!response.ok) throw new Error('Błąd pobierania playlist');
        const data = await response.json();
        setPlaylists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const renderSection = (title, description, playlistsToShow, className = "") => (
    <section className={`content-section ${className}`}>
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        <button className="button text-button">See All</button>
      </div>
      
      <div className="playlist-grid">
        {playlistsToShow.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  );

  if (loading) return <main className="main-content"><div className="container">Ładowanie...</div></main>;
  if (error) return <main className="main-content"><div className="container">Błąd: {error}</div></main>;

  return (
    <main className="main-content">
      <div className="container">
        {isAuthenticated ? (
          <>
            {renderSection(
              "Your Playlists",
              "Collections you've created and saved",
              playlists.slice(0, 6)
            )}
            {renderSection(
              "Recently Played",
              null,
              playlists.slice(2, 8),
              "horizontal-scroll"
            )}
            {renderSection(
              "New Releases from Your Artists",
              "Fresh tracks from artists you follow",
              playlists.slice(1, 7)
            )}
            {renderSection(
              "Recommended for You",
              "Based on your listening history",
              playlists.slice(3, 9)
            )}
          </>
        ) : (
          <div className="login-prompt">
            <div className="login-prompt-card">
              <h2>Welcome to HarmonyHub!</h2>
              <p>To see your personalized music experience, <br/>please <a className="login-link" href="/login">log in</a> or <a className="login-link" href="/register">create an account</a>.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent; 