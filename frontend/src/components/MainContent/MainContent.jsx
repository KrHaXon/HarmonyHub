import React from 'react';
import PlaylistCard from '../Cards/PlaylistCard';
import './MainContent.css';

const MainContent = () => {
  // Mock data for playlists
  const mockPlaylists = [
    {
      id: 1,
      title: "Chill Vibes",
      description: "Relaxing beats for your downtime",
      coverImage: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84657c5f3353319fa383d69e82"
    },
    {
      id: 2,
      title: "Workout Mix",
      description: "High-energy tracks to keep you motivated",
      coverImage: "https://cdn-images.dzcdn.net/images/cover/c4e67c98ee8b76308e19c5454c2e620d/0x1900-000000-80-0-0.jpg"
    },
    {
      id: 3,
      title: "Focus Flow",
      description: "Ambient sounds for deep concentration",
      coverImage: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84b662404a9ae2f968fb20b1bb"
    },
    {
      id: 4,
      title: "Party Hits",
      description: "Top party anthems for your celebration",
      coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv84cVwNmJ0e1fKutR80UcZjevygcgrVu0Og&s"
    },
    {
      id: 5,
      title: "Indie Discoveries",
      description: "Fresh finds from the indie scene",
      coverImage: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8446b924077ca6e5be06e91019"
    },
    {
      id: 6,
      title: "Jazz Classics",
      description: "Timeless jazz standards and more",
      coverImage: "https://i.scdn.co/image/ab67616d00001e026a473ff360fcbccba4a9f1fe"
    }
  ];

  const renderSection = (title, description, playlists, className = "") => (
    <section className={`content-section ${className}`}>
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        <button className="button text-button">See All</button>
      </div>
      
      <div className="playlist-grid">
        {playlists.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  );

  return (
    <main className="main-content">
      <div className="container">
        {renderSection(
          "Your Playlists",
          "Collections you've created and saved",
          mockPlaylists.slice(0, 6)
        )}
        
        {renderSection(
          "Recently Played",
          null,
          mockPlaylists.slice(2, 8),
          "horizontal-scroll"
        )}
        
        {renderSection(
          "New Releases from Your Artists",
          "Fresh tracks from artists you follow",
          mockPlaylists.slice(1, 7)
        )}
        
        {renderSection(
          "Recommended for You",
          "Based on your listening history",
          mockPlaylists.slice(3, 9)
        )}
      </div>
    </main>
  );
};

export default MainContent; 