# Spotify Top Tracks Dashboard 🎵

A stunning, modern web application built with **React** and **Vite** that integrates with the Spotify API to display your top 10 most listened-to songs as rotating musical discs. It also features a beautiful, floating "Now Playing" bar that polls your current playback in real-time.

## Features ✨

- **Secure Spotify Authentication:** Uses the PKCE Authorization Code flow to securely authenticate without exposing secrets.
- **Top Tracks Fetching:** Automatically queries the Spotify API to pull your Top 10 most listened-to tracks.
- **Auto-Refreshing Tokens:** Background token refresh means you never have to sign in again after your first login!
- **Record Disc UI:** Each track is displayed as a vinyl record featuring the album cover in the center, spinning with a continuous CSS animation.
- **Now Playing Bar:** A stylish glassmorphism bar pinned to the bottom of the screen showing your currently playing track on Spotify (polls every 10 seconds), complete with playback progress and a spinning album art!
- **Premium Aesthetics:** Dark mode, glassmorphism UI elements, and sleek typography using the 'Inter' font to mimic modern web app standards.

## Project Structure 📁

```text
spotify-top-tracks/
├── public/
├── src/
│   ├── api/
│   │   └── spotify.js          # Spotify API integrations & PKCE Auth
│   ├── components/
│   │   ├── Dashboard.jsx       # Main tracks grid
│   │   ├── Login.jsx           # Spotify login prompt
│   │   ├── NowPlayingBar.jsx   # Floating currently playing bar
│   │   └── RecordDisc.jsx      # Individual spinning vinyl record component
│   ├── App.jsx                 # App root & Auth routing
│   ├── App.css                 # Component specific styles
│   ├── index.css               # Global theme & animations
│   └── main.jsx                # React DOM entry
├── .env.example                # Example environment variables
├── package.json
├── vite.config.js              # Vite configuration
└── README.md
```

## Setup Instructions 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/Kartikey-varshney206/spotify-player.git
   cd spotify-player
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   - Copy `.env.example` to `.env`
   - Go to your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create an app.
   - Set the Redirect URI in your Spotify app settings to `http://127.0.0.1:5173/callback`.
   - Fill in your `.env` file with the Client ID and Client Secret.

4. Run the app:
   ```bash
   npm run dev
   ```
   Open your browser to `http://127.0.0.1:5173` and enjoy your musical dashboard!
