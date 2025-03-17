import styled from "styled-components";
import FaqCard from "./FaqCard";

const Faq = {
  Main: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  `,

  Title: styled.p`
    font-size: 2rem;
    flex-shrink: 0;
  `,

  Subtitle: styled.p`
    font-size: 0.9rem;
    margin-bottom: 20px;
    color: rgb(100, 100, 100);
  `,

  Cards: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    flex: 1;
    padding-right: 10px;
  `,
};

const FaqSection = () => {
  return (
    <Faq.Main>
      <Faq.Title>Common inquiries</Faq.Title>
      <Faq.Subtitle>Use these if the ai is not helpful</Faq.Subtitle>
      <Faq.Cards>
        <FaqCard title="How do i get my sog?" />
      </Faq.Cards>
    </Faq.Main>
  );
};

export default FaqSection;
