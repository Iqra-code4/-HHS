import React from 'react'
import { useState, useEffect, useRef } from "react";
import {ROLES, STEPS, TIPS, POPULAR_SKILLS, ALL_SKILLS, LANGUAGES_LIST, PROFICIENCY, CITIES, COUNTRIES, CHECKLIST} from "../constants";
import TextInput from "../components/TextInput";
import PrimaryBtn from "../components/PrimaryBtn";
import Divider from "../components/Divider";
import  TextareaInput from "../components/TextareaInput";
import Field from "../components/Field";
import SelectInput from "../components/SelectInput";

function Step4({ data, setData }) {
  const [mode, setMode] = useState(data.resumeMode || 'upload');
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();
  const upd = (k, v) => setData(d => ({ ...d, [k]:v }));
  const setMode2 = m => { setMode(m); upd('resumeMode', m); };

  const handleDrop = (f) => {
    if (!f) return;
    const allowed = ['pdf','doc','docx'];
    const ext = f.name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext)) return;
    upd('resumeFile', f.name); upd('resumeUploaded', true);
  };

  const coverWords = (data.coverLetter||'').trim().split(/\s+/).filter(Boolean).length;

  const BUILDER_SECTIONS = [
    { key:'rSummary',  label:'Professional Summary', ph:'A brief 3-4 sentence summary of your experience, skills, and goals...' },
    { key:'rSkills',   label:'Technical Skills',     ph:'List your key technical and soft skills separated by commas...' },
    { key:'rExp',      label:'Work Experience',      ph:'List your work history: title, company, dates, and key achievements...' },
    { key:'rEdu',      label:'Education',            ph:'Degrees, institutions, graduation years...' },
    { key:'rProjects', label:'Projects',             ph:'Describe notable projects: what you built, tech used, outcomes...' },
    { key:'rCerts',    label:'Certifications',       ph:'AWS Certified, Google Analytics, PMP, etc...' },
  ];

  return (
    <div style={{ animation:'fadeUp .4s ease both', display:'flex', flexDirection:'column', gap:22 }}>
      <div>
        <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:8 }}>STEP 4 OF 5</div>
        <h2 style={{ fontFamily:'Bebas Neue', fontSize:32, letterSpacing:3, lineHeight:1, marginBottom:6 }}>RESUME</h2>
        <p style={{ fontSize:13, color:'#555' }}>Upload your existing resume or build one right here.</p>
      </div>

      {/* Toggle */}
      <div style={{ display:'flex', background:'#111', border:'1px solid #1e1e1e', borderRadius:12, padding:4, gap:4 }}>
        {[['upload','⬆  Upload Resume'],['build','✏  Build Resume Here']].map(([m,l]) => (
          <button key={m} onClick={() => setMode2(m)} style={{
            flex:1, padding:'10px', borderRadius:9, border:'none', cursor:'pointer',
            background: mode===m ? '#f5f5f5' : 'transparent',
            color: mode===m ? '#080808' : '#555',
            fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:13, transition:'all .2s',
          }}>{l}</button>
        ))}
      </div>

      {mode === 'upload' ? (
        <>
          {/* Drop Zone */}
          <div
            onDragOver={e=>{e.preventDefault();setDrag(true)}}
            onDragLeave={()=>setDrag(false)}
            onDrop={e=>{e.preventDefault();setDrag(false);handleDrop(e.dataTransfer.files[0])}}
            onClick={() => fileRef.current.click()}
            style={{
              border:`2px dashed ${drag ? '#3ddc84' : '#252525'}`,
              borderRadius:14, padding:'52px 24px', textAlign:'center', cursor:'pointer',
              background: drag ? 'rgba(61,220,132,.04)' : '#111',
              transition:'all .2s', animation: drag ? 'glowPulse .8s ease' : 'none',
            }}>
            <div style={{ fontSize:40, marginBottom:14 }}>📄</div>
            {data.resumeFile ? (
              <>
                <div style={{ fontSize:14, fontWeight:700, color:'#3ddc84', marginBottom:4 }}>✓ {data.resumeFile}</div>
                <div style={{ fontSize:12, color:'#444' }}>Click to replace</div>
              </>
            ) : (
              <>
                <div style={{ fontSize:14, fontWeight:600, color:'#aaa', marginBottom:6 }}>Drag &amp; drop your resume here</div>
                <div style={{ fontSize:12, color:'#444' }}>PDF, DOC, DOCX · Max 10 MB</div>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={e=>handleDrop(e.target.files[0])} style={{ display:'none' }}/>
          <div style={{ textAlign:'center' }}>
            <PrimaryBtn size="sm" variant="ghost" onClick={() => fileRef.current.click()}>Browse Files</PrimaryBtn>
          </div>
        </>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {BUILDER_SECTIONS.map(({ key, label, ph }) => (
            <Field key={key} label={label}>
              <TextareaInput value={data[key]||''} onChange={v=>upd(key,v)} rows={3} placeholder={ph}/>
            </Field>
          ))}
        </div>
      )}

      <Divider label="Cover Letter"/>
      <Field label="Cover Letter (Optional)" hint={`${coverWords} / 300 words`}>
        <TextareaInput value={data.coverLetter||''} onChange={v=>upd('coverLetter',v)} rows={6}
          placeholder="Dear Hiring Manager,&#10;&#10;I am excited to apply for the [Role] position at [Company]..."/>
      </Field>

      <Divider label="Portfolio & Project Links"/>
      <div>
        {(data.projectLinks||[]).map((p, i) => (
          <div key={i} style={{ display:'flex', gap:10, marginBottom:8, alignItems:'center' }}>
            <div style={{ flex:.5, minWidth:0 }}>
              <TextInput value={p.label} onChange={v=>{const l=[...(data.projectLinks||[])];l[i]={...l[i],label:v};upd('projectLinks',l);}} placeholder="Label"/>
            </div>
            <div style={{ flex:1.5, minWidth:0 }}>
              <TextInput value={p.url} onChange={v=>{const l=[...(data.projectLinks||[])];l[i]={...l[i],url:v};upd('projectLinks',l);}} placeholder="https://github.com/..."/>
            </div>
            <button onClick={()=>upd('projectLinks',(data.projectLinks||[]).filter((_,j)=>j!==i))}
              style={{ background:'none', border:'none', color:'#ff4545', fontSize:20, cursor:'pointer', flexShrink:0 }}>×</button>
          </div>
        ))}
        <PrimaryBtn size="sm" variant="ghost" onClick={()=>upd('projectLinks',[...(data.projectLinks||[]),{label:'',url:''}])}>
          + Add Link
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default Step4