import styles from "./styles.module.css";
import { UserCard, AssistantCard } from "../chat-card";
import { useContext, useEffect, useState } from "react";
import { GroqContext } from "../../../context/useGroq";

const ChatArea = () => {
  const groq = useContext(GroqContext);
  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {
    const lastMessage = groq?.history?.at(-1);
    if (lastMessage?.role === "user") {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length >= 4 ? "" : prev + "."));
      }, 500);

      return () => clearInterval(interval);
    } else {
      setLoadingDots("");
    }
  }, [groq?.history]);

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.Conversation}>
        {groq?.history
          .filter((data) => data.role !== "system")
          .map((data, index) =>
            data.role === "assistant" ? (
              <AssistantCard key={index}>{data.content}</AssistantCard>
            ) : (
              <UserCard key={index}>{data.content}</UserCard>
            )
          )}
        {/* Loading animation */}
        {loadingDots && (
          <AssistantCard key="loading">{loadingDots}</AssistantCard>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
