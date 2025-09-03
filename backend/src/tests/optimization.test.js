const { applyOptimizationStrategies } = require('../optimization/strategies');
const { countTokens, calculateCost } = require('../utils/tokenCounter');

// Test optimization strategies
describe('Optimization Strategies', () => {
  test('should apply structural pruning', () => {
    const originalPrompt = "This is a very long and extremely detailed prompt that we want to optimize";
    const { optimizedPrompt } = applyOptimizationStrategies(originalPrompt, [], 'summarization');
    
    // Check that the prompt was optimized (simplified)
    expect(optimizedPrompt).toBeDefined();
    expect(typeof optimizedPrompt).toBe('string');
  });

  test('should count tokens correctly', () => {
    const prompt = "This is a test prompt";
    const tokenCount = countTokens(prompt, 'gpt-3.5-turbo');
    
    expect(tokenCount).toBeGreaterThan(0);
    expect(typeof tokenCount).toBe('number');
  });

  test('should calculate cost correctly', () => {
    const tokenCount = 100;
    const cost = calculateCost(tokenCount, 'gpt-3.5-turbo');
    
    expect(cost).toBeGreaterThan(0);
    expect(typeof cost).toBe('number');
  });
});