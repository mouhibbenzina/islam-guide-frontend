import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../LangContext';

export default function Home() {
  const { t, lang } = useLang();
  const features = [
    { icon:'📖', path:'/quran', en:'Quran Verses', ar:'آيات قرآنية', fr:'Versets Coraniques', desc:{en:'12 key verses with context & meaning',ar:'12 آية قرآنية بالسياق والمعنى',fr:'12 versets clés avec contexte'} },
    { icon:'📿', path:'/hadiths', en:'15 Hadiths', ar:'15 حديثاً', fr:'15 Hadiths', desc:{en:'Most important prophetic traditions',ar:'أهم الأحاديث النبوية الشريفة',fr:'Les traditions prophétiques les plus importantes'} },
    { icon:'❌', path:'/myths', en:'8 Myths Corrected', ar:'8 خرافات مصححة', fr:'8 Mythes Corrigés', desc:{en:'The biggest misconceptions about Islam',ar:'أكبر المفاهيم الخاطئة عن الإسلام',fr:'Les plus grandes idées reçues sur l\'Islam'} },
    { icon:'🕌', path:'/pillars', en:'5 Pillars', ar:'5 أركان', fr:'5 Piliers', desc:{en:'The foundation of Islamic practice',ar:'أساس الممارسة الإسلامية',fr:'Le fondement de la pratique islamique'} },
    { icon:'⭐', path:'/prophets', en:'6 Prophets', ar:'6 أنبياء', fr:'6 Prophètes', desc:{en:'From Adam to Muhammad ﷺ',ar:'من آدم إلى محمد ﷺ',fr:'D\'Adam à Muhammad ﷺ'} },
    { icon:'🔬', path:'/scholars', en:'8 Scholars', ar:'8 علماء', fr:'8 Érudits', desc:{en:'Who changed human civilization',ar:'غيّروا الحضارة الإنسانية',fr:'Qui ont changé la civilisation humaine'} },
    { icon:'📜', path:'/events', en:'22 Historical Events', ar:'22 حدثاً تاريخياً', fr:'22 Événements Historiques', desc:{en:'1400 years of Islamic history',ar:'1400 عام من التاريخ الإسلامي',fr:'1400 ans d\'histoire islamique'} },
    { icon:'🏛️', path:'/contributions', en:'8 Civilizations', ar:'8 مجالات حضارية', fr:'8 Domaines', desc:{en:'Islamic contributions to humanity',ar:'مساهمات الإسلام للإنسانية',fr:'Contributions islamiques à l\'humanité'} },
    { icon:'📈', path:'/population', en:'Growth to 7B', ar:'نمو إلى 7 مليار', fr:'Croissance à 7Mrd', desc:{en:'Islam projected to reach 7 billion',ar:'متوقع للإسلام أن يصل إلى 7 مليار',fr:'L\'Islam devrait atteindre 7 milliards'} },
    { icon:'💬', path:'/community', en:'Community Q&A', ar:'أسئلة المجتمع', fr:'Q&R Communautaire', desc:{en:'Muslims & non-Muslims in dialogue',ar:'مسلمون وغير مسلمين في حوار',fr:'Musulmans & non-musulmans en dialogue'} },
    { icon:'🌟', path:'/testimonies', en:'Testimonies', ar:'شهادات', fr:'Témoignages', desc:{en:'People sharing their journey with Islam',ar:'مشاركة رحلتهم مع الإسلام',fr:'Personnes partageant leur voyage avec l\'Islam'} },
    { icon:'🤖', path:'/chat', en:'Sheikh AI', ar:'الشيخ الذكي', fr:'Sheikh IA', desc:{en:'Ask anything about Islam instantly',ar:'اسأل أي شيء عن الإسلام فوراً',fr:'Posez n\'importe quelle question sur l\'Islam'} },
  ];
  return (
    <div>
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="hero-badge">{t.heroBadge}</div>
          <div className="hero-arabic">نور الحق</div>
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <div className="hero-buttons">
            <Link to="/chat" className="btn-primary">{t.heroBtn1}</Link>
            <Link to="/articles" className="btn-secondary">{t.heroBtn2}</Link>
          </div>
          <div className="hero-stats">
            {[
              {num:'1.98B', label:{en:'Muslims Today',ar:'مسلم اليوم',fr:'Musulmans Aujourd\'hui'}},
              {num:'1400+', label:{en:'Years of History',ar:'سنة تاريخ',fr:'Ans d\'Histoire'}},
              {num:'#1', label:{en:'Fastest Growing',ar:'الأسرع نمواً',fr:'Croissance la + rapide'}},
              {num:'7B', label:{en:'Projected by 2100',ar:'متوقع 2100',fr:'Prévu pour 2100'}},
            ].map(s => (
              <div className="hero-stat" key={s.num}>
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label[lang]||s.label.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <h2 className="section-title">{lang==='ar'?'كل ما تحتاج معرفته عن الإسلام':lang==='fr'?'Tout ce que vous devez savoir sur l\'Islam':'Everything You Need to Know About Islam'}</h2>
        <p className="section-subtitle">{lang==='ar'?'12 قسماً شاملاً — من القرآن إلى التاريخ إلى الحوار المجتمعي':lang==='fr'?'12 sections complètes — du Coran à l\'histoire au dialogue communautaire':'12 comprehensive sections — from Quran to history to community dialogue'}</p>
        <div className="cards-grid">
          {features.map(f => (
            <Link to={f.path} key={f.path} style={{textDecoration:'none'}}>
              <div className="card card-clickable">
                <div className="card-icon">{f.icon}</div>
                <div className="card-title">{lang==='ar'?f.ar:lang==='fr'?f.fr:f.en}</div>
                <div className="card-text">{f.desc[lang]||f.desc.en}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider"></div>

      <section style={{padding:'4rem 2rem',background:'var(--surface)',textAlign:'center'}}>
        <div style={{maxWidth:'700px',margin:'0 auto'}}>
          <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🤖</div>
          <h2 style={{fontFamily:'Amiri,serif',fontSize:'2rem',color:'var(--gold)',marginBottom:'1rem'}}>{lang==='ar'?'اسأل الشيخ الذكي':lang==='fr'?'Demandez à Sheikh IA':'Ask Sheikh AI'}</h2>
          <p style={{color:'var(--text-muted)',lineHeight:'1.8',marginBottom:'2rem'}}>{lang==='ar'?'عالم الذكاء الاصطناعي يجيب على أسئلتك بالقرآن والحديث. بالعربية أو الإنجليزية أو الفرنسية.':lang==='fr'?'L\'érudit IA répond à vos questions avec Coran et Hadith. En arabe, anglais ou français.':'Our AI scholar answers with Quran and Hadith references. In English, Arabic, or French.'}</p>
          <Link to="/chat" className="btn-primary" style={{fontSize:'1.1rem',padding:'1rem 2.5rem'}}>{t.heroBtn1}</Link>
        </div>
      </section>
    </div>
  );
}
