import { NextResponse } from "next/server";

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const RESPONSE_STYLE_INSTRUCTIONS = `Reply in clean plain text that renders well in a basic chat UI.

Rules:
- Prefer short paragraphs.
- Use simple bullet lists with "-" when listing items.
- Use numbered lists only when order matters.
- Do not return HTML.
- Avoid Markdown headings.
- Avoid tables.
- Use fenced code blocks only when code is necessary.
- Keep the answer concise but complete.`;

function extractAssistantText(payload) {
  const assistantMessage = payload.output?.find(
    (item) => item.type === "message" && item.role === "assistant"
  );

  if (!assistantMessage) {
    return null;
  }

  const textContent = assistantMessage.content
    ?.filter((item) => item.type === "output_text" && item.text)
    .map((item) => item.text?.trim())
    .filter(Boolean)
    .join("\n\n");

  return textContent || null;
}

export async function POST(request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!body.message || typeof body.message !== "object") {
    return NextResponse.json(
      { error: "A message is required." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        instructions: RESPONSE_STYLE_INSTRUCTIONS,
        model: DEFAULT_MODEL,
        input: [
          {
            role: body.message.role,
            content: [
              {
                type: "input_text",
                text: body.message.content,
              },
            ],
          },
        ],
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            payload.error?.message || "OpenAI returned an unexpected error.",
        },
        { status: response.status }
      );
    }

    const assistantMessage = extractAssistantText(payload);

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "OpenAI returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: assistantMessage });
  } catch {
    return NextResponse.json(
      { error: "Could not reach OpenAI right now." },
      { status: 500 }
    );
  }
}
