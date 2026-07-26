"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";

export default function TopTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("/api/top-tracks");
        const data = await response.json();
        
        if (data.error) {
           setErrorMsg(data.error === "No items returned from Spotify" && data.data?.error?.reason === "QUOTA_EXCEEDED" 
              ? "Spotify API Quota Exceeded. Please try again later." 
              : data.error);
        } else {
           setTracks(data.tracks || []);
        }
      } catch (error) {
        console.error("Failed to fetch top tracks:", error);
        setErrorMsg("Failed to load tracks");
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  if (loading) return <div className={styles.loading}>Loading top tracks...</div>;
  if (errorMsg) return (
    <section className={styles.topTracksSection}>
      <h2 className={styles.topTracksTitle}>Your Top Tracks</h2>
      <div className={styles.loading} style={{color: '#e74c3c'}}>{errorMsg}</div>
    </section>
  );

  return (
    <section className={styles.topTracksSection}>
      <h2 className={styles.topTracksTitle}>
        <div style={{width: 16, height: 16, borderRadius: '50%', background: '#1DB954', boxShadow: '0 0 12px rgba(29, 185, 84, 0.6)'}}></div>
        Your Top Tracks
      </h2>
      
      <div className={styles.tracksGrid}>
        {tracks.map((track, index) => (
          <a
            key={index}
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.trackCard}
          >
            <div className={styles.trackImageWrapper}>
              <img src={track.albumArt} alt={track.title} className={styles.trackImage} />
              <div className={styles.trackRankBadge}>{index + 1}</div>
              <div className={styles.trackPlayOverlay}></div>
            </div>
            
            <div className={styles.trackInfo}>
              <div className={styles.trackTitle}>{track.title}</div>
              <div className={styles.trackArtist}>{track.artist}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
