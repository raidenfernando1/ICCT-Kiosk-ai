import { UserCard, AssistantCard } from "./ResponseCards";
import { useContext, useState, useEffect } from "react";
import { GroqContext } from "../../context/useGroq";
import styled from "styled-components";
import { ScaleLoader } from "react-spinners";

const Container = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: none;

    @media (max-width: 768px) {
      padding-block: 10px;
    }
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
};

const ChatArea = () => {
  const groq = useContext(GroqContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const lastMessage = groq?.history?.at(-1);
    setIsLoading(lastMessage?.role === "user");
  }, [groq?.history]);

  return (
    <Container.Container>
      <Container.Wrapper>
        {groq?.history
          .filter((data) => data.role !== "system")
          .map((data, index) =>
            data.role === "assistant" ? (
              <AssistantCard key={index}>{data.content}</AssistantCard>
            ) : (
              <UserCard key={index}>{data.content}</UserCard>
            )
          )}
        {isLoading && <ScaleLoader color="rgb(190, 190, 190)" />}
      </Container.Wrapper>
    </Container.Container>
  );
};

export default ChatArea;
