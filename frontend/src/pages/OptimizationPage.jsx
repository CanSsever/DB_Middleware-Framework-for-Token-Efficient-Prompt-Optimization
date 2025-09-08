import React, { useState } from 'react';
import { apiClient } from '../api/client';

const OptimizationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [optimizationMethod, setOptimizationMethod] = useState('current');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOptimizing(true);
    setError(null);
    setResults(null);
    
    try {
      // Use Gemini as default model for optimization
      const requestData = {
        prompt,
        targetModel: 'gemini-1.5-pro',
        optimizationMethod
      };
      
      const data = await apiClient.optimizePrompt(requestData);
      setResults(data);
    } catch (error) {
      console.error('Optimization failed:', error);
      setError('Failed to optimize prompt. Please check the console for more details.');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="optimization-page">
      <h2>Prompt Optimization</h2>
      
      <div className="page-content">
        {/* Input Panel */}
        <div className="input-panel">
          <div className="card">
            <h3>Optimization Parameters</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="prompt">Prompt:</label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  rows="6"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="optimizationMethod">Optimization Method:</label>
                <select
                  id="optimizationMethod"
                  value={optimizationMethod}
                  onChange={(e) => setOptimizationMethod(e.target.value)}
                >
                  <option value="current">Current Strategies</option>
                  <option value="gemini">Gemini API</option>
                </select>
              </div>
              
              <button type="submit" className="submit-button" disabled={isOptimizing}>
                {isOptimizing ? 'Optimizing...' : 'Optimize Prompt'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Results Panel */}
        <div className="results-panel">
          {error && (
            <div className="error-section">
              <h3>Error</h3>
              <div className="error-message">{error}</div>
            </div>
          )}
          
          {results ? (
            <div className="results-content">
              <h3>Optimization Results</h3>
              
              <div className="result-section">
                <h4>Token Comparison</h4>
                <div className="token-comparison">
                  <div className="token-item">
                    <span className="label">Original</span>
                    <span className="value">{results.original.tokenCount} tokens</span>
                  </div>
                  <div className="token-item">
                    <span className="label">Optimized</span>
                    <span className="value">{results.optimized.tokenCount} tokens</span>
                  </div>
                  <div className="token-item">
                    <span className="label">Reduction</span>
                    <span className="value">{results.reductionPercentage.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="result-section">
                <h4>Cost Estimation</h4>
                <div className="cost-comparison">
                  <div className="cost-item">
                    <span className="label">Original</span>
                    <span className="value">${results.original.cost.toFixed(6)}</span>
                  </div>
                  <div className="cost-item">
                    <span className="label">Optimized</span>
                    <span className="value">${results.optimized.cost.toFixed(6)}</span>
                  </div>
                  <div className="cost-item">
                    <span className="label">Savings</span>
                    <span className="value">${results.costBenefitAnalysis.costSavings.toFixed(6)}</span>
                  </div>
                </div>
              </div>
              
              <div className="result-section">
                <h4>Prompt Comparison</h4>
                <div className="prompt-comparison-stacked">
                  <div className="prompt-item-stacked">
                    <h5>Original Prompt</h5>
                    <div className="prompt-text-stacked">{results.original.prompt}</div>
                  </div>
                  <div className="prompt-item-stacked">
                    <h5>Optimized Prompt</h5>
                    <div className="prompt-text-stacked">{results.optimized.prompt}</div>
                  </div>
                </div>
              </div>
              
              <div className="result-section">
                <h4>Quality Metrics</h4>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <span className="label">BLEU</span>
                    <span className="value">{results.metrics.bleu.toFixed(2)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="label">ROUGE-1</span>
                    <span className="value">{results.metrics.rouge1.toFixed(2)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="label">ROUGE-2</span>
                    <span className="value">{results.metrics.rouge2.toFixed(2)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="label">ROUGE-L</span>
                    <span className="value">{results.metrics.rougeL.toFixed(2)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="label">Semantic Similarity</span>
                    <span className="value">{results.metrics.semanticSimilarity.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Display Gemini error if it occurred */}
              {results.geminiError && (
                <div className="result-section">
                  <h4>Gemini API Error</h4>
                  <div className="error-message">
                    {results.geminiError}
                  </div>
                </div>
              )}
            </div>
          ) : !isOptimizing && !error ? (
            <div className="placeholder">
              <p>Enter your prompt and click "Optimize Prompt" to see results</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OptimizationPage;