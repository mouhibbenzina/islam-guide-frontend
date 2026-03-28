import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

const SEED_TESTIMONIES = [
  { _id:'s1', author:'Sarah Mitchell', country:'United States', type:'revert', likes:47, story:'I was raised Christian and always had questions about God. A Muslim colleague gave me a Quran. The first verses I read were about Jesus — and I was shocked. Islam honors Jesus more than I knew. After 6 months of research, I took my shahada. That was 3 years ago. Islam gave me peace I never knew was possible.', createdAt: new Date().toISOString() },
  { _id:'s2', author:'Julien Moreau', country:'France', type:'revert', likes:38, story:'J\'étais athée pendant 20 ans. Après les attentats de Paris, j\'ai voulu comprendre l\'islam pour le critiquer. J\'ai lu le Coran pour trouver la violence. Ce que j\'ai trouvé était la paix, la justice et la miséricorde. Un an plus tard, je suis devenu musulman. L\'islam n\'est pas ce que les médias montrent.', createdAt: new Date().toISOString() },
  { _id:'s3', author:'Carlos Rodriguez', country:'Spain', type:'revert', likes:29, story:'Growing up in Spain, I learned that the Moors were our enemies. At university, I studied Al-Andalus properly. I discovered that Muslims, Christians, and Jews built the greatest civilization Europe had ever seen together in my own country. I began studying Islam seriously. The Quran\'s message of brotherhood changed me completely.', createdAt: new Date().toISOString() },
  { _id:'s4', author:'Aisha Johnson', country:'United Kingdom', type:'born-muslim', likes:52, story:'Being a born Muslim in Britain, I sometimes struggled with my identity. But studying Islamic history and the contributions of Muslims to humanity made me so proud. When non-Muslim friends ask me about terrorism, I show them what the Quran actually says. Islam is not just my religion — it\'s my civilization.', createdAt: new Date().toISOString() },
  { _id:'s5', author:'David Chen', country:'China', type:'revert', likes:33, story:'Islam reached China 1400 years ago through trade. I discovered this history and began studying. The concept of Tawheed — the absolute oneness of God — resonated deeply with me. The Prophet\'s teaching that "seeking knowledge is an obligation on every Muslim" was what convinced me. Islam loves knowledge.', createdAt: new Date().toISOString() },
  { _id:'s6', author:'Maria Silva', country:'Brazil', type:'non-muslim', likes:21, story:'I am Catholic but I visited this website curious about Islam. I was shocked to learn that Muslims believe in Jesus and honor his mother Mary. I thought Islam was completely different from Christianity. Now I understand we share so much more than I thought. My respect for Islam has grown enormously.', createdAt: new Date().toISOString() },
];

