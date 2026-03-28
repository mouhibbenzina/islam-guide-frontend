import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Prophets() {
  const { lang } = useLang();
  const [prophets, setProphets] = useState([]);
  useEffect(() => { axios.get(`${API}/prophets`).then(r => setProphets(r.data)).catch(()=>{}); }, []);
  const title = lang==='ar'?'أنبياء الإسلام':lang==='fr'?'Les Prophètes de l\'Islam':'The Prophets of Islam';
  const sub = lang==='ar'?'يكرم الإسلام جميع الأنبياء من آدم إلى محمد ﷺ':lang==='fr'?'L\'Islam honore tous les prophètes d\'Adam à Muhammad ﷺ':'Islam honors all prophets from Adam to Muhammad ﷺ';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>
        <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'16px',padding:'1.5rem',marginBottom:'3rem',textAlign:'center',maxWidth:'700px',margin:'0 auto 3rem'}}>
          <div style={{fontFamily:'Amiri,serif',fontSize:'1.5rem',color:'var(--gold)',marginBottom:'0.5rem'}}>آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ</div>
          <div style={{color:'var(--text-muted)',fontStyle:'italic',fontSize:'0.88rem'}}>"The Messenger believes in what was revealed to him from his Lord, and so do the believers." (2:285)</div>
        </div>
        <div className="cards-grid">
          {prophets.map(p => (
            <div className="card" key={p.id}>
              <div style={{fontSize:'2.5rem',marginBottom:'0.75rem'}}>{p.icon}</div>
              <div style={{fontSize:'1.1rem',fontWeight:'700',color:'var(--gold)',marginBottom:'0.5rem'}}>{p.name}</div>
              <div style={{color:'var(--text-muted)',lineHeight:'1.7',fontSize:'0.9rem'}}>{p[lang]||p.en}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
