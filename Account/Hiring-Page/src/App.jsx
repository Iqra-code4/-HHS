import { useState, useEffect, useRef } from "react";
import { JOBS_DATA, CANDIDATES_DATA, DEPTS } from "./Data";
import JobDetail from "./Job-panel";
import InviteModal from "./Invite-modal";
import CandidateCard from "./Candidate-card";
import JobCard from "./Job-card";

/* ═══════════════════════════════════════════════
   DESIGN TOKENS — monochrome system
═══════════════════════════════════════════════ */
const T = {
  bg:     "#080808",
  s1:     "#0f0f0f",
  s2:     "#141414",
  s3:     "#1a1a1a",
  s4:     "#222222",
  s5:     "#2a2a2a",
  s6:     "#333333",
  b1:     "#1e1e1e",
  b2:     "#2e2e2e",
  b3:     "#3e3e3e",
  t1:     "#f5f5f5",
  t2:     "#b0b0b0",
  t3:     "#6a6a6a",
  t4:     "#383838",
  white:  "#ffffff",
  offW:   "#eeeeee",
  green:  "#3ddc84",
  red:    "#ff4545",
  yellow: "#f5c542",
};

/* ═══════════════════════════════════════════════
   GLOBAL STYLES injected once
═══════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; overflow: hidden; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: ${T.bg};
    color: ${T.t1};
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.s5}; border-radius: 4px; }
  input, textarea, select, button { font-family: 'DM Sans', sans-serif; }
  input::placeholder, textarea::placeholder { color: ${T.t4}; }
  select option { background: ${T.s3}; color: ${T.t1}; }

  /* noise overlay */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    opacity: .55;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .fade-up  { animation: fadeUp  .35s cubic-bezier(.16,1,.3,1) both; }
  .fade-in  { animation: fadeIn  .25s ease both; }
  .scale-in { animation: scaleIn .3s  cubic-bezier(.16,1,.3,1) both; }
  .slide-r  { animation: slideRight .3s cubic-bezier(.16,1,.3,1) both; }

  .hover-lift { transition: transform .18s, border-color .18s, background .18s; }
  .hover-lift:hover { transform: translateY(-1px); }

  /* dot-grid bg */
  .dot-grid {
    background-image: radial-gradient(circle, ${T.b2} 1px, transparent 1px);
    background-size: 22px 22px;
  }
