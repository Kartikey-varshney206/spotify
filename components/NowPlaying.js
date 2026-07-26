"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "../app/page.module.css";

export default function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState({ is_playing: false });
  const [localProgress, setLocalProgress] = useState(0);
  const localTimer = useRef(null);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const response = await fetch("/api/currently-playing");
      const data = await response.json();
      setNowPlaying(data);
      if (data.is_playing) {
        setLocalProgress(data.progress_ms);
      }
    } catch (error) {
      console.error("Failed to fetch currently playing:", error);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchNowPlaying();

    // Poll API every 30 seconds
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  useEffect(() => {
    if (nowPlaying.is_playing) {
      localTimer.current = setInterval(() => {
        setLocalProgress((prev) => {
          // Don't exceed duration
          if (prev + 1000 > nowPlaying.duration_ms) {
            fetchNowPlaying(); // Refresh to see if song changed
            return nowPlaying.duration_ms;
          }
          return prev + 1000;
        });
      }, 1000);
    } else {
      clearInterval(localTimer.current);
    }

    return () => clearInterval(localTimer.current);
  }, [nowPlaying.is_playing, nowPlaying.duration_ms, fetchNowPlaying]);

  if (!nowPlaying.is_playing) {
    return (
      <div className={styles.floatingPlayerWrapper}>
        <div className={styles.notPlayingFloating}>
          <div className={styles.spotifyIconFloating} style={{ margin: 0 }}></div>
          <span>Not listening to anything right now</span>
        </div>
      </div>
    );
  }

  const progressPercentage = (localProgress / nowPlaying.duration_ms) * 100;

  return (
    <div className={styles.floatingPlayerWrapper}>
      <a
        href={nowPlaying.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingPlayerCard}
      >
        <img src={nowPlaying.albumArt} alt={nowPlaying.title} className={styles.nowPlayingImage} />
        
        <div className={styles.nowPlayingInfo}>
          <div className={styles.nowPlayingTitle}>{nowPlaying.title}</div>
          <div className={styles.nowPlayingArtist}>{nowPlaying.artist}</div>
        </div>

        <div className={styles.spotifyIconFloating}></div>

        <div className={styles.progressContainerFloating}>
          <div
            className={styles.progressBarFloating}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </a>
    </div>
  );
}
