import { NextRequest, NextResponse } from 'next/server';
import { callGeminiJSON } from '@/lib/gemini';
import { guidedInstructions } from '@/lib/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sysPrompt = `You are a friendly manufacturing career guide for US high-school students.
Keep answers under 120 words. Be concrete and practical.
` + "\n" + guidedInstructions;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const guided = await callGeminiJSON(String(text || ''), sysPrompt);
    // basic shape enforcement
    const shaped = {
      answer: String(guided.answer || 'Here are some ways to explore.'),
      buttons: Array.isArray(guided.buttons) ? guided.buttons.slice(0, 8) : [],
      nav: Array.isArray(guided.nav) ? guided.nav.slice(0, 6) : [],
      facts: Array.isArray(guided.facts) ? guided.facts.slice(0, 6) : []
    };
    return NextResponse.json(shaped);
  } catch (e:any) {
    console.error('chat error', e);
    return NextResponse.json({
      answer: 'Provider error. Try again in a moment.',
      buttons: [{ label: 'Explore by job types' }, { label: 'Explore by training length' }],
      nav: [], facts: []
    });
  }
}
