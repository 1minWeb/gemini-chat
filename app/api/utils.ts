import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const GOOGLE_API_KEY =
  process.env.GOOGLE_API_KEY || "AIzaSyB0MBOmsfCl24Pxgej424NXXiwPBeRpNFk";

if (!GOOGLE_API_KEY) {
  console.error(
    "API key not set. Please set the GOOGLE_API_KEY environment variable."
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const CHAT_HISTORY_FILE = "chat_history.json";

interface Message {
  role: string;
  content: string;
}

interface Chat {
  id: string;
  messages: Message[];
}

export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Error generating response");
  }
};

export const getChatHistory = async (): Promise<Chat[]> => {
  try {
    if (fs.existsSync(CHAT_HISTORY_FILE)) {
      const historyData = fs.readFileSync(CHAT_HISTORY_FILE, "utf8");
      return JSON.parse(historyData);
    }
    return [];
  } catch (err) {
    console.error("Error reading chat history:", err);
    return [];
  }
};

export const addOrUpdateChatHistory = async (
  chatId: string,
  messages: Message[]
): Promise<void> => {
  try {
    const history = await getChatHistory();
    const chatIndex = history.findIndex((chat) => chat.id === chatId);
    if (chatIndex !== -1) {
      // Update existing chat
      history[chatIndex].messages.push(...messages);
    } else {
      // Create new chat
      const newChat: Chat = { id: chatId ?? uuidv4(), messages };
      history.push(newChat);
    }

    fs.writeFileSync(CHAT_HISTORY_FILE, JSON.stringify(history, null, 2));
    console.log("Chat history updated successfully.");
  } catch (err) {
    console.error("Error saving chat history:", err);
  }
};
