## Voyage AI

This is a lightweight chat-style AI web app built with Next.js, React, JavaScript, and custom CSS. The target experience is a ChatGPT or Claude style interface with:

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

## Project Overview

Voyage AI is a ChatGPT-style web app with:

- a responsive conversation history sidebar
- a focused chat panel with sticky composer behavior
- local conversation persistence with `localStorage`
- a secure Next.js server route for OpenAI requests

## Environment Variables

Use `.env.local` for local secrets. Do not expose private keys with `NEXT_PUBLIC_`.

Example:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates the production build
- `npm run start` runs the production server
- `npm run format` formats the codebase with Prettier
- `npm run format:check` checks Prettier formatting


