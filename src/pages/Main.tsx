import GroqChat from "../components/groq/GroqChat";
import FaqSection from "../components/faq/FaqSection";
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
  Chat: styled.div`
    width: 60%;
    height: 100%;

    @media (max-width: 768px) {
      width: 100%;
      height: 80%;
    }
  `,
  Faq: styled.div`
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
      <Container.Chat>
        <GroqChat />
      </Container.Chat>
      <Container.Divider />
      <Container.Faq>
        <FaqSection />
      </Container.Faq>
    </Container.Main>
  );
};

export default MainPage;
