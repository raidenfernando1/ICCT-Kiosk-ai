import styled from "styled-components";
import CMSLayout from "../components/cms/Layout";

const Container = {
  Main: styled.main`
    width: 100%;
    height: 100%;
  `,
};

const CMSPage = () => {
  return (
    <Container.Main>
      <CMSLayout />
    </Container.Main>
  );
};

export default CMSPage;
