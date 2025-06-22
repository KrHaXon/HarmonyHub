import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);

  const [loadingSongs, setLoadingSongs] = useState(true);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [errorSongs, setErrorSongs] = useState(null);
  const [errorAuthors, setErrorAuthors] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoadingSongs(true);
        const response = await fetch("http://localhost:8080/api/songs");
        if (!response.ok) throw new Error("Błąd pobierania piosenek");
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        setErrorSongs(err.message);
      } finally {
        setLoadingSongs(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoadingAuthors(true);
        const response = await fetch("http://localhost:8080/api/authors");
        if (!response.ok) throw new Error("Błąd pobierania autorów");
        const data = await response.json();
        setAuthors(data);
      } catch (err) {
        setErrorAuthors(err.message);
      } finally {
        setLoadingAuthors(false);
      }
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error("Błąd pobierania użytkowników");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setErrorUsers(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

    const filteredAuthors = authors.filter((author) =>
    (author.stageName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSongs = songs.filter(
    (song) =>
      (song.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (song.author?.stageName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

    const filteredUsers = users.filter((user) =>
    (user.userName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1>HarmonyHub</h1>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link to="/" className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/browse" className={`menu-item ${location.pathname === '/browse' ? 'active' : ''}`}>Browse</Link>
          <Link to="/library" className={`menu-item ${location.pathname === '/library' ? 'active' : ''}`}>Library</Link>
        </div>

        <div className="navbar-search" style={{ position: "relative", flex: "0 1 400px" }}>
          <input
            type="text"
            placeholder="Search for songs, authors or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
          />
          <button className="search-button" aria-label="Search">
            <svg viewBox="0 0 24 24" width="24" height="24" style={{ fill: "var(--color-text-secondary)" }}>
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
            </svg>
          </button>

          {(loadingSongs || loadingAuthors || loadingUsers) && (
            <div className="search-results" style={{ color: "var(--color-text-primary)", padding: 12 }}>
              Loading...
            </div>
          )}

          {(errorSongs || errorAuthors || errorUsers) && (
            <div className="search-results" style={{ color: "red", padding: 12 }}>
              Error: {errorSongs || errorAuthors || errorUsers}
            </div>
          )}

          {!loadingSongs && !loadingAuthors && !loadingUsers &&
            !errorSongs && !errorAuthors && !errorUsers && searchQuery && (
              <div className="search-results" role="list">
                {/* Users */}
                {filteredUsers.length > 0 && (
                  <>
                    <div style={{ padding: "4px 16px", fontWeight: "700", color: "var(--color-text-secondary)", marginTop: 8 }}>
                      Users
                    </div>
                    {filteredUsers.map((user) => (
                      <div
                        key={"user-" + user.id}
                        className="search-result-item"
                        role="listitem"
                        tabIndex={0}
                        onClick={() => {
                          setSearchQuery('');
                          navigate(`/user/${user.id}`);
                        }}
                      >
                        {user.profileImageUrl && <img src={user.profileImageUrl} alt={user.userName} />}
                        <div className="search-result-info">
                          <div className="search-result-title">{user.userName}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Authors */}
                {filteredAuthors.length > 0 && (
                  <>
                    <div style={{ padding: "4px 16px", fontWeight: "700", color: "var(--color-text-secondary)", marginTop: 8 }}>
                      Authors
                    </div>
                    {filteredAuthors.map((author) => (
                      <div
                        key={"author-" + author.id}
                        className="search-result-item"
                        role="listitem"
                        tabIndex={0}
                        onClick={() => {
                          setSearchQuery('');
                          navigate(`/author/${author.id}`);
                        }}
                      >
                        {author.profileImageUrl && <img src={author.profileImageUrl} alt={author.stageName} />}
                        <div className="search-result-info">
                          <div className="search-result-title">{author.stageName}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Songs */}
                {filteredSongs.length > 0 && (
                  <>
                    <div style={{ padding: "4px 16px", fontWeight: "700", color: "var(--color-text-secondary)" }}>
                      Songs
                    </div>
                    {filteredSongs.map((song) => (
                      <div key={"song-" + song.id} className="search-result-item" role="listitem" tabIndex={0}>
                        {song.cover && <img src={song.cover} alt={song.title} />}
                        <div className="search-result-info">
                          <div className="search-result-title">{song.title}</div>
                          <div className="search-result-author">{song.author?.stageName}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Brak wyników */}
                {filteredSongs.length === 0 && filteredAuthors.length === 0 && filteredUsers.length === 0 && (
                  <div style={{ padding: 12, color: "var(--color-text-secondary)" }}>No results found.</div>
                )}
              </div>
          )}
        </div>

        <div className="navbar-auth">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="button login-button">Log In</Link>
              <Link to="/register" className="button button-primary register-button">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="button profile-button">My Profile</Link>
              <button className="button logout-button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
