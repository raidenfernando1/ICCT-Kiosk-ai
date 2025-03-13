import styled from "styled-components";
import Navbar from "../components/cms/Navbar";
import ContentContainer from "../components/cms/ContentContainer";
import { CMSProvider } from "../context/useCMS";

const Container = {
  Main: styled.main`
    width: 100;
    height: 100%;
  `,
};

const CMSPage = () => {
  return (
    <CMSProvider>
      <Container.Main>
        <Navbar />
        <ContentContainer />
      </Container.Main>
    </CMSProvider>
  );
};

export default CMSPage;
