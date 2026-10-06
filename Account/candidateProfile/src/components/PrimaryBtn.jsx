import React from 'react'
import { useState } from "react";

function PrimaryBtn({ children, onClick, variant='white', size='md' }) {
  const [hov, setHov] = useState(false);
  const px = size === 'sm' ? '14px 20px' : '12px 30px';
  const fs = size === 'sm' ? 12 : 13;
  const variants = {
    white:  { bg: hov ? '#e8e8e8' : '#f5f5f5', color:'#080808', border:'none' },
    ghost:  { bg: hov ? '#1c1c1c' : 'transparent', color: hov?'#ccc':'#666', border:'1px solid #252525' },
    green:  { bg: hov ? '#2ec870' : '#3ddc84', color:'#080808', border:'none' },
    outline:{ bg:'transparent', color:'#555', border:'1px solid #252525' },
  };
  const s = variants[variant] || variants.white;
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background:s.bg, color:s.color, border:s.border,
        padding:px, borderRadius:100, fontFamily:'Outfit,sans-serif',
        fontWeight:700, fontSize:fs, letterSpacing:.4, cursor:'pointer',
        transition:'all .18s', display:'inline-flex', alignItems:'center', gap:6,
      }}>
      {children}
    </button>
  );
}

export default PrimaryBtn