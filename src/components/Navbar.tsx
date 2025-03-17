import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = {
  Main: styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-block: 25px;
    padding-inline: var(--layout-inline-space);
    display: flex;
  `,

  Wrapper: styled.div`
    display: flex;
    gap: 30px;
    width: 100%;
  `,

  Buttons: styled.li<{ $isFirst?: boolean }>`
    list-style: none;
    ${(props) => props.$isFirst && "margin-right: auto;"}

    a {
      font-size: 1rem;
      color: inherit;
      font-weight: 600;
      text-decoration: none;
    }
  `,

  Search: styled.input`
    margin-right: auto;
  `,
};

const Navbar = ({ paths }: { paths: { name: string; path: string }[] }) => {
  return (
    <Container.Main>
      <Container.Wrapper>
        {paths.map((item, index) => (
          <Container.Buttons key={index} $isFirst={index === 0}>
            <Link to={item.path}>{item.name}</Link>
          </Container.Buttons>
        ))}
      </Container.Wrapper>
    </Container.Main>
  );
};

export default Navbar;
