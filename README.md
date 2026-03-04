# LLM Prompt Optimization Middleware

A middleware system designed to **reduce token usage and API costs for Large Language Models (LLMs)** while preserving response quality.

The system analyzes prompts, applies optimization strategies, and compares the original and optimized prompts using multiple quality metrics.

This project demonstrates how **prompt engineering and token-aware optimization techniques** can significantly reduce LLM inference costs in real-world AI applications.

---

## Key Capabilities

• Prompt optimization to reduce token usage  
• API cost estimation before and after optimization  
• Semantic quality comparison between original and optimized prompts  
• Evaluation using BLEU, ROUGE, and semantic similarity metrics  
• Web interface for interactive prompt testing

## Technology Stack

### Frontend
- React with Vite
- React Router for navigation
- CSS for styling

### Backend
- Node.js with Express
- Tiktoken for token counting
- Google Generative AI SDK for Gemini API integration
- RESTful API architecture

## Project Structure

```
.
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── api/        # API client
│   │   ├── pages/      # Page components
│   │   └── App.jsx     # Main application component
│   └── package.json    # Frontend dependencies
├── backend/            # Node.js backend server
│   ├── src/
│   │   ├── optimization/  # Prompt optimization strategies
│   │   ├── utils/         # Utility functions
│   │   └── server.js      # Main server file
│   └── package.json       # Backend dependencies
├── PRD.md              # Project Requirements Document
├── PROJECT_SUMMARY.md # Project Summary
└── README.md           # This file
```

## Installation and Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy [.env.example](file://c:\Users\efese\Desktop\deneme-kumar\backend\.env.example) to [.env](file://c:\Users\efese\Desktop\deneme-kumar\backend\.env):
     ```bash
     cp .env.example .env
     ```
   - Edit [.env](file://c:\Users\efese\Desktop\deneme-kumar\backend\.env) and replace `your_actual_api_key_here` with your actual Gemini API key
   - You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/)

4. Start the development server:
   ```bash
   npm run dev
   ```

   The backend server will start on port 3001.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend server will start on port 5173 (or the next available port).

## API Endpoints

### POST /api/optimize
Optimizes a prompt and returns the results.

**Request Body:**
```json
{
  "prompt": "string",
  "targetModel": "string", // Default: 'gemini-1.5-pro'
  "optimizationMethod": "string" // 'current' or 'gemini'
}
```

**Response:**
```json
{
  "original": {
    "prompt": "string",
    "tokenCount": "integer",
    "cost": "number"
  },
  "optimized": {
    "prompt": "string",
    "tokenCount": "integer",
    "cost": "number"
  },
  "reductionPercentage": "number",
  "outputs": {
    "original": "string",
    "optimized": "string"
  },
  "metrics": {
    "bleu": "number",
    "rouge1": "number",
    "rouge2": "number",
    "rougeL": "number",
    "semanticSimilarity": "number"
  },
  "costBenefitAnalysis": {
    "costSavings": "number",
    "qualityTradeoff": "string[positive|neutral|negative]"
  },
  "geminiError": "string" // Only present if Gemini API fails
}
```

## Optimization Strategies

1. **Structural Pruning**: Removes redundant phrases and simplifies sentences
2. **Formatting Normalization**: Cleans up formatting and removes extra whitespace
3. **Summarization**: Summarizes long prompts while preserving core meaning
4. **Gemini API Optimization**: Uses Google's Gemini API with tokenization-aware optimization guidelines

## Current UI Features

- **Simplified Input**: Users only need to enter their prompt and click "Optimize"
- **Optimization Method Selection**: Choose between current strategies or Gemini API
- **Token Comparison**: Shows the number of tokens before and after optimization
- **Cost Estimation**: Displays cost savings achieved through optimization
- **Prompt Comparison**: Stacked view of original and optimized prompts
- **Quality Metrics**: Visualization of semantic preservation metrics
- **Error Handling**: Displays Gemini API errors when they occur

## Tokenization-Aware Optimization

When using the Gemini API optimization method, the system applies tokenization-aware preprocessing:

1. **Natural Sentence Flow**: Encourages longer but smoothly connected sentences
2. **Redundancy Removal**: Removes redundant words and repetitive instructions
3. **Vocabulary Optimization**: Chooses common words likely to be single tokens
4. **Tokenizer-Friendly Formatting**: Avoids specialized terms and unusual punctuation

## Future Enhancements

- Integration with actual LLM APIs for generating outputs
- Advanced NLP techniques for better optimization
- User authentication and history saving
- Export functionality for reports
- Real-time inference latency tracking

## License

This project is licensed under the MIT License.

## Research Context

This project explores **token-efficient prompt engineering strategies** for large language model applications.

The middleware layer can be integrated into AI products that rely on LLM APIs to reduce operational costs while maintaining response quality.

Developed as part of a university team research project focused on practical LLM system design.
