import React from 'react'
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { CATEGORIES, DIFFICULTIES, SORT_OPTIONS, daysLeft, catColor, diffColor, formatPrize } from '../App';
import LeaderBoard from '../Leaderboard';

function ProjectCard({ project, idx, onClick }) {
  const dl     = daysLeft(project.deadline);
  const dlColor = dl === "Closed" ? '#ff4545' : dl === "Last day!" ? '#f5c542' : '#555';
  const catC   = catColor[project.category] || '#888';
  const diffC  = diffColor[project.difficulty] || '#888';

  return (
    <div
      className="card-hover"
      onClick={() => onClick(project)}
      style={{
        background:'#0d0d0d', border:'1px solid #1a1a1a',
        borderRadius:14, overflow:'hidden', cursor:'pointer',
        animation:`fadeUp .45s ease ${idx*0.06}s both`,
        position:'relative',
      }}>

      {/* Featured ribbon */}
      {project.featured && (
        <div style={{
          position:'absolute', top:14, right:14,
          background:'rgba(61,220,132,.1)', border:'1px solid rgba(61,220,132,.3)',
          color:'#3ddc84', fontSize:9, fontWeight:800, letterSpacing:1.5,
          padding:'3px 8px', borderRadius:100, textTransform:'uppercase',
        }}>Featured</div>
      )}

      {/* Card header */}
      <div style={{ padding:'22px 22px 16px' }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:14 }}>
          {/* Company avatar */}
          <div style={{
            width:44, height:44, borderRadius:10, background:'#1a1a1a',
            border:'1px solid #222', display:'flex', alignItems:'center',
            justifyContent:'center', fontFamily:'Bebas Neue', fontSize:16,
            color:'#555', flexShrink:0, letterSpacing:1,
          }}>{project.companyInitials}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:11, color:'#444', marginBottom:3 }}>{project.company}</div>
            <h3 style={{ fontSize:14, fontWeight:700, color:'#e8e8e8', lineHeight:1.3,
              overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
          <span className="tag" style={{ background:`${catC}15`, color:catC, border:`1px solid ${catC}30` }}>
            {project.category}
          </span>
          <span className="tag" style={{ background:`${diffC}12`, color:diffC, border:`1px solid ${diffC}25` }}>
            {project.difficulty}
          </span>
          {project.tags.slice(0,3).map(t => (
            <span key={t} className="tag" style={{ background:'#161616', color:'#555', border:'1px solid #222' }}>{t}</span>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize:12, color:'#555', lineHeight:1.65,
          overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
          {project.description}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height:1, background:'#141414', margin:'0 22px' }}/>

      {/* Card footer */}
      <div style={{ padding:'14px 22px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          {/* Prize */}
          <div>
            <div style={{ fontFamily:'Bebas Neue', fontSize:22, color:'#f5c542', lineHeight:1, letterSpacing:1 }}>
              {formatPrize(project.prize)}
            </div>
            <div style={{ fontSize:10, color:'#333', textTransform:'uppercase', letterSpacing:1 }}>Top Prize</div>
          </div>
          {/* Deadline */}
          <div style={{ borderLeft:'1px solid #1e1e1e', paddingLeft:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:dlColor }}>{dl}</div>
            <div style={{ fontSize:10, color:'#333', textTransform:'uppercase', letterSpacing:1 }}>Deadline</div>
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {/* Applicants */}
          <div style={{ fontSize:11, color:'#444', display:'flex', alignItems:'center', gap:4 }}>
            <span>👥</span> {project.applicants}
          </div>
          {/* Status */}
          <div style={{
            padding:'4px 10px', borderRadius:100, fontSize:10, fontWeight:700, letterSpacing:.5,
            background: project.status==='open' ? 'rgba(61,220,132,.1)' : 'rgba(255,69,69,.1)',
            color: project.status==='open' ? '#3ddc84' : '#ff4545',
            border: `1px solid ${project.status==='open'?'rgba(61,220,132,.25)':'rgba(255,69,69,.25)'}`,
            textTransform:'uppercase',
          }}>
            {project.status==='open' ? '● Open' : '✕ Closed'}
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProjectCard