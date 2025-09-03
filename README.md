# Middleware Framework for Token-Efficient Prompt Optimization

This project implements a web-based middleware application that optimizes prompts for Large Language Models (LLMs) to reduce token usage while preserving semantic quality. The system provides cost-benefit analysis by comparing original and optimized prompts through various metrics.

## Features

- **Prompt Optimization**: Reduces token usage in prompts without sacrificing semantic quality
- **Cost Estimation**: Calculates API costs before and after optimization
- **Quality Metrics**: Evaluates optimized prompts using BLEU, ROUGE, and semantic similarity scores
- **Multiple Strategies**: Implements structural pruning, summarization, few-shot compression, and formatting normalization
- **Visual Dashboard**: Provides a user-friendly interface to compare original and optimized prompts

## Technology Stack

### Frontend
- React with Vite
- React Router for navigation
- CSS for styling

### Backend
- Node.js with Express
- Tiktoken for token counting
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
├── IMPLEMENTATION_PLAN.md # Implementation plan and checklist
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

3. Start the development server:
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

### GET /api/models
Returns a list of supported LLM models with their pricing information.

### POST /api/optimize
Optimizes a prompt and returns the results.

**Request Body:**
```json
{
  "prompt": "string",
  "examples": ["string"],
  "taskType": "enum[summarization|question_answering|reasoning|text_generation|classification]",
  "targetModel": "string[gpt-3.5-turbo|gpt-4]"
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
  }
}
```

## Optimization Strategies

1. **Structural Pruning**: Removes redundant phrases and simplifies sentences
2. **Formatting Normalization**: Cleans up formatting and removes extra whitespace
3. **Few-Shot Compression**: Compresses examples to reduce token count
4. **Summarization**: Summarizes long prompts while preserving core meaning

## Future Enhancements

- Integration with actual LLM APIs for generating outputs
- Advanced NLP techniques for better optimization
- User authentication and history saving
- Export functionality for reports
- Real-time inference latency tracking

## License

This project is licensed under the MIT License.