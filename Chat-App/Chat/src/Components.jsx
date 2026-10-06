import React from 'react'
import { STYLES, Ic, CONTACTS, CHANNELS, SHARED_FILES, FOLDERS, EMOJIS, CALL_MEMBERS, buildMessages } from './App';
import VideoCall from './VideoCall';

const Components = () => {
  const colors = ["#2a2a2a","#252525","#1e1e1e","#232323","#1a1a1a"];
    const col = colors[initials.charCodeAt(0) % colors.length];
    return (
      <div style={{
        width:size, height:size, borderRadius:radius,
        background:col, display:"flex", alignItems:"center", justifyContent:"center",
        fontSize: size*0.32, fontWeight:700, color:"#e0e0e0",
        flexShrink:0, border:"1.5px solid #2a2a2a", ...style,
      }}>{initials}</div>
    );
  }

  function FileIcon({ type, size=15 }) {
    const c = { pdf:"#ff6b6b", fig:"#a855f7", zip:"#f59e0b", doc:"#60a5fa", xls:"#3ddc84", img:"#f472b6" };
    const t = type === "pdf" ? "PDF" : type === "fig" ? "FIG" : type === "zip" ? "ZIP" : type === "doc" ? "DOC" : type === "xls" ? "XLS" : "IMG";
    return (
      <div style={{ color: c[type] || "#888", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontSize:10, fontWeight:800, fontFamily:"'Bebas Neue', sans-serif", letterSpacing:"0.05em" }}>{t}</div>
      </div>
    );
  }

export {Components, FileIcon};