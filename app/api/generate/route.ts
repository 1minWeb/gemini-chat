import { NextRequest, NextResponse } from "next/server";
import { generateResponse, addOrUpdateChatHistory } from "../utils";

export async function POST(req: NextRequest) {
  const { prompt, chatId } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const responseText = await generateResponse(prompt);
    const messages = [
      { role: "user", content: prompt },
      { role: "bot", content: responseText },
    ];
    await addOrUpdateChatHistory(chatId, messages);
    return NextResponse.json({ text: responseText }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
