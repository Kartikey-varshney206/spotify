import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code') || null;
  const error = url.searchParams.get('error') || null;

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = 'http://127.0.0.1:3000/api/auth/callback';
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }),
  });

  const data = await response.json();

  if (response.ok) {
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Token Success</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 2rem; background: #121212; color: #ffffff; line-height: 1.5; }
            pre { background: #282828; padding: 1rem; border-radius: 8px; overflow-x: auto; }
            .token { color: #1DB954; font-weight: bold; font-size: 1.2rem; }
            .container { max-width: 600px; margin: 0 auto; background: #181818; padding: 2rem; border-radius: 12px; }
            h1 { color: #1DB954; margin-top: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Authentication Successful!</h1>
            <p>Copy the following <strong>Refresh Token</strong> into your <code>.env.local</code> file as <code>SPOTIFY_REFRESH_TOKEN</code>:</p>
            <pre><code class="token">${data.refresh_token}</code></pre>
            <p>After you paste it, save the file and safely close this window to go back to developing your dashboard.</p>
          </div>
        </body>
      </html>
    `, { headers: { 'content-type': 'text/html' } });
  }

  return NextResponse.json(data, { status: response.status });
}
