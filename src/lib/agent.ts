import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as dotenv from "dotenv";
dotenv.config();

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  maxRetries: 2,
});

export async function getAgentMessage() {
  const aiMsg = await llm.invoke([
    [
      "system",
      "You are a helpful assistant that gives insights into the creation of popular tooling used in the software development industry. Be concise, restrain yourself to no more than 3 paragraphs of content.",
    ],
    ["human", "Tell me about the creation of typescript."],
  ]);

  return aiMsg.content;
}
