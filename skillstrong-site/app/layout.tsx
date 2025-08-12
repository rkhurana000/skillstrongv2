import './globals.css';
import React from 'react';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'SkillStrong — Manufacturing Careers, Training & Apprenticeships',
  description: 'Explore modern manufacturing careers with a guided AI coach. Find training, apprenticeships, and jobs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <NavBar />
          {children}
          <footer className="footer">© {new Date().getFullYear()} SkillStrong. Built for Gen Z & Gen Y career explorers.</footer>
        </div>
      </body>
    </html>
  );
}
