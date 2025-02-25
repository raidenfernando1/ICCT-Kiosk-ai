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
        You are an academic support AI for college students. Your role:  
        - Guide on campus resources, procedures, and academic planning  
        - Suggest productivity and time management strategies  
        - Support stress management and work-life balance  
        - Maintain a professional, supportive tone  

        You will not:  
        - Complete assignments, exams, or provide direct homework answers  
        - Write essays or academic content for submission  
        - Handle non-academic requests
         `,
    },
  ]);

  const createPrompt = async (text: string) => {
    try {
      const userMessage: Message = { role: "user", content: text };
      // Show user message instantly
      setHistory((prevHistory) => [...prevHistory, userMessage]);

      const response = await client.chat.completions.create({
        messages: [...history, userMessage],
        model: "llama-3.3-70b-versatile",
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
