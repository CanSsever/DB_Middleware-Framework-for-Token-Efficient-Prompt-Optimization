const { encoding_for_model } = require('tiktoken');

// Model-specific pricing information
const MODEL_PRICING = {
  'gemini-1.5-pro': {
    inputCostPer1kTokens: 0.0015,
    outputCostPer1kTokens: 0.002
  },
  'gpt-3.5-turbo': {
    inputCostPer1kTokens: 0.0015,
    outputCostPer1kTokens: 0.002
  },
  'gpt-4': {
    inputCostPer1kTokens: 0.03,
    outputCostPer1kTokens: 0.06
  }
};

// Get tokenizer for a specific model
const getTokenizer = (model) => {
  try {
    // Handle Gemini models by mapping them to a compatible tokenizer
    if (model && model.includes('gemini')) {
      // Use gpt-3.5-turbo tokenizer as approximation for Gemini models
      console.warn(`Using gpt-3.5-turbo tokenizer for Gemini model: ${model}`);
      return encoding_for_model('gpt-3.5-turbo');
    }
    return encoding_for_model(model);
  } catch (error) {
    // Fallback to gpt-3.5-turbo encoding if model not found
    console.warn(`Model ${model} not found, using gpt-3.5-turbo encoding`);
    return encoding_for_model('gpt-3.5-turbo');
  }
};

// Count tokens in a text
const countTokens = (text, model) => {
  const encoder = getTokenizer(model);
  const tokens = encoder.encode(text);
  return tokens.length;
};

// Calculate cost based on token count and model
const calculateCost = (tokenCount, model, isOutput = false) => {
  const pricing = MODEL_PRICING[model] || MODEL_PRICING['gemini-1.5-pro'];
  const costPer1kTokens = isOutput 
    ? pricing.outputCostPer1kTokens 
    : pricing.inputCostPer1kTokens;
  
  return (tokenCount / 1000) * costPer1kTokens;
};

module.exports = {
  countTokens,
  calculateCost,
  MODEL_PRICING
};