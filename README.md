# 🎵 Personal Spotify Dashboard

A beautiful, real-time dashboard built with **Next.js** that displays your Spotify listening habits. It features a secure, server-side authentication flow, ensuring your Spotify credentials are never exposed to the client.

![Music Dashboard](https://github.com/Kartikey-varshney206/spotify/assets/placeholder-image-if-you-want-to-add-one)

## ✨ Features

- **Live "Now Playing" UI**: Displays the song you're currently listening to on Spotify in real-time, complete with a smoothly animating progress bar.
- **Top Tracks**: Showcases your all-time Top 10 tracks, including album artwork, artist names, and direct links to the songs on Spotify.
- **Premium Aesthetics**: Styled with Vanilla CSS, featuring a sleek dark mode, frosted glassmorphism elements, and delicate micro-animations.
- **Secure Architecture**: Uses a one-time authorization flow to generate a `refresh_token`, keeping all API requests server-side and hiding your Client Secret.
- **Optimized Polling**: Intelligently updates "Now Playing" using a background API poll combined with a local timer to minimize API rate limit hits.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS (CSS Modules)
- **API**: Spotify Web API
- **Deployment**: Vercel (Recommended)

## 🛠️ Getting Started

### Prerequisites
- Node.js installed on your machine.
- A Spotify Premium account.
- A registered App on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).

### 1. Setup Environment Variables
Create a `.env.local` file in the root of the project and add your Spotify credentials:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_generated_refresh_token
```

### 2. Obtain Your Refresh Token
If you don't have a `SPOTIFY_REFRESH_TOKEN` yet, this project includes a built-in tool to generate one:
1. Ensure your Spotify App's Redirect URI is set to `http://127.0.0.1:3000/api/auth/callback`.
2. Run the development server (`npm run dev`).
3. Visit `http://127.0.0.1:3000/api/auth/login` in your browser.
4. Authorize the application. It will display your Refresh Token.
5. Copy the token into your `.env.local` file and restart the server.

### 3. Run Locally
Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view your dashboard!

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
