import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import OptimizationPage from './pages/OptimizationPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Prompt Optimization</h1>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/optimize">Optimize</NavLink>
          <NavLink to="/about">About</NavLink>
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
        <p>Prompt Optimization Middleware &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;