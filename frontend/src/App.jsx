import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import OptimizationPage from './pages/OptimizationPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Prompt Optimization Middleware</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/optimize">Optimize</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/optimize" element={<OptimizationPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      
      <footer>
        <p>Prompt Optimization Middleware &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;
