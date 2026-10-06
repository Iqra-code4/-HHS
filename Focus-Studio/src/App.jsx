import React from 'react'
import Whiteboard from './Board';

// FocusFlow — TalentBridge Focus Session Page
// Stack: React + Tailwind CSS (CDN) + Vanilla JS
// Design: Monochrome black/dark-gray/white — Bebas Neue + Outfit fonts
// To run: paste into a .jsx file, or open focus-session.html which auto-loads everything.

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────
   GLOBAL CSS injected once on mount
───────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #080808;
    --s1:        #0f0f0f;
    --s2:        #141414;
    --s3:        #1a1a1a;
    --s4:        #222222;
    --s5:        #2a2a2a;
    --b1:        #1e1e1e;
    --b2:        #2e2e2e;
    --b3:        #3e3e3e;
    --tx:        #f5f5f5;
    --tx2:       #aaaaaa;
    --tx3:       #666666;
    --tx4:       #444444;
    --green:     #3ddc84;
    --red:       #ff4545;
    --yellow:    #f5c542;
    --font-d:    'Bebas Neue', sans-serif;
    --font-b:    'Outfit', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    font-family: var(--font-b);
    color: var(--tx);
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: var(--s1); }
  ::-webkit-scrollbar-thumb { background: var(--s5); border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--b3); }

  /* Noise overlay */
  .noise-layer {
    pointer-events: none;
    position: fixed; inset: 0; z-index: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px;
  }

  /* Dot grid */
  .dot-grid {
    pointer-events: none;
    position: fixed; inset: 0; z-index: 0;
    opacity: 0.04;
    background-image: radial-gradient(circle, #ffffff 1px, transparent 1px);
    background-size: 28px 28px;
  }

  /* Radial glow top */
  .radial-glow {
    pointer-events: none;
    position: fixed;
    top: -200px; left: 50%;
    transform: translateX(-50%);
    width: 800px; height: 600px;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%);
    z-index: 0;
  }

  /* Panel base */
  .panel {
    background: var(--s1);
    border: 1px solid var(--b1);
    border-radius: 14px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s;
  }
  .panel:hover { border-color: var(--b2); }

  /* Panel shimmer top border */
  .panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
  }

  /* Buttons */
  .btn {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: var(--font-b);
    transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1);
    user-select: none;
  }
  .btn:active { transform: scale(0.95) !important; }

  .btn-pill {
    padding: 7px 18px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border: 1px solid var(--b2);
    background: var(--s3);
    color: var(--tx3);
  }
  .btn-pill:hover { background: var(--s4); color: var(--tx2); border-color: var(--b3); }
  .btn-pill.active { background: var(--tx); color: var(--bg); border-color: var(--tx); }

  .btn-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    background: var(--s3);
    border: 1px solid var(--b1);
    color: var(--tx3);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
  }
  .btn-icon:hover { background: var(--s4); color: var(--tx2); }

  /* Input base */
  .inp {
    background: var(--s3);
    border: 1px solid var(--b1);
    border-radius: 10px;
    padding: 10px 14px;
    font-family: var(--font-b);
    font-size: 13px;
    color: var(--tx);
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .inp:focus { border-color: var(--b3); }
  .inp::placeholder { color: var(--tx4); }

  /* Range sliders */
  input[type="range"] {
    -webkit-appearance: none;
    height: 3px;
    background: var(--s5);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--tx);
    cursor: pointer;
    transition: transform 0.15s;
  }
  input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); }

  /* Timer ring */
  .timer-ring { transform: rotate(-90deg); transform-origin: center; }
  .ring-track { transition: stroke-dashoffset 0.6s linear; stroke-linecap: round; }

  /* Music EQ bars */
  @keyframes eq1 { 0%,100%{height:4px}50%{height:16px} }
  @keyframes eq2 { 0%,100%{height:10px}50%{height:5px} }
  @keyframes eq3 { 0%,100%{height:7px}50%{height:18px} }
  @keyframes eq4 { 0%,100%{height:14px}50%{height:6px} }
  @keyframes eq5 { 0%,100%{height:8px}50%{height:20px} }
  @keyframes eq6 { 0%,100%{height:5px}50%{height:12px} }

  .eq-bar { width: 3px; border-radius: 2px; background: var(--green); display: inline-block; }
  .eq-bar:nth-child(1){animation:eq1 0.7s ease-in-out infinite}
  .eq-bar:nth-child(2){animation:eq2 0.9s ease-in-out infinite}
  .eq-bar:nth-child(3){animation:eq3 0.6s ease-in-out infinite}
  .eq-bar:nth-child(4){animation:eq4 0.8s ease-in-out infinite}
  .eq-bar:nth-child(5){animation:eq5 0.7s ease-in-out infinite}
  .eq-bar:nth-child(6){animation:eq6 0.95s ease-in-out infinite}

  /* Pulse dot */
  @keyframes pulse-ring {
    0%   { transform:scale(0.8); opacity:1 }
    100% { transform:scale(2.2); opacity:0 }
  }
  .pulse-dot {
    position:relative; width:8px; height:8px;
    border-radius:50%; background:var(--green);
    flex-shrink:0;
  }
  .pulse-dot::after {
    content:'';
    position:absolute; inset:-2px;
    border-radius:50%;
    border:1px solid var(--green);
    animation: pulse-ring 1.8s ease-out infinite;
  }

  /* Streak flame */
  @keyframes flicker {
    0%,100%{transform:scale(1) rotate(-2deg)}
    50%{transform:scale(1.1) rotate(2deg)}
  }
  .flame { display:inline-block; animation:flicker 1.4s ease-in-out infinite; }

  /* Todo slide in */
  @keyframes slide-in {
    from{opacity:0;transform:translateY(-8px)}
    to  {opacity:1;transform:translateY(0)}
  }
  .todo-enter { animation:slide-in 0.22s ease forwards; }

  /* Prize glow */
  @keyframes prize-glow {
    0%,100%{box-shadow:0 0 0 rgba(61,220,132,0)}
    50%{box-shadow:0 0 24px rgba(61,220,132,0.2)}
  }
  .prize-active { animation:prize-glow 2.5s ease-in-out infinite; }

  /* Whiteboard */
  .wb-canvas {
    background: #F8F8F0;
    border-radius: 10px;
    cursor: crosshair;
    touch-action: none;
    display: block;
  }

  /* Day cell */
  .day-cell {
    width:100%; aspect-ratio:1;
    border-radius:6px;
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:600;
    cursor:pointer;
    transition:all 0.18s cubic-bezier(0.34,1.56,0.64,1);
    user-select:none;
    position:relative;
  }
  .day-cell:hover { transform:scale(1.12); z-index:1; }

  /* Track row */
  .track-row {
    display:flex; align-items:center; gap:12px;
    padding:9px 12px;
    border-radius:10px;
    cursor:pointer;
    transition:all 0.15s;
    border:1px solid transparent;
  }
  .track-row:hover { background:var(--s3); border-color:var(--b1); }
  .track-row.playing { background:var(--s4); border-color:var(--b2); }

  /* Section header line */
  .sec-label {
    font-family:var(--font-d);
    font-size:11px;
    letter-spacing:4px;
    color:var(--tx4);
    text-transform:uppercase;
    display:flex; align-items:center; gap:10px;
  }
  .sec-label::after {
    content:'';
    flex:1; height:1px;
    background:var(--b1);
  }

  /* Stat card */
  .stat-card {
    background:var(--s2);
    border:1px solid var(--b1);
    border-radius:12px;
    padding:16px 18px;
    transition:all 0.2s;
  }
  .stat-card:hover { border-color:var(--b2); background:var(--s3); }

  /* Checkmark bounce */
  @keyframes check-pop {
    0%{transform:scale(0)}
    60%{transform:scale(1.25)}
    100%{transform:scale(1)}
  }
  .check-pop { animation:check-pop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards; }

  /* Confetti burst (CSS only) */
  @keyframes confetti-fall {
    0%  {transform:translate(0,0) rotate(0deg); opacity:1}
    100%{transform:translate(var(--dx), 60px) rotate(var(--dr)); opacity:0}
  }
  .confetti-piece {
    position:absolute;
    width:6px; height:6px;
    border-radius:2px;
    animation:confetti-fall 0.8s ease-out forwards;
  }

  /* Responsive grid helpers */
  @media(max-width:1100px){
    .main-grid { grid-template-columns:1fr 1fr !important; }
  }
  @media(max-width:720px){
    .main-grid { grid-template-columns:1fr !important; }
    .stats-row  { grid-template-columns:1fr 1fr !important; }
  }
  @media(max-width:480px){
    .stats-row  { grid-template-columns:1fr !important; }
    .hero-title { font-size:40px !important; }
  }
