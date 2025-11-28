import { ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY } from "../config/env.js";

export const meetingPrepModel: ChatOpenAI = new ChatOpenAI({
  apiKey: OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0.4,
});
