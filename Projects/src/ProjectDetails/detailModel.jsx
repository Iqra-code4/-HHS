import React from 'react'
import { useState, useRef, useEffect, useCallback } from "react";
import SubmitForm from '../Form/SubmitForm';
import { CATEGORIES, DIFFICULTIES, SORT_OPTIONS, daysLeft, catColor, diffColor, formatPrize, relativeDate } from '../App';

/* ════════════════════════════════════════
   PROJECT DETAIL MODAL
════════════════════════════════════════ */
function detailModel({ project, onClose, onSubmit, submissions }) {
  const [tab, setTab] = useState('overview');
  const overlayRef = useRef();
  const submitted = submissions.some(s => s.projectId === project.id);
  const dl = daysLeft(project.deadline);
  const catC = catColor[project.category] || '#888';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = e => { if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow=''; window.removeEventListener('keydown', esc); };
  }, []);

  return (
    <div className="modal-overlay" ref={overlayRef}
      onClick={e => e.target===overlayRef.current && onClose()}>
      <div className="modal-box">
        {/* Modal Header */}
        <div style={{ padding:'28px 32px 0' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:20 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, flexWrap:'wrap' }}>
                <span className="tag" style={{ background:`${catC}15`, color:catC, border:`1px solid ${catC}30` }}>
                  {project.category}
                </span>
                <span className="tag" style={{ background:`${diffColor[project.difficulty]}12`, color:diffColor[project.difficulty], border:`1px solid ${diffColor[project.difficulty]}25` }}>
                  {project.difficulty}
                </span>
                {project.featured && (
                  <span className="tag" style={{ background:'rgba(61,220,132,.1)', color:'#3ddc84', border:'1px solid rgba(61,220,132,.3)' }}>
                    ⭐ Featured
                  </span>
                )}
                <div style={{
                  padding:'3px 10px', borderRadius:100, fontSize:10, fontWeight:700,
                  background: project.status==='open'?'rgba(61,220,132,.1)':'rgba(255,69,69,.1)',
                  color: project.status==='open'?'#3ddc84':'#ff4545',
                  border:`1px solid ${project.status==='open'?'rgba(61,220,132,.25)':'rgba(255,69,69,.25)'}`,
                }}>
                  {project.status==='open'?'● Open':'✕ Closed'}
                </div>
              </div>
              <h2 style={{ fontFamily:'Bebas Neue', fontSize:28, letterSpacing:2, lineHeight:1.1, marginBottom:6 }}>
                {project.title}
              </h2>
              <div style={{ fontSize:12, color:'#555' }}>{project.company} · Posted {relativeDate(project.postedDate)}</div>
            </div>
            <button onClick={onClose}
              style={{ background:'#1a1a1a', border:'1px solid #252525', borderRadius:8,
                width:32, height:32, cursor:'pointer', color:'#666', fontSize:16, flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          </div>

          {/* Prize banner */}
          <div style={{
            background:'#111', border:'1px solid #1c1c1c', borderRadius:12,
            padding:'14px 18px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12,
            marginBottom:20,
          }}>
            {[
              { label:'Top Prize',   val:formatPrize(project.prize), color:'#f5c542', icon:'🏆' },
              { label:'Deadline',    val:dl,                          color: dl==="Closed"?'#ff4545':dl==="Last day!"?'#f5c542':'#ccc', icon:'⏰' },
              { label:'Open Slots',  val:`${project.slots} slots`,    color:'#aaa', icon:'🎯' },
              { label:'Applicants',  val:project.applicants,          color:'#aaa', icon:'👥' },
            ].map(m => (
              <div key={m.label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:12, marginBottom:3 }}>{m.icon}</div>
                <div style={{ fontFamily:'Bebas Neue', fontSize:20, color:m.color, lineHeight:1, letterSpacing:1 }}>{m.val}</div>
                <div style={{ fontSize:10, color:'#444', textTransform:'uppercase', letterSpacing:.5 }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', gap:2, borderBottom:'1px solid #1a1a1a', marginBottom:0 }}>
            {['overview','requirements','prizes','submit'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="btn-base"
                style={{
                  padding:'8px 16px', borderRadius:'8px 8px 0 0', fontSize:12,
                  fontWeight:600, textTransform:'capitalize',
                  background: tab===t ? '#161616' : 'transparent',
                  color: tab===t ? '#f5f5f5' : '#444',
                  borderBottom: tab===t ? '2px solid #3ddc84' : '2px solid transparent',
                }}>
                {t === 'submit' ? (submitted ? '✓ Submitted' : 'Submit') : t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ padding:'24px 32px 32px', maxHeight:'55vh', overflowY:'auto' }}>
          {tab === 'overview' && (
            <div style={{ animation:'fadeIn .3s ease' }}>
              <h4 style={{ fontSize:11, fontWeight:700, color:'#444', letterSpacing:3, textTransform:'uppercase', marginBottom:12 }}>About This Project</h4>
              <p style={{ fontSize:13, color:'#888', lineHeight:1.8, marginBottom:20, whiteSpace:'pre-line' }}>{project.longDescription}</p>

              <h4 style={{ fontSize:11, fontWeight:700, color:'#444', letterSpacing:3, textTransform:'uppercase', marginBottom:12 }}>Deliverables</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
                {project.deliverables.map((d,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                    <div style={{ width:20, height:20, borderRadius:5, background:'rgba(61,220,132,.1)', border:'1px solid rgba(61,220,132,.2)',
                      display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                      <span style={{ fontSize:9, color:'#3ddc84', fontWeight:900 }}>{i+1}</span>
                    </div>
                    <span style={{ fontSize:13, color:'#888', lineHeight:1.5 }}>{d}</span>
                  </div>
                ))}
              </div>

              <h4 style={{ fontSize:11, fontWeight:700, color:'#444', letterSpacing:3, textTransform:'uppercase', marginBottom:12 }}>Tech Tags</h4>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {project.tags.map(t => (
                  <span key={t} className="tag" style={{ background:'#161616', color:'#666', border:'1px solid #222', fontSize:12, padding:'4px 12px' }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {tab === 'requirements' && (
            <div style={{ animation:'fadeIn .3s ease' }}>
              <h4 style={{ fontSize:11, fontWeight:700, color:'#444', letterSpacing:3, textTransform:'uppercase', marginBottom:16 }}>Technical Requirements</h4>
              {project.requirements.map((r,i) => (
                <div key={i} style={{
                  background:'#111', border:'1px solid #1a1a1a', borderRadius:10,
                  padding:'12px 16px', marginBottom:8,
                  display:'flex', alignItems:'flex-start', gap:12,
                }}>
                  <div style={{ fontFamily:'Bebas Neue', fontSize:16, color:'#333', lineHeight:1, flexShrink:0, paddingTop:2 }}>
                    {String(i+1).padStart(2,'0')}
                  </div>
                  <span style={{ fontSize:13, color:'#999', lineHeight:1.6 }}>{r}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'prizes' && (
            <div style={{ animation:'fadeIn .3s ease' }}>
              <h4 style={{ fontSize:11, fontWeight:700, color:'#444', letterSpacing:3, textTransform:'uppercase', marginBottom:16 }}>Prize Structure</h4>
              {project.prizes.map((p, i) => {
                const medals = ['🥇','🥈','🥉'];
                const colors = ['#f5c542','#c0c0c0','#cd7f32'];
                return (
                  <div key={i} style={{
                    background: i===0?'rgba(245,197,66,.05)':'#111',
                    border:`1px solid ${i===0?'rgba(245,197,66,.15)':'#1a1a1a'}`,
                    borderRadius:12, padding:'18px 22px', marginBottom:10,
                    display:'flex', alignItems:'center', gap:16,
                    animation:`glowPulse ${i===0?'3s':'none'} ease-in-out infinite`,
                  }}>
                    <div style={{ fontSize:32 }}>{medals[i]||'🎖'}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:colors[i]||'#888' }}>{p.rank}</div>
                      <div style={{ fontSize:11, color:'#444', marginTop:2 }}>{p.label} Award</div>
                    </div>
                    <div style={{ fontFamily:'Bebas Neue', fontSize:36, color:colors[i]||'#555', letterSpacing:1, lineHeight:1 }}>
                      ${p.amount.toLocaleString()}
                    </div>
                  </div>
                );
              })}
              <div style={{ background:'#111', border:'1px solid #1a1a1a', borderRadius:10, padding:14, marginTop:16 }}>
                <div style={{ fontSize:11, color:'#3ddc84', fontWeight:700, marginBottom:6 }}>💡 Judging Criteria</div>
                <p style={{ fontSize:12, color:'#444', lineHeight:1.65 }}>
                  Projects are evaluated on code quality (30%), functionality (40%), documentation (15%), and creativity (15%). All submissions are reviewed within 7 days of the deadline.
                </p>
              </div>
            </div>
          )}

          {tab === 'submit' && (
            <SubmitForm project={project} onSubmit={onSubmit} submitted={submitted}/>
          )}
        </div>
      </div>
    </div>
  );
}


export default detailModel