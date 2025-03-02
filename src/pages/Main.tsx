import GroqChat from "../components/groq-chat/GroqChat";
import FaqSection from "../components/faq-section/FaqSection";
import styled from "styled-components";

const Container = {
  Container: styled.div`
    height: 100%;
    display: flex;
    gap: 30px;

    > :first-child {
      width: 60%;
      height: 100%;
    }

    > :last-child {
      width: 40%;
      height: 100%;
    }

    @media (max-width: 768px) {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 30px;

      > :first-child {
        width: 100%;
        height: 60%;
      }

      > :last-child {
        width: 100%;
        height: 40%;
      }
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
    <Container.Container>
      <GroqChat />
      <Container.Divider />
      <FaqSection />
    </Container.Container>
  );
};

export default MainPage;
