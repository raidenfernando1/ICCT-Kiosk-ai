import React from "react";
import ChatArea from "./ChatArea";
import InputBar from "./InputBar";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const GroqChat: React.FC = () => {
  return (
    <Main>
      <ChatArea />
      <InputBar />
    </Main>
  );
};

export default GroqChat;
