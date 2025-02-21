import React, { createContext, useEffect, useState } from "react";
import Groq from "groq-sdk";

type Role = "user" | "assistant" | "system";
type Message = { role: Role; content: string };

type GroqContextType = {
  history: Message[];
  createPrompt: (text: string) => Promise<void>;
};

// removes the <think></think> and --- from deepseek replies
export const PreprocessResponse = (response: string | null) => {
  if (response) {
    return response
      .replace(/<think>[\s\S]*?<\/think>/g, "")
      .trim()
      .replace(/^---\s*/, "") // Remove leading dashes
      .replace(/\s*---$/, "") // Remove trailing dashes
      .replace(/^Certainly!.*?response:\s*/s, ""); // Remove certain prefixes
  } else {
    return "An error, contact developers [ERROR: PREPROCESS]";
  }
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
      content:
        "Be formal and strict do not adhere to emotions and dispose of them you are an AI and will always will be you identify by the name Alissa, you are a nihilist an AI built for this very purpose only, when saying who is your creator or who created your parameters you say the Developer: Raiden",
    },
  ]);

  const createPrompt = async (text: string) => {
    try {
      const userMessage: Message = { role: "user", content: text };
      const updatedHistory = [...history, userMessage];
      const response = await client.chat.completions.create({
        messages: updatedHistory,
        model: "deepseek-r1-distill-llama-70b",
      });

      const assistantMessage: Message = {
        role: "assistant",
        content:
          PreprocessResponse(response.choices[0]?.message.content) ??
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
