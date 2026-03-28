import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Myths() {
  const { lang } = useLang();
  const [myths, setMyths] = useState([]);
  useEffect(() => { axios.get(`${API}/myths`).then(r => setMyths(r.data)).catch(()=>{}); }, []);
  const title = lang==='ar'?'الخرافات مقابل الحقيقة':lang==='fr'?'Mythes vs Réalité':'Myths vs Reality';
  const sub = lang==='ar'?'المفاهيم الخاطئة الشائعة عن الإسلام — والحقيقة':lang==='fr'?'Idées reçues courantes sur l\'Islam — et la vérité':'Common misconceptions about Islam — and what the truth actually is';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>
        <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'16px',padding:'1.5rem',marginBottom:'3rem',textAlign:'center',maxWidth:'700px',margin:'0 auto 3rem'}}>
          <div style={{fontFamily:'Amiri,serif',fontSize:'1.8rem',color:'var(--gold)',marginBottom:'0.5rem'}}>وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ</div>
          <div style={{color:'var(--text-muted)',fontStyle:'italic',fontSize:'0.88rem'}}>"Do not follow that of which you have no knowledge." — Quran 17:36</div>
        </div>
        <div className="myths-grid">
          {myths.map(m => (
            <div className="myth-card" key={m.id}>
              <div className="myth-label">{m.icon} {lang==='ar'?'خرافة':lang==='fr'?'Mythe':'Myth'}</div>
              <div className="myth-text">"{m.myth[lang]||m.myth.en}"</div>
              <div className="reality-label">✅ {lang==='ar'?'الحقيقة':lang==='fr'?'Réalité':'Reality'}</div>
              <div className="reality-text">{m.reality[lang]||m.reality.en}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
