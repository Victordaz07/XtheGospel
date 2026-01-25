import React, { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import './AudioPlayer.css';

interface AudioPlayerProps {
  label?: string;
  duration?: string;
}

export function AudioPlayer({ 
  label = 'Listen to this section', 
  duration = '2:30' 
}: AudioPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = (): void => {
    setIsPlaying(!isPlaying);
    // Mock progress simulation
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  return (
    <div className="audio-player">
      <button 
        className="audio-player__button" 
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: 2 }} />}
      </button>
      <div className="audio-player__progress">
        <span className="audio-player__label">{label}</span>
        <div className="audio-player__bar">
          <div 
            className="audio-player__bar-fill" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="audio-player__time">
          <span>{isPlaying ? `${Math.floor(progress / 100 * 150 / 60)}:${String(Math.floor(progress / 100 * 150 % 60)).padStart(2, '0')}` : '0:00'}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}
