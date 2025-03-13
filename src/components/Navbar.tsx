import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const NavItems: { name: string; path: string }[] = [
  { name: "ARACHNID", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "ADMIN", path: "/admin" },
];

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
  NavBtn: styled.li`
    list-style: none;

    &:first-child {
      margin-right: auto;
    }

    &:nth-child(2) {
      margin-right: 30px;
    }

    a {
      font-size: 1rem;
      color: inherit;
      font-weight: 600;
      text-decoration: none;
    }
  `,
};

const Navbar: React.FC = () => {
  return (
    <Container.Main>
      {NavItems.map((item, index) => (
        <Container.NavBtn key={index}>
          <Link to={item.path}>{item.name}</Link>
        </Container.NavBtn>
      ))}
    </Container.Main>
  );
};

export default Navbar;
