import React from 'react';

const AboutPage = () => {
  return (
    <div className="content">
      <h2>About Prompt Optimization</h2>
      <p className="page-intro">
        This middleware framework helps reduce token usage in LLM prompts while preserving semantic quality.
        By optimizing prompts, you can significantly reduce costs and latency when using LLM APIs.
      </p>
      
      <div className="card">
        <h3>Optimization Strategies</h3>
        
        <div className="strategy">
          <h4>1. Structural Pruning</h4>
          <p>
            Identifies and removes redundant phrases, unnecessary modifiers, and simplifies complex sentence structures
            while preserving the logical flow and core meaning of the prompt.
          </p>
        </div>
        
        <div className="strategy">
          <h4>2. Summarization</h4>
          <p>
            For longer prompts, the system applies summarization techniques to preserve core semantic meaning
            while reducing verbosity and non-essential information.
          </p>
        </div>
        
        <div className="strategy">
          <h4>3. Formatting Normalization</h4>
          <p>
            Removes excessive whitespace, line breaks, and decorative elements while standardizing punctuation
            and converting structured data to more compact representations.
          </p>
        </div>
      </div>
      
      <div className="card">
        <h3>Evaluation Metrics</h3>
        <p>
          We evaluate the quality of optimized prompts using several automated metrics:
        </p>
        <ul>
          <li><strong>Token Reduction %:</strong> Measures the percentage of tokens reduced</li>
          <li><strong>BLEU Score:</strong> Computes n-gram precision between original and optimized outputs</li>
          <li><strong>ROUGE Score:</strong> Calculates recall-oriented metrics for prompt outputs</li>
          <li><strong>Semantic Similarity:</strong> Uses sentence embeddings to compute cosine similarity</li>
        </ul>
      </div>
      
      <div className="card">
        <h3>How to Use</h3>
        <p>
          Using the prompt optimization tool is simple:
        </p>
        <ol>
          <li>Enter your prompt in the text area on the Optimization page</li>
          <li>Click the "Optimize Prompt" button</li>
          <li>View the optimized prompt along with token counts, cost savings, and quality metrics</li>
        </ol>
        <p>
          The system automatically applies all relevant optimization strategies to reduce token usage while
          preserving the semantic meaning and effectiveness of your prompt.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;