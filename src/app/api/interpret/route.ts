import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { question, card } = await req.json();

  if (!question || !card) {
    return NextResponse.json({ error: "Missing question or card" }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `You are a wise, compassionate tarot reader with deep knowledge of symbolism and human experience. Speak with warmth and poetic clarity.

The seeker has asked: "${question}"

The card drawn is: ${card.name} (${card.arcana === "major" ? "Major Arcana" : `${card.suit} — Minor Arcana`})

Card's core meaning: ${card.meaning}
Keywords: ${card.keywords.join(", ")}

Provide a personalized reading in 2–3 short paragraphs. Weave the card's symbolism directly into the seeker's specific question. Be insightful and grounded — mystical but practical. Do not use bullet points or headers. Do not repeat the card name more than once. End with one sentence of gentle, actionable guidance.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
    }

    return NextResponse.json({ interpretation: content.text });
  } catch (error) {
    console.error("Anthropic error:", error);
    return NextResponse.json({ error: "Reading failed. Check your API key." }, { status: 500 });
  }
}
