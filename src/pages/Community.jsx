import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

export default function Community() {
  const { lang } = useLang();
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ author:'', authorType:'non-muslim', country:'', question:'', category:'general' });
  const [answerForm, setAnswerForm] = useState({ author:'', authorType:'muslim', content:'' });

  const tx = {
    en:{ title:'Ask a Muslim', sub:'Honest dialogue between Muslims and non-Muslims', askBtn:'+ Ask a Question', name:'Your name (optional)', country:'Your country (optional)', youAre:'You are...', muslim:'Muslim', nonMuslim:'Non-Muslim', yourQ:'Your question about Islam...', submit:'Submit — AI will answer instantly!', answers:'Answers', answerIt:'Post an Answer', yourAnswer:'Your answer...', post:'Post Answer', noQ:'No questions yet — be the first!', back:'← Back', loading:'Getting AI answer...', askAI:'🤖 AI Answered' },
    ar:{ title:'اسأل مسلماً', sub:'حوار صادق بين المسلمين وغير المسلمين', askBtn:'+ اطرح سؤالاً', name:'اسمك (اختياري)', country:'بلدك (اختياري)', youAre:'أنت...', muslim:'مسلم', nonMuslim:'غير مسلم', yourQ:'سؤالك عن الإسلام...', submit:'إرسال — الذكاء الاصطناعي سيجيب فوراً!', answers:'الإجابات', answerIt:'نشر إجابة', yourAnswer:'إجابتك...', post:'نشر الإجابة', noQ:'لا أسئلة بعد — كن أول من يسأل!', back:'← رجوع', loading:'جاري الحصول على إجابة...', askAI:'🤖 أجاب الذكاء الاصطناعي' },
    fr:{ title:'Demandez à un Musulman', sub:'Dialogue honnête entre musulmans et non-musulmans', askBtn:'+ Poser une Question', name:'Votre nom (optionnel)', country:'Votre pays (optionnel)', youAre:'Vous êtes...', muslim:'Musulman', nonMuslim:'Non-Musulman', yourQ:'Votre question sur l\'Islam...', submit:'Soumettre — l\'IA répondra instantanément!', answers:'Réponses', answerIt:'Publier une Réponse', yourAnswer:'Votre réponse...', post:'Publier', noQ:'Pas encore de questions — soyez le premier!', back:'← Retour', loading:'Obtention de la réponse...', askAI:'🤖 IA a répondu' },
  };
  const t = tx[lang]||tx.en;

  useEffect(() => { axios.get(`${API}/questions`).then(r => setQuestions(r.data)).catch(()=>{}); }, []);

  const badge = (type) => {
    const cls = type==='ai'?'badge-ai':type==='muslim'?'badge-muslim':'badge-nonmuslim';
    const label = type==='ai'?'🤖 Sheikh AI':type==='muslim'?'☪️ Muslim':'🌍 Non-Muslim';
    return <span className={`badge ${cls}`}>{label}</span>;
  };

  const submitQ = async () => {
    if (!form.question.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/questions`, form);
      setQuestions(prev => [data, ...prev]);
      setForm({ author:'', authorType:'non-muslim', country:'', question:'', category:'general' });
      setShowForm(false);
      setSelected(data);
    } catch {}
    setLoading(false);
  };

  const submitA = async () => {
    if (!answerForm.content.trim() || !selected) return;
    try {
      const { data } = await axios.post(`${API}/questions/${selected._id}/answer`, answerForm);
      setSelected(data);
      setQuestions(prev => prev.map(q => q._id===data._id?data:q));
      setAnswerForm({ author:'', authorType:'muslim', content:'' });
    } catch {}
  };

  const like = async (id) => {
    try {
      const { data } = await axios.post(`${API}/questions/${id}/like`);
      setQuestions(prev => prev.map(q => q._id===id?data:q));
      if (selected?._id===id) setSelected(data);
    } catch {}
  };

  const inputStyle = { width:'100%', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'0.65rem 1rem', color:'var(--text)', fontFamily:'Outfit,sans-serif', fontSize:'0.9rem', outline:'none', marginBottom:'0.75rem' };
  const selectStyle = { ...inputStyle };

  return (
    <div className="page-wrapper">
      <section className="section">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.sub}</p>
        {selected ? (
          <div style={{maxWidth:'750px',margin:'0 auto'}}>
            <button onClick={() => setSelected(null)} className="btn-secondary" style={{marginBottom:'2rem'}}>{t.back}</button>
            <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'2rem',marginBottom:'1.5rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'1rem',flexWrap:'wrap'}}>
                {badge(selected.authorType)}
                <span style={{color:'var(--text-muted)',fontSize:'0.85rem'}}>{selected.author||'Anonymous'}</span>
                {selected.country && <span style={{color:'var(--text-muted)',fontSize:'0.8rem'}}>🌍 {selected.country}</span>}
                <span style={{color:'var(--text-muted)',fontSize:'0.75rem',marginLeft:'auto'}}>{new Date(selected.createdAt).toLocaleDateString()}</span>
              </div>
              <p style={{color:'var(--text)',fontSize:'1.05rem',lineHeight:'1.7',marginBottom:'1rem'}}>{selected.question}</p>
              <button onClick={() => like(selected._id)} style={{background:'none',border:'1px solid var(--border)',borderRadius:'100px',padding:'0.3rem 0.75rem',color:'var(--text-muted)',cursor:'pointer',fontSize:'0.8rem',fontFamily:'Outfit,sans-serif'}}>❤️ {selected.likes}</button>
            </div>
            <h3 style={{color:'var(--gold)',marginBottom:'1rem'}}>{t.answers} ({selected.answers?.length||0})</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'2rem'}}>
              {selected.answers?.map((a,i) => (
                <div key={i} style={{background:a.authorType==='ai'?'rgba(45,212,191,0.05)':'var(--surface)',border:`1px solid ${a.authorType==='ai'?'rgba(45,212,191,0.25)':'var(--border)'}`,borderRadius:'12px',padding:'1.25rem'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>{badge(a.authorType)}<span style={{color:'var(--text-muted)',fontSize:'0.82rem'}}>{a.author}</span></div>
                  <p style={{color:'var(--text)',lineHeight:'1.7',whiteSpace:'pre-wrap',fontSize:'0.9rem'}}>{a.content}</p>
                </div>
              ))}
            </div>
            <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'1.5rem'}}>
              <h4 style={{color:'var(--text)',marginBottom:'1rem'}}>{t.answerIt}</h4>
              <input value={answerForm.author} onChange={e => setAnswerForm({...answerForm,author:e.target.value})} placeholder={t.name} style={inputStyle} />
              <select value={answerForm.authorType} onChange={e => setAnswerForm({...answerForm,authorType:e.target.value})} style={selectStyle}>
                <option value="muslim">{t.muslim}</option>
                <option value="non-muslim">{t.nonMuslim}</option>
              </select>
              <textarea value={answerForm.content} onChange={e => setAnswerForm({...answerForm,content:e.target.value})} placeholder={t.yourAnswer} rows={4} style={{...inputStyle,resize:'vertical',marginBottom:'0.75rem'}} />
              <button onClick={submitA} className="btn-primary" disabled={!answerForm.content.trim()}>{t.post}</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'1.5rem'}}>
              <button onClick={() => setShowForm(!showForm)} className="btn-primary">{t.askBtn}</button>
            </div>
            {showForm && (
              <div style={{background:'var(--surface)',border:'1px solid var(--gold)',borderRadius:'16px',padding:'2rem',marginBottom:'2rem'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
                  <input value={form.author} onChange={e => setForm({...form,author:e.target.value})} placeholder={t.name} style={inputStyle} />
                  <input value={form.country} onChange={e => setForm({...form,country:e.target.value})} placeholder={t.country} style={inputStyle} />
                </div>
                <select value={form.authorType} onChange={e => setForm({...form,authorType:e.target.value})} style={selectStyle}>
                  <option value="non-muslim">{t.nonMuslim}</option>
                  <option value="muslim">{t.muslim}</option>
                </select>
                <textarea value={form.question} onChange={e => setForm({...form,question:e.target.value})} placeholder={t.yourQ} rows={3} style={{...inputStyle,resize:'vertical'}} />
                <button onClick={submitQ} className="btn-primary" disabled={loading||!form.question.trim()}>{loading?t.loading:t.submit}</button>
              </div>
            )}
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              {questions.length===0 && <div style={{textAlign:'center',color:'var(--text-muted)',padding:'3rem'}}>{t.noQ}</div>}
              {questions.map(q => (
                <div key={q._id} onClick={() => setSelected(q)} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'16px',padding:'1.5rem',cursor:'pointer',transition:'border-color 0.2s'}}
                  onMouseOver={e => e.currentTarget.style.borderColor='var(--gold)'}
                  onMouseOut={e => e.currentTarget.style.borderColor='var(--border)'}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem',flexWrap:'wrap'}}>
                    {badge(q.authorType)}
                    <span style={{color:'var(--text-muted)',fontSize:'0.82rem'}}>{q.author||'Anonymous'}</span>
                    {q.country && <span style={{color:'var(--text-muted)',fontSize:'0.75rem'}}>🌍 {q.country}</span>}
                    {q.answers?.some(a => a.authorType==='ai') && <span className="badge badge-ai" style={{marginLeft:'auto'}}>{t.askAI}</span>}
                  </div>
                  <p style={{color:'var(--text)',lineHeight:'1.6',marginBottom:'0.75rem'}}>{q.question}</p>
                  <div style={{display:'flex',gap:'1rem',color:'var(--text-muted)',fontSize:'0.78rem'}}>
                    <span>💬 {q.answers?.length||0} {t.answers}</span>
                    <span>❤️ {q.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
