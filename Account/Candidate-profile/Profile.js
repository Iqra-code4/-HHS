
const { useState, useRef, useEffect, useCallback } = React;

/* ════════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════════ */
const ROLES = [
  { id:'swe',    label:'Software Engineer', symbol:'⟨/⟩', tags:['Frontend','Backend','DSA'] },
  { id:'uiux',   label:'UI / UX Designer',  symbol:'◈',   tags:['Figma','Research','Prototyping'] },
  { id:'pm',     label:'Product Manager',   symbol:'◎',   tags:['Roadmap','Agile','Strategy'] },
  { id:'ds',     label:'Data Scientist',    symbol:'∑',   tags:['ML','Python','Analytics'] },
  { id:'mkt',    label:'Marketing',         symbol:'◉',   tags:['Growth','SEO','Campaigns'] },
  { id:'fin',    label:'Finance',           symbol:'$',   tags:['Analysis','Modeling','Risk'] },
  { id:'devops', label:'DevOps / Cloud',    symbol:'⬡',   tags:['AWS','CI/CD','Kubernetes'] },
  { id:'aiml',   label:'AI / ML Engineer',  symbol:'⬟',   tags:['LLMs','PyTorch','MLOps'] },
  { id:'sales',  label:'Web Developer',             symbol:'◆',   tags:['Frontend','Full-Stack','Backend'] },
];

const POPULAR_SKILLS = ['React','Python','TypeScript','Node.js','SQL','Figma','AWS','Docker','Go','Rust','JS','Express.js','C++','C','Java'];
const ALL_SKILLS = [...POPULAR_SKILLS,'Vue','Angular','GraphQL','PostgreSQL','MongoDB','Redis','Kubernetes',
  'TensorFlow','PyTorch','Pandas','Scikit-learn','HTML','Kotlin','Swift','Flutter','Next.js',
  'Tailwind CSS','Jest','Cypress','Git','Linux','Bash','Bootstrap','C#','Scala','R','Spark','Tableau'];

const LANGUAGES_LIST = ['English','Urdu','Arabic','French','German','Spanish','Mandarin','Hindi','Japanese','Portuguese','Korean','Italian','Turkish'];
const PROFICIENCY = ['Native','Fluent','Advanced','Conversational','Basic'];

const COUNTRIES = ['Pakistan','United States','United Kingdom','Canada','Australia','Germany','UAE','India','Netherlands','Singapore','France','Sweden'];
const CITIES = {
  'Pakistan':['Lahore','Karachi','Islamabad','Faisalabad','Rawalpindi'],
  'United States':['New York','San Francisco','Austin','Seattle','Chicago'],
  'United Kingdom':['London','Manchester','Birmingham','Edinburgh','Bristol'],
  'Canada':['Toronto','Vancouver','Montreal','Calgary','Ottawa'],
  'Australia':['Sydney','Melbourne','Brisbane','Perth','Adelaide'],
  'Germany':['Berlin','Munich','Hamburg','Frankfurt','Cologne'],
  'UAE':['Dubai','Abu Dhabi','Sharjah'],
  'India':['Bangalore','Mumbai','Delhi','Hyderabad','Pune'],
  'Netherlands':['Amsterdam','Rotterdam','Utrecht','Eindhoven'],
  'Singapore':['Singapore'],
  'France':['Paris','Lyon','Marseille'],
  'Sweden':['Stockholm','Gothenburg','Malmö'],
};

const STEPS = ['Define Role','Personal Info','Skills & Exp','Resume','Preview'];

const CHECKLIST = [
  { key:'role',    label:'Role selected' },
  { key:'name',    label:'Full name' },
  { key:'email',   label:'Email address' },
  { key:'headline',label:'Professional headline' },
  { key:'bio',     label:'Bio written' },
  { key:'skills',  label:'3+ skills added' },
  { key:'exp',     label:'Work experience' },
  { key:'resume',  label:'Resume ready' },
  { key:'photo',   label:'Profile photo(Optional)' },
];

