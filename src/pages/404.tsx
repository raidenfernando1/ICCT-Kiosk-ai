import styled from "styled-components";

const Container = {
  Main: styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const NotFound = () => {
  return (
    <Container.Main>
      <h1>404 | THIS PAGE DOESNT EXIST</h1>
    </Container.Main>
  );
};

export default NotFound;
