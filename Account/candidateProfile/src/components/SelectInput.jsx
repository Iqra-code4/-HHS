import React from 'react'

function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{
        background:'#171717', border:'1px solid #252525', borderRadius:10,
        padding:'10px 14px', color: value ? '#f5f5f5' : '#444', fontSize:13,
        width:'100%', cursor:'pointer', transition:'border-color .2s',
      }}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default SelectInput