const TIPS = [
  'Choose the role that best describes your primary expertise. You can refine with skills later.',
  'A professional photo and compelling headline increase profile views by 3×.',
  'Candidates with 5+ skills and one work experience listed get 2× more messages.',
  'Upload your latest resume or use our builder — both work with all employers.',
  'Profiles with all sections complete rank 5× higher in recruiter searches.',
];

/* ════════════════════════════════════════════
   REUSABLE PRIMITIVES
════════════════════════════════════════════ */
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

function Divider({ label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, margin:'4px 0' }}>
      <div style={{ flex:1, height:1, background:'#1a1a1a' }}/>
      {label && <span style={{ fontSize:10, color:'#333', fontWeight:700, letterSpacing:2, textTransform:'uppercase' }}>{label}</span>}
      <div style={{ flex:1, height:1, background:'#1a1a1a' }}/>
    </div>
  );
}

/* ════════════════════════════════════════════
   STEP 1 — DEFINE ROLE
════════════════════════════════════════════ */
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
              onClick={() => set('roleId', r.id) || set('roleName', r.label)}
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

/* ════════════════════════════════════════════
   STEP 2 — PERSONAL INFO
════════════════════════════════════════════ */
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
              options={['Remote','Hybrid','On-site','Flexible']} placeholder="Preference"/>
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

