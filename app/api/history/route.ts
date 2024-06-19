import { NextRequest, NextResponse } from "next/server";
import { getChatHistory } from "../utils";

export async function GET(req: NextRequest) {
  try {
    const history = await getChatHistory();
    return NextResponse.json(history, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
