import React from "react";
import { GroqProvider } from "../context/useGroq";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import MainPage from "./Main";
import CMSPage from "./CMS";

const Container = {
  LayoutContainer: styled.main`
    margin-inline: var(--layout-inline-space);
    padding-block: 70px;
    height: 100dvh;

    @media (max-width: 768px) {
      padding-bottom: var(--layout-inline-space);
    }
  `,
};

export default function Layout() {
  const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Container.LayoutContainer>{children}</Container.LayoutContainer>;
  };

  const RouteList = [
    {
      element: (
        <Layout>
          <Navbar />
          <MainPage />
        </Layout>
      ),
      path: "/",
    },
    {
      element: (
        <Layout>
          <Navbar />
          {/* About */}
        </Layout>
      ),
      path: "/about",
    },
    {
      element: (
        <Layout>
          <CMSPage />
        </Layout>
      ),
      path: "/admin",
    },
    {
      element: (
        <Layout>
          <Navbar />
          {/* 404 */}
        </Layout>
      ),
      path: "/*",
    },
  ];

  return (
    <BrowserRouter>
      <GroqProvider>
        <Routes>
          {RouteList.map((route) => (
            <Route path={route.path} key={route.path} element={route.element} />
          ))}
        </Routes>
      </GroqProvider>
    </BrowserRouter>
  );
}
