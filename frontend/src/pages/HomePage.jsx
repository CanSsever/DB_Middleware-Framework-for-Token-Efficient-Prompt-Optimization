import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="content">
      {/* Hero Section */}
      <section className="hero">
        <h2>Optimize Your LLM Prompts</h2>
        <p className="hero-subtitle">Reduce token usage while preserving semantic quality and analyze cost-benefit tradeoffs.</p>
        
        <div className="hero-cta">
          <button className="start-button">
            <Link to="/optimize">Start Optimizing</Link>
          </button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features">
        <h3>Powerful Optimization Features</h3>
        <div className="feature-grid">
          <div className="feature">
            <h4>Token Reduction</h4>
            <p>Reduce token usage by up to 50% without sacrificing quality through advanced pruning techniques.</p>
          </div>
          <div className="feature">
            <h4>Cost Savings</h4>
            <p>Analyze potential cost savings for your LLM API usage with detailed financial metrics.</p>
          </div>
          <div className="feature">
            <h4>Quality Metrics</h4>
            <p>Evaluate semantic similarity with BLEU, ROUGE, and embedding-based similarity scores.</p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="card">
          <h3>How It Works</h3>
          <ol>
            <li>Enter your prompt and parameters in the optimization interface</li>
            <li>Our system applies advanced token reduction techniques</li>
            <li>Compare original vs optimized prompts side-by-side</li>
            <li>View detailed cost savings and quality metrics analysis</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default HomePage;