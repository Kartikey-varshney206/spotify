import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export async function GET() {
  try {
    const response = await getTopTracks();
    const data = await response.json();
    console.log("Spotify top tracks data:", data);
    const { items } = data;

    if (!items) {
      return NextResponse.json({ error: "No items returned from Spotify", data }, { status: 500 });
    }

    const tracks = items.map((track) => ({
      artist: track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      albumArt: track.album.images[0]?.url,
    }));

    return NextResponse.json({ tracks }, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error("Top tracks error:", error);
    return NextResponse.json({ error: "Failed to fetch top tracks", details: error.message }, { status: 500 });
  }
}
