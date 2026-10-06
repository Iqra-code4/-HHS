import {useState, useEffect, useRef} from 'react'
import { STYLES, Ic, CONTACTS, Av, CHANNELS, SHARED_FILES, FOLDERS, EMOJIS, CALL_MEMBERS, buildMessages } from './App';
import {Components, FileIcon} from './Components';
import VideoCall from './VideoCall';

const RightPanel = ({ contact, messages }) => {
    const [tab, setTab] = useState("members");
    const files = messages.filter(m => m.type === "file");

    return (
        <div className="right-panel">
        <div className="rp-header">
            <div>
            <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"1rem", letterSpacing:"0.06em", color:"#f5f5f5" }}>
                {contact?.isGroup ? "GROUP INFO" : "CONTACT INFO"}
            </div>
            <div style={{ fontSize:"11px", color:"#555", marginTop:2 }}>{contact?.role}</div>
            </div>
            <div style={{ display:"flex", gap:6 }}>
            <button className="icon-btn">{Ic.Bell(14)}</button>
            <button className="icon-btn">{Ic.Pin(14)}</button>
            </div>
        </div>

        {/* Profile */}
        <div style={{ padding:"16px 12px 8px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, borderBottom:"1px solid #1a1a1a" }}>
            <Av initials={contact?.initials || "??"} size={56} radius="14px" />
            <div style={{ textAlign:"center" }}>
            <div style={{ fontWeight:700, fontSize:"14px", color:"#f5f5f5" }}>{contact?.name}</div>
            <div style={{ fontSize:"11px", color:"#555", marginTop:2 }}>{contact?.role}</div>
            </div>
        </div>

        <div className="rp-tabs">
            {["members","files","folders"].map(t => (
            <button key={t} className={`rp-tab ${tab===t ? "active" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
            ))}
        </div>

        <div className="rp-scroll" style={{ marginTop:10 }}>
            {tab === "members" && (
            <>
                <div className="section-label">Participants</div>
                {CALL_MEMBERS.map(m => (
                <div key={m.id} className="member-row">
                    <Av initials={m.initials} size={32} radius="8px" />
                    <div style={{ flex:1 }}>
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.isMe ? "That's you" : "Member"}</div>
                    </div>
                    <div className={`member-status ${m.speaking ? "status-online" : ""}`}>
                    {m.speaking ? "● Online" : "Away"}
                    </div>
                </div>
                ))}
            </>
            )}

            {tab === "files" && (
            <>
                <div className="section-label">Shared Files</div>
                {SHARED_FILES.map((f,i) => (
                <div key={i} className="file-row">
                    <div className="file-row-icon"><FileIcon type={f.type} /></div>
                    <div style={{ flex:1, overflow:"hidden" }}>
                    <div className="file-row-name">{f.name}</div>
                    <div className="file-row-meta">{f.size} · {f.date}</div>
                    </div>
                    <button className="input-icon-btn" style={{ color:"#444" }}>{Ic.Download(13)}</button>
                </div>
                ))}
            </>
            )}

            {tab === "folders" && (
            <>
                <div className="section-label">Shared Folders</div>
                {FOLDERS.map((f,i) => (
                <div key={i} className="folder-item">
                    <div className="folder-icon">{Ic.Folder(15)}</div>
                    <div style={{ flex:1 }}>
                    <div style={{ fontSize:"12px", fontWeight:600, color:"#f0f0f0" }}>{f.name}</div>
                    <div style={{ fontSize:"10px", color:"#555", marginTop:1 }}>{f.files} files</div>
                    </div>
                </div>
                ))}
                <button style={{ width:"100%", marginTop:12, background:"transparent", border:"1px dashed #2a2a2a", borderRadius:8, padding:"10px", color:"#444", fontSize:"12px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, transition:"all 0.15s", fontFamily:"'Outfit', sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#404040"; e.currentTarget.style.color="#888"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#2a2a2a"; e.currentTarget.style.color="#444"; }}>
                {Ic.Plus(14)} New Folder
                </button>
            </>
            )}
        </div>
        </div>
    );
    }

    /* ─── Message Bubble ─── */
    function MessageBubble({ msg }) {
    if (msg.type === "file") return (
        <div className="file-bubble">
        <div className="file-icon-box"><FileIcon type={msg.fileType} /></div>
        <div style={{ flex:1, overflow:"hidden" }}>
            <div className="file-name">{msg.fileName}</div>
            <div className="file-size">{msg.fileSize}</div>
        </div>
        <button className="input-icon-btn" style={{ color:"#555" }}>{Ic.Download(13)}</button>
        </div>
    );

    if (msg.type === "image") return (
        <div className="img-bubble">
        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8, color:"#333" }}>
            {Ic.Image(28)}
            <span style={{ fontSize:"11px", color:"#444" }}>{msg.imgLabel}</span>
        </div>
        </div>
    );

    return <div className="msg-bubble">{msg.text}</div>;
}

export {RightPanel, MessageBubble} ;