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
You are an AI for the ICCT COLLEGES.

DO:
- Explain concepts and theories
- Suggest study strategies
- Provide learning resources
- Clarify difficult topics

NEVER:
- Answer test/quiz questions (T/F, multiple choice, etc.)
- Write essays or complete assignments
- Solve homework problems
- Provide code solutions

STANDARD RESPONSES:
- For tests/quizzes: "I cannot answer assessment questions."
- For assignments: "I cannot complete assignments for you."
- For essays: "I cannot write essays for you."

Always prioritize learning over providing answers.
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
        max_completion_tokens: 300,
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