/* ════════════════════════════════════════════
   STEP 3 — SKILLS & EXPERIENCE
════════════════════════════════════════════ */
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
            <Field label="Degree / Certification"><TextInput value={eduForm.degree} onChange={v=>setEduForm(f=>({...f,degree:v}))} placeholder="BSc Computer Science"/></Field>
            <Field label="Institution"><TextInput value={eduForm.institution} onChange={v=>setEduForm(f=>({...f,institution:v}))} placeholder="LUMS, MIT, Stanford..."/></Field>
            <Field label="Start Year"><TextInput value={eduForm.from} onChange={v=>setEduForm(f=>({...f,from:v}))} placeholder="2018"/></Field>
            <Field label="End Year"><TextInput value={eduForm.to} onChange={v=>setEduForm(f=>({...f,to:v}))} placeholder="2022"/></Field>
          </div>
          <PrimaryBtn size="sm" variant="ghost" onClick={addEdu}>+ Add Education</PrimaryBtn>
        </div>
      </SectionBlock>

      {/* ── Languages ── */}
      <SectionBlock title="LANGUAGES" count={(data.languages||[]).length} open={langOpen} onToggle={() => setLangOpen(o=>!o)}>
        <div style={{ paddingTop:12 }}>
          {(data.languages||[]).length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:12 }}>
              {(data.languages||[]).map(l => {
                const col = {Native:'#3ddc84',Fluent:'#f5c542',Advanced:'#aaa',Conversational:'#666',Basic:'#444'}[l.level] || '#444';
                return (
                  <div key={l.id} style={{ background:'#1e1e1e', border:'1px solid #2a2a2a', borderRadius:8, padding:'7px 12px', display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'#ccc' }}>{l.lang}</span>
                    <span style={{ fontSize:10, background:col+'18', color:col, padding:'2px 8px', borderRadius:100, fontWeight:700 }}>{l.level}</span>
                    <span onClick={() => rmLang(l.id)} style={{ cursor:'pointer', color:'#333', fontSize:14 }}>×</span>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <div style={{ flex:1 }}><SelectInput value={langForm.lang} onChange={v=>setLangForm(f=>({...f,lang:v}))} options={LANGUAGES_LIST} placeholder="Select language"/></div>
            <div style={{ width:150 }}><SelectInput value={langForm.level} onChange={v=>setLangForm(f=>({...f,level:v}))} options={PROFICIENCY} placeholder="Level"/></div>
            <PrimaryBtn size="sm" variant="ghost" onClick={addLang}>+ Add</PrimaryBtn>
          </div>
        </div>
      </SectionBlock>
    </div>
  );
}

/* ════════════════════════════════════════════
   STEP 4 — RESUME
════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════
   STEP 5 — PREVIEW & PUBLISH
════════════════════════════════════════════ */
function Step5({ data, onPublish, published }) {
  if (published) return (
    <div style={{ animation:'scaleIn .5s ease', textAlign:'center', padding:'48px 0' }}>
      <div style={{ fontSize:60, marginBottom:16 }}>🎉</div>
      <h2 style={{ fontFamily:'Bebas Neue', fontSize:44, letterSpacing:5, color:'#3ddc84', marginBottom:8 }}>PROFILE LIVE!</h2>
      <p style={{ fontSize:14, color:'#555', marginBottom:36, maxWidth:380, margin:'0 auto 36px', lineHeight:1.7 }}>
        Your TalentBridge profile is now visible to thousands of recruiters. Here's what to do next.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, maxWidth:520, margin:'0 auto' }}>
        {[
          { icon:'🔍', label:'Browse Jobs',    sub:'Find matching roles now' },
          { icon:'📬', label:'Set Alerts',     sub:'Get notified instantly' },
          { icon:'🤝', label:'Connect',        sub:'Build your network' },
        ].map(a => (
          <div key={a.label}
            style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:12, padding:20, cursor:'pointer', transition:'all .2s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#3ddc84';e.currentTarget.style.background='rgba(61,220,132,.05)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#1e1e1e';e.currentTarget.style.background='#111'}}>
            <div style={{ fontSize:26, marginBottom:8 }}>{a.icon}</div>
            <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5', marginBottom:3 }}>{a.label}</div>
            <div style={{ fontSize:11, color:'#444' }}>{a.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const name   = [data.firstName, data.lastName].filter(Boolean).join(' ') || 'Your Name';
  const inits  = [data.firstName?.[0], data.lastName?.[0]].filter(Boolean).join('').toUpperCase() || '?';
  const skills = data.skills || [];
  const exps   = data.experience || [];
  const edus   = data.education  || [];
  const langs  = data.languages  || [];

  return (
    <div style={{ animation:'fadeUp .4s ease both' }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:11, letterSpacing:5, color:'#3ddc84', marginBottom:8 }}>STEP 5 OF 5</div>
        <h2 style={{ fontFamily:'Bebas Neue', fontSize:32, letterSpacing:3, lineHeight:1, marginBottom:6 }}>PREVIEW & PUBLISH</h2>
        <p style={{ fontSize:13, color:'#555' }}>This is exactly how recruiters will see your profile.</p>
      </div>

      {/* Profile card */}
      <div style={{ background:'#0d0d0d', border:'1px solid #1e1e1e', borderRadius:18, overflow:'hidden', marginBottom:28, position:'relative' }}>
        {/* BG watermark */}
        <div style={{
          position:'absolute', bottom:-20, right:-10, pointerEvents:'none', userSelect:'none',
          fontFamily:'Bebas Neue', fontSize:110, color:'rgba(255,255,255,.02)', letterSpacing:4, lineHeight:1,
        }}>TALENT<br/>BRIDGE</div>

        {/* Hero band */}
        <div style={{ background:'#111', borderBottom:'1px solid #1e1e1e', padding:'30px 32px 24px' }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:20, flexWrap:'wrap' }}>
            {/* Avatar */}
            <div style={{
              width:82, height:82, borderRadius:'50%', background:'#1e1e1e',
              border:'2px solid #2a2a2a', flexShrink:0, overflow:'hidden',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              {data.photo
                ? <img src={data.photo} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                : <span style={{ fontFamily:'Bebas Neue', fontSize:30, color:'#444' }}>{inits}</span>
              }
            </div>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, flexWrap:'wrap', marginBottom:8 }}>
                <div>
                  <h3 style={{ fontFamily:'Bebas Neue', fontSize:28, letterSpacing:2, lineHeight:1, marginBottom:4 }}>{name}</h3>
                  <div style={{ fontSize:13, color:'#3ddc84', fontWeight:700 }}>{data.headline || data.roleName || 'Professional'}</div>
                </div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {data.resumeUploaded && <span style={{ background:'rgba(61,220,132,.1)', border:'1px solid rgba(61,220,132,.3)', color:'#3ddc84', padding:'4px 10px', borderRadius:100, fontSize:11, fontWeight:700 }}>📄 Resume Ready</span>}
                  {data.roleId && <span style={{ background:'#1a1a1a', border:'1px solid #252525', color:'#888', padding:'4px 10px', borderRadius:100, fontSize:11 }}>{data.roleName}</span>}
                </div>
              </div>
              <div style={{ fontSize:12, color:'#555', marginBottom: data.bio?10:0 }}>
                {[data.city, data.country].filter(Boolean).join(', ')}
                {data.workPref && <span> · {data.workPref}</span>}
                {data.yearsExp && <span> · {data.yearsExp}</span>}
                {data.availability && <span> · Available {data.availability}</span>}
              </div>
              {data.bio && <p style={{ fontSize:12, color:'#666', lineHeight:1.7, maxWidth:540 }}>{data.bio}</p>}
            </div>
          </div>
        </div>

        <div style={{ padding:'24px 32px', display:'flex', flexDirection:'column', gap:22 }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>Skills</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {skills.map(s => (
                  <span key={s} style={{ background:'#1a1a1a', border:'1px solid #252525', borderRadius:100, padding:'4px 12px', fontSize:12, color:'#bbb', fontWeight:500 }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {exps.length > 0 && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, textTransform:'uppercase', marginBottom:12 }}>Experience</div>
              {exps.map((e, i) => (
                <div key={e.id} style={{ display:'flex', gap:16, marginBottom: i<exps.length-1?14:0, paddingBottom: i<exps.length-1?14:0, borderBottom: i<exps.length-1?'1px solid #1a1a1a':undefined }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#3ddc84', flexShrink:0, marginTop:5 }}/>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5' }}>{e.title}</div>
                    <div style={{ fontSize:12, color:'#3ddc84', marginTop:1 }}>{e.company}</div>
                    <div style={{ fontSize:11, color:'#444', marginTop:1 }}>{e.from} – {e.current?'Present':e.to}</div>
                    {e.desc && <div style={{ fontSize:12, color:'#555', marginTop:5, lineHeight:1.6 }}>{e.desc}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {edus.length > 0 && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, textTransform:'uppercase', marginBottom:12 }}>Education</div>
              {edus.map(e => (
                <div key={e.id} style={{ marginBottom:8 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#f5f5f5' }}>{e.degree}</div>
                  <div style={{ fontSize:11, color:'#666', marginTop:2 }}>{e.institution} · {e.from}–{e.to}</div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {langs.length > 0 && (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#333', letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>Languages</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {langs.map(l => {
                  const c={Native:'#3ddc84',Fluent:'#f5c542',Advanced:'#aaa',Conversational:'#666',Basic:'#444'}[l.level]||'#444';
                  return (
                    <div key={l.id} style={{ background:'#1a1a1a', border:'1px solid #252525', borderRadius:8, padding:'6px 12px', display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:12, fontWeight:600, color:'#ccc' }}>{l.lang}</span>
                      <span style={{ fontSize:10, color:c }}>{l.level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact */}
          {(data.email||data.phone||data.linkedin||data.portfolio) && (
            <div style={{ borderTop:'1px solid #1a1a1a', paddingTop:16, display:'flex', flexWrap:'wrap', gap:14 }}>
              {data.email    && <span style={{ fontSize:12, color:'#555' }}>✉ {data.email}</span>}
              {data.phone    && <span style={{ fontSize:12, color:'#555' }}>📱 {data.phone}</span>}
              {data.linkedin && <span style={{ fontSize:12, color:'#3ddc84' }}>in {data.linkedin}</span>}
              {data.portfolio && <span style={{ fontSize:12, color:'#aaa' }}>🔗 {data.portfolio}</span>}
              {data.salaryMin && <span style={{ fontSize:12, color:'#f5c542' }}>💰 {data.salaryMin} – {data.salaryMax}</span>}
            </div>
          )}
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'center' }}>
        <PrimaryBtn variant="green" onClick={onPublish}>
          🚀 Publish Profile to TalentBridge
        </PrimaryBtn>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SIDEBAR
════════════════════════════════════════════ */
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
  const barCol = pct >= 80 ? '#3ddc84' : pct >= 50 ? '#f5c542' : '#ff4545';

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

/* ════════════════════════════════════════════
   APP ROOT
════════════════════════════════════════════ */
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
          <span style={{ fontFamily:'Bebas Neue', fontSize:18, letterSpacing:4 }}>TALENTBRIDGE</span>
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

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);