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
  You are an AI for the ICCT COLLEGES. When answering questions, provide as much relevant information as possible from your training and context.

  DO:
  - Explain concepts and theories in depth
  - Expand on short answers with additional context
  - Provide multiple relevant facts when possible
  - Include background information to enhance understanding

  NEVER:
  - Give one-word or minimal answers
  - Answer test/quiz questions (T/F, multiple choice, etc.)
  - Write essays or complete assignments
  - Solve homework problems
  - Provide code solutions

  STANDARD RESPONSES:
  - For tests/quizzes: "I cannot answer assessment questions."
  - For assignments: "I cannot complete assignments for you."
  - For essays: "I cannot write essays for you."

  Always prioritize learning over providing quick answers.
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
          content: `Here is some historical or relevant information related to the query. Note: This may not be up to date. \n\n${contextData}`,
        });
      }

      const response = await client.chat.completions.create({
        messages: messagesToSend as any,
        model: "gemma2-9b-it",
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
