# Simple Number MCP Server (HTTP)

A simple MCP HTTP server that takes 3 numbers as input and returns only the first 2 numbers.

## Features

- MCP-compliant HTTP endpoints
- Takes 3 numbers as input via tool call
- Returns only the first 2 numbers
- Health check endpoint for monitoring
- Ready for Railway/Render/Vercel deployment

## Installation

```bash
npm install
```

## Usage

### Running Locally

```bash
npm start
```

Server runs on `http://localhost:3000` (or PORT env variable)

### MCP Endpoints

#### 1. List Tools
```
GET /tools
```

Response:
```json
{
  "tools": [
    {
      "name": "process_numbers",
      "description": "Takes 3 numbers and returns the first 2 numbers",
      "inputSchema": {
        "type": "object",
        "properties": {
          "num1": { "type": "number", "description": "First number" },
          "num2": { "type": "number", "description": "Second number" },
          "num3": { "type": "number", "description": "Third number (will be ignored)" }
        },
        "required": ["num1", "num2", "num3"]
      }
    }
  ]
}
```

#### 2. Call Tool
```
POST /tools/call
Content-Type: application/json

{
  "name": "process_numbers",
  "arguments": {
    "num1": 10,
    "num2": 20,
    "num3": 30
  }
}
```

Response:
```json
{
  "content": [
    {
      "type": "text",
      "text": "{\n  \"result\": [10, 20],\n  \"message\": \"Received 3 numbers (10, 20, 30), returning first 2: [10, 20]\"\n}"
    }
  ]
}
```

#### 3. Health Check
```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "service": "simple-number-mcp",
  "version": "1.0.0",
  "timestamp": "2025-11-09T12:00:00.000Z"
}
```

## Testing with cURL

```bash
# List available tools
curl http://localhost:3000/tools

# Call the process_numbers tool
curl -X POST http://localhost:3000/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "process_numbers",
    "arguments": {
      "num1": 10,
      "num2": 20,
      "num3": 30
    }
  }'

# Health check
curl http://localhost:3000/health
```

## Deployment

### Railway

1. Connect your GitHub repo to Railway
2. Railway auto-detects Node.js and runs `npm start`
3. Your MCP server will be available at the Railway URL
4. Use `https://your-app.railway.app/tools` to list tools

### Render

1. Create new Web Service
2. Connect GitHub repo
3. Build Command: `npm install`
4. Start Command: `npm start`

### Vercel

1. Import GitHub repo
2. Framework Preset: Other
3. Build Command: (leave empty)
4. Output Directory: (leave empty)
5. Deploy!

## Integration with Bhindi

Add this MCP server to Bhindi:

```json
{
  "name": "simple-number-mcp",
  "endpoint": "https://your-railway-url.railway.app",
  "type": "http"
}
```

## Environment Variables

- `PORT` - Server port (default: 3000)

## License

MIT
