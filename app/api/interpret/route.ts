import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '@/lib/systemPrompt';
import type { InterpretResponse } from '@/lib/types';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest): Promise<NextResponse<InterpretResponse>> {
  try {
    const { imageData, mediaType } = await request.json();

    if (!imageData) {
      return NextResponse.json(
        { interpretation: '', error: 'No image provided.' },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType ?? 'image/png',
                data: imageData,
              },
            },
            {
              type: 'text',
              text: 'Please analyze this Smart Balance posturography report and provide your full clinical interpretation following the output format specified.',
            },
          ],
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === 'text');
    const interpretation = textBlock?.type === 'text' ? textBlock.text : '';

    return NextResponse.json({ interpretation });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[interpret] API error:', msg);
    return NextResponse.json(
      { interpretation: '', error: 'Interpretation failed. Check your API key and try again.' },
      { status: 500 }
    );
  }
}
