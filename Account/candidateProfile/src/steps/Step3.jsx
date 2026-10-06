import React from 'react'
import { useState, useEffect, useRef } from "react";
import {ROLES, STEPS, TIPS, POPULAR_SKILLS, ALL_SKILLS, LANGUAGES_LIST, PROFICIENCY, CITIES, COUNTRIES, CHECKLIST} from "../constants";
import TextInput from "../components/TextInput";
import PrimaryBtn from "../components/PrimaryBtn";
import Divider from "../components/Divider";
import  TextareaInput from "../components/TextareaInput";
import Field from "../components/Field";
import SelectInput from "../components/SelectInput";

function Step3({ data, setData }) {
  const [skillQ,   setSkillQ]   = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const [expForm,  setExpForm]  = useState({ title:'', company:'', from:'', to:'', current:false, desc:'' });
  const [eduForm,  setEduForm]  = useState({ degree:'', institution:'', from:'', to:'' });
  const [langForm, setLangForm] = useState({ lang:'', level:'Fluent' });
  const [expOpen,  setExpOpen]  = useState(true);
  const [eduOpen,  setEduOpen]  = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const skills = data.skills || [];
  const addSkill = s => { if (!s || skills.includes(s)) return; setData(d=>({...d,skills:[...skills,s]})); setSkillQ(''); setShowDrop(false); };
  const rmSkill  = s => setData(d => ({ ...d, skills:skills.filter(x=>x!==s) }));

  const filtered = ALL_SKILLS.filter(s => s.toLowerCase().includes(skillQ.toLowerCase()) && !skills.includes(s));

  const addExp = () => {
    if (!expForm.title||!expForm.company) return;
    setData(d=>({...d,experience:[...(d.experience||[]),{...expForm,id:Date.now()}]}));
    setExpForm({ title:'', company:'', from:'', to:'', current:false, desc:'' });
  };
  const rmExp = id => setData(d=>({...d,experience:(d.experience||[]).filter(e=>e.id!==id)}));

  const addEdu = () => {
    if (!eduForm.degree||!eduForm.institution) return;
    setData(d=>({...d,education:[...(d.education||[]),{...eduForm,id:Date.now()}]}));
    setEduForm({ degree:'', institution:'', from:'', to:'' });
  };
  const rmEdu = id => setData(d=>({...d,education:(d.education||[]).filter(e=>e.id!==id)}));

  const addLang = () => {
    if (!langForm.lang) return;
    setData(d=>({...d,languages:[...(d.languages||[]),{...langForm,id:Date.now()}]}));
    setLangForm({ lang:'', level:'Fluent' });
  };
  const rmLang = id => setData(d=>({...d,languages:(d.languages||[]).filter(l=>l.id!==id)}));

  const SectionBlock = ({ title, count, open, onToggle, children }) => (
    <div style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:12, overflow:'hidden' }}>
      <div onClick={onToggle} style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'14px 18px', cursor:'pointer', userSelect:'none',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontFamily:'Bebas Neue', fontSize:14, letterSpacing:2, color:'#888' }}>{title}</span>
          {count > 0 && <span style={{ background:'#1e1e1e', border:'1px solid #2a2a2a', borderRadius:100, padding:'2px 10px', fontSize:11, color:'#3ddc84', fontWeight:700 }}>{count} added</span>}
        </div>
        <span style={{ color:'#444', fontSize:16, transform: open?'rotate(180deg)':'rotate(0)', transition:'transform .2s' }}>▾</span>
      </div>
      {open && <div style={{ padding:'4px 18px 18px', borderTop:'1px solid #1a1a1a' }}>{children}</div>}
    </div>
  );

  return (
    <div style={{ animation:'fadeUp .4s ease both', display:'flex', flexDirection:'column', gap:20 }}>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:8 }}>STEP 3 OF 5</div>
        <h2 style={{ fontFamily:'Bebas Neue', fontSize:32, letterSpacing:3, lineHeight:1, marginBottom:6 }}>SKILLS & EXPERIENCE</h2>
        <p style={{ fontSize:13, color:'#555' }}>Showcase your abilities and career history.</p>
      </div>

      {/* ── Skills ── */}
      <div style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:12, padding:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
          <span style={{ fontFamily:'Bebas Neue', fontSize:14, letterSpacing:2, color:'#888' }}>SKILLS</span>
          {skills.length > 0 && <span style={{ background:'#1e1e1e', border:'1px solid #2a2a2a', borderRadius:100, padding:'2px 10px', fontSize:11, color:'#3ddc84', fontWeight:700 }}>{skills.length} added</span>}
        </div>

        {/* Quick-add chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
          {POPULAR_SKILLS.map(s => {
            const added = skills.includes(s);
            return (
              <button key={s} onClick={() => added ? rmSkill(s) : addSkill(s)}
                style={{
                  background: added ? 'rgba(61,220,132,.1)' : '#1a1a1a',
                  border: `1px solid ${added ? '#3ddc84' : '#252525'}`,
                  borderRadius:100, padding:'5px 12px', fontSize:11, fontWeight:600,
                  color: added ? '#3ddc84' : '#555', cursor:'pointer', transition:'all .15s',
                }}>
                {added ? '✓' : '+'} {s}
              </button>
            );
          })}
        </div>

        {/* Autocomplete */}
        <div style={{ position:'relative', marginBottom: skills.length>0 ? 12 : 0 }}>
          <input
            value={skillQ}
            onChange={e => { setSkillQ(e.target.value); setShowDrop(true); }}
            onFocus={() => setShowDrop(true)}
            onBlur={() => setTimeout(() => setShowDrop(false), 180)}
            onKeyDown={e => { if(e.key==='Enter' && skillQ.trim()) addSkill(skillQ.trim()); }}
            placeholder="Search or type any skill and press Enter..."
            style={{
              background:'#1a1a1a', border:'1px solid #252525', borderRadius:10,
              padding:'10px 14px', color:'#f5f5f5', fontSize:13, width:'100%',
            }}
          />
          {showDrop && filtered.length > 0 && (
            <div style={{
              position:'absolute', top:'100%', left:0, right:0, background:'#171717',
              border:'1px solid #252525', borderRadius:10, zIndex:50, maxHeight:200,
              overflowY:'auto', marginTop:4, boxShadow:'0 8px 32px rgba(0,0,0,.6)',
            }}>
              {filtered.slice(0,10).map(s => (
                <div key={s} onMouseDown={() => addSkill(s)}
                  style={{ padding:'9px 14px', fontSize:13, color:'#bbb', cursor:'pointer', borderBottom:'1px solid #1e1e1e' }}
                  onMouseEnter={e => e.currentTarget.style.background='#1e1e1e'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        {skills.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {skills.map(s => (
              <span key={s} style={{
                background:'#1e1e1e', border:'1px solid #2a2a2a', borderRadius:100,
                padding:'5px 12px', fontSize:12, fontWeight:600, color:'#ccc',
                display:'flex', alignItems:'center', gap:7, animation:'scaleIn .2s ease',
              }}>
                {s}
                <span onClick={() => rmSkill(s)} style={{ cursor:'pointer', color:'#444', fontSize:15, lineHeight:1 }}>×</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Work Experience ── */}
      <SectionBlock title="WORK EXPERIENCE" count={(data.experience||[]).length} open={expOpen} onToggle={() => setExpOpen(o=>!o)}>
        <div style={{ paddingTop:12 }}>
          {(data.experience||[]).map(e => (
            <div key={e.id} style={{ background:'#171717', border:'1px solid #1e1e1e', borderRadius:10, padding:14, marginBottom:8, position:'relative' }}>
              <button onClick={() => rmExp(e.id)} style={{ position:'absolute', top:10, right:10, background:'none', border:'none', color:'#ff4545', fontSize:18, cursor:'pointer', lineHeight:1 }}>×</button>
              <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5' }}>{e.title}</div>
              <div style={{ fontSize:12, color:'#3ddc84', marginTop:2 }}>{e.company}</div>
              <div style={{ fontSize:11, color:'#444', marginTop:2 }}>{e.from} – {e.current ? 'Present' : e.to}</div>
              {e.desc && <div style={{ fontSize:12, color:'#555', marginTop:6, lineHeight:1.6 }}>{e.desc}</div>}
            </div>
          ))}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <Field label="Job Title"><TextInput value={expForm.title} onChange={v=>setExpForm(f=>({...f,title:v}))} placeholder="Senior Engineer"/></Field>
            <Field label="Company"><TextInput value={expForm.company} onChange={v=>setExpForm(f=>({...f,company:v}))} placeholder="Acme Inc."/></Field>
            <Field label="Start"><TextInput value={expForm.from} onChange={v=>setExpForm(f=>({...f,from:v}))} placeholder="Jan 2022"/></Field>
            <Field label="End">
              <TextInput value={expForm.to} onChange={v=>setExpForm(f=>({...f,to:v}))} placeholder="Dec 2024" disabled={expForm.current}/>
            </Field>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <div onClick={() => setExpForm(f=>({...f,current:!f.current}))}
              style={{
                width:18, height:18, borderRadius:4, cursor:'pointer',
                background: expForm.current ? '#3ddc84' : 'transparent',
                border:`1.5px solid ${expForm.current ? '#3ddc84' : '#333'}`,
                display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s',
              }}>
              {expForm.current && <span style={{ fontSize:10, color:'#080808', fontWeight:900 }}>✓</span>}
            </div>
            <span style={{ fontSize:12, color:'#555' }}>Currently working here</span>
          </div>
          <Field label="Description (optional)">
            <TextareaInput value={expForm.desc} onChange={v=>setExpForm(f=>({...f,desc:v}))} rows={2} placeholder="Key achievements and responsibilities..."/>
          </Field>
          <div style={{ marginTop:12 }}>
            <PrimaryBtn size="sm" variant="ghost" onClick={addExp}>+ Add Experience</PrimaryBtn>
          </div>
        </div>
      </SectionBlock>

      {/* ── Education ── */}
      <SectionBlock title="EDUCATION" count={(data.education||[]).length} open={eduOpen} onToggle={() => setEduOpen(o=>!o)}>
        <div style={{ paddingTop:12 }}>
          {(data.education||[]).map(e => (
            <div key={e.id} style={{ background:'#171717', border:'1px solid #1e1e1e', borderRadius:10, padding:14, marginBottom:8, position:'relative' }}>
              <button onClick={() => rmEdu(e.id)} style={{ position:'absolute', top:10, right:10, background:'none', border:'none', color:'#ff4545', fontSize:18, cursor:'pointer' }}>×</button>
              <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5' }}>{e.degree}</div>
              <div style={{ fontSize:12, color:'#666', marginTop:2 }}>{e.institution} · {e.from}–{e.to}</div>
            </div>
          ))}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <Field label="Degree"><TextInput value={eduForm.degree} onChange={v=>setEduForm(f=>({...f,degree:v}))} placeholder="BS Computer Science"/></Field>
            <Field label="Institution"><TextInput value={eduForm.institution} onChange={v=>setEduForm(f=>({...f,institution:v}))} placeholder="Stanford University"/></Field>
            <Field label="Start Year"><TextInput value={eduForm.from} onChange={v=>setEduForm(f=>({...f,from:v}))} placeholder="2018"/></Field>
            <Field label="End Year"><TextInput value={eduForm.to} onChange={v=>setEduForm(f=>({...f,to:v}))} placeholder="2022"/></Field>
          </div>
          <div style={{ marginTop:12 }}>
            <PrimaryBtn size="sm" variant="ghost" onClick={addEdu}>+ Add Education</PrimaryBtn>
          </div>
        </div>
      </SectionBlock>

      {/* ── Languages ── */}
      <SectionBlock title="LANGUAGES" count={(data.languages||[]).length} open={langOpen} onToggle={() => setLangOpen(o=>!o)}>
        <div style={{ paddingTop:12 }}>
          {(data.languages||[]).map(l => (
            <div key={l.id} style={{ background:'#171717', border:'1px solid #1e1e1e', borderRadius:10, padding:14, marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5' }}>{l.lang}</div>
                <div style={{ fontSize:11, color:'#666', marginTop:2 }}>{l.level}</div>
              </div>
              <button onClick={() => rmLang(l.id)} style={{ background:'none', border:'none', color:'#ff4545', fontSize:18, cursor:'pointer' }}>×</button>
            </div>
          ))}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <Field label="Language">
              <SelectInput value={langForm.lang} onChange={v=>setLangForm(f=>({...f,lang:v}))} options={LANGUAGES_LIST} placeholder="Select language"/>
            </Field>
            <Field label="Proficiency">
              <SelectInput value={langForm.level} onChange={v=>setLangForm(f=>({...f,level:v}))} options={PROFICIENCY} placeholder="Level"/>
            </Field>
          </div>
          <PrimaryBtn size="sm" variant="ghost" onClick={addLang}>+ Add Language</PrimaryBtn>
        </div>
      </SectionBlock>
    </div>
  );
}

export default Step3