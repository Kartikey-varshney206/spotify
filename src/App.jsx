import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { getToken, refreshAccessToken } from './api/spotify';

function App() {
  const [token, setToken] = useState(localStorage.getItem("spotify_token") || null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code && !token) {
      getToken(code).then(tokens => {
        setToken(tokens.access_token);
        localStorage.setItem("spotify_token", tokens.access_token);
        if (tokens.refresh_token) {
          localStorage.setItem("spotify_refresh_token", tokens.refresh_token);
        }
        // Clean URL
        window.history.replaceState({}, document.title, "/");
      }).catch(err => {
         console.error("Auth error", err);
         window.history.replaceState({}, document.title, "/");
      });
    } else if (!code) {
      // Refresh on initial load to ensure we have a valid token
      const refreshToken = localStorage.getItem("spotify_refresh_token");
      if (refreshToken) {
        refreshAccessToken(refreshToken).then(tokens => {
          setToken(tokens.access_token);
          localStorage.setItem("spotify_token", tokens.access_token);
          localStorage.setItem("spotify_refresh_token", tokens.refresh_token);
        }).catch(() => {
          logout();
        });
      }
    }

    // Auto-refresh token every 50 minutes (3000000 ms)
    const refreshInterval = setInterval(async () => {
      const refreshToken = localStorage.getItem("spotify_refresh_token");
      if (refreshToken) {
        try {
          const tokens = await refreshAccessToken(refreshToken);
          setToken(tokens.access_token);
          localStorage.setItem("spotify_token", tokens.access_token);
          localStorage.setItem("spotify_refresh_token", tokens.refresh_token);
        } catch (error) {
          console.error("Failed to refresh token", error);
        }
      }
    }, 3000000);

    return () => clearInterval(refreshInterval);
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("spotify_refresh_token");
  };

  return (
    <div className="app-container">
      {!token ? (
        <Login />
      ) : (
        <Dashboard token={token} logout={logout} />
      )}
    </div>
  );
}

export default App;
