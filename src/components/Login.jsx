import React from 'react';
import { redirectToSpotify } from '../api/spotify';

const Login = () => {
  return (
    <div className="login-container animate-fade-in">
      <h1 className="login-title">Discover Your Top Tracks</h1>
      <p className="login-subtitle">
        Connect your Spotify account to see your most played songs visualized on rotating musical discs.
      </p>
      <button onClick={redirectToSpotify} className="btn-spotify" style={{border: 'none', cursor: 'pointer'}}>
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
