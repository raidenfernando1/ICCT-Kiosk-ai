import styles from "./styles.module.css";
import { UserCard, AssistantCard } from "../ChatCard";
import { useContext } from "react";
import { GroqContext } from "../../../context/useGroq";

const ChatArea = () => {
  const groq = useContext(GroqContext);

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.Conversation}>
        {groq?.history
          .filter((data) => data.role !== "system")
          .map((data, index) => {
            return data.role === "assistant" ? (
              <AssistantCard key={index}>{data.content}</AssistantCard>
            ) : (
              <UserCard key={index}>{data.content}</UserCard>
            );
          })}
      </div>
    </div>
  );
};

export default ChatArea;
