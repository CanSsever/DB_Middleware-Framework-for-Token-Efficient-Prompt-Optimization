const { encoding_for_model } = require('tiktoken');

// Model-specific pricing information
const MODEL_PRICING = {
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
    return encoding_for_model(model);
  } catch (error) {
    // Fallback to cl100k_base encoding if model not found
    console.warn(`Model ${model} not found, using cl100k_base encoding`);
    return encoding_for_model('cl100k_base');
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
  const pricing = MODEL_PRICING[model] || MODEL_PRICING['gpt-3.5-turbo'];
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