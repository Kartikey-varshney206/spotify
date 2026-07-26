import React, { useEffect, useState } from 'react';
import { fetchTopTracks } from '../api/spotify';
import RecordDisc from './RecordDisc';
import NowPlayingBar from './NowPlayingBar';

const Dashboard = ({ token, logout }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTracks = async () => {
      const data = await fetchTopTracks(token);
      setTracks(data);
      setLoading(false);
    };
    getTracks();
  }, [token]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your top tracks...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard animate-fade-in">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Top <span>10</span> Tracks</h1>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
        
        {tracks.length === 0 ? (
          <div className="loading-container">
            <p>No tracks found. Try listening to some music!</p>
          </div>
        ) : (
          <div className="tracks-grid">
            {tracks.map((track, index) => (
              <RecordDisc key={track.id} track={track} rank={index + 1} />
            ))}
          </div>
        )}
      </div>
      
      <NowPlayingBar token={token} />
    </>
  );
};

export default Dashboard;
