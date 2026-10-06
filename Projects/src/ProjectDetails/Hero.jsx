import React from 'react'
import { useState, useRef, useEffect, useCallback } from "react";

function Hero({ projects }) {
  const open    = projects.filter(p => p.status==='open').length;
  const total$  = projects.reduce((s,p) => s + p.prize, 0);
  const totalA  = projects.reduce((s,p) => s + p.applicants, 0);

  const stats = [
    { label:'Open Projects',   value:open,                           suffix:'',  color:'#f5f5f5' },
    { label:'Total Prize Pool', value:`$${(total$/1000).toFixed(0)}k`, suffix:'',  color:'#3ddc84' },
    { label:'Candidates',      value:`${totalA}+`,                   suffix:'',  color:'#f5c542' },
    { label:'Companies',       value:'12+',                          suffix:'',  color:'#aaa'    },
  ];

  const MARQUEE_ITEMS = ["AI Resume Screener","$2,500 Prize","Full-Stack Dashboard","Design System","Salary Prediction","Video Analyzer","Network Graph","Real-Time Matching","Open Now","Apply Today"];

  return (
    <>
      {/* Hero */}
      <div style={{ padding:'56px 28px 40px', maxWidth:1240, margin:'0 auto', position:'relative', zIndex:1 }}>
        {/* Glow */}
        <div style={{ position:'absolute', top:-100, left:'50%', transform:'translateX(-50%)',
          width:600, height:400, borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(61,220,132,.04) 0%,transparent 70%)',
          pointerEvents:'none' }}/>

        <div style={{ animation:'fadeUp .5s ease' }}>
          <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:10 }}>
            TALENTBRIDGE · PROJECT BOARD
          </div>
          <h1 className="hero-title" style={{
            fontFamily:'Bebas Neue', fontSize:60, letterSpacing:3, lineHeight:.95,
            marginBottom:16, color:'#f5f5f5',
          }}>
            BUILD REAL PROJECTS.<br/>
            <span style={{ color:'#2a2a2a', WebkitTextStroke:'1px #3a3a3a' }}>WIN REAL PRIZES.</span>
          </h1>
          <p style={{ fontSize:14, color:'#555', maxWidth:520, lineHeight:1.7 }}>
            Top companies post bounties. You build solutions. Get hired, earn prizes, and build a portfolio that stands out.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-row" style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12,
          marginTop:32, animation:'fadeUp .5s ease .1s both',
        }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background:'#0d0d0d', border:'1px solid #1c1c1c', borderRadius:12, padding:'16px 18px',
              transition:'border-color .2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='#252525'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='#1c1c1c'}>
              <div style={{ fontFamily:'Bebas Neue', fontSize:32, color:s.color, lineHeight:1, marginBottom:4 }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#444', textTransform:'uppercase', letterSpacing:1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrap" style={{ marginBottom:0 }}>
        <div className="marquee-inner">
          {[...MARQUEE_ITEMS,...MARQUEE_ITEMS,...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i) => (
            <span key={i} style={{ padding:'0 20px', fontSize:11, fontWeight:700, letterSpacing:2,
              color: i%3===0?'#3ddc84':i%3===1?'#f5c542':'#333',
              textTransform:'uppercase', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:20 }}>
              {item} <span style={{ color:'#222' }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}


export default Hero