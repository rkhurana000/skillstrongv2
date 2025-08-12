import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <span className="tag">Future-Proof Careers</span>
        <h1>Find your path in today’s manufacturing economy</h1>
        <p>Welding, robotics, quality, maintenance, CNC—great jobs that don’t require a 4‑year degree. Explore roles, pay, training, and apprenticeships with a guided AI coach built for seniors, grads, and career switchers.</p>
        <div style={{display:'flex', gap:12}}>
          <Link className="cta" href="/chat">Explore Careers</Link>
          <a className="cta" style={{background:'#0f172a'}} href="#features">How it works</a>
        </div>
      </section>

      <section id="features" className="section">
        <div className="grid">
          <div className="card">
            <div className="tag">Button‑First Chat</div>
            <div className="h2">Tap to explore</div>
            <p className="p">Choose from smart chips: job types, salary range, or training length. Get short, clear answers plus follow‑up options.</p>
          </div>
          <div className="card">
            <div className="tag">Real Programs</div>
            <div className="h2">Training & apprenticeships</div>
            <p className="p">See certificates, community colleges, and apprenticeships. Save your favorites to discuss with parents or counselors.</p>
          </div>
          <div className="card">
            <div className="tag">For Gen Z & Gen Y</div>
            <div className="h2">Modern, mobile, fast</div>
            <p className="p">Minimal clutter, big chips, and friendly language. Built for phones first, great on laptops too.</p>
          </div>
        </div>
      </section>

      <section id="parents" className="section">
        <div className="card">
          <div className="h2">For Parents</div>
          <p className="p">Understand pay, growth, and safety. Compare short training programs to 4‑year options and see real career ladders.</p>
        </div>
      </section>

      <section id="counselors" className="section">
        <div className="card">
          <div className="h2">For Counselors & Teachers</div>
          <p className="p">Use guided prompts with your students. Share links to local programs and apprenticeships. Coming soon: classroom mode.</p>
        </div>
      </section>
    </main>
  );
}
