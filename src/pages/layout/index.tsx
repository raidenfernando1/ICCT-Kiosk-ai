import { GroqProvider } from "../../context/useGroq";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./styles.module.css";
import Navbar from "../../components/navbar";
import MainPage from "../main";
import { AdminPage } from "../admin";

export default function Layout() {
  const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <main className={styles.LayoutContainer}>{children}</main>;
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
          <Navbar />
          <AdminPage />
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
