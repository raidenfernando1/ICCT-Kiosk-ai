import React from "react";
import styled from "styled-components";

const Card = {
  Container: styled.button`
    padding: 10px;
    text-align: left;
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
