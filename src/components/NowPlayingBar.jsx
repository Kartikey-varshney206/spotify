import React, { useEffect, useState } from 'react';
import { fetchCurrentlyPlaying } from '../api/spotify';

const NowPlayingBar = ({ token }) => {
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const getNowPlaying = async () => {
      if (!token) return;
      const data = await fetchCurrentlyPlaying(token);
      if (data && data.item) {
        setNowPlaying(data);
      } else {
        setNowPlaying(null);
      }
    };

    getNowPlaying();
    
    // Poll every 10 seconds
    const interval = setInterval(getNowPlaying, 60000);
    return () => clearInterval(interval);
  }, [token]);

  if (!nowPlaying || !nowPlaying.item) {
    return null; // Don't show the bar if nothing is playing
  }

  const track = nowPlaying.item;
  const isPlaying = nowPlaying.is_playing;
  const progressPercent = (nowPlaying.progress_ms / track.duration_ms) * 100;

  return (
    <div className="now-playing-bar">
      <div className="now-playing-content">
        <div className="now-playing-info">
          <img 
            src={track.album.images[0]?.url} 
            alt={track.album.name} 
            className={`now-playing-art ${isPlaying ? 'spinning-art' : ''}`} 
          />
          <div className="now-playing-text">
            <div className="now-playing-title">{track.name}</div>
            <div className="now-playing-artist">{track.artists.map(a => a.name).join(', ')}</div>
          </div>
        </div>
        
        <div className="now-playing-status">
          <span className="status-badge">
            {isPlaying ? '▶ Playing Now' : '⏸ Paused'}
          </span>
        </div>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
