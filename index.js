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

// MCP Tools List endpoint
app.get('/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: "process_numbers",
        description: "Takes 3 numbers and returns the first 2 numbers",
        inputSchema: {
          type: "object",
          properties: {
            num1: {
              type: "number",
              description: "First number"
            },
            num2: {
              type: "number",
              description: "Second number"
            },
            num3: {
              type: "number",
              description: "Third number (will be ignored)"
            }
          },
          required: ["num1", "num2", "num3"]
        }
      }
    ]
  });
});

// MCP Tool Call endpoint
app.post('/tools/call', (req, res) => {
  try {
    const { name, arguments: args } = req.body;

    if (name !== 'process_numbers') {
      return res.status(400).json({
        error: 'Unknown tool',
        message: `Tool '${name}' not found`
      });
    }

    const { num1, num2, num3 } = args;

    // Validate inputs
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || typeof num3 !== 'number') {
      return res.status(400).json({
        error: 'Invalid arguments',
        message: 'All three inputs must be numbers',
        received: { num1, num2, num3 }
      });
    }

    // Return only the first 2 numbers
    res.json({
      content: [
        {
          type: "text",
          text: JSON.stringify({
            result: [num1, num2],
            message: `Received 3 numbers (${num1}, ${num2}, ${num3}), returning first 2: [${num1}, ${num2}]`
          }, null, 2)
        }
      ]
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
      listTools: 'GET /tools',
      callTool: 'POST /tools/call'
    },
    usage: {
      listTools: {
        method: 'GET',
        url: '/tools',
        description: 'List all available tools'
      },
      callTool: {
        method: 'POST',
        url: '/tools/call',
        body: {
          name: 'process_numbers',
          arguments: {
            num1: 10,
            num2: 20,
            num3: 30
          }
        }
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple Number MCP Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 List tools: http://localhost:${PORT}/tools`);
  console.log(`📍 Call tool: http://localhost:${PORT}/tools/call`);
});
