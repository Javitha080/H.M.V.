import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Core Components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Public Page Components
import HomePage from '../pages/HomePage';
import NewsPage from '../pages/NewsPage';
import EventsPage from '../pages/EventsPage';
import NewsDetailPage from '../pages/NewsDetailPage';
import EventDetailPage from '../pages/EventDetailPage';
import NotFoundPage from '../pages/NotFoundPage'; // Import NotFoundPage

// Admin Components
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminNewsPage from '../pages/admin/AdminNewsPage';
import CreateNewsArticlePage from '../pages/admin/CreateNewsArticlePage';
import EditNewsArticlePage from '../pages/admin/EditNewsArticlePage';
import AdminEventsPage from '../pages/admin/AdminEventsPage';
import CreateEventPage from '../pages/admin/CreateEventPage';
import EditEventPage from '../pages/admin/EditEventPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import ProtectedRoute from './ProtectedRoute';

const pageVariants = { /* ... same as before ... */ };
const pageTransition = { /* ... same as before ... */ };
pageVariants.initial = { opacity: 0, x: "-100vw", scale: 0.8 };
pageVariants.in = { opacity: 1, x: 0, scale: 1 };
pageVariants.out = { opacity: 0, x: "100vw", scale: 1.2 };
pageTransition.type = "tween";
pageTransition.ease = "anticipate";
pageTransition.duration = 0.5;

const PageMotionWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{ position: 'absolute', width: '100%', minHeight: 'calc(100vh - 120px)' }}
  >
    {children}
  </motion.div>
);

// AnimatedPublicRoutes component now includes the NotFoundPage route
const AnimatedPublicRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageMotionWrapper><HomePage /></PageMotionWrapper>} />
          <Route path="/news" element={<PageMotionWrapper><NewsPage /></PageMotionWrapper>} />
          <Route path="/news/:newsId" element={<PageMotionWrapper><NewsDetailPage /></PageMotionWrapper>} />
          <Route path="/events" element={<PageMotionWrapper><EventsPage /></PageMotionWrapper>} />
          <Route path="/events/:eventId" element={<PageMotionWrapper><EventDetailPage /></PageMotionWrapper>} />
          {/* Wildcard route for 404 - MUST BE LAST public route */}
          <Route path="*" element={<PageMotionWrapper><NotFoundPage /></PageMotionWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="news" element={<AdminNewsPage />} />
          <Route path="news/new" element={<CreateNewsArticlePage />} />
          <Route path="news/edit/:newsId" element={<EditNewsArticlePage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="events/new" element={<CreateEventPage />} />
          <Route path="events/edit/:eventId" element={<EditEventPage />} />
          <Route index element={<AdminDashboardPage />} />
          {/* Catch-all for admin section if needed, or let it fall through to public 404 */}
          {/* <Route path="*" element={<AdminNotFoundPage />} />  // Optional: specific Admin 404 */}
        </Route>

        {/* Public Routes - Rendered within a layout that includes Header/Footer */}
        <Route path="/*" element={
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ position: 'relative', flex: '1', overflowX: 'hidden' }}>
              <AnimatedPublicRoutes /> {/* This component now contains the public routes including 404 */}
            </div>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;
