import React from 'react'
import SubmitForm from './SubmitForm';
import { useState, useRef, useEffect, useCallback } from "react";

function MySubmissions({ submissions, projects, onViewProject }) {
  if (submissions.length === 0) return (
    <div style={{ maxWidth:1240, margin:'0 auto', padding:'80px 28px', textAlign:'center', zIndex:1, position:'relative' }}>
      <div style={{ fontSize:52, marginBottom:16 }}>📭</div>
      <h3 style={{ fontFamily:'Bebas Neue', fontSize:28, letterSpacing:3, color:'#333', marginBottom:8 }}>NO SUBMISSIONS YET</h3>
      <p style={{ fontSize:13, color:'#444' }}>Browse open projects and submit your first solution.</p>
    </div>
  );

  return (
    <div style={{ maxWidth:1240, margin:'0 auto', padding:'36px 28px', zIndex:1, position:'relative' }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:6 }}>MY WORK</div>
        <h2 style={{ fontFamily:'Bebas Neue', fontSize:32, letterSpacing:3 }}>MY SUBMISSIONS</h2>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {submissions.map((s, i) => {
          const proj = projects.find(p => p.id===s.projectId);
          const statuses = ['Under Review','Shortlisted','Needs Revision'];
          const status = statuses[i % statuses.length];
          const statusColor = status==='Shortlisted'?'#3ddc84':status==='Needs Revision'?'#f5c542':'#888';
          return (
            <div key={i}
              className="card-hover"
              style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:14, padding:'20px 24px',
                display:'flex', alignItems:'center', gap:20, cursor:'pointer', animation:`fadeUp .4s ease ${i*0.08}s both` }}
              onClick={() => proj && onViewProject(proj)}>
              <div style={{ width:48, height:48, borderRadius:10, background:'#1a1a1a', border:'1px solid #222',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'Bebas Neue', fontSize:16, color:'#555', flexShrink:0, letterSpacing:1 }}>
                {proj?.companyInitials||'??'}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'#e8e8e8', marginBottom:3 }}>{s.projectTitle}</div>
                <div style={{ fontSize:12, color:'#444' }}>
                  Submitted {new Date(s.submittedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                  {s.github && <span style={{ color:'#3ddc84', marginLeft:10 }}>→ {s.github}</span>}
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
                <span style={{
                  background:`${statusColor}14`, border:`1px solid ${statusColor}30`,
                  color:statusColor, padding:'4px 12px', borderRadius:100, fontSize:11, fontWeight:700,
                }}>{status}</span>
                <span style={{ fontSize:12, color:'#444' }}>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MySubmissions