const request = require('supertest');
const express = require('express');
const server = require('./server');

// Mock the optimization strategies
jest.mock('./optimization/strategies', () => {
  return {
    applyOptimizationStrategies: jest.fn().mockReturnValue({
      optimizedPrompt: 'Optimized with current strategies'
    })
  };
});

// Mock the Gemini optimizer
jest.mock('./optimization/geminiOptimizer', () => {
  return {
    optimizeWithGemini: jest.fn().mockResolvedValue({
      success: true,
      optimizedPrompt: 'Optimized with Gemini'
    })
  };
});

describe('Optimization API', () => {
  test('should use current strategies by default', async () => {
    const response = await request(server)
      .post('/api/optimize')
      .send({ prompt: 'Test prompt' })
      .expect(200);
    
    expect(response.body.optimized.prompt).toBe('Optimized with current strategies');
  });

  test('should use Gemini when specified', async () => {
    const response = await request(server)
      .post('/api/optimize')
      .send({ 
        prompt: 'Test prompt',
        optimizationMethod: 'gemini'
      })
      .expect(200);
    
    expect(response.body.optimized.prompt).toBe('Optimized with Gemini');
  });

  test('should fallback to current strategies when Gemini fails', async () => {
    // Mock Gemini failure
    const { optimizeWithGemini } = require('./optimization/geminiOptimizer');
    optimizeWithGemini.mockResolvedValueOnce({
      success: false,
      error: 'Gemini API error'
    });

    const response = await request(server)
      .post('/api/optimize')
      .send({ 
        prompt: 'Test prompt',
        optimizationMethod: 'gemini'
      })
      .expect(200);
    
    expect(response.body.optimized.prompt).toBe('Optimized with current strategies');
  });
});