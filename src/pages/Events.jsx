import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Events() {
  const { lang } = useLang();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  useEffect(() => { axios.get(`${API}/events`).then(r => setEvents(r.data)).catch(()=>{}); }, []);
  const categories = ['all','prophetic','revelation','migration','battle','conquest','civilization','treaty','modern','tragedy'];
  const filtered = filter==='all' ? events : events.filter(e => e.category===filter);
  const title = lang==='ar'?'التاريخ الإسلامي':lang==='fr'?'Histoire Islamique':'Islamic History';
  const sub = lang==='ar'?'من 610 م إلى اليوم — 22 حدثاً غيّروا العالم':lang==='fr'?'De 610 EC à aujourd\'hui — 22 événements qui ont changé le monde':'From 610 CE to today — 22 events that changed the world';
  const badgeClass = impact => impact==='World-changing'?'badge-worldchanging':impact==='Devastating'?'badge-devastating':'badge-significant';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',justifyContent:'center',marginBottom:'3rem'}}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className="btn-sm" style={{background:filter===c?'var(--gold)':'transparent',color:filter===c?'var(--deep)':'var(--text-muted)',border:`1px solid ${filter===c?'var(--gold)':'var(--border)'}`,borderRadius:'100px',cursor:'pointer',fontFamily:'Outfit,sans-serif',textTransform:'capitalize'}}>
              {c}
            </button>
          ))}
        </div>
        <div className="timeline">
          {filtered.map((e,i) => (
            <div className="timeline-item" key={e.id}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className={`timeline-badge ${badgeClass(e.impact)}`}>{e.impact}</div>
                <div className="timeline-year">{e.year} CE</div>
                <div className="timeline-title">{e.title}</div>
                <div className="timeline-arabic">{e.arabic}</div>
                <div className="timeline-desc">{e.description}</div>
              </div>
              <div style={{flex:1}}></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
