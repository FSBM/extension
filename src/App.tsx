import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import SubmitPage from "./page/SubmitPage";
import SearchPage from "./page/SearchPage";
import Intro from "./page/IntroPage";
// import SuccessPage from './page/SuccessPage'
import ErrorPage from "./page/ErrorPage";
import SearchResponse from "./page/SearchResultPage";
import ResponsePage from "./page/ResponsePage";
import './index.css';

const pageVariants = {
  initial: { opacity: 1, y: 0 },  
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },  
  exit: { opacity: 1, y: 0, transition: { duration: 0.2 } }  
};

import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="m-auto p-0 bg-transparent"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><ResponsePage /></PageWrapper>} />
        <Route path="/intro" element={<PageWrapper><Intro /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><SearchPage /></PageWrapper>} />
        <Route path="/success" element={<PageWrapper><ErrorPage /></PageWrapper>} />
        <Route path="/response" element={<PageWrapper><SearchResponse /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div className="flex items-center justify-center bg-transparent">
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;
