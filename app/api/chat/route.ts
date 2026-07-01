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
  const { messages } = await req.json();
  const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
  
  // Standard offline fallback responses
  let reply = "Xin chào! Mình là trợ lý ảo của Helicorp. Bạn cần tư vấn thông tin gì về AirPods Pro 3 thế?";

  if (userMessage.includes("giá") || userMessage.includes("bao nhiêu") || userMessage.includes("tiền")) {
    reply = "AirPods Pro 3 hiện đang có giá ưu đãi là $249 USD tại Helicorp! Bạn có thể bấm nút 'Buy Now' ở góc phải màn hình để đặt mua ngay.";
  } else if (userMessage.includes("pin") || userMessage.includes("thời lượng")) {
    reply = "AirPods Pro 3 cho thời lượng nghe lên đến 6 giờ trên tai nghe lẻ và tổng cộng 30 giờ khi kết hợp cùng hộp sạc MagSafe tiện lợi đó bạn.";
  } else if (userMessage.includes("tính năng") || userMessage.includes("nổi bật") || userMessage.includes("gì")) {
    reply = "Tai nghe sở hữu Chống ồn chủ động (ANC) vượt trội, cảm biến nhận diện da tự động dừng/phát nhạc, tính năng Dịch trực tiếp (Live Translation) thời gian thực và trọng lượng siêu nhẹ chỉ 4.28g!";
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ text: reply });
    }

    // Prepare prompt with context and instruction
    const promptText = `${SYSTEM_INSTRUCTION}\n\nUser: ${userMessage}\nAssistant:`;

    // Make native HTTP POST request to Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      }
    );

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      return NextResponse.json({ text: generatedText.trim() });
    }
    
    return NextResponse.json({ text: reply });
  } catch (error: any) {
    console.error("Chatbot API Error:", error);
    // If Gemini service fails, return the local fallback response safely
    return NextResponse.json({ text: reply });
  }
}
