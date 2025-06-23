import React, { useState } from 'react';
import './FriendsModal.css'; // użyjemy tych samych styli modalnych
import './CreatePlaylistModal.css'; // dodajemy własne poprawki

const CreatePlaylistModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          coverImage,
          songs: [],
        }),
      });
      if (!res.ok) throw new Error('Błąd tworzenia playlisty');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content create-playlist-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Stwórz nową playlistę</h2>
        <form onSubmit={handleSubmit} className="create-playlist-form">
          <label>
            Nazwa:
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
          </label>
          <label>
            Opis:
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
          </label>
          <label>
            URL zdjęcia:
            <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} />
          </label>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          <button type="submit" className="button button-primary" disabled={loading} style={{marginTop:16}}>
            {loading ? 'Tworzenie...' : 'Utwórz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal; 