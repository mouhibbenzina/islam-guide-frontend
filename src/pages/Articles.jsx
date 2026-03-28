import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Articles() {
  const { lang } = useLang();
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => { axios.get(`${API}/articles`).then(r => setArticles(r.data)).catch(()=>{}); }, []);
  const g = (item, key) => item[lang]?.[key] || item.en?.[key] || '';
  const title = lang==='ar'?'التعاليم الإسلامية':lang==='fr'?'Enseignements Islamiques':'Islamic Teachings';
  const sub = lang==='ar'?'مقالات أساسية عن الإسلام من القرآن والمصادر الأصيلة':lang==='fr'?'Articles fondamentaux sur l\'Islam':'Core articles about Islam from authentic sources';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>
        {selected ? (
          <div style={{maxWidth:'750px',margin:'0 auto'}}>
            <button onClick={() => setSelected(null)} className="btn-secondary" style={{marginBottom:'2rem'}}>← {lang==='ar'?'رجوع':lang==='fr'?'Retour':'Back'}</button>
            <div className="card">
              <div style={{fontSize:'3rem',marginBottom:'1rem'}}>{selected.icon}</div>
              <h2 style={{fontFamily:'Amiri,serif',fontSize:'1.8rem',color:'var(--gold)',marginBottom:'2rem'}}>{g(selected,'title')}</h2>
              <p style={{color:'var(--text)',lineHeight:'1.9',marginBottom:'2rem'}}>{g(selected,'content')}</p>
              <div style={{background:'var(--surface2)',borderRadius:'12px',padding:'1.5rem',border:'1px solid var(--border)'}}>
                <div className="card-arabic">{selected.quran}</div>
                <div className="card-translation">{selected.quranTranslation}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="cards-grid">
            {articles.map(a => (
              <div className="card card-clickable" key={a.id} onClick={() => setSelected(a)}>
                <div className="card-icon">{a.icon}</div>
                <div className="card-title">{g(a,'title')}</div>
                <div className="card-text">{g(a,'summary')}</div>
                <div style={{marginTop:'1rem',color:'var(--gold)',fontSize:'0.82rem',fontWeight:'600'}}>{lang==='ar'?'اقرأ المزيد ←':lang==='fr'?'Lire la suite →':'Read more →'}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
