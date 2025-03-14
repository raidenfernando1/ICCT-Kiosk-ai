import { GroqProvider } from "../context/useGroq";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
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
      <img src="icct-logo.png" />
    </Overlay.Main>
  );
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
    <>
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
    </>
  );
}

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
