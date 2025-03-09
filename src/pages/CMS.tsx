import styled from "styled-components";
import Navbar from "../components/cms/Navbar";
import ContentContainer from "../components/cms/ContentContainer";
import { CMSProvider } from "../context/useCMS";

const Container = {
  MainContainer: styled.main`
    width: 100;
    height: 100%;
  `,
};

const CMSPage = () => {
  return (
    <CMSProvider>
      <Container.MainContainer>
        <Navbar />
        <ContentContainer />
      </Container.MainContainer>
    </CMSProvider>
  );
};

export default CMSPage;
