import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLang } from '../LangContext';
const API = process.env.REACT_APP_API_URL;

const SUGGESTED = {
  en: ['What does jihad really mean?','How does Islam view Jesus?','What are women\'s rights in Islam?','Is Islam a violent religion?','What are the Five Pillars?','How did Islam contribute to science?','What does the Quran say about peace?','Who was Prophet Muhammad ﷺ?','What is the difference between Sunni and Shia?','Does Islam respect other religions?'],
  ar: ['ما المعنى الحقيقي للجهاد؟','كيف ينظر الإسلام إلى عيسى؟','ما حقوق المرأة في الإسلام؟','هل الإسلام دين عنف؟','ما أركان الإسلام الخمسة؟','كيف أسهم الإسلام في العلوم؟','ما الفرق بين السنة والشيعة؟','هل الإسلام يحترم الأديان الأخرى؟'],
  fr: ['Que signifie vraiment le jihad?','Comment l\'Islam voit-il Jésus?','Quels sont les droits des femmes en Islam?','L\'Islam est-il une religion violente?','Quels sont les Cinq Piliers?','Comment l\'Islam a-t-il contribué à la science?','Quelle est la différence entre sunnite et chiite?','L\'Islam respecte-t-il les autres religions?'],
};

export default function Chat() {
  const { lang } = useLang();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2,9));
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages,loading]);

  const send = async (text) => {
    const msg = text||input.trim();
    if (!msg||loading) return;
    setInput('');
    const newMessages = [...messages,{role:'user',content:msg}];
    setMessages(newMessages);
    setLoading(true);
    try {
      const history = newMessages.slice(0,-1).map(m => ({role:m.role,content:m.content}));
      const { data } = await axios.post(`${API}/chat`,{message:msg,sessionId,history,lang});
      setMessages(prev => [...prev,{role:'ai',content:data.response}]);
    } catch {
      setMessages(prev => [...prev,{role:'ai',content:lang==='ar'?'أعتذر، الخدمة غير متاحة مؤقتاً. الرجاء المحاولة لاحقاً.':lang==='fr'?'Je m\'excuse, le service est temporairement indisponible.':'I apologize, I am temporarily unavailable. Please try again in a moment.'}]);
    }
    setLoading(false);
  };

  const tx = {
    en:{title:'🤖 Sheikh AI',sub:'Powered by Gemini AI · Ask anything about Islam in any language',welcome:'As-salamu alaykum!',welcomeSub:'I\'m Sheikh AI — ask me anything about Islam. I answer with Quran and Hadith references.',placeholder:'Ask about Islam in English, Arabic, French, or any language...',send:'Send'},
    ar:{title:'🤖 الشيخ الذكي',sub:'مدعوم بـ Gemini AI · اسأل أي شيء عن الإسلام بأي لغة',welcome:'السلام عليكم!',welcomeSub:'أنا الشيخ الذكي — اسألني أي شيء عن الإسلام. أجيب بالقرآن والحديث.',placeholder:'اسأل عن الإسلام بالعربية أو الإنجليزية أو الفرنسية...',send:'إرسال'},
    fr:{title:'🤖 Sheikh IA',sub:'Propulsé par Gemini AI · Posez n\'importe quelle question sur l\'Islam',welcome:'As-salamu alaykum!',welcomeSub:'Je suis Sheikh IA — posez-moi n\'importe quelle question sur l\'Islam. Je réponds avec Coran et Hadith.',placeholder:'Posez une question en français, arabe, anglais ou toute autre langue...',send:'Envoyer'},
  };
  const t = tx[lang]||tx.en;

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h1>{t.title}</h1>
          <p>{t.sub}</p>
        </div>
        <div className="chat-messages">
          {messages.length===0 ? (
            <div className="chat-welcome">
              <div className="welcome-icon">🕌</div>
              <h3 style={{color:'var(--text)',marginBottom:'0.5rem',fontSize:'1.3rem'}}>{t.welcome}</h3>
              <p>{t.welcomeSub}</p>
              <div className="suggested-questions">
                {(SUGGESTED[lang]||SUGGESTED.en).map(q => (
                  <button key={q} className="suggested-btn" onClick={() => send(q)}>{q}</button>
                ))}
              </div>
            </div>
          ) : messages.map((m,i) => (
            <div key={i} className={`message ${m.role==='user'?'user':'ai'}`}>
              <div className="message-avatar">{m.role==='user'?'👤':'🕌'}</div>
              <div className="message-bubble">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="message ai">
              <div className="message-avatar">🕌</div>
              <div className="message-bubble"><div className="typing-indicator"><div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div></div></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input-area">
          <input className="chat-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => {if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}} placeholder={t.placeholder} disabled={loading} />
          <button className="chat-send" onClick={() => send()} disabled={loading||!input.trim()}>{loading?'...':t.send}</button>
        </div>
      </div>
    </div>
  );
}
