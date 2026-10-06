import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import PrimaryBtn from "./components/PrimaryBtn";
import {ROLES, STEPS, TIPS, POPULAR_SKILLS, ALL_SKILLS, LANGUAGES_LIST, PROFICIENCY, CITIES, COUNTRIES, CHECKLIST} from "./constants";

function Sidebar({ step, data }) {
  const checks = {
    role:    !!data.roleId,
    name:    !!(data.firstName && data.lastName),
    email:   !!data.email,
    headline:!!data.headline,
    bio:     (data.bio||'').trim().length > 20,
    skills:  (data.skills||[]).length >= 3,
    exp:     (data.experience||[]).length > 0,
    resume:  !!(data.resumeUploaded || data.rSummary),
    photo:   !!data.photo,
  };
  const done = Object.values(checks).filter(Boolean).length;
  const pct  = Math.round(done / CHECKLIST.length * 100);
  const barCol = pct >= 80 ? '#32d27a' : pct >= 50 ? '#f5c542' : '#ff4545';

  return (
    <aside className="sidebar-col" style={{ display:'flex', flexDirection:'column', gap:14, position:'sticky', top:74 }}>
      {/* Strength meter */}
      <div style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:14, padding:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:10 }}>
          <span style={{ fontFamily:'Bebas Neue', fontSize:12, letterSpacing:3, color:'#444' }}>PROFILE STRENGTH</span>
          <span style={{ fontFamily:'Bebas Neue', fontSize:32, color:barCol, lineHeight:1 }}>{pct}%</span>
        </div>
        <div style={{ height:5, background:'#1a1a1a', borderRadius:3, overflow:'hidden', marginBottom:16 }}>
          <div style={{
            height:'100%', width:`${pct}%`, background:barCol,
            borderRadius:3, transition:'width .5s cubic-bezier(.34,1,.64,1)',
            boxShadow:`0 0 10px ${barCol}80`,
          }}/>
        </div>
        {CHECKLIST.map(item => (
          <div key={item.key} style={{ display:'flex', alignItems:'center', gap:9, marginBottom:7 }}>
            <div style={{
              width:15, height:15, borderRadius:4, flexShrink:0,
              background: checks[item.key] ? '#3ddc84' : '#171717',
              border:`1px solid ${checks[item.key] ? '#3ddc84' : '#222'}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all .3s',
            }}>
              {checks[item.key] && <span style={{ fontSize:8, color:'#080808', fontWeight:900, animation:'checkPop .3s ease' }}>✓</span>}
            </div>
            <span style={{ fontSize:12, color: checks[item.key] ? '#999' : '#3a3a3a', transition:'color .3s' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:14, padding:20 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#3ddc84', letterSpacing:3, marginBottom:8 }}>💡 TIP</div>
        <p style={{ fontSize:12, color:'#444', lineHeight:1.7 }}>{TIPS[step] || TIPS[0]}</p>
      </div>

      {/* Step progress */}
      <div style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:14, padding:20 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, marginBottom:14 }}>YOUR JOURNEY</div>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display:'flex', alignItems:'center', gap:10, marginBottom: i<STEPS.length-1 ? 10 : 0 }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{
                width:22, height:22, borderRadius:'50%', flexShrink:0,
                background: i < step ? '#3ddc84' : i===step ? '#f5f5f5' : '#171717',
                border:`1.5px solid ${i<step?'#3ddc84':i===step?'#f5f5f5':'#222'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:9, fontWeight:900, transition:'all .3s',
                color: i<=step ? '#080808' : '#333',
              }}>
                {i < step ? '✓' : i+1}
              </div>
              {i < STEPS.length-1 && (
                <div style={{ width:1, height:10, background: i<step ? '#3ddc84' : '#1a1a1a', transition:'background .3s', marginTop:2 }}/>
              )}
            </div>
            <span style={{ fontSize:12, fontWeight: i===step ? 600 : 400, color: i<step ? '#3ddc84' : i===step ? '#f5f5f5' : '#333', transition:'color .3s', marginTop: i<STEPS.length-1?-8:0 }}>{s}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function App() {
  const [step,      setStep     ] = useState(0);
  const [data,      setData     ] = useState({});
  const [published, setPublished] = useState(false);

  const canNext = () => {
    if (step === 0) return !!data.roleId;
    if (step === 1) return !!(data.firstName && data.email);
    return true;
  };

  const stepViews = [
    <Step1 data={data} setData={setData}/>,
    <Step2 data={data} setData={setData}/>,
    <Step3 data={data} setData={setData}/>,
    <Step4 data={data} setData={setData}/>,
    <Step5 data={data} onPublish={() => setPublished(true)} published={published}/>,
  ];

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
        @keyframes checkPop{0%{transform:scale(0) rotate(-10deg)}60%{transform:scale(1.25) rotate(3deg)}100%{transform:scale(1) rotate(0)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 rgba(61,220,132,0)}50%{box-shadow:0 0 24px rgba(61,220,132,.2)}}
      `}</style>

      {/* ── Navbar ── */}
      <nav style={{
        position:'sticky', top:0, zIndex:100,
        background:'rgba(8,8,8,.96)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid #161616',
        height:58, display:'flex', alignItems:'center',
        padding:'0 32px', justifyContent:'space-between',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontFamily:'Bebas Neue', fontSize:18, letterSpacing:4 }}>HIRE AND HIRED STARS</span>
          <span style={{ width:3, height:3, borderRadius:'50%', background:'#333' }}/>
          <span style={{ fontFamily:'Bebas Neue', fontSize:12, letterSpacing:4, color:'#3a3a3a' }}>PROFILE BUILDER</span>
        </div>

        {/* Step pills — nav */}
        <div className="nav-steps" style={{ display:'flex', alignItems:'center', gap:2 }}>
          {STEPS.map((s, i) => (
            <div key={s} onClick={() => i < step && setStep(i)}
              style={{
                display:'flex', alignItems:'center', gap:6, padding:'5px 12px',
                borderRadius:100, background: i===step ? '#141414' : 'transparent',
                border:`1px solid ${i===step ? '#252525' : 'transparent'}`,
                cursor: i < step ? 'pointer' : 'default', transition:'all .2s',
              }}>
              <div style={{
                width:16, height:16, borderRadius:'50%', flexShrink:0,
                background: i < step ? '#3ddc84' : i===step ? '#f5f5f5' : '#252525',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:8, fontWeight:900, color:'#080808', transition:'all .3s',
              }}>
                {i < step ? '✓' : i+1}
              </div>
              <span style={{ fontSize:11, fontWeight:600, color: i<step?'#3ddc84':i===step?'#ccc':'#333' }}>{s}</span>
            </div>
          ))}
        </div>

        <span style={{ fontSize:12, color:'#444', fontWeight:600 }}>Step {step+1}/{STEPS.length}</span>
      </nav>

      {/* ── Layout ── */}
      <div className="layout" style={{
        maxWidth:1200, margin:'0 auto', padding:'36px 24px 80px',
        display:'grid', gridTemplateColumns:'1fr 280px', gap:24, alignItems:'start',
      }}>
        {/* Main card */}
        <div style={{
          background:'#0d0d0d', border:'1px solid #171717',
          borderRadius:18, padding:'34px 36px',
        }}>
          <div key={step}>
            {stepViews[step]}
          </div>

          {/* Footer nav */}
          {!published && (
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              marginTop:36, paddingTop:24, borderTop:'1px solid #141414',
            }}>
              <PrimaryBtn variant="ghost"
                onClick={() => setStep(s => Math.max(0, s-1))}
                style={{ opacity: step===0 ? .3 : 1, pointerEvents: step===0 ? 'none' : 'auto' }}>
                ← Back
              </PrimaryBtn>
              {step < STEPS.length-1 && (
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  {!canNext() && step < 2 && (
                    <span style={{ fontSize:12, color:'#444' }}>
                      {step===0 ? 'Select a role to continue' : 'Add name & email to continue'}
                    </span>
                  )}
                  <PrimaryBtn
                    variant={canNext() ? 'white' : 'outline'}
                    onClick={() => canNext() && setStep(s => s+1)}>
                    {step===3 ? 'Preview Profile' : 'Continue'} →
                  </PrimaryBtn>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar step={step} data={data}/>
      </div>
    </>
  );
}

export default App;