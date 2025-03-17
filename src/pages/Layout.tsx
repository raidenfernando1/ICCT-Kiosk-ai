import { GroqProvider } from "../context/useGroq";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MainPage from "./Main";
import AdminPage from "./Admin";
import NotFound from "./404";
import { useAuth } from "../context/useAuth";
import CMSPage from "./CMS";

const Container = {
  Main: styled.main`
    margin-inline: var(--layout-inline-space);
    padding-block: 70px;
    height: 100dvh;

    @media (max-width: 768px) {
      padding-bottom: var(--layout-inline-space);
    }
  `,
};

const Overlay = {
  Main: styled(motion.main)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgb(15, 15, 15);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    color: white;
    pointer-events: none;
  `,
};

const OverlayAnimation = ({ onFinish }: { onFinish: () => void }) => {
  const [startMove, setStartMove] = useState(false);

  useEffect(() => {
    const waitTimer = setTimeout(() => setStartMove(true), 1000);
    const removeTimer = setTimeout(onFinish, 3000);

    return () => {
      clearTimeout(waitTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <Overlay.Main
      initial={{ translateY: 0 }}
      animate={{
        translateY: startMove ? "100vh" : 0,
        transition: startMove ? { duration: 2, ease: "easeInOut" } : {},
      }}
    >
      <img src="icct-logo.png" alt="ICCT Logo" />
    </Overlay.Main>
  );
};

const pageTransition = {
  initial: { filter: "blur(10px)" },
  animate: {
    filter: "blur(0px)",
  },
  exit: {
    filter: "blur(10px)",
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && location.pathname !== "/admin/cms") {
      setIsAuthenticated(false);
    }
  }, [location.pathname, isAuthenticated, setIsAuthenticated]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Navbar
                paths={[
                  { name: "ARACHNID", path: "/" },
                  { name: "ABOUT", path: "/about" },
                  { name: "ADMIN", path: "/admin" },
                ]}
              />
              <MainPage />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <Navbar
                paths={[
                  { name: "ARACHNID", path: "/" },
                  { name: "ABOUT", path: "/about" },
                  { name: "ADMIN", path: "/admin" },
                ]}
              />
              {/* About Page Content */}
            </PageWrapper>
          }
        />
        <Route
          path="/admin"
          element={
            <PageWrapper>
              <Navbar
                paths={[
                  { name: "ARACHNID", path: "/" },
                  { name: "ABOUT", path: "/about" },
                  { name: "ADMIN", path: "/admin" },
                ]}
              />
              <AdminPage />
            </PageWrapper>
          }
        />
        <Route
          path="/admin/cms"
          element={
            <PageWrapper>
              <Navbar
                paths={[
                  { name: "LOGOUT", path: "/" },
                  { name: "ACCOUNT SETTINGS", path: "settings" },
                ]}
              />
              <CMSPage />
            </PageWrapper>
          }
        />
        <Route
          path="/*"
          element={
            <PageWrapper>
              <Navbar
                paths={[
                  { name: "ARACHNID", path: "/" },
                  { name: "ABOUT", path: "/about" },
                  { name: "ADMIN", path: "/admin" },
                ]}
              />
              <NotFound />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
  >
    <Container.Main>{children}</Container.Main>
  </motion.div>
);

export default function Layout() {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <BrowserRouter>
      <GroqProvider>
        {showOverlay && (
          <OverlayAnimation onFinish={() => setShowOverlay(false)} />
        )}
        <AnimatedRoutes />
      </GroqProvider>
    </BrowserRouter>
  );
}
