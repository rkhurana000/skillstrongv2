import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function searchViaGoogleCSE(q: string) {
  const id = process.env.GOOGLE_CSE_ID;
  const key = process.env.GOOGLE_CSE_KEY;
  if (!id || !key) return null;
  const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${id}&q=${encodeURIComponent(q)}`;
  const r = await fetch(url);
  if (!r.ok) return null;
  const j = await r.json();
  const items = (j.items || []).map((it:any) => ({
    title: it.title, url: it.link, snippet: it.snippet
  }));
  return { items };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  let data = await searchViaGoogleCSE(q);
  if (!data) {
    // fallback sample results (no external keys configured)
    data = {
      items: [
        { title: 'Industrial Maintenance Technician Certificate — Local CC', url: 'https://example.edu/imt-cert', snippet: 'Hands-on program covering motors, PLCs, and safety. ~9 months.' },
        { title: 'Apprenticeship.gov — Find Apprenticeships', url: 'https://www.apprenticeship.gov/', snippet: 'Search registered apprenticeships by occupation and location.' },
        { title: 'CareerOneStop Training Finder', url: 'https://www.careeronestop.org/FindTraining', snippet: 'Find programs and certifications in your state.' }
      ]
    };
  }
  return NextResponse.json(data);
}
