import React, { createContext, useState } from "react";
import HeatIndex from "../utils/getHeat";
import { requestData } from "../hooks/useSupabase";
import Groq from "groq-sdk";

type Message = { role: "user" | "assistant" | "system"; content: string };
type GroqContextType = {
  history: Message[];
  createPrompt: (text: string) => Promise<void>;
  isLoading: boolean;
};

export const GroqContext = createContext<GroqContextType | null>(null);

const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true,
});

export function GroqProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<Message[]>([
    {
      role: "system",
      content: `
You are an AI academic information provider for ICCT COLLEGES.

GUIDELINES:
1. Never write essays/assignments/code solutions.
2. Avoid hallucination.
3. Respond in a direct, factual manner.
4. Do not assume the user is a student.
5. Assume information is correct unless otherwise stated.
6. If information is potentially outdated, include the disclaimer: "Information might be outdated or incomplete."
7. Do not provide meta-comments (e.g., "How can I assist you?").
8. Only respond with factual content or relevant information.

SYSTEM BEHAVIOR:
- Do not acknowledge test messages.
- Do not guess missing information.
- Do not engage in conversation beyond academic queries.
`,
    },
  ]);

  const createPrompt = async (input: string) => {
    try {
      const userMessage: Message = { role: "user", content: input };

      setHistory((prevHistory) => [...prevHistory, userMessage]);
      setIsLoading(true);

      const needsDatabaseInfo = HeatIndex(input);
      let contextData = "";

      if (needsDatabaseInfo) {
        try {
          contextData = await requestData(input);
        } catch (dbError) {
          console.error("Error fetching database information:", dbError);
        }
      }

      const messagesToSend: Message[] = [...history, userMessage];

      if (contextData && contextData.trim() !== "") {
        messagesToSend.push({
          role: "system",
          content: `Here is relevant information from the database that might help answer the query: ${contextData}`,
        });
      }

      const response = await client.chat.completions.create({
        messages: messagesToSend as any,
        model: "llama-3.3-70b-versatile",
        top_p: 0.7,
        max_completion_tokens: 500,
        frequency_penalty: 1.5,
        presence_penalty: 0,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content:
          response.choices[0]?.message.content ??
          "An error, contact developers [ERROR: ASSISTANTMESSAGE]",
      };

      setHistory((prevHistory) => [...prevHistory, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating prompt:", error);
      setIsLoading(false);
    }
  };

  return (
    <GroqContext.Provider value={{ history, createPrompt, isLoading }}>
      {children}
    </GroqContext.Provider>
  );
}
