import React from "react";
import ChatArea from "./chat-area";
import InputBar from "./input-bar";
import styles from "./styles.module.css";

const GroqChat: React.FC = () => {
  return (
    <div className={styles.GroqChat}>
      <ChatArea />
      <InputBar />
    </div>
  );
};

export default GroqChat;