`;


/* ═══════════════════════════════════════════════
   SVG ICON SYSTEM
═══════════════════════════════════════════════ */
const Ic = ({ p, size = 14, stroke = 2, fill = "none", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={p} />
  </svg>
);

const Icons = {
  search:    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  map:       <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock:     <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  users:     <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  dollar:    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  check:     <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  plus:      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  arrow:     <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  close:     <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  brief:     <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  star:      <svg width={11} height={11} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  wifi:      <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  spark:     <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  filter:    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  trending:  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  eye:       <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  mail:      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  lightning: <svg width={11} height={11} viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  chart:     <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};

/* ═══════════════════════════════════════════════
   TINY REUSABLE ATOMS
═══════════════════════════════════════════════ */
const Badge = ({ children, variant = "default", style: extra = {} }) => {
  const variants = {
    default: { bg: T.s4, color: T.t3, border: T.b2 },
    remote:  { bg: "rgba(61,220,132,.07)", color: T.green, border: "rgba(61,220,132,.2)" },
    urgent:  { bg: "rgba(245,197,66,.07)", color: T.yellow, border: "rgba(245,197,66,.2)" },
    white:   { bg: "rgba(255,255,255,.07)", color: T.t2, border: T.b2 },
    dim:     { bg: "transparent", color: T.t4, border: T.b1 },
  };
  const v = variants[variant] || variants.default;
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase",
      background: v.bg, color: v.color, border: `1px solid ${v.border}`,
      padding: "2px 8px", borderRadius: 4, flexShrink: 0, ...extra
    }}>{children}</span>
  );
};

const Divider = ({ style: extra = {} }) => (
  <div style={{ height: 1, background: T.b1, ...extra }} />
);

const SectionLabel = ({ children }) => (
  <div style={{
    fontSize: 9, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase",
    color: T.t4, display: "flex", alignItems: "center", gap: 8, marginBottom: 10
  }}>
    <span style={{ width: 14, height: 1, background: T.t4, display: "inline-block" }} />
    {children}
  </div>
);

const MetaItem = ({ icon, children, color = T.t3 }) => (
  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color }}>
    {icon}{children}
  </span>
);

/* ═══════════════════════════════════════════════
   TOPBAR
═══════════════════════════════════════════════ */
function Topbar({ view, setView, onPost, jobCount }) {
  return (
    <header style={{
      height: 56, background: T.s1, borderBottom: `1px solid ${T.b1}`,
      display: "flex", alignItems: "center", padding: "0 20px", gap: 12,
      position: "sticky", top: 0, zIndex: 100, flexShrink: 0
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, background: T.white, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, color: T.bg
        }}>HHS</div>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", letterSpacing: ".08em", color: T.white, lineHeight: 1 }}>Hire and Hired Stars</div>
        </div>
      </div>

      {/* Separator */}
      <div style={{ width: 1, height: 28, background: T.b2, flexShrink: 0, marginLeft: 4 }} />

      {/* Nav tabs */}
      <nav style={{ display: "flex", gap: 2, background: T.s3, borderRadius: 8, padding: 3 }}>
        {[["jobs", Icons.brief, "Jobs"], ["candidates", Icons.users, "Candidates"], ["analytics", Icons.chart, "Analytics"]].map(([k, ico, label]) => (
          <button key={k} onClick={() => setView(k)} style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase",
            background: view === k ? T.white : "transparent",
            color: view === k ? T.bg : T.t4,
            border: "none", padding: "6px 14px", borderRadius: 6, cursor: "pointer",
            transition: "all .18s"
          }}>
            <span style={{ color: view === k ? T.bg : T.t4 }}>{ico}</span>{label}
          </button>
        ))}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Stats chip */}
      <div style={{
        fontSize: 10, fontWeight: 600, color: T.t3,
        background: T.s3, border: `1px solid ${T.b1}`, borderRadius: 6,
        padding: "5px 12px", letterSpacing: ".04em"
      }}>
        {jobCount} Active Roles
      </div>

      {/* Post button */}
      <button onClick={onPost} style={{
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
        background: T.white, color: T.bg, border: "none",
        borderRadius: 7, padding: "9px 18px", cursor: "pointer",
        transition: "background .18s"
      }}>
        {Icons.plus} Post a Role
      </button>
    </header>
  );
}


/* ═══════════════════════════════════════════════
   ANALYTICS VIEW
═══════════════════════════════════════════════ */
function AnalyticsView() {
  const stats = [
    { label: "Active Roles", val: "6", change: "+2 this month", up: true },
    { label: "Total Applicants", val: "557", change: "↑ 18% MoM", up: true },
    { label: "Avg. Time to Hire", val: "18d", change: "↓ 4 days faster", up: true },
    { label: "Offer Accept Rate", val: "84%", change: "vs 72% industry", up: true },
  ];
  const depts = [
    { dept: "Engineering", roles: 2, applicants: 162, hired: 4, fill: 76 },
    { dept: "Product",     roles: 1, applicants: 126, hired: 2, fill: 59 },
    { dept: "AI & Data",   roles: 1, applicants: 47,  hired: 1, fill: 22 },
    { dept: "Design",      roles: 1, applicants: 203, hired: 3, fill: 96 },
    { dept: "Sales",       roles: 1, applicants: 58,  hired: 2, fill: 27 },
  ];
  const pipeline = [
    { label: "Applied",      n: 557, color: T.t4 },
    { label: "Screening",    n: 214, color: T.t3 },
    { label: "Interview",    n: 88,  color: T.t2 },
    { label: "Final Round",  n: 32,  color: T.t1 },
    { label: "Offered",      n: 14,  color: T.white },
  ];

  return (
    <div className="fade-up" style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem", letterSpacing: ".04em", color: T.white, lineHeight: 1, marginBottom: 3 }}>Hiring Analytics</div>
        <div style={{ fontSize: 12, color: T.t3 }}>Q1 2026 Overview · Last updated: Today</div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
        {stats.map((s) => (
          <div key={s.label} className="hover-lift" style={{
            background: T.s2, border: `1px solid ${T.b1}`, borderRadius: 10, padding: "14px 16px"
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: T.t4, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.9rem", letterSpacing: ".04em", color: T.white, lineHeight: 1, marginBottom: 5 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: s.up ? T.green : T.red }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14 }}>
        {/* Dept breakdown */}
        <div style={{ background: T.s1, border: `1px solid ${T.b1}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.b1}` }}>
            <SectionLabel>Performance by Department</SectionLabel>
          </div>
          {depts.map((d, i) => (
            <div key={d.dept} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
              borderBottom: i < depts.length - 1 ? `1px solid ${T.b1}` : "none"
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.t1, width: 100, flexShrink: 0 }}>{d.dept}</div>
              <div style={{ flex: 1, height: 4, background: T.s4, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: T.white, borderRadius: 2, width: `${d.fill}%`, transition: "width .7s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 14, fontSize: 11, color: T.t3, flexShrink: 0, minWidth: 140, justifyContent: "flex-end" }}>
                <span>{d.roles} role{d.roles > 1 ? "s" : ""}</span>
                <span>{d.applicants} applicants</span>
                <span style={{ color: T.green }}>{d.hired} hired</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline funnel */}
        <div style={{ background: T.s1, border: `1px solid ${T.b1}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.b1}` }}>
            <SectionLabel>Hiring Pipeline</SectionLabel>
          </div>
          <div style={{ padding: "16px" }}>
            {pipeline.map((p, i) => (
              <div key={p.label} style={{ marginBottom: i < pipeline.length - 1 ? 10 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
                  <span style={{ color: T.t3 }}>{p.label}</span>
                  <span style={{ color: T.t2, fontWeight: 600 }}>{p.n}</span>
                </div>
                <div style={{ height: 6, background: T.s4, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 3,
                    background: p.color, opacity: .85,
                    width: `${Math.round(p.n / 557 * 100)}%`,
                    transition: "width .7s ease"
                  }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.b1}` }}>
              <div style={{ fontSize: 11, color: T.t4, marginBottom: 3 }}>Conversion rate</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", color: T.white, letterSpacing: ".04em" }}>
                2.5% <span style={{ fontSize: "1rem", color: T.t3 }}>applied → hired</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   POST JOB MODAL
