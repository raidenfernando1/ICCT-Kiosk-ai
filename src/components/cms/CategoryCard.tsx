import React from "react";
import styled from "styled-components";

const Container = {
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
    <Container.Container onClick={() => onClick(groupId)}>
      {question}
    </Container.Container>
  );
};

export default CategoryCard;
