'use client';
export default function SearchResults({ data }:{ data:any }) {
  const items = Array.isArray(data?.items) ? data.items : [];
  if (!items.length) return null;
  return (
    <div className="answer">
      <div style={{ fontWeight:700, marginBottom:8 }}>Results</div>
      <div style={{ display:'grid', gap:10 }}>
        {items.map((it:any, idx:number) => (
          <a key={idx} href={it.url} target="_blank" rel="noreferrer" className="card" style={{display:'block'}}>
            <div style={{fontWeight:700}}>{it.title}</div>
            <div className="small">{it.snippet}</div>
            <div className="small" style={{marginTop:6}}>{it.url}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
