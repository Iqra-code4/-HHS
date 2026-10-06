import React from "react";
import { JOBS_DATA } from "./Data";
import { useState } from "react";

/* ═══════════════════════════════════════════════
   INVITE MODAL
═══════════════════════════════════════════════ */
function InviteModal({ candidate, job, onClose }) {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState(
    `Hi ${candidate.name.split(" ")[0]},\n\nI came across your profile and I'm impressed by your background. I think you'd be a fantastic fit for our ${job?.title || "open role"} position.\n\nWe'd love to hop on a quick call to tell you more about the role and our team. Would you be available this week?\n\nLooking forward to hearing from you!`
  );

  if (sent) return (
    <div className="fade-in" style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.82)",
      backdropFilter: "blur(10px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 200
    }}>
      <div className="scale-in" style={{
        background: T.s2, border: `1px solid ${T.b2}`, borderRadius: 18,
        padding: "40px 32px", maxWidth: 400, width: "90%", textAlign: "center"
      }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(61,220,132,.1)", border: "1px solid rgba(61,220,132,.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <span style={{ color: T.green, transform: "scale(1.4)" }}>{Icons.check}</span>
        </div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", letterSpacing: ".04em", color: T.white, marginBottom: 8 }}>Invitation Sent!</div>
        <p style={{ fontSize: 13, color: T.t3, lineHeight: 1.65, marginBottom: 22 }}>
          <strong style={{ color: T.t1 }}>{candidate.name}</strong> has been invited to apply for <strong style={{ color: T.t1 }}>{job?.title}</strong>. They'll receive a notification immediately.
        </p>
        <button onClick={onClose} style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
          background: T.white, color: T.bg, border: "none", borderRadius: 7, padding: "11px 28px", cursor: "pointer"
        }}>Done</button>
      </div>
    </div>
  );

  return (
    <div className="fade-in" style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.82)",
      backdropFilter: "blur(10px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 200, padding: 16
    }}>
      <div className="scale-in" style={{
        background: T.s2, border: `1px solid ${T.b2}`, borderRadius: 18,
        width: "100%", maxWidth: 500, overflow: "hidden"
      }}>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.b1}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.35rem", letterSpacing: ".04em", color: T.white }}>Invite Candidate</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.t3, cursor: "pointer", padding: 4 }}>{Icons.close}</button>
        </div>

        <div style={{ padding: "18px 22px" }}>
          {/* Candidate preview */}
          <div style={{ display: "flex", alignItems: "center", gap: 11, background: T.s3, border: `1px solid ${T.b1}`, borderRadius: 10, padding: "11px 13px", marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 9, background: T.s4,
              border: `1px solid ${T.b2}`, display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, color: T.t3, flexShrink: 0
            }}>{candidate.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.t1 }}>{candidate.name}</div>
              <div style={{ fontSize: 11, color: T.t3 }}>{candidate.role} · {candidate.exp}</div>
            </div>
            <span style={{
              fontSize: 9, fontWeight: 800, background: candidate.match >= 95 ? "rgba(61,220,132,.1)" : "rgba(245,197,66,.08)",
              color: candidate.match >= 95 ? T.green : T.yellow,
              border: `1px solid ${candidate.match >= 95 ? "rgba(61,220,132,.2)" : "rgba(245,197,66,.2)"}`,
              padding: "3px 8px", borderRadius: 4
            }}>{candidate.match}% match</span>
          </div>

          {job && <div style={{ fontSize: 12, color: T.t3, marginBottom: 12 }}>Role: <strong style={{ color: T.t1 }}>{job.title}</strong></div>}

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: T.t4, marginBottom: 6 }}>Interview Format</div>
            <select style={{ width: "100%", background: T.s3, border: `1px solid ${T.b2}`, borderRadius: 8, padding: "9px 12px", fontSize: 12.5, color: T.t1, outline: "none", appearance: "none" }}>
              <option>Video Call — 30 minutes</option>
              <option>Phone Screen — 20 minutes</option>
              <option>Technical Interview — 60 minutes</option>
              <option>On-site Interview — Half day</option>
            </select>
          </div>

          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: T.t4, marginBottom: 6 }}>Personal Message</div>
            <textarea
              value={msg} onChange={e => setMsg(e.target.value)}
              style={{ width: "100%", background: T.s3, border: `1px solid ${T.b2}`, borderRadius: 8, padding: "9px 12px", fontSize: 12, color: T.t1, outline: "none", resize: "vertical", minHeight: 120, lineHeight: 1.65 }}
              rows={5}
            />
          </div>
        </div>

        <div style={{ padding: "12px 22px", borderTop: `1px solid ${T.b1}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} style={{
            fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase",
            background: "transparent", color: T.t3, border: `1px solid ${T.b2}`,
            borderRadius: 7, padding: "8px 16px", cursor: "pointer"
          }}>Cancel</button>
          <button onClick={() => setSent(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase",
            background: T.white, color: T.bg, border: "none",
            borderRadius: 7, padding: "8px 18px", cursor: "pointer"
          }}>Send Invitation {Icons.arrow}</button>
        </div>
      </div>
    </div>
  );
}

export default InviteModal;