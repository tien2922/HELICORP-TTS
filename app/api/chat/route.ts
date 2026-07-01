import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// System instructions to feed knowledge base to Gemini
const SYSTEM_INSTRUCTION = `
You are an expert sales assistant and AI consultant for Healthy Living Corporation (Helicorp).
Your job is to assist clients visiting the landing page for the "Apple AirPods Pro 3".

Product Knowledge Base:
- Name: Apple AirPods Pro 3
- Brand: Apple, distributed/presented by Healthy Living Corporation (Helicorp).
- Price: $249 USD (Special landing page promo).
- Target audience: Tech lovers, active workers, athletes, and audiophiles.
- Key features:
  1. Contoured design with 33% shorter stem, skin-detect sensor (plays automatically when put in ear, pauses when taken out).
  2. Personalized Spatial Audio with dynamic head tracking. Active Noise Cancellation (ANC) that blocks out background noise. Adaptive Audio adapts sound dynamically.
  3. Battery: 6 hours of listening time on a single charge with ANC off, total 30 hours with the MagSafe Charging Case.
  4. Build & Weight: Crafted from premium recycled plastics and bio-grade membranes. Weight: 4.28 grams each earbud.
  5. Live Translation: Powered by Apple Intelligence. Users can speak and hear real-time translations directly through their AirPods Pro 3 (supporting multiple languages).
  6. Simple touch gestures to control volume, media playback, and calls.

Rules of behavior:
- Keep your answers concise, informative, friendly, and professional (max 3 sentences per response).
- Answer in the same language as the user's message (mostly Vietnamese or English).
- Do not make up facts not mentioned in the landing page or knowledge base.
- Encourage users to click the "Buy Now" button at the top right of the page if they show intent to purchase.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback: If no API key is provided, return a friendly auto-reply
      const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let reply = "Xin chào! Mình là trợ lý ảo của Helicorp. Bạn cần tư vấn thông tin gì về AirPods Pro 3 thế?";

      if (userMessage.includes("giá") || userMessage.includes("bao nhiêu") || userMessage.includes("tiền")) {
        reply = "AirPods Pro 3 hiện đang có giá ưu đãi là $249 USD tại Helicorp! Bạn có thể bấm nút 'Buy Now' ở góc phải màn hình để đặt mua ngay.";
      } else if (userMessage.includes("pin") || userMessage.includes("thời lượng")) {
        reply = "AirPods Pro 3 cho thời lượng nghe lên đến 6 giờ trên tai nghe lẻ và tổng cộng 30 giờ khi kết hợp cùng hộp sạc MagSafe tiện lợi đó bạn.";
      } else if (userMessage.includes("tính năng") || userMessage.includes("nổi bật") || userMessage.includes("gì")) {
        reply = "Tai nghe sở hữu Chống ồn chủ động (ANC) vượt trội, cảm biến nhận diện da tự động dừng/phát nhạc, tính năng Dịch trực tiếp (Live Translation) thời gian thực và trọng lượng siêu nhẹ chỉ 4.28g!";
      }

      return NextResponse.json({ text: reply });
    }

    // Initialize Gemini API client
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Format chat history for Gemini
    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1]?.content || "";
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Chatbot API Error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
