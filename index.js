#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create MCP server
const server = new Server(
  {
    name: "simple-number-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "process_numbers",
        description: "Takes 3 numbers and returns the first 2 numbers",
        inputSchema: {
          type: "object",
          properties: {
            num1: {
              type: "number",
              description: "First number",
            },
            num2: {
              type: "number",
              description: "Second number",
            },
            num3: {
              type: "number",
              description: "Third number (will be ignored)",
            },
          },
          required: ["num1", "num2", "num3"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "process_numbers") {
    const { num1, num2, num3 } = request.params.arguments;

    // Validate inputs
    if (typeof num1 !== "number" || typeof num2 !== "number" || typeof num3 !== "number") {
      throw new Error("All three inputs must be numbers");
    }

    // Return only the first 2 numbers
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            result: [num1, num2],
            message: `Received 3 numbers (${num1}, ${num2}, ${num3}), returning first 2: [${num1}, ${num2}]`,
          }, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Simple Number MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
