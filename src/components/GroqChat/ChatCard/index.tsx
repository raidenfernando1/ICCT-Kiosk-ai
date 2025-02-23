import React from "react";
import styles from "./styles.module.css";

export const AssistantCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.AssistantCard}>
      <li>{children}</li>
    </div>
  );
};

export const UserCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.UserCard}>
      <li>{children}</li>
    </div>
  );
};
  