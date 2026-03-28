import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Population() {
  const { lang } = useLang();
  const [data, setData] = useState(null);
  useEffect(() => { axios.get(`${API}/population`).then(r => setData(r.data)).catch(()=>{}); }, []);
  if (!data) return <div className="page-wrapper" style={{textAlign:'center',padding:'10rem',color:'var(--text-muted)'}}>Loading...</div>;
  const allData = [...data.growth, ...data.projections];
  const title = lang==='ar'?'نمو الإسلام نحو 7 مليار':lang==='fr'?'Croissance de l\'Islam vers 7 Milliards':'Islam\'s Growth Toward 7 Billion';
  const sub = lang==='ar'?'من 610 م إلى 2100 — الإسلام في طريقه ليصبح دين البشرية':lang==='fr'?'De 610 EC à 2100 — l\'Islam en route pour devenir la religion de l\'humanité':'From 610 CE to 2100 — Islam on its way to becoming humanity\'s religion';
  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{sub}</p>

        {/* Key Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1rem',marginBottom:'3rem'}}>
          {[
            {num:'1.98B',label:{en:'Muslims Today',ar:'مسلم اليوم',fr:'Musulmans aujourd\'hui'},icon:'🌍'},
            {num:'24.9%',label:{en:'Of World Population',ar:'من سكان العالم',fr:'De la population mondiale'},icon:'🌐'},
            {num:'#1',label:{en:'Fastest Growing Religion',ar:'الأسرع نمواً',fr:'Religion + rapide'},icon:'📈'},
            {num:'2.76B',label:{en:'By 2050',ar:'بحلول 2050',fr:'D\'ici 2050'},icon:'🔮'},
            {num:'7B',label:{en:'Projected by 2100',ar:'متوقع 2100',fr:'Prévu pour 2100'},icon:'🌟'},
          ].map(s => (
            <div className="stat-card" key={s.num}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.25rem'}}>{s.icon}</div>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label[lang]||s.label.en}</div>
            </div>
          ))}
        </div>

        {/* Growth Chart */}
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'2rem',marginBottom:'2rem'}}>
          <h3 style={{color:'var(--gold)',fontFamily:'Amiri,serif',fontSize:'1.4rem',marginBottom:'1.5rem',textAlign:'center'}}>
            {lang==='ar'?'نمو عدد المسلمين عبر التاريخ (بالمليون)':lang==='fr'?'Croissance des musulmans dans l\'histoire (millions)':'Muslim Population Growth Through History (Millions)'}
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={allData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.1)" />
              <XAxis dataKey="year" stroke="#8B9BB4" fontSize={11} />
              <YAxis stroke="#8B9BB4" fontSize={11} />
              <Tooltip contentStyle={{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'8px',color:'var(--text)'}} formatter={v=>[`${v}M`,'Muslims']} />
              <Line type="monotone" dataKey="population" stroke="#C9A84C" strokeWidth={3} dot={{fill:'#C9A84C',r:3}} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{textAlign:'center',marginTop:'1rem',color:'var(--text-muted)',fontSize:'0.82rem',fontStyle:'italic'}}>
            {lang==='ar'?'* البيانات بعد 2024 هي توقعات بناءً على الاتجاهات الحالية':lang==='fr'?'* Les données après 2024 sont des projections basées sur les tendances actuelles':'* Data after 2024 are projections based on current trends'}
          </div>
        </div>

        {/* Region & Countries */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem',marginBottom:'2rem'}}>
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'2rem'}}>
            <h3 style={{color:'var(--gold)',marginBottom:'1.5rem',textAlign:'center',fontSize:'1rem'}}>
              {lang==='ar'?'حسب المنطقة':lang==='fr'?'Par Région':'By Region'}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={data.byRegion} dataKey="population" nameKey="region" cx="50%" cy="50%" outerRadius={85} label={({percentage})=>`${percentage}%`} labelLine={false} fontSize={11}>
                  {data.byRegion.map((entry,i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{background:'var(--surface2)',border:'1px solid var(--border)',color:'var(--text)'}} formatter={v=>[`${v}M`,'Muslims']} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem',justifyContent:'center',marginTop:'0.75rem'}}>
              {data.byRegion.map(r => (
                <div key={r.region} style={{display:'flex',alignItems:'center',gap:'0.35rem',fontSize:'0.72rem',color:'var(--text-muted)'}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:r.color,flexShrink:0}}></div>
                  {r.region}
                </div>
              ))}
            </div>
          </div>

          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'2rem'}}>
            <h3 style={{color:'var(--gold)',marginBottom:'1.5rem',textAlign:'center',fontSize:'1rem'}}>
              {lang==='ar'?'أكبر الدول المسلمة':lang==='fr'?'Grands Pays Musulmans':'Top Muslim Countries'}
            </h3>
            <div style={{display:'flex',flexDirection:'column',gap:'0.65rem'}}>
              {data.topCountries.map(c => (
                <div key={c.country} style={{display:'flex',alignItems:'center',gap:'0.65rem'}}>
                  <span style={{fontSize:'1.1rem'}}>{c.flag}</span>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.2rem'}}>
                      <span style={{fontSize:'0.82rem',color:'var(--text)'}}>{c.country}</span>
                      <span style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>{c.muslims}M · {c.percentage}%</span>
                    </div>
                    <div style={{height:'4px',background:'var(--surface2)',borderRadius:'2px'}}>
                      <div style={{height:'100%',width:`${c.percentage}%`,background:'var(--gold)',borderRadius:'2px'}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facts */}
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'2rem'}}>
          <h3 style={{color:'var(--gold)',marginBottom:'1.5rem',textAlign:'center',fontFamily:'Amiri,serif',fontSize:'1.5rem'}}>
            {lang==='ar'?'حقائق مثيرة':lang==='fr'?'Faits Fascinants':'Fascinating Facts'}
          </h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1rem'}}>
            {data.facts.map((f,i) => (
              <div key={i} style={{display:'flex',gap:'0.75rem',alignItems:'flex-start',background:'var(--surface2)',borderRadius:'12px',padding:'1rem'}}>
                <span style={{color:'var(--gold)',flexShrink:0}}>✨</span>
                <span style={{color:'var(--text-muted)',fontSize:'0.88rem',lineHeight:'1.6'}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
