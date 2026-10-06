import React from "react"; 
import { useState } from "react";
import {T, Badge, SectionLabel, MetaItem, Divider, Ic, Icons} from './App'

/* ═══════════════════════════════════════════════
   CANDIDATE CARD
═══════════════════════════════════════════════ */
function CandidateCard({ c, selectedJob, onInvite, animDelay = 0 }) {
  const [hov, setHov] = useState(false);
  const isHighMatch = c.match >= 95;

  return (
    <div
      className="fade-up"
      style={{ animationDelay: `${animDelay}ms`, marginBottom: 10 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        background: hov ? T.s3 : T.s2,
        border: `1px solid ${hov ? T.b2 : T.b1}`,
        borderLeft: `2px solid ${isHighMatch ? T.green : "transparent"}`,
        borderRadius: 10, padding: "14px 16px",
        transition: "all .18s"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 11 }}>
          {/* Avatar */}
          <div style={{
            width: 42, height: 42, borderRadius: 10, flexShrink: 0,
            background: T.s4, border: `1px solid ${T.b2}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, color: T.t3
          }}>{c.initials}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.05rem", letterSpacing: ".02em", color: T.white, lineHeight: 1 }}>{c.name}</div>
              {/* Match badge */}
              <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: ".1em",
                background: isHighMatch ? "rgba(61,220,132,.1)" : "rgba(245,197,66,.08)",
                color: isHighMatch ? T.green : T.yellow,
                border: `1px solid ${isHighMatch ? "rgba(61,220,132,.2)" : "rgba(245,197,66,.2)"}`,
                padding: "3px 8px", borderRadius: 4, flexShrink: 0
              }}>
                {isHighMatch ? Icons.spark : null}{c.match}% match
              </span>
            </div>
            <div style={{ fontSize: 11, color: T.t3 }}>{c.role} · {c.exp} exp.</div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
          {c.skills.map(s => (
            <span key={s} style={{
              fontSize: 10, fontWeight: 600, letterSpacing: ".05em",
              color: T.t4, border: `1px solid ${T.b1}`,
              padding: "3px 8px", borderRadius: 4
            }}>{s}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: `1px solid ${T.b1}`, paddingTop: 10
        }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <MetaItem icon={Icons.dollar}>{c.salary}</MetaItem>
            <MetaItem icon={Icons.map}>{c.loc}</MetaItem>
            <MetaItem icon={Icons.clock} color={T.green}>{c.avail}</MetaItem>
            {/* Stars */}
            <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {Array.from({ length: c.rating }, (_, i) => (
                <span key={i} style={{ color: T.white }}>{Icons.star}</span>
              ))}
              {Array.from({ length: 5 - c.rating }, (_, i) => (
                <span key={i} style={{ color: T.t4 }}>{Icons.star}</span>
              ))}
            </span>
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <button style={{
              fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase",
              background: "transparent", color: T.t3, border: `1px solid ${T.b2}`,
              borderRadius: 6, padding: "5px 11px", cursor: "pointer"
            }}>{Icons.eye}</button>
            <button onClick={() => onInvite(c)} style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase",
              background: T.white, color: T.bg, border: "none",
              borderRadius: 6, padding: "5px 12px", cursor: "pointer", transition: "background .18s"
            }}>Invite {Icons.arrow}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;