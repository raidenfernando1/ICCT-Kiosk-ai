import React from "react";
import ChatArea from "./ChatArea";
import InputBar from "./InputBar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const GroqChat: React.FC = () => {
  return (
    <Container>
      <ChatArea />
      <InputBar />
    </Container>
  );
};

export default GroqChat;
