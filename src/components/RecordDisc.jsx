import React from 'react';

const RecordDisc = ({ track, rank }) => {
  return (
    <div className="record-container animate-fade-in" style={{ animationDelay: `${rank * 0.1}s` }}>
      <div className="record-wrapper">
        <div className="record-disc">
          <div className="record-grooves"></div>
          <div className="record-center">
            <img 
              src={track.album.images[0]?.url} 
              alt={track.album.name} 
              className="album-cover" 
            />
            <div className="record-hole"></div>
          </div>
        </div>
      </div>
      <div className="track-info">
        <div className="track-rank">#{rank}</div>
        <div className="track-name">{track.name}</div>
        <div className="artist-name">{track.artists.map(a => a.name).join(', ')}</div>
      </div>
    </div>
  );
};

export default RecordDisc;
