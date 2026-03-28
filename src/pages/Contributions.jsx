import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Contributions() {
  const { lang } = useLang();
  const [contributions, setContributions] = useState([]);
  useEffect(() => { axios.get(`${API}/contributions`).then(r => setContributions(r.data)).catch(()=>{}); }, []);
  const title = lang==='ar'?'الحضارة الإسلامية':lang==='fr'?'Civilisation Islamique':'Islamic Civilization';
  const sub = lang==='ar'?'العصر الذهبي للإسلام — مساهمات شكّلت عالمنا الحديث':lang==='fr'?'L\'Âge d\'Or de l\'Islam — contributions qui ont façonné notre monde':'The Golden Age of Islam — contributions that shaped our modern world';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'2rem',marginBottom:'3rem',maxWidth:'800px',margin:'0 auto 3rem'}}>
          <p style={{color:'var(--text)',lineHeight:'1.9',textAlign:'center'}}>{lang==='ar'?'من القرن الثامن إلى الرابع عشر، أنتج العصر الذهبي للإسلام أعظم التطورات البشرية في العلوم والفلسفة والطب والرياضيات — بينما كانت أوروبا في عصورها المظلمة.':lang==='fr'?'Du 8e au 14e siècle, l\'Âge d\'Or islamique a produit certaines des plus grandes avancées humaines en sciences, philosophie, médecine et mathématiques — pendant que l\'Europe était dans ses Âges Sombres.':'From the 8th to 14th centuries, the Islamic Golden Age produced humanity\'s greatest advances in science, philosophy, medicine, and mathematics — while Europe was in its Dark Ages.'}</p>
        </div>
        <div className="cards-grid">
          {contributions.map(c => (
            <div className="contribution-card card" key={c.id}>
              <div style={{fontSize:'2rem',marginBottom:'1rem'}}>{c.icon}</div>
              <div style={{fontWeight:'700',color:'var(--teal)',marginBottom:'0.5rem'}}>{c.field[lang]||c.field.en}</div>
              <div style={{color:'var(--text-muted)',lineHeight:'1.7',fontSize:'0.88rem'}}>{c.text[lang]||c.text.en}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
