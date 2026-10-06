import React from 'react'
import { JOBS_DATA } from './Data'
import {T, Badge, SectionLabel, MetaItem, Divider, Ic, Icons} from './App'

/* ═══════════════════════════════════════════════
   JOB DETAIL PANEL
═══════════════════════════════════════════════ */
function JobDetail({ job, onFindCandidates, onEditJob }) {
  if (!job) return (
    <div className="dot-grid" style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", borderRadius: 14, border: `1px solid ${T.b1}`,
      padding: 40, gap: 8
    }}>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.4rem", letterSpacing: ".04em", color: T.t4, lineHeight: 1 }}>SELECT A ROLE</div>
      <div style={{ fontSize: 13, color: T.t4 }}>Click any listing on the left to view full details</div>
    </div>
  );

  return (
    <div className="scale-in" key={job.id} style={{
      background: T.s1, border: `1px solid ${T.b1}`, borderRadius: 14,
      overflow: "hidden", display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{ padding: "20px 24px 18px", borderBottom: `1px solid ${T.b1}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: T.s4,
                border: `1px solid ${T.b2}`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 11, fontWeight: 800, color: T.t3, flexShrink: 0
              }}>{job.logo}</div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem", letterSpacing: ".02em", color: T.white, lineHeight: .95 }}>{job.title}</div>
                <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>{job.dept} · Hire and Hired Stars</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Badge>{job.dept}</Badge>
              <Badge variant="white">{job.type}</Badge>
              {job.remote && <Badge variant="remote">Remote OK</Badge>}
              {job.urgent && <Badge variant="urgent">Urgent Hire</Badge>}
            </div>
          </div>

          <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
            <button onClick={onEditJob} style={{
              fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
              background: "transparent", color: T.t3, border: `1px solid ${T.b2}`,
              borderRadius: 7, padding: "8px 14px", cursor: "pointer", transition: "all .18s"
            }}>Edit</button>
            <button onClick={onFindCandidates} style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
              background: T.white, color: T.bg, border: "none",
              borderRadius: 7, padding: "8px 16px", cursor: "pointer", transition: "background .18s"
            }}>
              {Icons.spark} Find Candidates
            </button>
          </div>
        </div>

        {/* Meta strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1,
          background: T.b1, borderRadius: 8, overflow: "hidden", border: `1px solid ${T.b1}`
        }}>
          {[
            [Icons.dollar, "Salary", job.salary],
            [Icons.map, "Location", job.loc],
            [Icons.clock, "Posted", job.posted],
            [Icons.users, "Applicants", `${job.applicants} applied`],
          ].map(([icon, label, val]) => (
            <div key={label} style={{ background: T.s2, padding: "10px 12px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: T.t4, marginBottom: 3 }}>{label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: T.t1 }}>
                <span style={{ color: T.t3 }}>{icon}</span>{val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
        {/* Description */}
        <div style={{ marginBottom: 22 }}>
          <SectionLabel>About the Role</SectionLabel>
          {job.desc.split("\n\n").map((para, i) => (
            <p key={i} style={{ fontSize: 13, color: T.t2, lineHeight: 1.75, marginBottom: i < job.desc.split("\n\n").length - 1 ? 10 : 0 }}>{para}</p>
          ))}
        </div>

        <Divider style={{ marginBottom: 20 }} />

        {/* Requirements */}
        <div style={{ marginBottom: 22 }}>
          <SectionLabel>Requirements</SectionLabel>
          {job.reqs.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 8 }}>
              <span style={{ color: T.green, marginTop: 1, flexShrink: 0 }}>{Icons.check}</span>
              <span style={{ fontSize: 13, color: T.t2, lineHeight: 1.6 }}>{r}</span>
            </div>
          ))}
        </div>

        {/* Nice to have */}
        {job.nice?.length > 0 && (
          <div>
            <SectionLabel>Nice to Have</SectionLabel>
            {job.nice.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 8 }}>
                <span style={{ color: T.t4, marginTop: 1, flexShrink: 0 }}>{Icons.check}</span>
                <span style={{ fontSize: 13, color: T.t3, lineHeight: 1.6 }}>{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div style={{
        padding: "14px 24px", borderTop: `1px solid ${T.b1}`,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span style={{ fontSize: 12, color: T.t4 }}>Share this listing with your network</span>
        <div style={{ display: "flex", gap: 7 }}>
          <button style={{
            fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
            background: "transparent", color: T.t3, border: `1px solid ${T.b2}`,
            borderRadius: 6, padding: "6px 12px", cursor: "pointer"
          }}>{Icons.eye} Preview</button>
          <button style={{
            fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
            background: T.s4, color: T.t2, border: `1px solid ${T.b2}`,
            borderRadius: 6, padding: "6px 12px", cursor: "pointer"
          }}>{Icons.mail} Share</button>
        </div>
      </div>
    </div>
  );
}

export default JobDetail