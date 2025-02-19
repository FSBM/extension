import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SearchPage from "./page/SearchPage";
import Intro from "./page/IntroPage";
import ErrorPage from "./page/ErrorPage";
import SearchResponse from "./page/SearchResultPage";
import ResponsePage from "./page/ResponsePage";
import './index.css';



const pageVariants = {
  initial: { opacity: 1, y: 0 },  
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },  
  exit: { opacity: 1, y: 0, transition: { duration: 0.2 } }  
};

import { ReactNode, useEffect } from "react";

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
  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if access_token is already in localStorage
    const accessToken = localStorage.getItem("access_token");
    document.cookie = `access_token=${accessToken}; path=/; domain=localhost; SameSite=Lax`

    // const [quotes, setQuotes] = useState([]);

    const fetchData = async () => {
      const res = await fetch("https://magical-famous-emu.ngrok-free.app/quotes");
      console.log(res);
    }
    fetchData();




    if (accessToken) {
      document.cookie = `access_token=${accessToken}; path=/; domain=localhost; SameSite=Lax`
      Navigate("/submit");
      console.log("Access token found in localStorage: " + accessToken);
      chrome.cookies.getAll({}, (cookies) => {
        cookies.forEach((cookie) => {
          if (cookie.name === "refresh_token") {
            localStorage.setItem("refresh_token", cookie.value);
          }
        });
      })
      
      
    }

    const handleCookieChange = (changeInfo: any) => {
      
      if (changeInfo.cookie.name === "access_token") {
        if (changeInfo.cookie.value) {
          localStorage.setItem("access_token", changeInfo.cookie.value);
          Navigate("/submit");
          console.log("Got the updated access_token: " + changeInfo.cookie.value);
        } else {
          console.log("access_token has been removed");
        }
      }
    };

    if(!accessToken){
      chrome.cookies.onChanged.addListener(handleCookieChange);
    }

    // Clean up the listener when component is unmounted
    return () => {
      if(!accessToken){
        chrome.cookies.onChanged.removeListener(handleCookieChange);
      }
    };
  },[]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Intro /></PageWrapper>} />
        <Route path="/submit" element={<PageWrapper><ResponsePage /></PageWrapper>} />
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