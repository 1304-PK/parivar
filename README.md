# Parivar — AI Virtual Try-On

Upload a photo and a clothing image, then let AI create a realistic virtual try-on.

## Project Structure

```
client/          → React + Vite + Tailwind CSS frontend
server/          → Node.js + Express backend
```

## Quick Start

### 1. Server

```bash
cd server
cp .env.example .env        # add your GOOGLE_AI_API_KEY
npm install
npm run dev                  # starts on http://localhost:5000
```

### 2. Client

```bash
cd client
npm install
npm run dev                  # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to the backend automatically.

## Environment Variables

| Variable            | Required | Description                     |
| ------------------- | -------- | ------------------------------- |
| `GOOGLE_AI_API_KEY` | Yes*     | Google AI API key               |
| `PORT`              | No       | Server port (default: `5000`)   |

\* The server runs in **mock mode** when no API key is set — useful for UI development.

## Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS 4, React Router 7
- **Backend**: Express 5, Multer, @google/genai
- **Language**: JavaScript + JSX only (no TypeScript)
