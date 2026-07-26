import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  
  if (!client_id || client_id === "YOUR_SPOTIFY_CLIENT_ID") {
    return NextResponse.json({ error: "SPOTIFY_CLIENT_ID is not set in .env.local" }, { status: 500 });
  }

  const redirect_uri = 'http://127.0.0.1:3000/api/auth/callback';
  const scope = 'user-top-read user-read-currently-playing';

  const auth_url = `https://accounts.spotify.com/authorize?` + new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  }).toString();

  return NextResponse.redirect(auth_url);
}
