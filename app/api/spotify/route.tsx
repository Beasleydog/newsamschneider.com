import { NextResponse } from "next/server";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
console.log(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN);

export const dynamic = "force-dynamic"; // Force dynamic fetch

const getAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN ?? "",
    }).toString(),
  });
  const data = (await response.json()) as { access_token: string };
  return data.access_token;
};

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 204) {
      // Fetch recently played when nothing is currently playing
      const recentResponse = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const recentData = (await recentResponse.json()) as {
        items?: [
          {
            track: {
              name: string;
              artists: { name: string }[];
              album: {
                name: string;
                images: { url: string }[];
              };
              duration_ms: number;
            };
          }
        ];
      };

      if (!recentData.items?.[0]) {
        return NextResponse.json({ message: "No recent tracks found" });
      }

      const track = recentData.items[0].track;
      return NextResponse.json({
        name: track.name,
        artist: track.artists
          .map((artist: { name: string }) => artist.name)
          .join(", "),
        album: track.album.name,
        albumCover: track.album.images[0].url,
        progress: 0,
        duration: track.duration_ms,
        isPlaying: false,
        isRecent: true,
      });
    }

    const data = (await response.json()) as {
      item: {
        name: string;
        artists: { name: string }[];
        album: {
          name: string;
          images: { url: string }[];
        };
        duration_ms: number;
      };
      progress_ms: number;
      is_playing: boolean;
    };

    const { item, progress_ms, is_playing } = data;
    console.log(data);
    const trackInfo = {
      name: item.name,
      artist: item.artists.map((artist) => artist.name).join(", "),
      album: item.album.name,
      albumCover: item.album.images[0].url,
      progress: progress_ms,
      duration: item.duration_ms,
      isPlaying: is_playing,
    };

    return NextResponse.json(trackInfo);
  } catch (error) {
    console.error("Error fetching current track:", error);
    return NextResponse.json(
      { error: "Failed to fetch current track" },
      { status: 500 }
    );
  }
}
