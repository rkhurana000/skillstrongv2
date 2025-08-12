'use client';
import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#1a73e8" strokeWidth="2"/>
          <path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2" fill="none" />
        </svg>
        SkillStrong
      </div>
      <div className="navlinks">
        <Link href="/">Home</Link>
        <Link href="/#features">Features</Link>
        <Link href="/#parents">Parents</Link>
        <Link href="/#counselors">Counselors</Link>
        <Link className="cta" href="/chat">Explore Careers</Link>
      </div>
    </nav>
  );
}
