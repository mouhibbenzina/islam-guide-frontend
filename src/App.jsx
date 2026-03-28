import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LangProvider, useLang } from './LangContext';
import './App.css';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Myths from './pages/Myths';
import Contributions from './pages/Contributions';
import Pillars from './pages/Pillars';
import Prophets from './pages/Prophets';
import Hadiths from './pages/Hadiths';
import Events from './pages/Events';
import QuranVerses from './pages/QuranVerses';
import Scholars from './pages/Scholars';
import Population from './pages/Population';
import Community from './pages/Community';
import Testimonies from './pages/Testimonies';
import Chat from './pages/Chat';

function Navbar() {
  const { t, lang, setLang } = useLang();
  const location = useLocation();
  const active = p => location.pathname === p ? { color: 'var(--gold)' } : {};
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="navbar-logo">🌙</div>
        <span className="navbar-title">نور الحق</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" style={active('/')}>{t.home}</Link>
        <Link to="/articles" style={active('/articles')}>{t.articles}</Link>
        <Link to="/quran" style={active('/quran')}>{t.quran}</Link>
        <Link to="/hadiths" style={active('/hadiths')}>{t.hadiths}</Link>
        <Link to="/myths" style={active('/myths')}>{t.myths}</Link>
        <Link to="/pillars" style={active('/pillars')}>{t.pillars}</Link>
        <Link to="/prophets" style={active('/prophets')}>{t.prophets}</Link>
        <Link to="/scholars" style={active('/scholars')}>{t.scholars}</Link>
        <Link to="/events" style={active('/events')}>{t.events}</Link>
        <Link to="/contributions" style={active('/contributions')}>{t.contributions}</Link>
        <Link to="/population" style={active('/population')}>📈</Link>
        <Link to="/community" style={active('/community')}>💬</Link>
        <Link to="/testimonies" style={active('/testimonies')}>🌟</Link>
        <Link to="/chat" style={active('/chat')}>{t.chat}</Link>
      </div>
      <div className="lang-switcher">
        {['en','ar','fr'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`lang-btn ${lang===l?'active':''}`}>
            {l==='en'?'EN':l==='ar'?'ع':'FR'}
          </button>
        ))}
      </div>
    </nav>
  );
}

function AppInner() {
  const { t } = useLang();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/quran" element={<QuranVerses />} />
        <Route path="/hadiths" element={<Hadiths />} />
        <Route path="/myths" element={<Myths />} />
        <Route path="/pillars" element={<Pillars />} />
        <Route path="/prophets" element={<Prophets />} />
        <Route path="/scholars" element={<Scholars />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contributions" element={<Contributions />} />
        <Route path="/population" element={<Population />} />
        <Route path="/community" element={<Community />} />
        <Route path="/testimonies" element={<Testimonies />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <footer className="footer">
        <div className="footer-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
        <p>{t.footerText}</p>
        <p style={{marginTop:'0.5rem',color:'var(--gold-dark)'}}>{t.footerSub}</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </LangProvider>
  );
}
