import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = {
  Container: styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-block: 25px;
    padding-inline: var(--layout-inline-space);
    display: flex;
  `,
  NavContainer: styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;

    > li {
      list-style: none;
    }

    li > a {
      text-decoration: none;
      color: inherit;
    }
  `,
};

const CMSNavbar = () => {
  const Navbtns = [
    { name: `HELLO, ADMIN NAME`, to: "/admin" },
    { name: "ACCOUNT SETTINGS", to: "/admin" },
  ];
  return (
    <Container.Container>
      <Container.NavContainer>
        {Navbtns.map((nav) => {
          return (
            <li key={nav.name}>
              <Link to={nav.to}>{nav.name}</Link>
            </li>
          );
        })}
      </Container.NavContainer>
    </Container.Container>
  );
};

export default CMSNavbar;
