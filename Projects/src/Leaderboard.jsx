import React from 'react'

function Leaderboard({ projects }) {
  const LEADERS = [
    { rank:1, name:'Zara Ahmed',     role:'AI / ML',      score:2840, subs:6, wins:2, avatar:'ZA' },
    { rank:2, name:'Daniel Park',    role:'Full-Stack',   score:2210, subs:8, wins:1, avatar:'DP' },
    { rank:3, name:'Sofia Reyes',    role:'UI / UX',      score:1980, subs:5, wins:1, avatar:'SR' },
    { rank:4, name:'Liam Chen',      role:'Data Science', score:1640, subs:7, wins:0, avatar:'LC' },
    { rank:5, name:'Aisha Malik',    role:'Full-Stack',   score:1420, subs:4, wins:0, avatar:'AM' },
    { rank:6, name:'Ethan Brooks',   role:'AI / ML',      score:1180, subs:3, wins:0, avatar:'EB' },
    { rank:7, name:'Priya Singh',    role:'DevOps',       score:960,  subs:5, wins:0, avatar:'PS' },
    { rank:8, name:'Omar Hassan',    role:'Mobile',       score:820,  subs:2, wins:0, avatar:'OH' },
  ];

  const medal = ['🥇','🥈','🥉'];

  return (
    <div style={{ maxWidth:1240, margin:'0 auto', padding:'36px 28px', zIndex:1, position:'relative' }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:6 }}>HALL OF FAME</div>
        <h2 style={{ fontFamily:'Bebas Neue', fontSize:32, letterSpacing:3 }}>LEADERBOARD</h2>
      </div>

      {/* Top 3 podium */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:24 }}>
        {LEADERS.slice(0,3).map((l,i) => (
          <div key={l.rank} style={{
            background: i===0?'rgba(245,197,66,.05)':'#0d0d0d',
            border:`1px solid ${i===0?'rgba(245,197,66,.2)':i===1?'rgba(192,192,192,.1)':'rgba(205,127,50,.1)'}`,
            borderRadius:14, padding:'24px 20px', textAlign:'center',
            animation:`fadeUp .45s ease ${i*0.08}s both`,
            order: i===0 ? 0 : i===1 ? -1 : 1,
          }}>
            <div style={{ fontSize:28, marginBottom:8 }}>{medal[i]}</div>
            <div style={{
              width:52, height:52, borderRadius:'50%', background:'#1a1a1a',
              border:'2px solid #252525', margin:'0 auto 10px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'Bebas Neue', fontSize:18, color:'#555', letterSpacing:1,
            }}>{l.avatar}</div>
            <div style={{ fontSize:14, fontWeight:700, color:'#e8e8e8', marginBottom:2 }}>{l.name}</div>
            <div style={{ fontSize:11, color:'#555', marginBottom:10 }}>{l.role}</div>
            <div style={{ fontFamily:'Bebas Neue', fontSize:28, color: i===0?'#f5c542':i===1?'#c0c0c0':'#cd7f32', letterSpacing:1 }}>
              {l.score.toLocaleString()}
            </div>
            <div style={{ fontSize:10, color:'#333', textTransform:'uppercase', letterSpacing:1 }}>Points</div>
          </div>
        ))}
      </div>

      {/* Rest of board */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {LEADERS.slice(3).map((l,i) => (
          <div key={l.rank} style={{
            background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:12,
            padding:'14px 20px', display:'flex', alignItems:'center', gap:16,
            animation:`fadeUp .4s ease ${(i+3)*0.07}s both`,
            transition:'border-color .2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.borderColor='#252525'}
          onMouseLeave={e=>e.currentTarget.style.borderColor='#1a1a1a'}>
            <div style={{ fontFamily:'Bebas Neue', fontSize:20, color:'#333', minWidth:28, textAlign:'center' }}>{l.rank}</div>
            <div style={{ width:38, height:38, borderRadius:'50%', background:'#1a1a1a', border:'1px solid #222',
              display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bebas Neue', fontSize:13, color:'#444', flexShrink:0 }}>{l.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#ccc' }}>{l.name}</div>
              <div style={{ fontSize:11, color:'#444' }}>{l.role}</div>
            </div>
            <div style={{ display:'flex', gap:20, alignItems:'center' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#888' }}>{l.subs}</div>
                <div style={{ fontSize:9, color:'#333', textTransform:'uppercase', letterSpacing:.5 }}>Subs</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#3ddc84' }}>{l.wins}</div>
                <div style={{ fontSize:9, color:'#333', textTransform:'uppercase', letterSpacing:.5 }}>Wins</div>
              </div>
              <div style={{ fontFamily:'Bebas Neue', fontSize:20, color:'#555', letterSpacing:1, minWidth:60, textAlign:'right' }}>
                {l.score.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Leaderboard