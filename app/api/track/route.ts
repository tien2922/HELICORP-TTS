import { NextResponse } from "next/server";

const WEBHOOK_URL = "https://httpbin.org/post"; // Simulate webhook posting destination

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Perform validation on the incoming user telemetry data
    if (!payload.event || !payload.timestamp) {
      return NextResponse.json({ error: "Invalid payload structured data" }, { status: 400 });
    }

    // Forward telemetry behavior data to webhook
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "Helicorp Landing Tracker",
        receivedAt: new Date().toISOString(),
        data: payload,
      }),
    });

    if (!response.ok) {
      throw new Error("Webhook forward failed");
    }

    return NextResponse.json({ success: true, forwarded: true });
  } catch (error: any) {
    console.error("Tracker webhook error", error);
    // Silent fallback to avoid breaking client interactions
    return NextResponse.json({ success: true, fallback: true, message: error.message });
  }
}
