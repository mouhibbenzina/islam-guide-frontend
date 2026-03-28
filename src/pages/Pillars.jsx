import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Pillars() {
  const { lang } = useLang();
  const [pillars, setPillars] = useState([]);
  useEffect(() => { axios.get(`${API}/pillars`).then(r => setPillars(r.data)).catch(()=>{}); }, []);
  const title = lang==='ar'?'أركان الإسلام الخمسة':lang==='fr'?'Les Cinq Piliers de l\'Islam':'The Five Pillars of Islam';
  const sub = lang==='ar'?'الأساس الذي يقوم عليه إيمان كل مسلم':lang==='fr'?'Le fondement de la foi et pratique de chaque musulman':'The foundation of every Muslim\'s faith and practice';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>
        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem',maxWidth:'800px',margin:'0 auto'}}>
          {pillars.map(p => (
            <div className="pillar-card" key={p.id}>
              <div className="pillar-num">{p.icon}</div>
              <div style={{flex:1}}>
                <div className="pillar-name">{p[lang]?.name||p.en?.name}</div>
                <div className="pillar-desc">{p[lang]?.desc||p.en?.desc}</div>
                <div className="pillar-arabic">{p.arabic}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
