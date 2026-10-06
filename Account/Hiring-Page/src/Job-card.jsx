import React from "react";
import { useState } from "react";
import { T, Badge, SectionLabel, MetaItem, Divider, Ic, Icons } from "./App";

/* ═══════════════════════════════════════════════
   JOB CARD
═══════════════════════════════════════════════ */
function JobCard({ job, selected, onSelect, animDelay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="fade-up"
      style={{ animationDelay: `${animDelay}ms`, marginBottom: 8 }}
      onClick={() => onSelect(job)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        background: selected ? T.s3 : hov ? T.s2 : T.s1,
        border: `1px solid ${selected ? T.b3 : hov ? T.b2 : T.b1}`,
        borderLeft: `2px solid ${selected ? T.white : "transparent"}`,
        borderRadius: 10, padding: "13px 14px", cursor: "pointer",
        transition: "all .18s", position: "relative", overflow: "hidden"
      }}>
        {/* urgent glow */}
        {job.urgent && (
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "30%",
            background: `radial-gradient(ellipse at 100% 50%, rgba(245,197,66,.04) 0%, transparent 70%)`,
            pointerEvents: "none"
          }} />
        )}

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: selected ? T.s5 : T.s4,
            border: `1px solid ${T.b2}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 800, color: selected ? T.t2 : T.t4,
            letterSpacing: ".05em", flexShrink: 0, fontFamily: "'DM Sans',sans-serif"
          }}>{job.logo}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "1.08rem", letterSpacing: ".02em",
              color: selected ? T.white : T.t1,
              lineHeight: 1, marginBottom: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
            }}>{job.title}</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <Badge>{job.dept}</Badge>
              <Badge variant="white">{job.type}</Badge>
              {job.remote && <Badge variant="remote">Remote</Badge>}
              {job.urgent && <Badge variant="urgent">Urgent</Badge>}
            </div>
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <MetaItem icon={Icons.map}>{job.loc}</MetaItem>
          <MetaItem icon={Icons.dollar}>{job.salary}</MetaItem>
          <MetaItem icon={Icons.clock}>{job.posted}</MetaItem>
          <MetaItem icon={Icons.users}>{job.applicants}</MetaItem>
        </div>
      </div>
    </div>
  );
}

export default JobCard;