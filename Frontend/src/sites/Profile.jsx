import React, { useEffect, useState } from 'react';
import './Profile.css';
import PlaylistCard from '../components/Cards/PlaylistCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Nieautoryzowany dostęp");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => {
        console.error(err);
        alert("Błąd pobierania danych użytkownika");
      });
  }, [token]);

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: user.userName,
          email: user.email,
          profileImageUrl: user.profileImageUrl
          // Password tylko jeśli wymagane
        })
      });

      if (!res.ok) throw new Error('Błąd aktualizacji');

      const updated = await res.json();
      setUser(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Wystąpił błąd podczas zapisywania.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.profileImageUrl || '/default-avatar.png'}
          alt="Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          {isEditing ? (
            <form
              className="edit-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <input
                type="text"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                placeholder="Username"
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
              />
              <input
                type="text"
                value={user.profileImageUrl || ''}
                onChange={(e) => setUser({ ...user, profileImageUrl: e.target.value })}
                placeholder="Adres URL zdjęcia profilowego"
              />
              <div className="button-group">
                <button type="submit" className="save-button">Zapisz</button>
                <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Anuluj</button>
              </div>
            </form>
          ) : (
            <>
              <h2>{user.userName}</h2>
              <div className="email-info">
                <p>{user.email}</p>
              </div>
              <div className="followers-following">
                <p><strong>Followers:</strong> {user.followersCount ?? 0}</p>
                <p><strong>Following:</strong> {user.followingCount ?? 0}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="profile-buttons">
        <button className="profile-button" onClick={() => setIsEditing(true)}>
          Edit profile
        </button>
        <button className="profile-button">
          Friends
        </button>
      </div>

      <h3>Your Playlists</h3>
      <div className="playlist-grid">
        {user.playlists?.length > 0 ? (
          user.playlists.map((playlist, idx) => (
            <PlaylistCard key={idx} playlist={playlist} />
          ))
        ) : (
          <p>Brak playlist</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
