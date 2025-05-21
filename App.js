import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import QuizBuilder from './components/QuizBuilder/QuizBuilder';
import QuizDone from './components/QuizBuilder/QuizDone';
import QuizFetcher from './components/QuizTaker/QuizFetcher';
import QuizTaker from './components/QuizTaker/QuizTaker';
import QuizByCode from './components/QuizTaker/QuizByCode';
import QuizTaken from './components/QuizTaker/QuizTaken';
import QuizGallery from './components/QuizGallery/QuizGallery';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.nav 
      className={`navbar ${isHome ? 'navbar-transparent' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="nav-brand"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="nav-brand-link">QuizDen</Link>
      </motion.div>
      <div className="nav-links">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/create" className="nav-link">Create Quiz</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/take" className="nav-link">Take Quiz</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/gallery" className="nav-link">Quiz Gallery</Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

const AppContent = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const location = useLocation();

  return (
    <div className="app">
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="page-container"
        >
          <Routes location={location}>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/gallery" element={<QuizGallery />} />

            {/* Quiz Creation Flow */}
            <Route path="/create" element={<QuizBuilder />} />
            <Route 
              path="/quiz-done" 
              element={<QuizDone />}
            />

            {/* Quiz Taking Flow */}
            <Route path="/take" element={<QuizFetcher />} />
            <Route 
              path="/quiz/:quizCode" 
              element={<QuizTaker />}
            />
            <Route 
              path="/quiz/:quizCode/results" 
              element={<QuizTaken />}
            />

            {/* Redirect old routes to new ones */}
            <Route path="/quiz-builder" element={<Navigate to="/create" replace />} />
            <Route path="/quiz-fetcher" element={<Navigate to="/take" replace />} />
            <Route path="/quiz/join" element={<Navigate to="/take" replace />} />

            {/* Catch-all route for 404 */}
            <Route 
              path="*" 
              element={
                <div className="not-found">
                  <h1>404 - Page Not Found</h1>
                  <Link to="/">Go Home</Link>
                </div>
              } 
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return <AppContent />;
}

export default App;
