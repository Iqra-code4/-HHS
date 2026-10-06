import React from 'react'
import { useState } from "react";

function TextInput({ value, onChange, placeholder, type='text', disabled=false }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} disabled={disabled}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        background:'#171717', border:`1px solid ${focus ? '#3ddc84' : '#252525'}`,
        borderRadius:10, padding:'10px 14px', color:'#f5f5f5', fontSize:13, width:'100%',
        transition:'border-color .2s', opacity: disabled ? .4 : 1,
      }}
    />
  );
}

export default TextInput