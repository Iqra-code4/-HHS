import React from 'react'
import { useState } from "react";

function TextareaInput({ value, onChange, placeholder, rows=4 }) {
  const [focus, setFocus] = useState(false);
  return (
    <textarea
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        background:'#171717', border:`1px solid ${focus ? '#3ddc84' : '#252525'}`,
        borderRadius:10, padding:'10px 14px', color:'#f5f5f5', fontSize:13, width:'100%',
        resize:'vertical', lineHeight:1.7, transition:'border-color .2s',
      }}
    />
  );
}

export default TextareaInput