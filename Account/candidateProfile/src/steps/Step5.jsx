import React from 'react'
import { useState, useEffect, useRef } from "react";
import {ROLES, STEPS, TIPS, POPULAR_SKILLS, ALL_SKILLS, LANGUAGES_LIST, PROFICIENCY, CITIES, COUNTRIES, CHECKLIST} from "../constants";
import TextInput from "../components/TextInput";
import PrimaryBtn from "../components/PrimaryBtn";
import Divider from "../components/Divider";
import  TextareaInput from "../components/TextareaInput";
import Field from "../components/Field";
import SelectInput from "../components/SelectInput";

function Step5({ data, onPublish, published }) {
  if (published) return (
    <div style={{ animation:'scaleIn .5s ease', textAlign:'center', padding:'48px 0' }}>
      <div style={{ fontSize:60, marginBottom:16 }}>🎉</div>
      <h2 style={{ fontFamily:'Bebas Neue', fontSize:44, letterSpacing:5, color:'#3ddc84', marginBottom:8 }}>PROFILE LIVE!</h2>
      <p style={{ fontSize:14, color:'#555', marginBottom:36, maxWidth:380, margin:'0 auto 36px', lineHeight:1.7 }}>
        Your HHS profile is now visible to thousands of recruiters. Here's what to do next.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, maxWidth:520, margin:'0 auto' }}>
        {[
          { icon:'🔍', label:'Browse Jobs',    sub:'Find matching roles now' },
          { icon:'📬', label:'Set Alerts',     sub:'Get notified instantly' },
          { icon:'🤝', label:'Connect',        sub:'Build your network' },
        ].map(a => (
          <div key={a.label}
            style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:12, padding:20, cursor:'pointer', transition:'all .2s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#3ddc84';e.currentTarget.style.background='rgba(61,220,132,.05)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#1e1e1e';e.currentTarget.style.background='#111'}}>
            <div style={{ fontSize:26, marginBottom:8 }}>{a.icon}</div>
            <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5', marginBottom:3 }}>{a.label}</div>
            <div style={{ fontSize:11, color:'#444' }}>{a.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const name   = [data.firstName, data.lastName].filter(Boolean).join(' ') || 'Your Name';
  const inits  = [data.firstName?.[0], data.lastName?.[0]].filter(Boolean).join('').toUpperCase() || '?';
  const skills = data.skills || [];
  const exps   = data.experience || [];
  const edus   = data.education  || [];
  const langs  = data.languages  || [];

  return (
    <div style={{ animation:'fadeUp .4s ease both' }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:8 }}>STEP 5 OF 5</div>
        <h2 style={{ fontFamily:'Bebas Neue', fontSize:32, letterSpacing:3, lineHeight:1, marginBottom:6 }}>PREVIEW & PUBLISH</h2>
        <p style={{ fontSize:13, color:'#555' }}>This is exactly how recruiters will see your profile.</p>
      </div>

      {/* Profile card */}
      <div style={{ background:'#0d0d0d', border:'1px solid #1e1e1e', borderRadius:18, overflow:'hidden', marginBottom:28, position:'relative' }}>
        {/* BG watermark */}
        <div style={{
          position:'absolute', bottom:-20, right:-10, pointerEvents:'none', userSelect:'none',
          fontFamily:'Bebas Neue', fontSize:110, color:'rgba(255,255,255,.02)', letterSpacing:4, lineHeight:1,
        }}>HHS</div>

        {/* Hero band */}
        <div style={{ background:'#111', borderBottom:'1px solid #1e1e1e', padding:'30px 32px 24px' }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:20, flexWrap:'wrap' }}>
            {/* Avatar */}
            <div style={{
              width:82, height:82, borderRadius:'50%', background:'#1e1e1e',
              border:'2px solid #2a2a2a', flexShrink:0, overflow:'hidden',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              {data.photo
                ? <img src={data.photo} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                : <span style={{ fontFamily:'Bebas Neue', fontSize:30, color:'#444' }}>{inits}</span>
              }
            </div>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, flexWrap:'wrap', marginBottom:8 }}>
                <div>
                  <h3 style={{ fontFamily:'Bebas Neue', fontSize:28, letterSpacing:2, lineHeight:1, marginBottom:4 }}>{name}</h3>
                  <div style={{ fontSize:13, color:'#3ddc84', fontWeight:700 }}>{data.headline || data.roleName || 'Professional'}</div>
                </div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {data.resumeUploaded && <span style={{ background:'rgba(61,220,132,.1)', border:'1px solid rgba(61,220,132,.3)', color:'#3ddc84', padding:'4px 10px', borderRadius:100, fontSize:11, fontWeight:700 }}>📄 Resume Ready</span>}
                  {data.roleId && <span style={{ background:'#1a1a1a', border:'1px solid #252525', color:'#888', padding:'4px 10px', borderRadius:100, fontSize:11 }}>{data.roleName}</span>}
                </div>
              </div>
              <div style={{ fontSize:12, color:'#555', marginBottom: data.bio?10:0 }}>
                {[data.city, data.country].filter(Boolean).join(', ')}
                {data.workPref && <span> · {data.workPref}</span>}
                {data.yearsExp && <span> · {data.yearsExp}</span>}
                {data.availability && <span> · Available {data.availability}</span>}
              </div>
              {data.bio && <p style={{ fontSize:12, color:'#666', lineHeight:1.7, maxWidth:540 }}>{data.bio}</p>}
            </div>
          </div>
        </div>

        <div style={{ padding:'24px 32px', display:'flex', flexDirection:'column', gap:22 }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>Skills</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {skills.map(s => (
                  <span key={s} style={{ background:'#1a1a1a', border:'1px solid #252525', borderRadius:100, padding:'4px 12px', fontSize:12, color:'#bbb', fontWeight:500 }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {exps.length > 0 && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, textTransform:'uppercase', marginBottom:12 }}>Experience</div>
              {exps.map((e, i) => (
                <div key={e.id} style={{ display:'flex', gap:16, marginBottom: i<exps.length-1?14:0, paddingBottom: i<exps.length-1?14:0, borderBottom: i<exps.length-1?'1px solid #1a1a1a':undefined }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#3ddc84', flexShrink:0, marginTop:5 }}/>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5' }}>{e.title}</div>
                    <div style={{ fontSize:12, color:'#3ddc84', marginTop:1 }}>{e.company}</div>
                    <div style={{ fontSize:11, color:'#444', marginTop:1 }}>{e.from} – {e.current?'Present':e.to}</div>
                    {e.desc && <div style={{ fontSize:12, color:'#555', marginTop:5, lineHeight:1.6 }}>{e.desc}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {edus.length > 0 && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, textTransform:'uppercase', marginBottom:12 }}>Education</div>
              {edus.map(e => (
                <div key={e.id} style={{ marginBottom:8 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5' }}>{e.degree}</div>
                  <div style={{ fontSize:11, color:'#666', marginTop:2 }}>{e.institution} · {e.from}–{e.to}</div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {langs.length > 0 && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>Languages</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {langs.map(l => {
                  const c={Native:'#3ddc84',Fluent:'#f5c542',Advanced:'#aaa',Conversational:'#666',Basic:'#444'}[l.level]||'#444';
                  return (
                    <div key={l.id} style={{ background:'#1a1a1a', border:'1px solid #252525', borderRadius:8, padding:'6px 12px', display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:12, fontWeight:600, color:'#ccc' }}>{l.lang}</span>
                      <span style={{ fontSize:10, color:c }}>{l.level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact */}
          {(data.email||data.phone||data.linkedin||data.portfolio) && (
            <div style={{ borderTop:'1px solid #1a1a1a', paddingTop:16, display:'flex', flexWrap:'wrap', gap:14 }}>
              {data.email    && <span style={{ fontSize:12, color:'#555' }}>✉ {data.email}</span>}
              {data.phone    && <span style={{ fontSize:12, color:'#555' }}>📱 {data.phone}</span>}
              {data.linkedin && <span style={{ fontSize:12, color:'#3ddc84' }}>in {data.linkedin}</span>}
              {data.portfolio && <span style={{ fontSize:12, color:'#aaa' }}>🔗 {data.portfolio}</span>}
              {data.salaryMin && <span style={{ fontSize:12, color:'#f5c542' }}>💰 {data.salaryMin} – {data.salaryMax}</span>}
            </div>
          )}
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'center' }}>
        <PrimaryBtn variant="green" onClick={onPublish}>
          🚀 Publish Profile to HHS
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default Step5