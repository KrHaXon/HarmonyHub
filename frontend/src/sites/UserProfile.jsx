import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import PlaylistCard from '../components/Cards/PlaylistCard';
import { jwtDecode } from 'jwt-decode';

const UserProfile = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setUser(data);
      setFollowed(data.isFollowed || false);
    } catch (err) {
      console.error("Błąd pobierania użytkownika", err);
    }
  };

  useEffect(() => {
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const loggedInUserId = decoded.userId;
      setIsOwnProfile(loggedInUserId == id);
    } catch (err) {
      console.error("Błąd dekodowania tokenu:", err);
    }
  }

  fetchUser(); 
}, [id, token]);

  const handleFollow = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/follow/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Błąd followowania");
      await fetchUser(); // Odśwież dane
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/follow/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Błąd unfollowowania");
      await fetchUser(); // Odśwież dane
    } catch (err) {
      console.error(err);
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
          <h2>{user.userName}</h2>
          <div className="email-info"><p>{user.email}</p></div>
          <div className="followers-following">
            <p><strong>Followers:</strong> {user.followersCount ?? 0}</p>
            <p><strong>Following:</strong> {user.followingCount ?? 0}</p>
          </div>
        </div>
      </div>

          {!isOwnProfile && (
      <div className="profile-buttons">
        {!followed ? (
          <button className="profile-button" onClick={handleFollow}>
            Follow
          </button>
        ) : (
          <button className="profile-button unfollow" onClick={handleUnfollow}>
            Unfollow
          </button>
        )}
      </div>
    )}

      <h3>Playlists</h3>
      <div className="playlist-grid">
        {user.playlists?.length > 0 ? (
          user.playlists.map((playlist, idx) => (
            <PlaylistCard key={idx} playlist={playlist} />
          ))
        ) : (
          <p>No playlists found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
