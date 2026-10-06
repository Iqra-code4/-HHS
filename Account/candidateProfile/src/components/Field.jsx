function Field({ label, hint, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
        <label style={{ fontSize:11, fontWeight:700, color:'#666', letterSpacing:1, textTransform:'uppercase' }}>{label}</label>
        {hint && <span style={{ fontSize:11, color:'#3a3a3a' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export default Field;