`;

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const TRACKS = [
  { id:1, title:"Rainy Café",      artist:"Lo-Fi Collective",  bpm:68,  icon:"☕" },
  { id:2, title:"Deep Focus",      artist:"Ambient Study Co.", bpm:60,  icon:"🎧" },
  { id:3, title:"Night Coding",    artist:"Chill Wavelength",  bpm:76,  icon:"💻" },
  { id:4, title:"Forest Breath",   artist:"Nature Sounds Lab", bpm:55,  icon:"🌿" },
  { id:5, title:"Tokyo Drift",     artist:"City Lofi Project", bpm:82,  icon:"🌙" },
  { id:6, title:"Study Session",   artist:"Piano Dreams",      bpm:64,  icon:"🎹" },
];

const QUOTES = [
  { text:"The secret of getting ahead is getting started.", author:"Mark Twain" },
  { text:"Focus is not about saying yes — it's about saying no.", author:"Steve Jobs" },
  { text:"Discipline is the bridge between goals and accomplishment.", author:"Jim Rohn" },
  { text:"Small daily improvements lead to staggering long-term results.", author:"Robin Sharma" },
  { text:"You don't have to be great to start, but you must start to be great.", author:"Zig Ziglar" },
  { text:"The more you sweat in practice, the less you bleed in battle.", author:"Richard Marcinko" },
];

/* ─────────────────────────────────────────────────────────
   HELPER HOOKS
───────────────────────────────────────────────────────── */
function useTimer(initial) {
  const [sec, setSec]       = useState(initial);
  const [running, setRun]   = useState(false);
  const [completed, setDone]= useState(0);
  const iv = useRef(null);

  useEffect(() => {
    if (running) {
      iv.current = setInterval(() => {
        setSec(s => {
          if (s <= 1) {
            clearInterval(iv.current);
            setRun(false);
            setDone(n => n + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else clearInterval(iv.current);
    return () => clearInterval(iv.current);
  }, [running]);

  return { sec, setSec, running, setRun, completed };
}

function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`;
}

