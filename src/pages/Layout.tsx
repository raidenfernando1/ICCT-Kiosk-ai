import { GroqProvider } from "../context/useGroq";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MainPage from "./Main";
import AdminPage from "./Admin";
import NotFound from "./404";

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

const pageTransition = {
  initial: { opacity: 0, translateY: 30, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    translateY: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    translateY: -30,
    filter: "blur(10px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <div style={{ overflow: "hidden" }}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Container.Main>
                  <Navbar />
                  <MainPage />
                </Container.Main>
              </motion.div>
            </div>
          }
        />

        <Route
          path="/about"
          element={
            <div style={{ overflow: "hidden" }}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Container.Main>
                  <Navbar />
                  {/* About Page */}
                </Container.Main>
              </motion.div>
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <div style={{ overflow: "hidden" }}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Container.Main>
                  <AdminPage />
                </Container.Main>
              </motion.div>
            </div>
          }
        />
        <Route
          path="/*"
          element={
            <div style={{ overflow: "hidden" }}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Container.Main>
                  <Navbar />
                  <NotFound />
                </Container.Main>
              </motion.div>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function Layout() {
  return (
    <BrowserRouter>
      <GroqProvider>
        <AnimatedRoutes />
      </GroqProvider>
    </BrowserRouter>
  );
}
