import React from 'react';
import Navbar from './components/Navigation/Navbar';
import Hero from './components/Hero/Hero';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
