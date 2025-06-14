import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Import AnimatePresence and motion
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import NewsPage from '../pages/NewsPage';
import EventsPage from '../pages/EventsPage';
import NewsDetailPage from '../pages/NewsDetailPage';
import EventDetailPage from '../pages/EventDetailPage';
// import NotFoundPage from '../pages/NotFoundPage'; // Will be created later

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw", // Slide in from left
    scale: 0.8
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: "100vw", // Slide out to right
    scale: 1.2
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Create a component to handle the animated routes
const AnimatedRoutes = () => {
  const location = useLocation(); // Get location for AnimatePresence key

  return (
    <AnimatePresence mode="wait"> {/* 'wait' ensures the exiting page finishes animating out before new one enters */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/news" element={<PageWrapper><NewsPage /></PageWrapper>} />
        <Route path="/news/:newsId" element={<PageWrapper><NewsDetailPage /></PageWrapper>} />
        <Route path="/events" element={<PageWrapper><EventsPage /></PageWrapper>} />
        <Route path="/events/:eventId" element={<PageWrapper><EventDetailPage /></PageWrapper>} />
        {/* <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} /> */}
      </Routes>
    </AnimatePresence>
  );
};

// Wrapper component for motion.div to apply to each page
const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{ position: 'absolute', width: '100%' }} // Necessary for smooth transitions
  >
    {children}
  </motion.div>
);

const AppRouter = () => {
  return (
    <Router>
      <Header />
      {/* Relative positioning is needed for the absolute positioned PageWrapper */}
      <div style={{ position: 'relative', flex: '1', minHeight: 'calc(100vh - 120px)', overflowX: 'hidden' }}>
        <AnimatedRoutes />
      </div>
      <Footer />
    </Router>
  );
};

export default AppRouter;
