import React from 'react'

function Divider({ label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, margin:'4px 0' }}>
      <div style={{ flex:1, height:1, background:'#1a1a1a' }}/>
      {label && <span style={{ fontSize:10, color:'#333', fontWeight:700, letterSpacing:2, textTransform:'uppercase' }}>{label}</span>}
      <div style={{ flex:1, height:1, background:'#1a1a1a' }}/>
    </div>
  );
}

export default Divider