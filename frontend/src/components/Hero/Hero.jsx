import React from 'react';
import './Hero.css';

const Hero = () => {
  // Mock featured playlist data
  const featuredPlaylist = {
    title: "Today's Top Hits",
    description: "The biggest hits of today. Updated daily.",
    coverImage: "https://i.scdn.co/image/ab67616d0000b27377eda81c5a76f0521af551bc", // Placeholder image
    songs: "50 songs",
    followers: "26M followers"
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content container">
        <div className="featured-content">
          <div className="featured-image hover-scale">
            <img src={featuredPlaylist.coverImage} alt={featuredPlaylist.title} />
          </div>
          
          <div className="featured-info">
            <span className="featured-label">FEATURED PLAYLIST</span>
            <h1>{featuredPlaylist.title}</h1>
            <p className="featured-description">{featuredPlaylist.description}</p>
            
            <div className="featured-stats">
              <span>{featuredPlaylist.songs}</span>
              <span className="dot">•</span>
              <span>{featuredPlaylist.followers}</span>
            </div>
            
            <div className="featured-actions">
              <button className="button button-primary">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M8 5v14l11-7z"/>
                </svg>
                Play Now
              </button>
              <button className="button follow-button">
                Follow
              </button>
              <button className="button icon-button">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 