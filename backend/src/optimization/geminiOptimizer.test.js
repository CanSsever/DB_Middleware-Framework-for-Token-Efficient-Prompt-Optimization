const { optimizeWithGemini } = require('./geminiOptimizer');

// Mock the GoogleGenerativeAI class
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: jest.fn().mockResolvedValue({
            response: {
              text: jest.fn().mockReturnValue('Optimized prompt text')
            }
          })
        })
      };
    })
  };
});

describe('Gemini Optimizer', () => {
  beforeEach(() => {
    // Set the GEMINI_API_KEY environment variable
    process.env.GEMINI_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    // Clear the environment variable
    delete process.env.GEMINI_API_KEY;
  });

  test('should optimize prompt successfully', async () => {
    const result = await optimizeWithGemini('Test prompt');
    
    expect(result.success).toBe(true);
    expect(result.optimizedPrompt).toBe('Optimized prompt text');
  });

  test('should handle missing API key', async () => {
    // Remove the API key
    delete process.env.GEMINI_API_KEY;
    
    const result = await optimizeWithGemini('Test prompt');
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});