# SkillStrong — Website + Guided Chat (Gemini)

A modern marketing website with a button to a guided, button-first chat at `/chat`. The chat calls **Gemini** and can display follow-up buttons and simple search results. Perfect for high-school seniors and career switchers exploring manufacturing careers.

## Deploy (Vercel)
1. Create a new Vercel project from this folder.
2. Add Environment Variables (Project → Settings → Env Vars):
   - `GEMINI_API_KEY` (required)
   - Optional: `GEMINI_MODEL` (default `gemini-1.5-flash`)
   - Optional: `GOOGLE_CSE_ID`, `GOOGLE_CSE_KEY` if you want real web results
3. Deploy.

## Pages
- `/` — Marketing homepage (hero, features, info for parents/counselors)
- `/chat` — Guided chat with big chips + JSON responses

## Configure Google Programmable Search (optional)
Create a CSE (programmablesearchengine.google.com), enable web search, get `cx` (engine ID) and API key. Put them in `GOOGLE_CSE_ID` / `GOOGLE_CSE_KEY`. Redeploy.

## Customize
- Edit `app/page.tsx` for copy/images.
- Tweak colors/spacing in `app/globals.css`.
- Prompt rules for the chat are in `lib/schema.ts`.
