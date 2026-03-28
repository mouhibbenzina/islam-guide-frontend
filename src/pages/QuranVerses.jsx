import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function QuranVerses() {
  const { lang } = useLang();
  const [verses, setVerses] = useState([]);
  const [filter, setFilter] = useState('All');
  useEffect(() => { axios.get(`${API}/quran-verses`).then(r => setVerses(r.data)).catch(()=>{}); }, []);
  const topics = ['All', ...new Set(verses.map(v => v.topic))];
  const filtered = filter==='All' ? verses : verses.filter(v => v.topic===filter);
  const title = lang==='ar'?'آيات من القرآن الكريم':lang==='fr'?'Versets du Coran':'Verses from the Quran';
  const sub = lang==='ar'?'كلام الله — آيات أساسية مع السياق والمعنى':lang==='fr'?'Parole de Dieu — versets clés avec contexte et signification':'The Word of God — key verses with context and meaning';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',justifyContent:'center',marginBottom:'2rem'}}>
          {topics.map(t => (
            <button key={t} onClick={() => setFilter(t)} className="btn-sm" style={{background:filter===t?'var(--gold)':'transparent',color:filter===t?'var(--deep)':'var(--text-muted)',border:`1px solid ${filter===t?'var(--gold)':'var(--border)'}`,borderRadius:'100px',cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>
              {t}
            </button>
          ))}
        </div>
        <div className="cards-grid">
          {filtered.map(v => (
            <div className="verse-card" key={v.id}>
              <div className="verse-arabic">{v.arabic}</div>
              <div className="verse-text">{lang==='ar'?v.arabic:lang==='fr'?v.french||v.english:v.english}</div>
              <div className="verse-ref">{v.reference}</div>
              <div className="verse-context">{v.context}</div>
              <div style={{marginTop:'0.75rem'}}><span className="card-tag">{v.topic}</span></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
