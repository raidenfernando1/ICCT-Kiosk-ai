import React from "react";
import styled from "styled-components";

const Container = {
  Container: styled.button`
    width: 100%;
    text-align: left;
    color: inherit;
    cursor: pointer;
    background-color: rgb(20, 20, 20);
    padding: 20px 20px;
    border: 1px solid rgb(55, 55, 55);
    border-radius: 10px;
  `,
  CardTitle: styled.p`
    font-size: 1.2rem;
  `,
};

const FaqCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Container.Container>
      <Container.CardTitle>{title}</Container.CardTitle>
    </Container.Container>
  );
};

export default FaqCard;
