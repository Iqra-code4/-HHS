import React from 'react'
import { useRef, useState } from 'react';
import {ROLES, STEPS, TIPS, POPULAR_SKILLS, ALL_SKILLS, LANGUAGES_LIST, PROFICIENCY, CITIES, COUNTRIES, CHECKLIST} from "../constants";
import TextInput from "../components/TextInput";
import PrimaryBtn from "../components/PrimaryBtn";
import Divider from "../components/Divider";
import Field from "../components/Field";
import SelectInput from "../components/SelectInput";
import TextareaInput from "../components/TextareaInput";

function Step2({ data, setData }) {
  const fileRef = useRef();
  const upd = (k, v) => setData(d => ({ ...d, [k]:v }));
  const bioWords = (data.bio||'').trim().split(/\s+/).filter(Boolean).length;
  const cities = CITIES[data.country] || [];

  const handlePhoto = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => upd('photo', ev.target.result);
    r.readAsDataURL(f);
  };

  return (
    <div style={{ animation:'fadeUp .4s ease both' }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:8 }}>STEP 2 OF 5</div>
        <h2 style={{ fontFamily:'Bebas Neue', fontSize:32, letterSpacing:3, lineHeight:1, marginBottom:6 }}>PERSONAL INFO</h2>
        <p style={{ fontSize:13, color:'#555' }}>Fill in your details so recruiters can reach you.</p>
      </div>

      {/* Photo */}
      <div style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:12, padding:20, marginBottom:22, display:'flex', alignItems:'center', gap:20 }}>
        <div
          onClick={() => fileRef.current.click()}
          style={{
            width:80, height:80, borderRadius:'50%', background:'#1a1a1a',
            border:`2px solid ${data.photo ? '#3ddc84' : '#2a2a2a'}`,
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            overflow:'hidden', flexShrink:0, transition:'border-color .2s',
          }}>
          {data.photo
            ? <img src={data.photo} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            : <span style={{ fontSize:26, color:'#333' }}>+</span>
          }
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display:'none' }}/>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:'#ccc', marginBottom:4 }}>Profile Photo</div>
          <div style={{ fontSize:11, color:'#444', marginBottom:10 }}>JPG or PNG · Recommended 400×400px</div>
          <PrimaryBtn size="sm" variant="ghost" onClick={() => fileRef.current.click()}>
            {data.photo ? '↺ Change Photo' : '+ Upload Photo'}
          </PrimaryBtn>
        </div>
      </div>

      {/* Name row */}
      <div className="form-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
        <Field label="First Name"><TextInput value={data.firstName||''} onChange={v=>upd('firstName',v)} placeholder="Alex"/></Field>
        <Field label="Last Name"><TextInput value={data.lastName||''} onChange={v=>upd('lastName',v)} placeholder="Morgan"/></Field>
      </div>

      <div className="form-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
        <Field label="Email Address"><TextInput value={data.email||''} onChange={v=>upd('email',v)} placeholder="alex@example.com" type="email"/></Field>
        <Field label="Phone Number"><TextInput value={data.phone||''} onChange={v=>upd('phone',v)} placeholder="+92 300 0000000"/></Field>
      </div>

      <div className="form-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
        <Field label="Country">
          <SelectInput value={data.country||''} onChange={v=>{upd('country',v);upd('city','');}} options={COUNTRIES} placeholder="Select country"/>
        </Field>
        <Field label="City">
          <SelectInput value={data.city||''} onChange={v=>upd('city',v)} options={cities} placeholder="Select city"/>
        </Field>
      </div>

      <div className="form-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
        <Field label="LinkedIn URL"><TextInput value={data.linkedin||''} onChange={v=>upd('linkedin',v)} placeholder="linkedin.com/in/yourname"/></Field>
        <Field label="Portfolio URL"><TextInput value={data.portfolio||''} onChange={v=>upd('portfolio',v)} placeholder="yourportfolio.com"/></Field>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <Field label="Professional Headline" hint="Keep it under 80 characters">
          <TextInput value={data.headline||''} onChange={v=>upd('headline',v)} placeholder="Senior Full-Stack Engineer · 6 yrs exp · Open to Remote"/>
        </Field>

        <Field label="Bio" hint={`${bioWords} / 150 words`}>
          <TextareaInput value={data.bio||''} onChange={v=>upd('bio',v)} rows={5}
            placeholder="Tell recruiters what makes you unique — your expertise, approach, and what you're looking for next."/>
        </Field>

        <div className="form-grid-3" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 }}>
          <Field label="Availability">
            <SelectInput value={data.availability||''} onChange={v=>upd('availability',v)}
              options={['Immediately','2 weeks notice','1 month notice','3 months notice','Not actively looking']}
              placeholder="Availability"/>
          </Field>
          <Field label="Work Preference">
            <SelectInput value={data.workPref||''} onChange={v=>upd('workPref',v)}
              options={['Remote','Full Time','Paid or UnPaid Internship','Paid Internship', 'Any']} placeholder="Preference"/>
          </Field>
          <Field label="Years of Experience">
            <SelectInput value={data.yearsExp||''} onChange={v=>upd('yearsExp',v)}
              options={['Less than 1 year','1–3 years','3–5 years','5–8 years','8–12 years','12+ years']}
              placeholder="Experience"/>
          </Field>
        </div>

        <Field label="Expected Annual Salary">
          <div className="form-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <TextInput value={data.salaryMin||''} onChange={v=>upd('salaryMin',v)} placeholder="Min · $60,000 / year"/>
            <TextInput value={data.salaryMax||''} onChange={v=>upd('salaryMax',v)} placeholder="Max · $90,000 / year"/>
          </div>
        </Field>
      </div>
    </div>
  );
}


export default Step2