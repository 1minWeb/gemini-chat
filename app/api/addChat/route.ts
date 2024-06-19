import { NextRequest, NextResponse } from "next/server";
import { addOrUpdateChatHistory } from "../utils";

export async function POST(req: NextRequest) {
  const { chatId, messages } = await req.json();
  if (!chatId || !messages) {
    return NextResponse.json(
      { error: "Chat ID and messages are required" },
      { status: 400 }
    );
  }

  try {
    await addOrUpdateChatHistory(chatId, messages);
    return NextResponse.json(
      { message: "Chat history saved" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
