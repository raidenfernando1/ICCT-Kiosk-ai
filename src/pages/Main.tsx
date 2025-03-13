import GroqChat from "../components/groq-chat/GroqChat";
import FaqSection from "../components/faq-section/FaqSection";
import styled from "styled-components";

const Container = {
  Main: styled.div`
    height: 100%;
    display: flex;
    gap: 30px;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  `,
  ChatSection: styled.div`
    width: 60%;
    height: 100%;

    @media (max-width: 768px) {
      width: 100%;
      height: 80%;
    }
  `,
  FaqSection: styled.div`
    width: 40%;
    height: 100%;

    @media (max-width: 768px) {
      width: 100%;
      height: 40%;
    }
  `,

  Divider: styled.div`
    height: 100%;
    width: 1px;
    background-color: rgb(55, 55, 55);

    @media (max-width: 768px) {
      height: 1px;
      width: 100%;
      background-color: rgb(55, 55, 55);
    }
  `,
};

const MainPage = () => {
  return (
    <Container.Main>
      <Container.ChatSection>
        <GroqChat />
      </Container.ChatSection>
      <Container.Divider />
      <Container.FaqSection>
        <FaqSection />
      </Container.FaqSection>
    </Container.Main>
  );
};

export default MainPage;