═══════════════════════════════════════════════ */
function PostModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "", dept: "Engineering", type: "Full-Time", loc: "",
    remote: false, salaryMin: "", salaryMax: "", desc: "", reqs: "", nice: ""
  });
  const [step, setStep] = useState(1);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.title.trim() || !form.desc.trim()) return;
    onSubmit({
      ...form,
      id: Date.now(),
      logo: form.dept.slice(0, 2).toUpperCase(),
      salary: form.salaryMin && form.salaryMax ? `$${Math.round(form.salaryMin / 1000)}K – $${Math.round(form.salaryMax / 1000)}K` : "Competitive",
      posted: "Just now",
      applicants: 0,
      urgent: false,
      reqs: form.reqs.split("\n").filter(r => r.trim()),
      nice: form.nice.split("\n").filter(r => r.trim()),
    });
    onClose();
  };

  const inputStyle = {
    width: "100%", background: T.s3, border: `1px solid ${T.b2}`,
    borderRadius: 8, padding: "9px 12px", fontSize: 12.5, color: T.t1,
    outline: "none", transition: "border-color .2s"
  };
  const labelStyle = {
    fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase",
    color: T.t4, display: "block", marginBottom: 6
  };

  return (
    <div className="fade-in" style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.82)",
      backdropFilter: "blur(10px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 200, padding: 16
    }}>
      <div className="scale-in" style={{
        background: T.s2, border: `1px solid ${T.b2}`, borderRadius: 18,
        width: "100%", maxWidth: 540, maxHeight: "90vh", overflow: "hidden",
        display: "flex", flexDirection: "column"
      }}>
        {/* Modal header */}
        <div style={{
          padding: "18px 22px", borderBottom: `1px solid ${T.b1}`,
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", letterSpacing: ".04em", color: T.white }}>Post a New Role</div>
            <div style={{ fontSize: 11, color: T.t4, marginTop: 1 }}>Step {step} of 2</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Step pills */}
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2].map(n => (
                <div key={n} style={{
                  width: n === step ? 22 : 8, height: 6, borderRadius: 3,
                  background: n <= step ? T.white : T.s5, transition: "all .25s"
                }} />
              ))}
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: T.t3, cursor: "pointer", padding: 4 }}>{Icons.close}</button>
          </div>
        </div>

        {/* Modal body */}
        <div style={{ padding: "20px 22px", overflowY: "auto", flex: 1 }}>
          {step === 1 ? (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Job Title *</label>
                <input style={inputStyle} placeholder="e.g. Senior Backend Engineer" value={form.title} onChange={e => upd("title", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Department</label>
                  <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.dept} onChange={e => upd("dept", e.target.value)}>
                    {["Engineering", "Product", "AI & Data", "Design", "Sales", "Marketing", "Operations", "Finance"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Employment Type</label>
                  <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.type} onChange={e => upd("type", e.target.value)}>
                    {["Full-Time", "Part-Time", "Contract", "Internship"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Location</label>
                <input style={inputStyle} placeholder="City, State — or leave blank for Remote" value={form.loc} onChange={e => upd("loc", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Salary Min (USD)</label>
                  <input style={inputStyle} placeholder="120000" value={form.salaryMin} onChange={e => upd("salaryMin", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Salary Max (USD)</label>
                  <input style={inputStyle} placeholder="160000" value={form.salaryMax} onChange={e => upd("salaryMax", e.target.value)} />
                </div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, background: T.s3,
                border: `1px solid ${T.b2}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer"
              }} onClick={() => upd("remote", !form.remote)}>
                <div style={{
                  width: 36, height: 20, borderRadius: 10,
                  background: form.remote ? T.s6 : T.s4, border: `1px solid ${form.remote ? T.b3 : T.b2}`,
                  position: "relative", transition: "all .2s", flexShrink: 0
                }}>
                  <div style={{
                    position: "absolute", top: 2, left: form.remote ? 18 : 2,
                    width: 14, height: 14, borderRadius: "50%",
                    background: form.remote ? T.white : T.t4, transition: "left .2s"
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.t1 }}>Remote eligible</div>
                  <div style={{ fontSize: 11, color: T.t3 }}>Candidates can work from anywhere</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Job Description *</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 110, lineHeight: 1.65 }}
                  placeholder="Describe the role, team culture, responsibilities, and what success looks like in this position…"
                  value={form.desc} onChange={e => upd("desc", e.target.value)} rows={5} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Requirements (one per line)</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 90, lineHeight: 1.65 }}
                  placeholder={`5+ years of React experience\nStrong TypeScript skills\nExperience with testing frameworks`}
                  value={form.reqs} onChange={e => upd("reqs", e.target.value)} rows={4} />
              </div>
              <div style={{ marginBottom: 4 }}>
                <label style={labelStyle}>Nice to Have (one per line)</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 70, lineHeight: 1.65 }}
                  placeholder={`GraphQL experience\nDesign systems background`}
                  value={form.nice} onChange={e => upd("nice", e.target.value)} rows={3} />
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div style={{
          padding: "14px 22px", borderTop: `1px solid ${T.b1}`,
          display: "flex", justifyContent: "space-between", gap: 8
        }}>
          <button onClick={onClose} style={{
            fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase",
            background: "transparent", color: T.t3, border: `1px solid ${T.b2}`,
            borderRadius: 7, padding: "9px 18px", cursor: "pointer"
          }}>Cancel</button>
          <div style={{ display: "flex", gap: 7 }}>
            {step === 2 && (
              <button onClick={() => setStep(1)} style={{
                fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase",
                background: "transparent", color: T.t2, border: `1px solid ${T.b2}`,
                borderRadius: 7, padding: "9px 18px", cursor: "pointer"
              }}>← Back</button>
            )}
            {step === 1 ? (
              <button onClick={() => setStep(2)} disabled={!form.title.trim()} style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase",
                background: form.title.trim() ? T.white : T.s5,
                color: form.title.trim() ? T.bg : T.t4,
                border: "none", borderRadius: 7, padding: "9px 20px", cursor: form.title.trim() ? "pointer" : "not-allowed",
                transition: "all .2s"
              }}>Next Step {Icons.arrow}</button>
            ) : (
              <button onClick={handleSubmit} disabled={!form.desc.trim()} style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase",
                background: form.desc.trim() ? T.white : T.s5,
                color: form.desc.trim() ? T.bg : T.t4,
                border: "none", borderRadius: 7, padding: "9px 20px", cursor: form.desc.trim() ? "pointer" : "not-allowed",
                transition: "all .2s"
              }}>Post Role {Icons.arrow}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



/* ═══════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("jobs");
  const [jobs, setJobs] = useState(JOBS_DATA);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deptFilter, setDeptFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [jobSearch, setJobSearch] = useState("");
  const [candSearch, setCandSearch] = useState("");
  const [matchThreshold, setMatchThreshold] = useState(85);
  const [postModal, setPostModal] = useState(false);
  const [inviteCandidate, setInviteCandidate] = useState(null);

  // Inject global CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const filteredJobs = jobs.filter(j => {
    const q = jobSearch.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.dept.toLowerCase().includes(q) || j.loc.toLowerCase().includes(q);
    const matchDept = deptFilter === "All" || j.dept === deptFilter;
    const matchType = typeFilter === "All" || j.type === typeFilter;
    const matchRemote = !remoteOnly || j.remote;
    return matchSearch && matchDept && matchType && matchRemote;
  });

  const filteredCands = CANDIDATES_DATA.filter(c => {
    const q = candSearch.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q));
    return matchSearch && c.match >= matchThreshold;
  }).sort((a, b) => b.match - a.match);

  const handlePostSubmit = (newJob) => {
    setJobs(prev => [newJob, ...prev]);
    setSelectedJob(newJob);
    setView("jobs");
  };

  const sidebarStyle = {
    width: 272, flexShrink: 0,
    background: T.s1, borderRight: `1px solid ${T.b1}`,
    display: "flex", flexDirection: "column", overflow: "hidden"
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: T.bg }}>
      <Topbar view={view} setView={setView} onPost={() => setPostModal(true)} jobCount={jobs.length} />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── JOBS VIEW ── */}
        {view === "jobs" && (
          <>
            {/* Left sidebar */}
            <div style={sidebarStyle}>
              {/* Search */}
              <div style={{ padding: "12px", borderBottom: `1px solid ${T.b1}` }}>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: T.t4, pointerEvents: "none" }}>{Icons.search}</span>
                  <input
                    style={{ width: "100%", background: T.s3, border: `1px solid ${T.b2}`, borderRadius: 8, padding: "8px 10px 8px 32px", fontSize: 12, color: T.t1, outline: "none" }}
                    placeholder="Search roles…" value={jobSearch} onChange={e => setJobSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters */}
              <div style={{ padding: "10px 12px 8px", borderBottom: `1px solid ${T.b1}` }}>
                <SectionLabel>Department</SectionLabel>
                {DEPTS.map(d => (
                  <button key={d} onClick={() => setDeptFilter(d)} style={{
                    width: "100%", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontSize: 12, fontWeight: 600, background: deptFilter === d ? T.s4 : "transparent",
                    color: deptFilter === d ? T.t1 : T.t3, border: "none",
                    padding: "7px 10px", borderRadius: 6, cursor: "pointer", transition: "all .15s"
                  }}>
                    {d}
                    <span style={{ fontSize: 10, color: T.t4 }}>
                      {d === "All" ? jobs.length : jobs.filter(j => j.dept === d).length}
                    </span>
                  </button>
                ))}
              </div>

              <div style={{ padding: "10px 12px 8px", borderBottom: `1px solid ${T.b1}` }}>
                <SectionLabel>Job Type</SectionLabel>
                {["All", "Full-Time", "Part-Time", "Contract"].map(t => (
                  <button key={t} onClick={() => setTypeFilter(t)} style={{
                    width: "100%", textAlign: "left", fontSize: 12, fontWeight: 600,
                    background: typeFilter === t ? T.s4 : "transparent",
                    color: typeFilter === t ? T.t1 : T.t3, border: "none",
                    padding: "7px 10px", borderRadius: 6, cursor: "pointer", transition: "all .15s"
                  }}>{t}</button>
                ))}
              </div>

              <div style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <SectionLabel>Remote Only</SectionLabel>
                  <div
                    style={{ width: 36, height: 20, borderRadius: 10, background: remoteOnly ? T.s6 : T.s4, border: `1px solid ${remoteOnly ? T.b3 : T.b2}`, position: "relative", cursor: "pointer", transition: "all .2s" }}
                    onClick={() => setRemoteOnly(v => !v)}
                  >
                    <div style={{ position: "absolute", top: 2, left: remoteOnly ? 18 : 2, width: 14, height: 14, borderRadius: "50%", background: remoteOnly ? T.white : T.t4, transition: "left .2s" }} />
                  </div>
                </div>
              </div>

              {/* Job list */}
              <div style={{ flex: 1, overflowY: "auto", padding: "8px 10px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: T.t4, padding: "4px 4px 8px" }}>
                  {filteredJobs.length} Role{filteredJobs.length !== 1 ? "s" : ""}
                </div>
                {filteredJobs.map((j, i) => (
                  <JobCard key={j.id} job={j} selected={selectedJob?.id === j.id} onSelect={setSelectedJob} animDelay={i * 40} />
                ))}
                {!filteredJobs.length && (
                  <div style={{ textAlign: "center", color: T.t4, fontSize: 12, padding: "24px 0" }}>No roles match your filters</div>
                )}
              </div>
            </div>

            {/* Main detail */}
            <div style={{ flex: 1, padding: 18, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <JobDetail job={selectedJob} onFindCandidates={() => setView("candidates")} onEditJob={() => {}} />
            </div>
          </>
        )}

        {/* ── CANDIDATES VIEW ── */}
        {view === "candidates" && (
          <>
            {/* Left sidebar */}
            <div style={sidebarStyle}>
              <div style={{ padding: "12px", borderBottom: `1px solid ${T.b1}` }}>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: T.t4, pointerEvents: "none" }}>{Icons.search}</span>
                  <input
                    style={{ width: "100%", background: T.s3, border: `1px solid ${T.b2}`, borderRadius: 8, padding: "8px 10px 8px 32px", fontSize: 12, color: T.t1, outline: "none" }}
                    placeholder="Search candidates…" value={candSearch} onChange={e => setCandSearch(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ padding: "10px 12px", borderBottom: `1px solid ${T.b1}` }}>
                <SectionLabel>Availability</SectionLabel>
                {["All", "Immediately", "2 weeks", "1 month"].map(a => (
                  <button key={a} style={{ width: "100%", textAlign: "left", fontSize: 12, fontWeight: 600, background: "transparent", color: T.t3, border: "none", padding: "7px 10px", borderRadius: 6, cursor: "pointer" }}>{a}</button>
                ))}
              </div>

              <div style={{ padding: "10px 12px" }}>
                <SectionLabel>Min. Match Score</SectionLabel>
                <input
                  type="range" min={70} max={100} value={matchThreshold}
                  onChange={e => setMatchThreshold(Number(e.target.value))}
                  style={{ width: "100%", accentColor: T.white, cursor: "pointer", marginBottom: 6 }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.t4 }}>
                  <span>70%</span>
                  <span style={{ color: T.t2, fontWeight: 600 }}>{matchThreshold}% minimum</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Sorting */}
              <div style={{ padding: "8px 12px", borderTop: `1px solid ${T.b1}`, marginTop: "auto" }}>
                <div style={{ fontSize: 10, color: T.t4, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Sort by</div>
                <select style={{ width: "100%", background: T.s3, border: `1px solid ${T.b2}`, borderRadius: 7, padding: "7px 10px", fontSize: 11, color: T.t2, outline: "none", appearance: "none" }}>
                  <option>Match Score (High → Low)</option>
                  <option>Availability</option>
                  <option>Experience</option>
                  <option>Salary (Low → High)</option>
                </select>
              </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, padding: 18, overflowY: "auto" }}>
              <div className="fade-up" style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem", letterSpacing: ".04em", color: T.white, lineHeight: 1, marginBottom: 3 }}>Top Matched Candidates</div>
                <div style={{ fontSize: 12, color: T.t3 }}>
                  {filteredCands.length} candidate{filteredCands.length !== 1 ? "s" : ""} matching{selectedJob ? ` for "${selectedJob.title}"` : " your filters"}
                  {" · "}Min. {matchThreshold}% match score
                </div>
              </div>
              {filteredCands.map((c, i) => (
                <CandidateCard key={c.id} c={c} selectedJob={selectedJob} onInvite={setInviteCandidate} animDelay={i * 50} />
              ))}
              {!filteredCands.length && (
                <div style={{ textAlign: "center", color: T.t4, fontSize: 13, padding: "40px 0" }}>No candidates match your current filters</div>
              )}
            </div>
          </>
        )}

        {/* ── ANALYTICS VIEW ── */}
        {view === "analytics" && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <AnalyticsView />
          </div>
        )}
      </div>

      {/* Modals */}
      {postModal && <PostModal onClose={() => setPostModal(false)} onSubmit={handlePostSubmit} />}
      {inviteCandidate && (
        <InviteModal candidate={inviteCandidate} job={selectedJob} onClose={() => setInviteCandidate(null)} />
      )}
    </div>
  );
}

export {T, Badge, SectionLabel, MetaItem, Divider, Ic, Icons}