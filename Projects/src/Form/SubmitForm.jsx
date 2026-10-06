import React from 'react'
import { useState, useRef, useEffect, useCallback } from "react";

function SubmitForm({ project, onSubmit, submitted }) {
  const [form, setForm] = useState({
    name:'', email:'', github:'', liveDemo:'', description:'', techStack:'', notes:'',
  });
  const [fileNames, setFileNames] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const upd = (k,v) => setForm(f => ({ ...f, [k]:v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = 'Required';
    if (!form.email.trim())   e.email = 'Required';
    if (!form.github.trim())  e.github = 'GitHub URL is required';
    if (!form.description.trim()) e.description = 'Required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit({ projectId:project.id, projectTitle:project.title, ...form, files:fileNames, submittedAt:new Date().toISOString() });
    }, 1400);
  };

  if (submitted) return (
    <div style={{ textAlign:'center', padding:'32px 0', animation:'scaleIn .4s ease' }}>
      <div style={{ fontSize:52, marginBottom:14 }}>✅</div>
      <h3 style={{ fontFamily:'Bebas Neue', fontSize:26, letterSpacing:3, color:'#3ddc84', marginBottom:8 }}>SUBMISSION RECEIVED</h3>
      <p style={{ fontSize:13, color:'#555', lineHeight:1.7, maxWidth:380, margin:'0 auto' }}>
        Your submission for <strong style={{ color:'#ccc' }}>{project.title}</strong> is under review. You'll be notified within 7 days.
      </p>
    </div>
  );

  if (project.status === 'closed') return (
    <div style={{ textAlign:'center', padding:'32px 0' }}>
      <div style={{ fontSize:40, marginBottom:12 }}>🔒</div>
      <h3 style={{ fontFamily:'Bebas Neue', fontSize:22, letterSpacing:3, color:'#ff4545', marginBottom:8 }}>SUBMISSIONS CLOSED</h3>
      <p style={{ fontSize:13, color:'#444' }}>This project is no longer accepting submissions.</p>
    </div>
  );

  const fl = k => ({ className:'f-inp', value:form[k], onChange:e=>upd(k,e.target.value), style:{ borderColor: errors[k]?'#ff4545':undefined } });

  return (
    <div style={{ animation:'fadeIn .3s ease', display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ background:'rgba(61,220,132,.06)', border:'1px solid rgba(61,220,132,.2)', borderRadius:10, padding:'12px 16px', display:'flex', gap:10 }}>
        <span>💡</span>
        <span style={{ fontSize:12, color:'#666', lineHeight:1.6 }}>Make sure you've read all requirements before submitting. Incomplete submissions will be disqualified.</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div>
          <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Your Name *</label>
          <input {...fl('name')} placeholder="Alex Morgan"/>
          {errors.name && <span style={{ fontSize:11, color:'#ff4545', marginTop:3, display:'block' }}>{errors.name}</span>}
        </div>
        <div>
          <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Email Address *</label>
          <input {...fl('email')} type="email" placeholder="alex@example.com"/>
          {errors.email && <span style={{ fontSize:11, color:'#ff4545', marginTop:3, display:'block' }}>{errors.email}</span>}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div>
          <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>GitHub Repository *</label>
          <input {...fl('github')} placeholder="https://github.com/you/repo"/>
          {errors.github && <span style={{ fontSize:11, color:'#ff4545', marginTop:3, display:'block' }}>{errors.github}</span>}
        </div>
        <div>
          <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Live Demo URL</label>
          <input className="f-inp" value={form.liveDemo} onChange={e=>upd('liveDemo',e.target.value)} placeholder="https://your-demo.vercel.app"/>
        </div>
      </div>

      <div>
        <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Tech Stack Used</label>
        <input className="f-inp" value={form.techStack} onChange={e=>upd('techStack',e.target.value)} placeholder="React, FastAPI, PostgreSQL, Docker..."/>
      </div>

      <div>
        <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Project Description *</label>
        <textarea className="f-ta" rows={4} value={form.description} onChange={e=>upd('description',e.target.value)}
          placeholder="Briefly describe your approach, architecture decisions, and key features you built..."
          style={{ borderColor:errors.description?'#ff4545':undefined }}/>
        {errors.description && <span style={{ fontSize:11, color:'#ff4545', marginTop:3, display:'block' }}>{errors.description}</span>}
      </div>

      <div>
        <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Additional Notes</label>
        <textarea className="f-ta" rows={3} value={form.notes} onChange={e=>upd('notes',e.target.value)}
          placeholder="Anything else the judges should know? Known limitations, next steps, special instructions..."/>
      </div>

      {/* File upload */}
      <div>
        <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Attach Files (optional)</label>
        <div onClick={() => fileRef.current.click()}
          style={{
            border:'2px dashed #222', borderRadius:10, padding:'20px',
            textAlign:'center', cursor:'pointer', background:'#111', transition:'all .2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#3ddc84';e.currentTarget.style.background='rgba(61,220,132,.03)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='#222';e.currentTarget.style.background='#111'}}>
          <div style={{ fontSize:11, color:'#444' }}>PDF, ZIP, images · Max 20MB total</div>
          {fileNames.length > 0 && (
            <div style={{ marginTop:8, display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center' }}>
              {fileNames.map(n => (
                <span key={n} style={{ background:'#1e1e1e', border:'1px solid #2a2a2a', borderRadius:100, padding:'3px 10px', fontSize:11, color:'#666' }}>{n}</span>
              ))}
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" multiple style={{ display:'none' }}
          onChange={e => setFileNames(Array.from(e.target.files).map(f=>f.name))}/>
      </div>

      <button onClick={handleSubmit} disabled={loading}
        className="btn-base"
        style={{
          width:'100%', padding:'14px', borderRadius:12, fontSize:14,
          background: loading ? '#1a1a1a' : '#f5f5f5', color: loading ? '#444' : '#080808',
          justifyContent:'center', border:'none', marginTop:4,
        }}>
        {loading ? (
          <span style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:16, height:16, borderRadius:'50%', border:'2px solid #333', borderTop:'2px solid #f5f5f5', animation:'spin 0.7s linear infinite', display:'inline-block' }}/>
            Submitting...
          </span>
        ) : '🚀 Submit Project'}
      </button>
    </div>
  );
}

export default SubmitForm