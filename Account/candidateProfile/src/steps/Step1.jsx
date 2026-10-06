import { useState, useCallback } from "react";
import { ROLES } from "../constants";
import TextInput from "../components/TextInput";
import PrimaryBtn from "../components/PrimaryBtn";
import Divider from "../components/Divider";
import Field from "../components/Field";
import SelectInput from "../components/SelectInput";
import TextareaInput from "../components/TextareaInput";


function Step1({ data, setData }) {
  const [custom, setCustom] = useState('');
  const set = useCallback((k,v) => setData(d => ({ ...d, [k]:v })), [setData]);

  return (
    <div style={{ animation:'fadeUp .4s ease both' }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:8 }}>STEP 1 OF 5</div>
        <h2 style={{ fontFamily:'Bebas Neue', fontSize:32, letterSpacing:3, lineHeight:1, marginBottom:6 }}>DEFINE YOUR ROLE</h2>
        <p style={{ fontSize:13, color:'#555' }}>Select the role that best represents your primary expertise.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:10, marginBottom:20 }}>
        {ROLES.map((r, i) => {
          const sel = data.roleId === r.id;
          return (
            <div key={r.id}
              onClick={() => { set('roleId', r.id); set('roleName', r.label); }}
              style={{
                background: sel ? 'rgba(61,220,132,.06)' : '#111',
                border: `1px solid ${sel ? '#3ddc84' : '#1e1e1e'}`,
                borderRadius:12, padding:'16px 14px', cursor:'pointer',
                transition:'all .2s cubic-bezier(.34,1.3,.64,1)',
                transform: sel ? 'scale(1.03)' : 'scale(1)',
                animation:`fadeUp .35s ease ${i*0.035}s both`,
              }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                <span style={{
                  fontFamily:'Bebas Neue', fontSize:22,
                  color: sel ? '#3ddc84' : '#333', lineHeight:1, letterSpacing:1,
                }}>{r.symbol}</span>
                {sel && (
                  <div style={{
                    width:17, height:17, borderRadius:'50%', background:'#3ddc84',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    animation:'checkPop .3s ease',
                  }}>
                    <span style={{ fontSize:9, color:'#080808', fontWeight:900 }}>✓</span>
                  </div>
                )}
              </div>
              <div style={{ fontSize:13, fontWeight:700, color: sel ? '#f5f5f5' : '#999', marginBottom:8 }}>{r.label}</div>
              <div style={{ display:'flex', gap:3, flexWrap:'wrap' }}>
                {r.tags.map(t => (
                  <span key={t} style={{
                    fontSize:9, background: sel ? 'rgba(61,220,132,.1)' : '#1a1a1a',
                    color: sel ? '#3ddc84' : '#444', padding:'2px 7px', borderRadius:100,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Divider label="Or type a custom role"/>

      <div style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:12, padding:18, marginTop:16 }}>
        <div style={{ fontSize:12, color:'#555', marginBottom:10 }}>Don't see your role? Describe it below.</div>
        <div style={{ display:'flex', gap:10 }}>
          <TextInput value={custom} onChange={setCustom} placeholder="e.g. Blockchain Developer, QA Engineer, Scrum Master..."/>
          <PrimaryBtn size="sm" onClick={() => {
            if (custom.trim()) { set('roleId', 'custom'); set('roleName', custom.trim()); }
          }}>Set Role</PrimaryBtn>
        </div>
      </div>

      {data.roleId && (
        <div style={{
          marginTop:16, background:'rgba(61,220,132,.07)', border:'1px solid rgba(61,220,132,.25)',
          borderRadius:10, padding:'13px 18px', display:'flex', alignItems:'center', gap:10,
          animation:'scaleIn .3s ease',
        }}>
          <span style={{ color:'#3ddc84', fontSize:16 }}>✓</span>
          <span style={{ fontSize:13, color:'#3ddc84', fontWeight:600 }}>
            Role set: <strong>{data.roleName}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
export default Step1;