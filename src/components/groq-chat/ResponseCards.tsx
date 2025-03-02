import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const Assistant = {
  Container: styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    ul,
    ol {
      margin-left: 40px;
    }

    ul > li {
      list-style-type: disc;
      padding: 5px;
      margin-bottom: 5px;
    }

    ol > li {
      list-style-type: decimal;
      padding: 5px;
      margin-bottom: 5px;
    }

    a.disabled {
      color: inherit;
      text-decoraion: none;
    }

    blockquote,
    pre {
      border: 1px solid rgb(55, 55, 55);
      border-radius: 10px;
      padding: 10px;
    }
  `,
};

const User = {
  Container: styled.div`
    padding: 8px;
    background-color: rgb(50, 50, 50);
    border-radius: 5px;
  `,
};

export const AssistantCard: React.FC<{ children: string }> = ({ children }) => {
  return (
    <Assistant.Container>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Assistant.Container>
  );
};

export const UserCard: React.FC<{ children: string }> = ({ children }) => {
  return (
    <User.Container>
      <p>{children}</p>
    </User.Container>
  );
};
