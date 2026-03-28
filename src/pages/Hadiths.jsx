import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Hadiths() {
  const { lang } = useLang();
  const [hadiths, setHadiths] = useState([]);
  const [filter, setFilter] = useState('All');
  useEffect(() => { axios.get(`${API}/hadiths`).then(r => setHadiths(r.data)).catch(()=>{}); }, []);
  const topics = ['All', ...new Set(hadiths.map(h => h.topic))];
  const filtered = filter === 'All' ? hadiths : hadiths.filter(h => h.topic === filter);
  const title = lang==='ar'?'الأحاديث النبوية الشريفة':lang==='fr'?'Hadiths Prophétiques':'Prophetic Hadiths';
  const sub = lang==='ar'?'أقوال النبي محمد ﷺ — الحكمة الإسلامية الأصيلة':lang==='fr'?'Paroles du Prophète Muhammad ﷺ — Sagesse islamique authentique':'Words of Prophet Muhammad ﷺ — Authentic Islamic wisdom';
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
        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
          {filtered.map(h => (
            <div className="hadith-card" key={h.id}>
              <div className="hadith-arabic">{h.arabic}</div>
              <div className="hadith-text">{lang==='ar'?h.arabic:lang==='fr'?h.french||h.english:h.english}</div>
              <div className="hadith-meta">
                <span className="hadith-source">{h.source}</span>
                <span className="hadith-narrator">{lang==='ar'?'رواه: ':'Narrated by: '}{h.narrator}</span>
                <span className="hadith-topic">{h.topic}</span>
              </div>
              <div className="hadith-importance">💡 {h.importance}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
