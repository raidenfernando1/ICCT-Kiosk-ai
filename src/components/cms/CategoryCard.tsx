import React from "react";
import styled from "styled-components";

const Card = {
  Container: styled.button`
    font-size: 1.2rem;
    padding: 10px;
    text-align: left;
    background: none;
    color: inherit;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    cursor: pointer;
  `,
};

const CategoryCard: React.FC<{
  question: string;
  groupId: string;
  onClick: (groupId: string) => void;
}> = ({ question, groupId, onClick }) => {
  return (
    <Card.Container onClick={() => onClick(groupId)}>{question}</Card.Container>
  );
};

export default CategoryCard;
