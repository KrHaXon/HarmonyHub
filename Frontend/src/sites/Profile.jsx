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
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
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
          password: user.password, // Uwaga: musi być wymagane przez backend
          profileImageUrl: user.profileImageUrl // jeśli chcesz zapisać też avatar
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
          src={user.profileImageUrl}
          alt="Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
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
              <button onClick={handleSave}>Zapisz</button>
              <button onClick={() => setIsEditing(false)}>Anuluj</button>
            </div>
          ) : (
            <>
              <h2>{user.userName}</h2>
              <p>{user.email}</p>
            </>
          )}
        </div>
      </div>

      <div className="profile-buttons">
        <button className="profile-button" onClick={() => setIsEditing(true)}>
          Edytuj profil
        </button>
        <button className="profile-button">
          Znajomi
        </button>
      </div>

      <h3>Your Playlists</h3>
      <div className="playlist-grid">
        {user.playlists?.map((playlist, idx) => (
          <PlaylistCard key={idx} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
