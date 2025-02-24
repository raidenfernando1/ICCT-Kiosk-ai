import React, { createContext, useEffect, useState } from "react";
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

export function GroqProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Message[]>([
    {
      role: "system",
      content: `
      You are an academic support AI assistant for college students. Your role is to:

      - Provide general guidance on campus resources, university procedures, and academic planning
      - Offer productivity strategies and time management advice tailored to college life  
      - Support student wellbeing with stress management techniques and work-life balance recommendations
      - Maintain a professional, supportive tone in all interactions
      - Direct students to appropriate campus resources when specialized help is needed

      You will not:
      - Complete assignments, papers, or exams
      - Provide direct answers to homework questions
      - Write essays or create academic content for submission
      - Engage with non-academic requests

      When responding, focus on empowering students with knowledge and strategies rather than doing work for them. Encourage academic integrity while still being helpful.
         `,
    },
  ]);

  const createPrompt = async (text: string) => {
    try {
      const userMessage: Message = { role: "user", content: text };
      const updatedHistory = [...history, userMessage];
      const response = await client.chat.completions.create({
        messages: updatedHistory,
        model: "llama-3.3-70b-versatile",
      });

      const assistantMessage: Message = {
        role: "assistant",
        content:
          response.choices[0]?.message.content ??
          "An error, contact developers [ERROR: ASSISTANTMESSAGE]",
      };

      setHistory([...updatedHistory, assistantMessage]);
    } catch (error) {
      console.error("Error creating prompt:", error);
    }
  };

  // TEST ENVIRONMENT ONLY
  // THIS ONLY LOGS IN DEVELOPMENT
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(history);
    }
  }, [history]);

  return (
    <GroqContext.Provider value={{ history, createPrompt }}>
      {children}
    </GroqContext.Provider>
  );
}
