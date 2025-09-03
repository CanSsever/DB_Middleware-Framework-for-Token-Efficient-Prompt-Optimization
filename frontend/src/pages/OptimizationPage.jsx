import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

const OptimizationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [examples, setExamples] = useState(['']);
  const [taskType, setTaskType] = useState('summarization');
  const [targetModel, setTargetModel] = useState('gpt-3.5-turbo');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAddExample = () => {
    setExamples([...examples, '']);
  };

  const handleExampleChange = (index, value) => {
    const newExamples = [...examples];
    newExamples[index] = value;
    setExamples(newExamples);
  };

  const handleRemoveExample = (index) => {
    if (examples.length > 1) {
      const newExamples = examples.filter((_, i) => i !== index);
      setExamples(newExamples);
    }
  };

  const [models, setModels] = useState([]);

  useEffect(() => {
    // Fetch available models
    const fetchModels = async () => {
      try {
        const data = await apiClient.getModels();
        setModels(data.models);
        if (data.models.length > 0) {
          setTargetModel(data.models[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch models:', error);
      }
    };

    fetchModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOptimizing(true);
    
    try {
      const requestData = {
        prompt,
        examples: examples.filter(example => example.trim() !== ''),
        taskType,
        targetModel
      };
      
      const data = await apiClient.optimizePrompt(requestData);
      setResults(data);
    } catch (error) {
      console.error('Optimization failed:', error);
      // Set error state or show error message
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="optimization-page">
      <h2>Prompt Optimization</h2>
      
      <div className="page-content">
        <div className="input-panel">
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
              <label>Few-Shot Examples:</label>
              {examples.map((example, index) => (
                <div key={index} className="example-input">
                  <textarea
                    value={example}
                    onChange={(e) => handleExampleChange(index, e.target.value)}
                    placeholder={`Example ${index + 1}`}
                    rows="3"
                  />
                  {examples.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExample(index)}
                      className="remove-example"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddExample} className="add-example">
                + Add Example
              </button>
            </div>
            
            <div className="form-group">
              <label htmlFor="taskType">Task Type:</label>
              <select
                id="taskType"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
              >
                <option value="summarization">Summarization</option>
                <option value="question_answering">Question Answering</option>
                <option value="reasoning">Reasoning</option>
                <option value="text_generation">Text Generation</option>
                <option value="classification">Classification</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="targetModel">Target Model:</label>
              <select
                id="targetModel"
                value={targetModel}
                onChange={(e) => setTargetModel(e.target.value)}
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="submit-button" disabled={isOptimizing}>
              {isOptimizing ? 'Optimizing...' : 'Optimize Prompt'}
            </button>
          </form>
        </div>
        
        <div className="results-panel">
          {results ? (
            <div className="results-content">
              <h3>Optimization Results</h3>
              
              <div className="result-section">
                <h4>Token Comparison</h4>
                <div className="token-comparison">
                  <div className="token-item">
                    <span className="label">Original:</span>
                    <span className="value">{results.original.tokenCount} tokens</span>
                  </div>
                  <div className="token-item">
                    <span className="label">Optimized:</span>
                    <span className="value">{results.optimized.tokenCount} tokens</span>
                  </div>
                  <div className="token-item">
                    <span className="label">Reduction:</span>
                    <span className="value">{results.reductionPercentage.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="result-section">
                <h4>Cost Estimation</h4>
                <div className="cost-comparison">
                  <div className="cost-item">
                    <span className="label">Original:</span>
                    <span className="value">${results.original.cost.toFixed(4)}</span>
                  </div>
                  <div className="cost-item">
                    <span className="label">Optimized:</span>
                    <span className="value">${results.optimized.cost.toFixed(4)}</span>
                  </div>
                  <div className="cost-item">
                    <span className="label">Savings:</span>
                    <span className="value">${results.costBenefitAnalysis.costSavings.toFixed(4)}</span>
                  </div>
                </div>
              </div>
              
              <div className="result-section">
                <h4>Prompt Comparison</h4>
                <div className="prompt-comparison">
                  <div className="prompt-item">
                    <h5>Original Prompt</h5>
                    <div className="prompt-text">{results.original.prompt}</div>
                  </div>
                  <div className="prompt-item">
                    <h5>Optimized Prompt</h5>
                    <div className="prompt-text">{results.optimized.prompt}</div>
                  </div>
                </div>
              </div>
              
              <div className="result-section">
                <h4>Quality Metrics</h4>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <span className="label">BLEU:</span>
                    <span className="value">{results.metrics.bleu.toFixed(2)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="label">ROUGE-1:</span>
                    <span className="value">{results.metrics.rouge1.toFixed(2)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="label">ROUGE-2:</span>
                    <span className="value">{results.metrics.rouge2.toFixed(2)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="label">ROUGE-L:</span>
                    <span className="value">{results.metrics.rougeL.toFixed(2)}</span>
                  </div>
                  <div className="metric-item">
                    <span className="label">Semantic Similarity:</span>
                    <span className="value">{results.metrics.semanticSimilarity.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="placeholder">
              <p>Enter your prompt and click "Optimize Prompt" to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimizationPage;