import React, { createContext, useContext, useRef, useState } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [queue, setQueue] = useState([]); // lista piosenek
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const playQueue = (songs, index) => {
    setQueue(songs);
    setCurrentIndex(index);
    setIsPlaying(true);
    setProgress(0);
  };

  const nextSong = () => {
    if (queue.length > 0 && currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const prevSong = () => {
    if (queue.length > 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const pause = () => setIsPlaying(false);
  const resume = () => setIsPlaying(true);

  const currentSong = queue[currentIndex] || null;

  const reorderQueue = (newOrder) => {
    if (queue.length === 0 || currentIndex === -1) {
      setQueue(newOrder);
      return;
    }
    const currentSongId = queue[currentIndex]?.id;
    const newIdx = newOrder.findIndex(song => song.id === currentSongId);
    setQueue(newOrder);
    setCurrentIndex(newIdx !== -1 ? newIdx : 0);
  };

  return (
    <PlayerContext.Provider value={{
      queue, currentSong, isPlaying, playQueue, nextSong, prevSong, pause, resume, progress, setProgress, audioRef, currentIndex, reorderQueue
    }}>
      {children}
    </PlayerContext.Provider>
  );
}; 