import React from 'react';

const AboutPage = () => {
  return (
    <div className="content">
      <h2>About Prompt Optimization</h2>
      <p>
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
            Uses a smaller, efficient LLM to summarize long prompts while preserving core semantic meaning,
            task instructions, and key context constraints.
          </p>
        </div>
        
        <div className="strategy">
          <h4>3. Few-Shot Compression</h4>
          <p>
            Analyzes examples to identify and remove redundant ones, compresses individual examples by removing
            non-essential information, and selects the most representative examples.
          </p>
        </div>
        
        <div className="strategy">
          <h4>4. Formatting Normalization</h4>
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
    </div>
  );
};

export default AboutPage;