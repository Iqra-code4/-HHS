import React from 'react'
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { CATEGORIES, DIFFICULTIES, SORT_OPTIONS } from '../App';
import ProjectCard from './ProjectCard';


function BoardView({ projects, onViewProject }) {
  const [search,     setSearch]     = useState('');
  const [category,   setCategory]   = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [sort,       setSort]       = useState('Newest');
  const [statusFilt, setStatus]     = useState('All');

  const filtered = useMemo(() => {
    let arr = [...projects];
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (category !== 'All')   arr = arr.filter(p => p.category === category);
    if (difficulty !== 'All') arr = arr.filter(p => p.difficulty === difficulty);
    if (statusFilt !== 'All') arr = arr.filter(p => p.status === statusFilt.toLowerCase());

    switch (sort) {
      case 'Prize: High to Low':   arr.sort((a,b) => b.prize - a.prize); break;
      case 'Prize: Low to High':   arr.sort((a,b) => a.prize - b.prize); break;
      case 'Deadline: Soonest':    arr.sort((a,b) => new Date(a.deadline)-new Date(b.deadline)); break;
      case 'Most Applicants':      arr.sort((a,b) => b.applicants - a.applicants); break;
      default:                     arr.sort((a,b) => new Date(b.postedDate)-new Date(a.postedDate));
    }
    // Featured first
    arr.sort((a,b) => (b.featured?1:0)-(a.featured?1:0));
    return arr;
  }, [projects, search, category, difficulty, sort, statusFilt]);

  return (
    <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 28px 60px', position:'relative', zIndex:1 }}>
      {/* Filter bar */}
      <div style={{
        background:'#0a0a0a', border:'1px solid #161616', borderRadius:14,
        padding:'16px 20px', marginBottom:24, marginTop:24,
        display:'flex', flexWrap:'wrap', gap:10, alignItems:'center',
        position:'sticky', top:72, zIndex:50,
      }}>
        {/* Search */}
        <div style={{ position:'relative', flex:1, minWidth:200 }}>
          <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#444', fontSize:13 }}>🔍</span>
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search projects, companies, tech..."
            style={{ background:'#141414', border:'1px solid #1e1e1e', borderRadius:10,
              padding:'9px 12px 9px 34px', color:'#f5f5f5', fontSize:13, width:'100%', transition:'border-color .2s' }}
            onFocus={e=>e.target.style.borderColor='#3ddc84'}
            onBlur={e=>e.target.style.borderColor='#1e1e1e'}
          />
        </div>

        {/* Category pills */}
        <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
          {CATEGORIES.slice(0,5).map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className="btn-base"
              style={{
                padding:'6px 12px', borderRadius:100, fontSize:11, fontWeight:600,
                background: category===c ? '#f5f5f5' : '#141414',
                color: category===c ? '#080808' : '#555',
                border:`1px solid ${category===c?'#f5f5f5':'#1e1e1e'}`,
              }}>{c}</button>
          ))}
        </div>

        {/* Selects */}
        <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}
          style={{ background:'#141414', border:'1px solid #1e1e1e', borderRadius:10, padding:'8px 12px', color:'#888', fontSize:12, cursor:'pointer' }}>
          {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={statusFilt} onChange={e=>setStatus(e.target.value)}
          style={{ background:'#141414', border:'1px solid #1e1e1e', borderRadius:10, padding:'8px 12px', color:'#888', fontSize:12, cursor:'pointer' }}>
          <option>All</option><option>Open</option><option>Closed</option>
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)}
          style={{ background:'#141414', border:'1px solid #1e1e1e', borderRadius:10, padding:'8px 12px', color:'#888', fontSize:12, cursor:'pointer' }}>
          {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>

        <span style={{ fontSize:12, color:'#444', whiteSpace:'nowrap' }}>
          {filtered.length} project{filtered.length!==1?'s':''}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px 0', color:'#333' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
          <div style={{ fontFamily:'Bebas Neue', fontSize:20, letterSpacing:3 }}>NO PROJECTS FOUND</div>
          <div style={{ fontSize:13, marginTop:6 }}>Try adjusting your filters</div>
        </div>
      ) : (
        <div className="three-col" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} idx={i} onClick={onViewProject}/>
          ))}
        </div>
      )}
    </div>
  );
}


export default BoardView;