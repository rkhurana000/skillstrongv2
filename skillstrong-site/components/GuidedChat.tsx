'use client';
import React, { useEffect, useRef, useState } from 'react';
import SearchResults from '@/components/SearchResults';

type Guided = {
  answer: string;
  buttons?: { label: string; action?: string; query?: string }[];
  nav?: { title: string; url?: string }[];
  facts?: { k: string; v: string }[];
};

type Item = { type:'assistant'|'user'|'results'; content: any };

export default function GuidedChat() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scRef.current?.scrollTo({ top: 999999 }); }, [items]);

  const exploreTop = [
    { label: 'Explore by job types', q: 'Explore manufacturing by job types' },
    { label: 'Explore by salary range', q: 'Show manufacturing roles by salary bands' },
    { label: 'Explore by training length', q: 'Which careers need under 12 months of training?' },
  ];
  const exploreGrid = [
    'Welding', 'CNC Machining', 'Quality Control', 'Automation & Robotics',
    'Industrial Maintenance', 'Production Management', 'Supply Chain Logistics', '3D Printing / Additive'
  ].map(label => ({ label, q: `Summarize ${label} career: what it is, typical pay, and common certificates.` }));

  async function sendToLLM(text: string) {
    setBusy(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const guided: Guided = await res.json();
    setItems(prev => [...prev, { type:'assistant', content: guided }]);
    setBusy(false);
  }

  async function onChipClick(btn: {label:string; action?:string; query?:string}) {
    // Search actions hit our search API; otherwise send to LLM
    if (btn.action === 'search_jobs' || btn.action === 'search_training' || btn.action === 'search_web') {
      let q = btn.query || btn.label;
      // ask for zip if phrase includes 'near me' and no zip yet
      if (/near me/i.test(q)) {
        const zip = prompt('Enter your ZIP code to find nearby options:') || '';
        if (zip) q = q.replace(/near me/i, `near ${zip}`);
      }
      const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await r.json();
      setItems(prev => [...prev, { type:'results', content: data }]);
      return;
    }
    // default: treat label as question
    setItems(prev => [...prev, { type:'user', content: btn.label }]);
    await sendToLLM(btn.label);
  }

  async function onSubmit() {
    if (!input) return;
    setItems(prev => [...prev, { type:'user', content: input }]);
    await sendToLLM(input);
    setInput('');
  }

  const hasContent = items.length > 0;

  return (
    <div className="main">
      <div className="topbar">Manufacturing Career Explorer</div>

      <div className="scroll" ref={scRef}>
        {!hasContent && (
          <>
            <div className="answer" style={{ maxWidth: 860, margin:'0 auto' }}>
              <div style={{ fontWeight:700, marginBottom:10 }}>Welcome! How would you like to explore career paths?</div>
              <div className="chips">
                {exploreTop.map(c => <div key={c.label} className="chip" onClick={()=>onChipClick({label:c.label})}>{c.label}</div>)}
              </div>
            </div>
            <div style={{ height: 24 }} />
            <div className="answer" style={{ maxWidth: 1100, margin:'0 auto' }}>
              <div className="chips">
                {exploreGrid.map(c => <div key={c.label} className="chip" onClick={()=>onChipClick({label:c.label})}>{c.label}</div>)}
              </div>
            </div>
          </>
        )}

        {items.map((it, idx) => (
          <div key={idx} style={{ maxWidth: 900, margin:'14px auto' }}>
            {it.type === 'user' && (
              <div style={{ textAlign:'right' }}>
                <div className="chip" style={{ background:'#e8f0fe', borderColor:'#cfe0ff', display:'inline-block' }}>{it.content}</div>
              </div>
            )}
            {it.type === 'assistant' && <AssistantBlock guided={it.content as Guided} onChip={onChipClick} />}
            {it.type === 'results' && <SearchResults data={it.content} />}
          </div>
        ))}
      </div>

      <div className="inputbar">
        <input
          className="input-xl"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>{ if(e.key==='Enter') onSubmit(); }}
          disabled={busy}
        />
      </div>
    </div>
  );
}

function AssistantBlock({ guided, onChip }:{ guided: Guided, onChip:(b:any)=>void }) {
  return (
    <div className="answer">
      <div style={{ whiteSpace:'pre-wrap', marginBottom:12 }}>{guided.answer}</div>
      {!!guided.facts?.length && (
        <div className="chips" style={{ marginBottom:8 }}>
          {guided.facts.map((f,i) => <div key={i} className="chip">{f.k}: {f.v}</div>)}
        </div>
      )}
      {!!guided.buttons?.length && (
        <div className="chips">
          {guided.buttons.map((b,i) => (
            <div key={i} className="chip" onClick={()=>onChip(b)}>{b.label}</div>
          ))}
        </div>
      )}
    </div>
  );
}
