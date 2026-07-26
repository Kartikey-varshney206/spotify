import styles from "./page.module.css";
import TopTracks from "@/components/TopTracks";
import NowPlaying from "@/components/NowPlaying";

export const metadata = {
  title: "Personal Music Dashboard",
  description: "My top tracks and currently playing music on Spotify.",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Music Dashboard</h1>
        <p className={styles.subtitle}>My Spotify Listening Habits</p>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.leftColumn}>
          <NowPlaying />
        </div>
        <div className={styles.rightColumn}>
          <TopTracks />
        </div>
      </div>
    </main>
  );
}
