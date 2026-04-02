## Voyage AI

This is a lightweight chat-style AI web app built with Next.js, React, TypeScript, and Tailwind CSS. The target experience is a ChatGPT or Claude style interface with:

- a conversation history sidebar
- a selected chat thread in the main panel
- a secure server-side route for OpenAI integration

## Setup

Install dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

## Environment Variables

Use `.env.local` for local secrets. Do not expose private keys with `NEXT_PUBLIC_`.

Example:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates the production build
- `npm run start` runs the production server
- `npm run lint` runs ESLint
- `npm run format` formats the codebase with Prettier
- `npm run format:check` checks Prettier formatting

## Current Status

Phase 1 is complete:

- Next.js app scaffolded
- TypeScript and Tailwind configured
- ESLint and Prettier set up
- base app shell in place
- environment variable strategy defined
