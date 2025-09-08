async function testAPI() {
  try {
    const response = await fetch('http://localhost:3001/api/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'This is a test prompt to optimize. Please make it more concise and efficient.',
        targetModel: 'gemini-1.5-pro',
        optimizationMethod: 'gemini'
      }),
    });

    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();