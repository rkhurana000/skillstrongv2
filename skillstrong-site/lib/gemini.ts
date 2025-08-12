import { GoogleGenerativeAI } from '@google/generative-ai';

const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

export async function callGeminiJSON(userText: string, sysPrompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  const res = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: userText }]}],
    systemInstruction: { text: sysPrompt },
    generationConfig: {
      responseMimeType: 'application/json'
    }
  } as any);

  const txt = res.response.text();
  try { return JSON.parse(txt); } catch {
    // attempt to extract JSON
    const start = txt.indexOf('{'); const end = txt.lastIndexOf('}');
    const fallback = start !== -1 && end !== -1 ? txt.slice(start, end+1) : '{"answer":"Sorry, I could not parse that."}';
    return JSON.parse(fallback);
  }
}
