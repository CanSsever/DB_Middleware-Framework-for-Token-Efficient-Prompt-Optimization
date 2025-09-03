import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="content">
      <h2>Optimize Your LLM Prompts</h2>
      <p>Reduce token usage while preserving semantic quality and analyze cost-benefit tradeoffs.</p>
      
      <div className="card">
        <h3>How It Works</h3>
        <ol>
          <li>Enter your prompt and parameters</li>
          <li>Our system applies token reduction techniques</li>
          <li>Compare original vs optimized prompts</li>
          <li>View cost savings and quality metrics</li>
        </ol>
        <button className="start-button">
          <Link to="/optimize">Start Optimizing</Link>
        </button>
      </div>
      
      <div className="features">
        <h3>Key Features</h3>
        <div className="feature-grid">
          <div className="feature">
            <h4>Token Reduction</h4>
            <p>Reduce token usage by up to 50% without sacrificing quality</p>
          </div>
          <div className="feature">
            <h4>Cost Savings</h4>
            <p>Analyze potential cost savings for your LLM API usage</p>
          </div>
          <div className="feature">
            <h4>Quality Metrics</h4>
            <p>Evaluate semantic similarity with BLEU, ROUGE, and embedding scores</p>
          </div>
          <div className="feature">
            <h4>Multiple Strategies</h4>
            <p>Apply structural pruning, summarization, and formatting normalization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;