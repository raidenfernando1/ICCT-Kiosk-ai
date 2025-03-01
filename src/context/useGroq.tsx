import React, { createContext, useState } from "react";
import { requestData } from "../hooks/useSupabase";
import Groq from "groq-sdk";

type Role = "user" | "assistant" | "system";
type Message = { role: Role; content: string };
type GroqContextType = {
  history: Message[];
  createPrompt: (text: string) => Promise<void>;
};

export const GroqContext = createContext<GroqContextType | null>(null);

const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true,
});

const HEAT_THRESHOLD = 2;
const heatWords = [
  "who",
  "what",
  "where",
  "when",
  "why",
  "how",
  "explain",
  "describe",
  "analyze",
  "compare",
  "contrast",
  "define",
  "list",
  "outline",
  "summarize",
  "evaluate",
  "icct",
  "college",
  "course",
  "professor",
  "campus",
  "class",
];

const calculateHeatIndex = (text: string): number => {
  const normalizedText = text.toLowerCase();
  let heatIndex = 0;

  heatWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = normalizedText.match(regex);
    if (matches) {
      heatIndex += matches.length;
    }
  });

  if (text.length > 50) heatIndex += 1;
  if (text.includes("?")) heatIndex += 1;

  return heatIndex;
};

export function GroqProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Message[]>([
    {
      role: "system",
      content: `
  You are an AI academic information provider for ICCT COLLEGES.
  You do not have a name, You are not mistral AI,

  GUIDELINES:
  1. Never write essays/assignments/code solutions.
  2. State "I don't have this information" when uncertain or no data is received for an academic inquiry.
  3. Avoid hallucination.
  4. Respond in a direct, factual manner.
  5. Do not assume the user is a student.
  6. Assume information is correct unless otherwise stated, but do not explicitly mention uncertainty every time.
  `,
    },
  ]);

  const createPrompt = async (text: string) => {
    try {
      const userMessage: Message = { role: "user", content: text };
      setHistory((prevHistory) => [...prevHistory, userMessage]);

      const heatIndex = calculateHeatIndex(text);
      console.log(`Heat index for query: ${heatIndex}`);

      let relevantData = "";
      if (heatIndex >= HEAT_THRESHOLD) {
        relevantData = await requestData(text);
        console.log("Database queried due to high heat index");
        console.log("Data retrieved:", relevantData);
      }

      const messagesToSend: Message[] = [];

      const originalSystemMessage = history.find(
        (msg) => msg.role === "system"
      );

      if (originalSystemMessage) {
        let systemContent = originalSystemMessage.content;

        if (relevantData && relevantData.trim().length > 0) {
          systemContent += `\n\nRELEVANT INFORMATION FOR THIS QUERY: ${relevantData}\n\nUse the above information as context.`;
        }

        messagesToSend.push({
          role: "system",
          content: systemContent,
        });
      }

      messagesToSend.push(...history.filter((msg) => msg.role !== "system"));

      messagesToSend.push(userMessage);

      const response = await client.chat.completions.create({
        messages: messagesToSend as any,
        model: "mixtral-8x7b-32768",
      });

      const assistantMessage: Message = {
        role: "assistant",
        content:
          response.choices[0]?.message.content ??
          "An error, contact developers [ERROR: ASSISTANTMESSAGE]",
      };

      setHistory((prevHistory) => [...prevHistory, assistantMessage]);
    } catch (error) {
      console.error("Error creating prompt:", error);
    }
  };

  return (
    <GroqContext.Provider value={{ history, createPrompt }}>
      {children}
    </GroqContext.Provider>
  );
}
