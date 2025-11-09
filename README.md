# Simple Number MCP Server (HTTP)

A simple HTTP server that takes 3 numbers as input and returns only the first 2 numbers.

## Features

- Takes 3 numbers as input via HTTP POST
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

### API Endpoints

#### 1. Health Check
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

#### 2. Process Numbers
```
POST /process-numbers
Content-Type: application/json

{
  "num1": 10,
  "num2": 20,
  "num3": 30
}
```

Response:
```json
{
  "result": [10, 20],
  "message": "Received 3 numbers (10, 20, 30), returning first 2",
  "input": { "num1": 10, "num2": 20, "num3": 30 },
  "output": [10, 20]
}
```

#### 3. Root Endpoint
```
GET /
```

Returns API documentation and usage examples.

## Testing with cURL

```bash
# Health check
curl http://localhost:3000/health

# Process numbers
curl -X POST http://localhost:3000/process-numbers \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 20, "num3": 30}'
```

## Deployment

### Railway

1. Connect your GitHub repo to Railway
2. Railway auto-detects Node.js and runs `npm start`
3. No additional configuration needed!

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

## Environment Variables

- `PORT` - Server port (default: 3000)

## License

MIT