export default function Testimonies() {
  const { lang } = useLang();
  const [testimonies, setTestimonies] = useState(SEED_TESTIMONIES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author:'', country:'', type:'revert', story:'' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(`${API}/testimonies`).then(r => {
      if (r.data.length > 0) setTestimonies([...r.data, ...SEED_TESTIMONIES]);
    }).catch(()=>{});
  }, []);

  const submit = async () => {
    if (!form.author.trim() || !form.story.trim()) return;
    try {
      const { data } = await axios.post(`${API}/testimonies`, form);
      setTestimonies(prev => [data, ...prev]);
      setForm({ author:'', country:'', type:'revert', story:'' });
      setShowForm(false);
    } catch {}
  };

  const like = async (id) => {
    if (id.startsWith('s')) {
      setTestimonies(prev => prev.map(t => t._id===id?{...t,likes:(t.likes||0)+1}:t));
      return;
    }
    try {
      const { data } = await axios.post(`${API}/testimonies/${id}/like`);
      setTestimonies(prev => prev.map(t => t._id===id?data:t));
    } catch {}
  };

  const tx = {
    en:{ title:'Testimonies', sub:'Real stories from people whose lives were touched by Islam', addBtn:'+ Share Your Story', name:'Your name *', country:'Your country', typeLabel:'Your relationship with Islam', revert:'Revert (New Muslim)', born:'Born Muslim', nonMuslim:'Non-Muslim (curious/learning)', story:'Share your story... *', submit:'Share Story', filter_all:'All', filter_revert:'Reverts', filter_born:'Born Muslims', filter_nonmuslim:'Non-Muslims' },
    ar:{ title:'الشهادات', sub:'قصص حقيقية من أشخاص لمس الإسلام حياتهم', addBtn:'+ شارك قصتك', name:'اسمك *', country:'بلدك', typeLabel:'علاقتك بالإسلام', revert:'مسلم جديد (أسلم)', born:'مسلم بالولادة', nonMuslim:'غير مسلم (فضولي)', story:'شارك قصتك... *', submit:'نشر القصة', filter_all:'الكل', filter_revert:'المسلمون الجدد', filter_born:'مسلمون بالولادة', filter_nonmuslim:'غير المسلمين' },
    fr:{ title:'Témoignages', sub:'Vraies histoires de personnes touchées par l\'Islam', addBtn:'+ Partager Votre Histoire', name:'Votre nom *', country:'Votre pays', typeLabel:'Votre rapport à l\'Islam', revert:'Converti(e)', born:'Musulman(e) de naissance', nonMuslim:'Non-Musulman(e)', story:'Partagez votre histoire... *', submit:'Partager', filter_all:'Tous', filter_revert:'Convertis', filter_born:'Musulmans de naissance', filter_nonmuslim:'Non-Musulmans' },
  };
  const t = tx[lang]||tx.en;
  const typeBadge = type => type==='revert'?<span className="badge badge-ai">🌟 {lang==='ar'?'مسلم جديد':lang==='fr'?'Converti':'Revert'}</span>:type==='born-muslim'?<span className="badge badge-muslim">☪️ {lang==='ar'?'مسلم بالولادة':lang==='fr'?'Né Musulman':'Born Muslim'}</span>:<span className="badge badge-nonmuslim">🌍 {lang==='ar'?'غير مسلم':lang==='fr'?'Non-Musulman':'Non-Muslim'}</span>;
  const filtered = filter==='all' ? testimonies : testimonies.filter(t => t.type===filter||(filter==='non-muslim'&&t.type==='non-muslim'));
  const inputStyle = { width:'100%', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'0.65rem 1rem', color:'var(--text)', fontFamily:'Outfit,sans-serif', fontSize:'0.9rem', outline:'none', marginBottom:'0.75rem' };

  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.sub}</p>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
            {[['all',t.filter_all],['revert',t.filter_revert],['born-muslim',t.filter_born],['non-muslim',t.filter_nonmuslim]].map(([val,label]) => (
              <button key={val} onClick={() => setFilter(val)} className="btn-sm" style={{background:filter===val?'var(--gold)':'transparent',color:filter===val?'var(--deep)':'var(--text-muted)',border:`1px solid ${filter===val?'var(--gold)':'var(--border)'}`,borderRadius:'100px',cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>{label}</button>
            ))}
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">{t.addBtn}</button>
        </div>
        {showForm && (
          <div style={{background:'var(--surface)',border:'1px solid var(--gold)',borderRadius:'16px',padding:'2rem',marginBottom:'2rem'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
              <input value={form.author} onChange={e => setForm({...form,author:e.target.value})} placeholder={t.name} style={inputStyle} />
              <input value={form.country} onChange={e => setForm({...form,country:e.target.value})} placeholder={t.country} style={inputStyle} />
            </div>
            <select value={form.type} onChange={e => setForm({...form,type:e.target.value})} style={inputStyle}>
              <option value="revert">{t.revert}</option>
              <option value="born-muslim">{t.born}</option>
              <option value="non-muslim">{t.nonMuslim}</option>
            </select>
            <textarea value={form.story} onChange={e => setForm({...form,story:e.target.value})} placeholder={t.story} rows={5} style={{...inputStyle,resize:'vertical'}} />
            <button onClick={submit} className="btn-primary" disabled={!form.author.trim()||!form.story.trim()}>{t.submit}</button>
          </div>
        )}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'1.5rem'}}>
          {filtered.map(testimony => (
            <div key={testimony._id} className="testimony-card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.5rem',flexWrap:'wrap',gap:'0.5rem'}}>
                <div>
                  <div className="testimony-author">{testimony.author}</div>
                  {testimony.country && <div className="testimony-country">🌍 {testimony.country}</div>}
                </div>
                {typeBadge(testimony.type)}
              </div>
              <div className="testimony-text">"{testimony.story}"</div>
              <button onClick={() => like(testimony._id)} style={{background:'none',border:'1px solid var(--border)',borderRadius:'100px',padding:'0.25rem 0.7rem',color:'var(--text-muted)',cursor:'pointer',fontSize:'0.78rem',fontFamily:'Outfit,sans-serif'}}>❤️ {testimony.likes||0}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
