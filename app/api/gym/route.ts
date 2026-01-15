import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEVICE_NAME_MAP: Record<string, string> = {
  "18848873": "Sam",
  "89642874": "Mom",
  "Martin": "Martin",
  "62747629": "Lexi",
  "46217136": "Dad",
};

interface DeviceData {
  deviceId: string;
  days: string[];
}

interface ApiResponse {
  ok: boolean;
  devices: DeviceData[];
}

export async function GET() {
  try {
    const response = await fetch(
      "https://famtracker.beasleypero.workers.dev/devices",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch device data");
    }

    const data: ApiResponse = await response.json();

    // Map device IDs to names
    const mappedDevices = data.devices.map((device) => ({
      name: DEVICE_NAME_MAP[device.deviceId] || device.deviceId,
      days: device.days,
    }));

    return NextResponse.json({
      ok: true,
      people: mappedDevices,
    });
  } catch (error) {
    console.error("Error fetching gym data:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch gym data" },
      { status: 500 }
    );
  }
}
