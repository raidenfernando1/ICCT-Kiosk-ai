import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.css";

export const AssistantCard: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className={styles.AssistantCard}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
};

export const UserCard: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className={styles.UserCard}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
};
