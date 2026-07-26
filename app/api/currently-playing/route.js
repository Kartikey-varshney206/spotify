import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ is_playing: false });
    }

    const song = await response.json();

    if (song.item === null) {
      return NextResponse.json({ is_playing: false });
    }

    const is_playing = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    const albumArt = song.item.album.images[0]?.url;
    const songUrl = song.item.external_urls.spotify;
    const progress_ms = song.progress_ms;
    const duration_ms = song.item.duration_ms;

    return NextResponse.json({
      is_playing,
      title,
      artist,
      albumArt,
      songUrl,
      progress_ms,
      duration_ms
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch currently playing" }, { status: 500 });
  }
}
