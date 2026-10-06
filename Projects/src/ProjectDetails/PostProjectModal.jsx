import React from 'react'
import { useState, useRef, useEffect, useCallback } from "react";
import { CATEGORIES, DIFFICULTIES, SORT_OPTIONS, daysLeft, catColor, diffColor, formatPrize } from '../App';

function PostProjectModal({ onClose, onPost }) {
  const [form, setForm] = useState({
    title:'', company:'', category:'Full-Stack', difficulty:'Intermediate',
    prize:'', deadline:'', slots:3, description:'', longDescription:'',
    requirements:['','',''], deliverables:['',''], tags:'',
    prizes:[{rank:'1st Place',amount:'',label:'Gold'},{rank:'2nd Place',amount:'',label:'Silver'}],
  });
  const [step, setStep] = useState(0);
  const overlayRef = useRef();

  const upd = (k,v) => setForm(f => ({ ...f, [k]:v }));
  const STEPS = ['Basics','Details','Prizes & Deliverables'];

  useEffect(() => {
    const esc = e => { if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc);
  }, []);

  const handlePost = () => {
    const newP = {
      id: Date.now(),
      ...form,
      prize: parseInt(form.prize)||0,
      slots: parseInt(form.slots)||1,
      companyInitials: form.company.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(),
      status:'open', featured:false, applicants:0, submissionCount:0,
      postedDate: new Date().toISOString().split('T')[0],
      tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean),
      prizes: form.prizes.filter(p=>p.amount).map(p=>({...p,amount:parseInt(p.amount)||0})),
      requirements: form.requirements.filter(Boolean),
      deliverables: form.deliverables.filter(Boolean),
    };
    onPost(newP);
  };

  const canNext = () => {
    if (step===0) return form.title && form.company && form.prize && form.deadline;
    if (step===1) return form.description && form.longDescription;
    return true;
  };

  return (
    <div className="modal-overlay" ref={overlayRef}
      onClick={e => e.target===overlayRef.current && onClose()}>
      <div className="modal-box" style={{ maxWidth:680 }}>
        {/* Header */}
        <div style={{ padding:'26px 30px 0' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <div>
              <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:4 }}>POST A NEW PROJECT</div>
              <h2 style={{ fontFamily:'Bebas Neue', fontSize:26, letterSpacing:3 }}>CHALLENGE THE COMMUNITY</h2>
            </div>
            <button onClick={onClose}
              style={{ background:'#1a1a1a', border:'1px solid #252525', borderRadius:8, width:32, height:32, cursor:'pointer', color:'#666', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          </div>

          {/* Step tabs */}
          <div style={{ display:'flex', gap:0 }}>
            {STEPS.map((s,i) => (
              <div key={s} style={{ flex:1, textAlign:'center', paddingBottom:12,
                borderBottom:`2px solid ${i===step?'#3ddc84':i<step?'#333':'#1a1a1a'}`,
                cursor: i<=step ? 'pointer' : 'default' }} onClick={()=>i<=step&&setStep(i)}>
                <span style={{ fontSize:11, fontWeight:700, color:i===step?'#f5f5f5':i<step?'#3ddc84':'#333' }}>{i+1}. {s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:'24px 30px', maxHeight:'58vh', overflowY:'auto' }}>
          {step === 0 && (
            <div style={{ display:'flex', flexDirection:'column', gap:14, animation:'fadeIn .3s ease' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Project Title *</label>
                  <input className="f-inp" value={form.title} onChange={e=>upd('title',e.target.value)} placeholder="AI Resume Screener"/>
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Company Name *</label>
                  <input className="f-inp" value={form.company} onChange={e=>upd('company',e.target.value)} placeholder="Acme Corp"/>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Category</label>
                  <select className="f-sel" value={form.category} onChange={e=>upd('category',e.target.value)}>
                    {CATEGORIES.filter(c=>c!=='All').map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Difficulty</label>
                  <select className="f-sel" value={form.difficulty} onChange={e=>upd('difficulty',e.target.value)}>
                    {DIFFICULTIES.filter(d=>d!=='All').map(d=><option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Top Prize (USD) *</label>
                  <input className="f-inp" type="number" value={form.prize} onChange={e=>upd('prize',e.target.value)} placeholder="2500"/>
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Deadline *</label>
                  <input className="f-inp" type="date" value={form.deadline} onChange={e=>upd('deadline',e.target.value)}/>
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Open Slots</label>
                  <input className="f-inp" type="number" min="1" max="20" value={form.slots} onChange={e=>upd('slots',e.target.value)} placeholder="3"/>
                </div>
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Tech Tags (comma-separated)</label>
                <input className="f-inp" value={form.tags} onChange={e=>upd('tags',e.target.value)} placeholder="React, Python, Docker, PostgreSQL"/>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display:'flex', flexDirection:'column', gap:14, animation:'fadeIn .3s ease' }}>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Short Description *</label>
                <textarea className="f-ta" rows={3} value={form.description} onChange={e=>upd('description',e.target.value)}
                  placeholder="One-paragraph summary shown on the project card..."/>
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:5 }}>Full Description *</label>
                <textarea className="f-ta" rows={5} value={form.longDescription} onChange={e=>upd('longDescription',e.target.value)}
                  placeholder="Detailed description with context, expectations, and background..."/>
              </div>
              <div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase' }}>Requirements</label>
                  <button onClick={()=>upd('requirements',[...form.requirements,''])}
                    style={{ background:'none', border:'none', color:'#3ddc84', fontSize:12, cursor:'pointer', fontWeight:700 }}>+ Add</button>
                </div>
                {form.requirements.map((r,i) => (
                  <div key={i} style={{ display:'flex', gap:8, marginBottom:8, alignItems:'center' }}>
                    <span style={{ fontFamily:'Bebas Neue', fontSize:14, color:'#333', minWidth:22 }}>
                      {String(i+1).padStart(2,'0')}
                    </span>
                    <input className="f-inp" value={r}
                      onChange={e=>{const a=[...form.requirements];a[i]=e.target.value;upd('requirements',a);}}
                      placeholder={`Requirement ${i+1}...`} style={{ flex:1 }}/>
                    <button onClick={()=>upd('requirements',form.requirements.filter((_,j)=>j!==i))}
                      style={{ background:'none', border:'none', color:'#ff4545', fontSize:16, cursor:'pointer' }}>×</button>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase' }}>Deliverables</label>
                  <button onClick={()=>upd('deliverables',[...form.deliverables,''])}
                    style={{ background:'none', border:'none', color:'#3ddc84', fontSize:12, cursor:'pointer', fontWeight:700 }}>+ Add</button>
                </div>
                {form.deliverables.map((d,i) => (
                  <div key={i} style={{ display:'flex', gap:8, marginBottom:8, alignItems:'center' }}>
                    <input className="f-inp" value={d}
                      onChange={e=>{const a=[...form.deliverables];a[i]=e.target.value;upd('deliverables',a);}}
                      placeholder={`Deliverable ${i+1}...`} style={{ flex:1 }}/>
                    <button onClick={()=>upd('deliverables',form.deliverables.filter((_,j)=>j!==i))}
                      style={{ background:'none', border:'none', color:'#ff4545', fontSize:16, cursor:'pointer' }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display:'flex', flexDirection:'column', gap:16, animation:'fadeIn .3s ease' }}>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:10 }}>Prize Structure</label>
                {form.prizes.map((p,i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr auto', gap:8, marginBottom:8, alignItems:'center' }}>
                    <input className="f-inp" value={p.rank} onChange={e=>{const a=[...form.prizes];a[i].rank=e.target.value;upd('prizes',a);}} placeholder="1st Place"/>
                    <input className="f-inp" type="number" value={p.amount} onChange={e=>{const a=[...form.prizes];a[i].amount=e.target.value;upd('prizes',a);}} placeholder="Amount $"/>
                    <input className="f-inp" value={p.label} onChange={e=>{const a=[...form.prizes];a[i].label=e.target.value;upd('prizes',a);}} placeholder="Gold"/>
                    <button onClick={()=>upd('prizes',form.prizes.filter((_,j)=>j!==i))}
                      style={{ background:'none', border:'none', color:'#ff4545', fontSize:16, cursor:'pointer' }}>×</button>
                  </div>
                ))}
                <button onClick={()=>upd('prizes',[...form.prizes,{rank:`${form.prizes.length+1}th Place`,amount:'',label:''}])}
                  style={{ background:'#141414', border:'1px solid #222', borderRadius:8, padding:'8px 16px', fontSize:12, color:'#3ddc84', cursor:'pointer', fontWeight:700 }}>
                  + Add Prize Tier
                </button>
              </div>

              {/* Preview */}
              <div style={{ background:'rgba(61,220,132,.04)', border:'1px solid rgba(61,220,132,.15)', borderRadius:12, padding:16 }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#3ddc84', letterSpacing:2, marginBottom:10 }}>PROJECT PREVIEW</div>
                <div style={{ fontSize:14, fontWeight:700, color:'#f5f5f5', marginBottom:4 }}>{form.title||'Project Title'}</div>
                <div style={{ fontSize:12, color:'#555', marginBottom:8 }}>{form.company||'Company'}</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  <span className="tag" style={{ background:`${catColor[form.category]||'#888'}15`, color:catColor[form.category]||'#888', fontSize:11, padding:'3px 9px' }}>{form.category}</span>
                  <span className="tag" style={{ background:`${diffColor[form.difficulty]}12`, color:diffColor[form.difficulty], fontSize:11, padding:'3px 9px' }}>{form.difficulty}</span>
                  <span style={{ fontFamily:'Bebas Neue', fontSize:16, color:'#f5c542', letterSpacing:1, marginLeft:4 }}>{form.prize ? `$${parseInt(form.prize).toLocaleString()}` : '$0'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:'0 30px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #141414', paddingTop:18 }}>
          <button onClick={() => step>0 ? setStep(s=>s-1) : onClose()}
            className="btn-base"
            style={{ background:'transparent', color:'#555', border:'1px solid #222', padding:'9px 20px', borderRadius:100, fontSize:12 }}>
            {step===0 ? 'Cancel' : '← Back'}
          </button>
          {step < 2 ? (
            <button onClick={() => canNext() && setStep(s=>s+1)}
              className="btn-base"
              style={{ background: canNext()?'#f5f5f5':'#161616', color:canNext()?'#080808':'#333',
                padding:'9px 24px', borderRadius:100, fontSize:12, border:'none' }}>
              Continue →
            </button>
          ) : (
            <button onClick={handlePost}
              className="btn-base"
              style={{ background:'#3ddc84', color:'#080808', padding:'9px 24px', borderRadius:100, fontSize:12, border:'none' }}>
              🚀 Post Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default PostProjectModal