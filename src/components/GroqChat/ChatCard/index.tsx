import React from "react";
import styles from "./styles.module.css";

export const AssistantCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="AssistantCard">
      <li>{children}</li>
    </div>
  );
};

export const UserCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="UserCard">
      <li>{children}</li>
    </div>
  );
};
