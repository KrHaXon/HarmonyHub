import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navigation/Navbar';
import AuthNavbar from './components/Navigation/AuthNavbar';
import Hero from './components/Hero/Hero';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PageTransition from './components/PageTransition';
import './styles/globals.css';
import './styles/transitions.css';
import Profile from './sites/Profile';
import PlaylistDetails from './sites/PlaylistDetails';
import { PlayerProvider } from './context/PlayerContext';
import PlayerBar from './components/PlayerBar';
import Author from './components/Author/Author';

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <PlayerProvider>
      <div className="app">
        {isAuthPage ? <AuthNavbar /> : <Navbar />}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />
            <Route
              path="/register"
              element={
                <PageTransition>
                  <Register />
                </PageTransition>
              }
            />
            <Route
              path="/"
              element={
                <PageTransition>
                  <>
                    <Hero />
                    <MainContent />
                    <Footer />
                  </>
                </PageTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <Profile />
                </PageTransition>
              }
            />
            <Route
              path="/playlist/:id"
              element={
                <PageTransition>
                  <PlaylistDetails />
                </PageTransition>
              }
            />
               
             <Route
              path="/author/:id"
              element={
                <PageTransition>
                  <Author />
                </PageTransition>
              }
            />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </AnimatePresence>
        <PlayerBar />
      </div>
    </PlayerProvider>
  );
}

export default App;
