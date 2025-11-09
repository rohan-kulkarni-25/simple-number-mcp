#!/usr/bin/env node

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'simple-number-mcp',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Main endpoint - process 3 numbers, return 2
app.post('/process-numbers', (req, res) => {
  try {
    const { num1, num2, num3 } = req.body;

    // Validate inputs
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || typeof num3 !== 'number') {
      return res.status(400).json({
        error: 'All three inputs must be numbers',
        received: { num1, num2, num3 }
      });
    }

    // Return only the first 2 numbers
    res.json({
      result: [num1, num2],
      message: `Received 3 numbers (${num1}, ${num2}, ${num3}), returning first 2`,
      input: { num1, num2, num3 },
      output: [num1, num2]
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Simple Number MCP Server',
    version: '1.0.0',
    description: 'Takes 3 numbers and returns the first 2',
    endpoints: {
      health: 'GET /health',
      processNumbers: 'POST /process-numbers'
    },
    usage: {
      method: 'POST',
      url: '/process-numbers',
      body: {
        num1: 'number',
        num2: 'number',
        num3: 'number'
      },
      example: {
        num1: 10,
        num2: 20,
        num3: 30
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple Number MCP Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Process numbers: http://localhost:${PORT}/process-numbers`);
});
