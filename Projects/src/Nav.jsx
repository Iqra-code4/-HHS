import React from 'react'
import { useState, useRef, useEffect, useCallback } from "react";

function Nav({ view, setView, onPostProject }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{
      position:'sticky', top:0, zIndex:100,
      background: scrolled ? 'rgba(8,8,8,.97)' : 'rgba(8,8,8,.90)',
      backdropFilter:'blur(20px)',
      borderBottom:`1px solid ${scrolled?'#1c1c1c':'#141414'}`,
      height:58, display:'flex', alignItems:'center',
      padding:'0 28px', gap:0, transition:'all .3s',
    }}>
      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginRight:28 }}>
        <span style={{ fontFamily:'Bebas Neue', fontSize:18, letterSpacing:4, color:'#f5f5f5' }}>TALENTBRIDGE</span>
        <span style={{ width:3, height:3, borderRadius:'50%', background:'#333' }}/>
        <span style={{ fontFamily:'Bebas Neue', fontSize:12, letterSpacing:4, color:'#3a3a3a' }}>PROJECTS</span>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:2, flex:1 }}>
        {[['board','Board'],['my-submissions','My Submissions'],['leaderboard','Leaderboard']].map(([v,l]) => (
          <button key={v} onClick={() => setView(v)}
            className="btn-base"
            style={{
              padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:600,
              background: view===v ? '#161616' : 'transparent',
              color: view===v ? '#f5f5f5' : '#555',
              border:`1px solid ${view===v?'#252525':'transparent'}`,
            }}>{l}</button>
        ))}
      </div>

      {/* Right */}
      <div className="nav-right" style={{ display:'flex', alignItems:'center', gap:10 }}>
        <button onClick={onPostProject}
          className="btn-base"
          style={{ background:'#f5f5f5', color:'#080808', padding:'7px 16px', borderRadius:100, fontSize:12 }}>
          + Post Project
        </button>
        <div style={{ width:32, height:32, borderRadius:'50%', background:'#1e1e1e',
          border:'1px solid #2a2a2a', display:'flex', alignItems:'center',
          justifyContent:'center', cursor:'pointer', fontSize:14 }}>
          👤
        </div>
      </div>
    </nav>
  );
}


export default Nav