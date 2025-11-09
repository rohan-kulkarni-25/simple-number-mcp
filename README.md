# Simple Number MCP Server

A simple Model Context Protocol (MCP) server that takes 3 numbers as input and returns only the first 2 numbers.

## Features

- Takes 3 numbers as input
- Returns only the first 2 numbers
- Built with the official MCP SDK

## Installation

```bash
npm install
```

## Usage

### Running the Server

```bash
npm start
```

### Tool: process_numbers

**Description:** Takes 3 numbers and returns the first 2 numbers

**Parameters:**
- `num1` (number, required): First number
- `num2` (number, required): Second number
- `num3` (number, required): Third number (will be ignored in output)

**Returns:**
- An array containing only the first 2 numbers

**Example:**
```json
Input: { "num1": 10, "num2": 20, "num3": 30 }
Output: [10, 20]
```

## Integration with MCP Clients

To use this server with an MCP client (like Claude Desktop), add it to your MCP settings:

```json
{
  "mcpServers": {
    "simple-number-mcp": {
      "command": "node",
      "args": ["/path/to/simple-number-mcp/index.js"]
    }
  }
}
```

## License

MIT
