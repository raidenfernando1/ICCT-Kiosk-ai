import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = {
  Container: styled.nav``,
  Wrapper: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-block: 25px;
    padding-inline: var(--layout-inline-space);
    display: flex;
  `,
  NavBtn: styled.li`
    list-style: none;

    &:first-child {
      margin-right: auto;
    }

    &:nth-child(2) {
      margin-right: 30px;
    }

    a {
      font-size: 0.9rem;
      color: inherit;
      text-decoration: none;
    }
  `,
};

const Navbar = () => {
  const NavItems = [
    { name: "RAID3N.NET | ARACHNID", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "ADMIN", path: "/admin" },
  ];

  return (
    <Container.Container>
      <Container.Wrapper>
        {NavItems.map((item) => (
          <Container.NavBtn>
            <Link to={item.path}>{item.name}</Link>
          </Container.NavBtn>
        ))}
      </Container.Wrapper>
    </Container.Container>
  );
};

export default Navbar;
