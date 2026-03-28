import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Scholars() {
  const { lang } = useLang();
  const [scholars, setScholars] = useState([]);
  useEffect(() => { axios.get(`${API}/scholars`).then(r => setScholars(r.data)).catch(()=>{}); }, []);
  const title = lang==='ar'?'عظماء علماء الإسلام':lang==='fr'?'Grands Érudits de l\'Islam':'Great Islamic Scholars';
  const sub = lang==='ar'?'العقول التي غيّرت حضارة الإنسانية':lang==='fr'?'Les esprits qui ont changé la civilisation humaine':'The minds that changed human civilization';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>
        <div className="cards-grid">
          {scholars.map(s => (
            <div className="scholar-card" key={s.id}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.5rem'}}>
                <div>
                  <div className="scholar-name">{s.name}</div>
                  <div className="scholar-arabic">{s.arabic}</div>
                </div>
                <div className="scholar-years">{s.years}</div>
              </div>
              <div><span className="scholar-field">{s.field}</span></div>
              <div className="scholar-contribution">{s.contribution}</div>
              <div className="scholar-quote">"{s.quote}"</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
