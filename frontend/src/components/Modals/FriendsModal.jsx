import React, { useEffect, useState } from 'react';
import './FriendsModal.css';
import { useNavigate } from 'react-router-dom';

const FriendsModal = ({ onClose, token }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // Najpierw pobierz userId
        const resUser = await fetch('http://localhost:8080/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = await resUser.json();

        // Pobierz followers
        const resFollowers = await fetch(`http://localhost:8080/api/users/${user.id}/followers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const followersList = await resFollowers.json();

        // Pobierz following
        const resFollowing = await fetch(`http://localhost:8080/api/users/${user.id}/following`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const followingList = await resFollowing.json();

        setFollowers(followersList);
        setFollowing(followingList);
      } catch (err) {
        console.error("Błąd pobierania znajomych", err);
      }
    };

    fetchFriends();
  }, [token]);

  const filterUsers = (users) =>
    users.filter(u =>
      (u.userName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Friends</h2>
        <input
          type="text"
          placeholder="Search followers or following..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="friends-search"
        />
        <div className="friends-columns">
          <div className="friends-column">
            <h3>Followers</h3>
            {filterUsers(followers).length > 0 ? (
              filterUsers(followers).map(f => (
                <div key={f.id} className="friend-item" onClick={() => {
                  onClose();
                  navigate(`/user/${f.id}`);
                }}>
                  <img src={f.profileImageUrl || '/default-avatar.png'} alt="avatar" />
                  <span>{f.userName}</span>
                </div>
              ))
            ) : (
              <p>No followers found.</p>
            )}
          </div>
          <div className="friends-column">
            <h3>Following</h3>
            {filterUsers(following).length > 0 ? (
              filterUsers(following).map(f => (
                <div key={f.id} className="friend-item" onClick={() => {
                  onClose();
                  navigate(`/user/${f.id}`);
                }}>
                  <img src={f.profileImageUrl || '/default-avatar.png'} alt="avatar" />
                  <span>{f.userName}</span>
                </div>
              ))
            ) : (
              <p>No following found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;