/* ─────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────── */

/* ── Header ── */
function Header({ sessionsDone }) {
  const now   = new Date();
  const hour  = now.getHours();
  const greet = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const q     = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];
  const dateStr = now.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" });

  return (
    <header style={{ marginBottom:32, position:"relative", zIndex:1 }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
        {/* Brand */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <span style={{ fontFamily:"var(--font-d)", fontSize:12, letterSpacing:5, color:"var(--tx4)" }}>Hire and Hired Stars</span>
            <div style={{ width:3, height:3, borderRadius:"50%", background:"var(--b3)" }} />
            <span style={{ fontFamily:"var(--font-d)", fontSize:12, letterSpacing:5, color:"var(--tx4)" }}>FOCUS STUDIO</span>
          </div>
          <h1 className="hero-title" style={{
            fontFamily:"var(--font-d)", fontSize:52, letterSpacing:3, lineHeight:1,
            color:"var(--tx)", marginBottom:12,
          }}>
            {greet},<br />
            <span style={{ color:"var(--tx4)" }}>Scholar.</span>
          </h1>
          <div style={{ display:"flex", alignItems:"flex-start", gap:8, maxWidth:480 }}>
            <span style={{ color:"var(--tx4)", fontSize:16, lineHeight:1.2, marginTop:2 }}>"</span>
            <div>
              <p style={{ fontSize:13, color:"var(--tx3)", fontStyle:"italic", lineHeight:1.6 }}>{q.text}</p>
              <p style={{ fontSize:11, color:"var(--tx4)", marginTop:4 }}>— {q.author}</p>
            </div>
          </div>
        </div>

        {/* Status chips */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>
          <div style={{
            display:"flex", alignItems:"center", gap:8,
            background:"var(--s2)", border:"1px solid var(--b1)",
            borderRadius:100, padding:"7px 14px",
          }}>
            <div className="pulse-dot" />
            <span style={{ fontSize:12, color:"var(--green)", fontWeight:600, letterSpacing:0.3 }}>Focus Mode Active</span>
          </div>
          <span style={{ fontSize:12, color:"var(--tx4)" }}>{dateStr}</span>
          {sessionsDone > 0 && (
            <div style={{
              display:"flex", alignItems:"center", gap:6,
              background:"var(--s2)", border:"1px solid var(--b1)",
              borderRadius:100, padding:"5px 12px",
            }}>
              <span style={{ fontSize:13 }}>⚡</span>
              <span style={{ fontSize:12, color:"var(--yellow)", fontWeight:600 }}>{sessionsDone} session{sessionsDone>1?"s":""} today</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ── Stats Row ── */
function StatsRow({ sessionsDone, streakDays, todosComplete }) {
  const data = [
    { label:"Sessions Done",    value:sessionsDone, suffix:"",  color:"var(--tx)",     icon:"⚡" },
    { label:"Day Streak",       value:streakDays,   suffix:"d", color:"var(--yellow)", icon:"🔥" },
    { label:"Tasks Complete",   value:todosComplete,suffix:"",  color:"var(--green)",  icon:"✓"  },
    { label:"Focus Hours",      value:Math.round(sessionsDone*55/60*10)/10, suffix:"h", color:"var(--tx2)", icon:"⏱" },
  ];
  return (
    <div className="stats-row" style={{
      display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20, position:"relative", zIndex:1,
    }}>
      {data.map(d => (
        <div className="stat-card" key={d.label}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
            <span style={{ fontSize:14 }}>{d.icon}</span>
            <span style={{ fontSize:11, color:"var(--tx4)", letterSpacing:0.5, textTransform:"uppercase" }}>{d.label}</span>
          </div>
          <div style={{ fontFamily:"var(--font-d)", fontSize:30, color:d.color, letterSpacing:1, lineHeight:1 }}>
            {d.value}{d.suffix}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Pomodoro Timer ── */
function PomodoroTimer({ onSessionComplete }) {
  const MODES = { focus:55*60, short:5*60, long:15*60 };
  const [mode, setMode] = useState("focus");
  const { sec, setSec, running, setRun, completed } = useTimer(MODES.focus);

  const total   = MODES[mode];
  const pct     = sec / total;
  const R       = 62;
  const C       = 2 * Math.PI * R;
  const offset  = C - pct * C;
  const ringColor = running ? "var(--green)" : "var(--tx)";

  const switchMode = m => { setMode(m); setRun(false); setSec(MODES[m]); };

  useEffect(() => {
    if (completed > 0) onSessionComplete?.();
  }, [completed]);

  return (
    <div className="panel" style={{ padding:24 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <span style={{ fontFamily:"var(--font-d)", fontSize:20, letterSpacing:3 }}>SESSION TIMER</span>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {running && <div className="pulse-dot" />}
          <span style={{ fontSize:11, color:"var(--tx4)" }}>{completed} done</span>
        </div>
      </div>

      {/* Mode tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:22 }}>
        {Object.keys(MODES).map(m => (
          <button key={m} className={`btn btn-pill ${mode===m?"active":""}`} onClick={() => switchMode(m)}>
            {m==="focus"?"55 min — Focus":m==="short"?"5 min — Break":"15 min — Long"}
          </button>
        ))}
      </div>

      {/* Ring */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:22 }}>
        <div style={{ position:"relative", width:164, height:164 }}>
          <svg width="164" height="164" viewBox="0 0 164 164">
            {/* Outer tick marks */}
            {[...Array(60)].map((_,i) => {
              const a = (i/60)*2*Math.PI - Math.PI/2;
              const r1=76, r2=i%5===0?70:73;
              return (
                <line key={i}
                  x1={82+r1*Math.cos(a)} y1={82+r1*Math.sin(a)}
                  x2={82+r2*Math.cos(a)} y2={82+r2*Math.sin(a)}
                  stroke={i%5===0?"var(--b3)":"var(--b1)"} strokeWidth="1.5"
                />
              );
            })}
            {/* Track */}
            <circle cx="82" cy="82" r={R} fill="none" stroke="var(--b1)" strokeWidth="5" />
            {/* Progress */}
            <circle cx="82" cy="82" r={R} fill="none"
              stroke={ringColor} strokeWidth="5"
              strokeDasharray={C} strokeDashoffset={offset}
              className="timer-ring ring-track"
              style={{ filter: running ? "drop-shadow(0 0 6px rgba(61,220,132,0.5))":"none" }}
            />
          </svg>
          {/* Center text */}
          <div style={{
            position:"absolute", inset:0, display:"flex",
            flexDirection:"column", alignItems:"center", justifyContent:"center",
          }}>
            <span style={{ fontFamily:"var(--font-d)", fontSize:40, letterSpacing:2, color:"var(--tx)", lineHeight:1 }}>
              {fmt(sec)}
            </span>
            <span style={{ fontSize:10, color:"var(--tx4)", letterSpacing:3, textTransform:"uppercase", marginTop:4 }}>
              {mode}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button className="btn btn-icon" style={{ width:38, height:38 }}
            onClick={() => { setRun(false); setSec(MODES[mode]); }}>↺</button>
          <button className="btn" onClick={() => setRun(r => !r)} style={{
            padding:"10px 36px", borderRadius:100, fontWeight:700,
            fontSize:13, letterSpacing:0.5,
            background: running ? "var(--s4)" : "var(--tx)",
            color: running ? "var(--tx)" : "var(--bg)",
            border: `1px solid ${running ? "var(--b3)" : "var(--tx)"}`,
          }}>
            {running ? "⏸  Pause" : "▶  Start"}
          </button>
          <button className="btn btn-icon" style={{ width:38, height:38 }}
            onClick={() => setSec(s => Math.max(0, s-60))}>−1m</button>
        </div>

        {/* Session pips */}
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ fontSize:11, color:"var(--tx4)", marginRight:4 }}>Sessions</span>
          {[...Array(8)].map((_,i) => (
            <div key={i} style={{
              width:18, height:18, borderRadius:5,
              background: i < completed ? "var(--green)" : "var(--s4)",
              border:`1px solid ${i < completed ? "var(--green)" : "var(--b2)"}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.3s",
            }}>
              {i < completed && <span style={{ fontSize:9, color:"var(--bg)", fontWeight:800 }}>✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Music Player ── */
function MusicPlayer() {
  const [track,   setTrack]  = useState(0);
  const [playing, setPlay]   = useState(false);
  const [vol,     setVol]    = useState(72);
  const [prog,    setProg]   = useState(0);
  const progRef = useRef(null);

  useEffect(() => {
    if (playing) {
      progRef.current = setInterval(() => setProg(p => p >= 100 ? 0 : p + 0.15), 300);
    } else clearInterval(progRef.current);
    return () => clearInterval(progRef.current);
  }, [playing, track]);

  const prev = () => { setTrack(t => (t-1+TRACKS.length)%TRACKS.length); setProg(0); };
  const next = () => { setTrack(t => (t+1)%TRACKS.length); setProg(0); };

  return (
    <div className="panel" style={{ padding:24 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
        <span style={{ fontFamily:"var(--font-d)", fontSize:20, letterSpacing:3 }}>MUSIC</span>
        {playing && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:20 }}>
            {[...Array(6)].map((_,i) => <div key={i} className="eq-bar" style={{ height:8 }} />)}
          </div>
        )}
      </div>

      {/* Now playing card */}
      <div style={{
        background:"var(--s3)", border:"1px solid var(--b2)",
        borderRadius:12, padding:16, marginBottom:16,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
          <div style={{
            width:52, height:52, borderRadius:10,
            background:"var(--s5)", border:"1px solid var(--b3)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:26, flexShrink:0,
            boxShadow: playing ? "0 0 16px rgba(61,220,132,0.2)" : "none",
            transition:"box-shadow 0.3s",
          }}>
            {TRACKS[track].icon}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"var(--tx)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {TRACKS[track].title}
            </div>
            <div style={{ fontSize:11, color:"var(--tx4)", marginTop:3 }}>{TRACKS[track].artist}</div>
            <div style={{ fontSize:11, color:"var(--tx4)", marginTop:1 }}>{TRACKS[track].bpm} BPM · Lo-Fi</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height:3, background:"var(--s5)", borderRadius:2, marginBottom:12, cursor:"pointer" }}
          onClick={e => {
            const r = e.currentTarget.getBoundingClientRect();
            setProg(Math.round(((e.clientX - r.left) / r.width) * 100));
          }}>
          <div style={{
            height:"100%", width:`${Math.round(prog)}%`,
            background:"var(--tx)", borderRadius:2, transition:"width 0.3s linear",
          }} />
        </div>

        {/* Transport */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button className="btn btn-icon" onClick={prev}>⏮</button>
          <button className="btn" onClick={() => setPlay(p => !p)} style={{
            width:44, height:44, borderRadius:"50%",
            background: playing ? "var(--green)" : "var(--tx)",
            color:"var(--bg)", fontSize:15, border:"none",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontWeight:700, boxShadow: playing ? "0 0 16px rgba(61,220,132,0.35)" : "none",
            transition:"all 0.2s",
          }}>
            {playing ? "⏸" : "▶"}
          </button>
          <button className="btn btn-icon" onClick={next}>⏭</button>
        </div>
      </div>

      {/* Volume */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
        <span style={{ fontSize:13, color:"var(--tx4)", minWidth:14 }}>🔈</span>
        <input type="range" min="0" max="100" value={vol} onChange={e => setVol(+e.target.value)} style={{ flex:1 }} />
        <span style={{ fontSize:11, color:"var(--tx4)", minWidth:28 }}>{vol}%</span>
      </div>

      {/* Track list */}
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        <div className="sec-label" style={{ marginBottom:8 }}>Playlist</div>
        {TRACKS.map((t, i) => (
          <div key={t.id} className={`track-row ${i===track&&playing?"playing":""}`}
            onClick={() => { setTrack(i); setProg(0); }}>
            <span style={{ fontSize:18, width:26, textAlign:"center" }}>{t.icon}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{
                fontSize:12, fontWeight: i===track ? 600 : 400,
                color: i===track ? "var(--tx)" : "var(--tx3)",
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
              }}>{t.title}</div>
              <div style={{ fontSize:10, color:"var(--tx4)" }}>{t.artist}</div>
            </div>
            <span style={{ fontSize:10, color:"var(--tx4)" }}>{t.bpm}</span>
            {i===track && playing && (
              <div style={{ display:"flex", alignItems:"flex-end", gap:1.5, height:14 }}>
                {[...Array(4)].map((_,j) => <div key={j} className="eq-bar" style={{ height:6, animationDelay:j*0.15+"s" }} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Todo List ── */
function TodoList({ onUpdate }) {
  const [todos, setTodos] = useState([
    { id:1, text:"Review Chapter 4 — Calculus",      done:false, p:"high" },
    { id:2, text:"Complete Physics problem set",       done:false, p:"med"  },
    { id:3, text:"Read 30 pages of History",           done:false, p:"low"  },
    { id:4, text:"Practice 20 DSA problems",           done:true,  p:"high" },
  ]);
  const [input,    setInput]    = useState("");
  const [priority, setPriority] = useState("med");
  const [filter,   setFilter]   = useState("all");

  const pCol = { high:"var(--red)", med:"var(--yellow)", low:"var(--green)" };
  const pLabel = { high:"High", med:"Med", low:"Low" };

  const add = () => {
    if (!input.trim()) return;
    setTodos(t => [{ id:Date.now(), text:input.trim(), done:false, p:priority }, ...t]);
    setInput("");
  };
  const toggle = id => setTodos(t => t.map(x => x.id===id ? {...x,done:!x.done} : x));
  const del    = id => setTodos(t => t.filter(x => x.id!==id));

  const done  = todos.filter(t=>t.done).length;
  const total = todos.length;
  const pct   = total ? Math.round(done/total*100) : 0;

  useEffect(() => onUpdate?.(done), [done]);

  const visible = todos.filter(t =>
    filter==="all" ? true : filter==="done" ? t.done : !t.done
  );

  return (
    <div className="panel" style={{ padding:24, display:"flex", flexDirection:"column", gap:16, height:"100%" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"var(--font-d)", fontSize:20, letterSpacing:3 }}>TO-DO LIST</span>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:"var(--tx4)" }}>{done}/{total}</span>
          <div style={{
            width:40, height:40, borderRadius:"50%",
            background:`conic-gradient(var(--green) ${pct}%, var(--s5) ${pct}%)`,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <div style={{
              width:28, height:28, borderRadius:"50%",
              background:"var(--s1)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:10, fontWeight:700, color:"var(--green)",
            }}>{pct}%</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height:4, background:"var(--s4)", borderRadius:2 }}>
        <div style={{
          height:"100%", width:`${pct}%`,
          background:"linear-gradient(90deg, var(--green), #2ab86a)",
          borderRadius:2, transition:"width 0.4s ease",
        }} />
      </div>

      {/* Add input */}
      <div style={{ display:"flex", gap:8 }}>
        <input
          className="inp"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==="Enter" && add()}
          placeholder="Add a task and press Enter..."
          style={{ flex:1 }}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}
          style={{
            background:"var(--s3)", border:"1px solid var(--b1)", borderRadius:10,
            padding:"0 10px", color:"var(--tx3)", fontSize:12, outline:"none",
            cursor:"pointer", minWidth:60,
          }}>
          {["high","med","low"].map(p => <option key={p} value={p}>{pLabel[p]}</option>)}
        </select>
        <button className="btn" onClick={add} style={{
          width:40, height:40, borderRadius:10,
          background:"var(--tx)", color:"var(--bg)",
          fontSize:18, fontWeight:700, border:"none",
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
        }}>+</button>
      </div>

      {/* Filter tabs */}
      <div style={{ display:"flex", gap:6 }}>
        {["all","active","done"].map(f => (
          <button key={f} className={`btn btn-pill ${filter===f?"active":""}`}
            style={{ fontSize:11 }} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:6 }}>
        {visible.length===0 && (
          <div style={{ textAlign:"center", padding:"24px 0", color:"var(--tx4)", fontSize:13 }}>
            {filter==="done" ? "No completed tasks yet." : "All clear! Add a task above."}
          </div>
        )}
        {visible.map(t => (
          <div key={t.id} className="todo-enter" style={{
            display:"flex", alignItems:"center", gap:10,
            background: t.done ? "var(--s2)" : "var(--s3)",
            border:`1px solid ${t.done?"var(--b1)":"var(--b2)"}`,
            borderRadius:10, padding:"11px 14px",
            opacity: t.done ? 0.55 : 1,
            transition:"all 0.25s",
          }}>
            {/* Checkbox */}
            <div onClick={() => toggle(t.id)} style={{
              width:20, height:20, borderRadius:6, flexShrink:0,
              border:`2px solid ${t.done?"var(--green)":"var(--b3)"}`,
              background: t.done ? "var(--green)" : "transparent",
              cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.2s",
            }}>
              {t.done && <span style={{ fontSize:11, color:"var(--bg)", fontWeight:900 }}>✓</span>}
            </div>

            {/* Text */}
            <div style={{
              flex:1, fontSize:13, fontWeight:t.done?400:500,
              color: t.done ? "var(--tx4)" : "var(--tx2)",
              textDecoration: t.done ? "line-through" : "none",
              overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
            }}>{t.text}</div>

            {/* Priority dot */}
            <div style={{
              width:7, height:7, borderRadius:"50%",
              background:pCol[t.p], flexShrink:0,
              boxShadow:`0 0 6px ${pCol[t.p]}55`,
            }} title={pLabel[t.p]} />

            {/* Delete */}
            <button className="btn" onClick={() => del(t.id)} style={{
              color:"var(--b3)", background:"none",
              fontSize:16, lineHeight:1, padding:"0 2px",
              flexShrink:0,
            }}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 30-Day Challenge ── */
function ThirtyDayChallenge({ onStreakUpdate }) {
  const today = new Date().getDate();
  const month = new Date().toLocaleString("default",{month:"long"});

  const [studied, setStudied] = useState(() => {
    const s = {};
    // Simulate realistic data
    for (let i=1; i<=today; i++) {
      if (i <= today-1) s[i] = Math.random() > 0.25;
    }
    return s;
  });

  const [showPrize, setShowPrize] = useState(false);

  const toggle = d => {
    if (d > today) return;
    setStudied(prev => ({ ...prev, [d]: !prev[d] }));
  };

  const done   = Object.values(studied).filter(Boolean).length;
  const pct    = Math.round(done / 30 * 100);

  // Compute current streak
  const streak = (() => {
    let s=0;
    for(let i=today; i>=1; i--){
      if(studied[i]) s++; else break;
    }
    return s;
  })();

  useEffect(() => onStreakUpdate?.(streak), [streak]);
  useEffect(() => { if(done>=30) setShowPrize(true); }, [done]);

  const barColor = pct>=80 ? "var(--green)" : pct>=50 ? "var(--yellow)" : "var(--red)";

  return (
    <div className="panel" style={{ padding:24 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <span style={{ fontFamily:"var(--font-d)", fontSize:20, letterSpacing:3 }}>30-DAY CHALLENGE</span>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span className="flame" style={{ fontSize:20 }}>🔥</span>
          <div>
            <span style={{ fontFamily:"var(--font-d)", fontSize:26, color:"var(--yellow)", lineHeight:1 }}>{streak}</span>
            <span style={{ fontSize:10, color:"var(--tx4)", display:"block" }}>streak</span>
          </div>
        </div>
      </div>

      {/* Month label + progress */}
      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
          <span style={{ fontSize:12, color:"var(--tx3)", fontWeight:500 }}>{month} — {done}/30 days</span>
          <span style={{ fontSize:12, fontWeight:700, color:barColor }}>{pct}%</span>
        </div>
        <div style={{ height:6, background:"var(--s4)", borderRadius:3 }}>
          <div style={{
            height:"100%", width:`${pct}%`, background:barColor,
            borderRadius:3, transition:"width 0.4s ease",
            boxShadow: pct>0 ? `0 0 8px ${barColor}55` : "none",
          }} />
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(10,1fr)", gap:5, marginBottom:16 }}>
        {[...Array(30)].map((_,i) => {
          const day   = i+1;
          const past  = day <= today;
          const done  = studied[day];
          const isToday = day===today;
          return (
            <div key={day} className="day-cell"
              onClick={() => toggle(day)}
              title={`Day ${day}${done?" — studied":""}`}
              style={{
                background: done ? "var(--green)" : isToday ? "var(--s5)" : past ? "var(--s3)" : "var(--s2)",
                border:`1px solid ${done?"var(--green)":isToday?"var(--b3)":past?"var(--b1)":"var(--b1)"}`,
                color: done ? "var(--bg)" : isToday ? "var(--tx)" : past ? "var(--tx4)" : "var(--b3)",
                boxShadow: done ? "0 0 8px rgba(61,220,132,0.3)" : "none",
                cursor: past ? "pointer" : "default",
                outline: isToday ? "1px solid var(--tx3)" : "none",
                outlineOffset:"2px",
              }}>
              {done ? "✓" : day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:14, marginBottom:16 }}>
        {[
          { col:"var(--green)", label:"Studied" },
          { col:"var(--s5)",   label:"Today" },
          { col:"var(--s3)",   label:"Missed" },
          { col:"var(--s2)",   label:"Future" },
        ].map(l => (
          <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:10, height:10, borderRadius:3, background:l.col }} />
            <span style={{ fontSize:10, color:"var(--tx4)" }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Prize card */}
      <div className={done>=30?"prize-active":""} style={{
        background:"var(--s3)",
        border:`1px solid ${done>=30?"var(--green)":"var(--b2)"}`,
        borderRadius:12, padding:16,
        display:"flex", alignItems:"center", gap:14,
        transition:"border-color 0.4s",
      }}>
        <div style={{
          width:52, height:52, borderRadius:12, flexShrink:0,
          background:"var(--s5)", border:"1px solid var(--b3)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:26,
        }}>🏆</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"var(--tx)", marginBottom:4 }}>
            30-Day Scholar Certification
          </div>
          <div style={{ fontSize:11, color:"var(--tx4)", lineHeight:1.5 }}>
            Study every day for 30 days to unlock your exclusive TalentBridge Scholar badge + profile certification.
          </div>
        </div>
        <div style={{ textAlign:"center", flexShrink:0 }}>
          <div style={{
            fontFamily:"var(--font-d)", fontSize:32,
            color: done>=30 ? "var(--green)" : "var(--tx4)",
            lineHeight:1, transition:"color 0.3s",
          }}>{done>=30?"🎉":30-done}</div>
          <div style={{ fontSize:10, color:"var(--tx4)" }}>{done>=30?"DONE!":"days left"}</div>
        </div>
      </div>

      {/* Prize unlocked banner */}
      {showPrize && (
        <div style={{
          marginTop:12, background:"rgba(61,220,132,0.08)",
          border:"1px solid var(--green)", borderRadius:12,
          padding:"14px 18px", textAlign:"center",
        }}>
          <div style={{ fontSize:24, marginBottom:6 }}>🎉</div>
          <div style={{ fontFamily:"var(--font-d)", fontSize:18, color:"var(--green)", letterSpacing:3 }}>
            CHALLENGE COMPLETE!
          </div>
          <div style={{ fontSize:12, color:"var(--tx3)", marginTop:6 }}>
            Your 30-Day Scholar badge has been unlocked. Check your TalentBridge profile.
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main App ── */
export default function FocusSession() {
  const [sessionsDone,  setSessionsDone ] = useState(0);
  const [streakDays,    setStreakDays   ] = useState(0);
  const [todosComplete, setTodosComplete] = useState(1);

  // Inject global styles once
  useEffect(() => {
    const id = "fs-global-css";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div style={{ minHeight:"100vh", position:"relative" }}>
      {/* Atmosphere */}
      <div className="noise-layer" />
      <div className="dot-grid" />
      <div className="radial-glow" />

      {/* Content */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"36px 24px 60px", position:"relative", zIndex:1 }}>

        <Header sessionsDone={sessionsDone} />

        <StatsRow sessionsDone={sessionsDone} streakDays={streakDays} todosComplete={todosComplete} />

        {/* Main grid — 3 columns */}
        <div className="main-grid" style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr 1fr",
          gap:16,
          marginBottom:16,
          alignItems:"start",
        }}>
          {/* Col 1: Timer + Music */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <PomodoroTimer onSessionComplete={() => setSessionsDone(n => n+1)} />
            <MusicPlayer />
          </div>

          {/* Col 2: Todo */}
          <div style={{ minHeight:600 }}>
            <TodoList onUpdate={n => setTodosComplete(n)} />
          </div>

          {/* Col 3: 30-day challenge */}
          <div>
            <ThirtyDayChallenge onStreakUpdate={n => setStreakDays(n)} />
          </div>
        </div>

        {/* Whiteboard — full width */}
        <Whiteboard />

        {/* Footer */}
        <div style={{
          marginTop:28, paddingTop:20,
          borderTop:"1px solid var(--b1)",
          display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12,
        }}>
          <span style={{ fontFamily:"var(--font-d)", fontSize:12, letterSpacing:5, color:"var(--b3)" }}>
            TALENTBRIDGE FOCUS STUDIO © 2026
          </span>
          <span style={{ fontSize:12, color:"var(--tx4)", fontStyle:"italic" }}>
            Every session counts. Keep going, scholar. 💪
          </span>
        </div>
      </div>
    </div>
  );
}
