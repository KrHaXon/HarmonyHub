import React, { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import './PlayerBar.css';

const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const PlayerBar = () => {
  const { currentSong, isPlaying, pause, resume, progress, setProgress, audioRef, nextSong, prevSong, currentIndex, queue } = usePlayer();
  const [volume, setVolume] = useState(1);
  const progressRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying, currentSong, audioRef, volume]);

  if (!currentSong) return null;

  return (
    <div className="player-bar pro">
      {/* LEWA: okładka + info */}
      <div className="player-left">
        <img src={currentSong.cover} alt={currentSong.title} width={50} height={50} />
        <div className="player-info">
          <div className="player-title">{currentSong.title}</div>
          <div className="player-artist">{currentSong.artist}</div>
        </div>
      </div>
      {/* ŚRODEK: kontrolki + pasek postępu */}
      <div className="player-center">
        <div className="player-controls">
          {/* Prev */}
          <button className="player-btn" title="Poprzedni utwór" onClick={prevSong} disabled={currentIndex <= 0}>
            <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#9370DB" d="M6 18V6h2v12zm3.5-6L18 18V6z"/></svg>
          </button>
          {/* Play/Pause */}
          <button className="player-btn play" onClick={isPlaying ? pause : resume} title={isPlaying ? 'Pauza' : 'Odtwórz'}>
            {isPlaying ? (
              <svg width="38" height="38" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1.5" fill="#fff"/><rect x="14" y="5" width="4" height="14" rx="1.5" fill="#fff"/></svg>
            ) : (
              <svg width="38" height="38" viewBox="0 0 24 24"><polygon points="7,5 21,12 7,19" fill="#fff"/></svg>
            )}
          </button>
          {/* Next */}
          <button className="player-btn" title="Następny utwór" onClick={nextSong} disabled={currentIndex >= queue.length - 1}>
            <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#9370DB" d="M18 6v12h-2V6zm-3.5 6L6 6v12z"/></svg>
          </button>
        </div>
        <div className="player-progress-wrap">
          <span className="player-time">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={currentSong.duration}
            value={progress}
            ref={progressRef}
            onChange={e => {
              setProgress(Number(e.target.value));
              if (audioRef.current) audioRef.current.currentTime = Number(e.target.value);
            }}
            className="player-progress"
          />
          <span className="player-time">{formatTime(currentSong.duration)}</span>
        </div>
      </div>
      {/* PRAWA: głośność */}
      <div className="player-right">
        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#9370DB" d="M3 10v4h4l5 5V5L7 10zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/></svg>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="player-volume"
        />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={e => setProgress(e.target.currentTime)}
        onEnded={nextSong}
      />
    </div>
  );
};

export default PlayerBar; 