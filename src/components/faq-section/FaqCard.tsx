import React from "react";
import styled from "styled-components";

const Card = {
  Main: styled.button`
    width: 100%;
    text-align: left;
    color: inherit;
    cursor: pointer;
    background-color: rgb(20, 20, 20);
    padding: 20px 20px;
    border: 1px solid rgb(55, 55, 55);
    border-radius: 10px;
  `,
  Title: styled.p`
    font-size: 1.2rem;
  `,
};

const FaqCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Card.Main>
      <Card.Title>{title}</Card.Title>
    </Card.Main>
  );
};

export default FaqCard;
