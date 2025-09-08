const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI client
const initializeGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  return new GoogleGenerativeAI(apiKey);
};

// Apply tokenization-aware preprocessing
const applyTokenizationAwareOptimization = (prompt, targetModel) => {
  // Apply general tokenization-aware optimizations
  let optimized = prompt;
  
  // For Gemini models, apply specific optimizations
  if (targetModel.includes('gemini')) {
    // Encourage natural sentence flow by joining short sentences
    optimized = optimized.replace(/([^.!?])\n/g, '$1 ');
    
    // Remove common redundant phrases
    optimized = optimized
      .replace(/\b(make it|keep it|ensure that|please)\b/gi, '')
      .replace(/\b(clear|concise|simple|understandable)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
      
    // Replace tokenizer-unfriendly characters with common alternatives
    optimized = optimized
      .replace(/\s*[:\-]\s*/g, ' - ') // Normalize punctuation spacing
      .replace(/[\'\"]+/g, '"') // Standardize quotation marks
      .trim();
  }
  
  return optimized;
};

// Create the prompt for Gemini API with tokenization-aware guidelines
const createOptimizationPrompt = (originalPrompt, targetModel) => {
  return `Optimize the following prompt for use with ${targetModel} large language model.
Your goal is to reduce token count while preserving the semantic meaning and effectiveness of the prompt.

Tokenization-aware optimization guidelines:
1. Structure sentences for natural flow - longer but smoothly connected sentences often use fewer tokens than choppy short ones
2. Remove redundant words and repetitive instructions without losing meaning
3. Choose common words and phrases that are likely to be single tokens
4. Avoid specialized terms, symbols, or unusual punctuation that might be split into multiple tokens
5. Preserve core instructions and constraints essential for the task

Original prompt:
${originalPrompt}

Provide only the optimized prompt in your response, with no additional explanation.`;
};

// Optimize prompt using Gemini API
const optimizeWithGemini = async (prompt, targetModel = 'gemini-1.5-pro') => {
  try {
    // Apply tokenization-aware preprocessing
    const preprocessedPrompt = applyTokenizationAwareOptimization(prompt, targetModel);
    
    const genAI = initializeGeminiClient();
    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: targetModel });
    
    const optimizationPrompt = createOptimizationPrompt(preprocessedPrompt, targetModel);
    
    const result = await model.generateContent(optimizationPrompt);
    const response = await result.response;
    const optimizedPrompt = response.text().trim();
    
    return {
      success: true,
      optimizedPrompt
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Provide more specific error messages based on the error type
    let errorMessage = error.message;
    if (error.status === 429) {
      errorMessage = 'Gemini API quota exceeded. Please try again later or use the current optimization strategies.';
    } else if (error.status === 404) {
      errorMessage = 'Gemini API model not found. Please check the model name and try again.';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

module.exports = {
  optimizeWithGemini
};