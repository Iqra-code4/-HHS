import { STYLES, Ic, CONTACTS, Av, CHANNELS, SHARED_FILES, FOLDERS, EMOJIS, CALL_MEMBERS, buildMessages } from './App';
import {Components, FileIcon} from './Components';
import { useState, useEffect } from 'react'

const VideoCall = ({ onEnd, isGroup, contact }) => {
    const [muted, setMuted] = useState(false);
    const [camOff, setCamOff] = useState(false);
    const [screenShare, setScreenShare] = useState(false);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setElapsed(e => e+1), 1000);
        return () => clearInterval(t);
    }, []);

    const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
    const members = isGroup ? CALL_MEMBERS : [CALL_MEMBERS[0], CALL_MEMBERS[3]];
    const cols = members.length <= 2 ? "1fr 1fr" : members.length <= 4 ? "1fr 1fr" : "repeat(3,1fr)";

    return (
        <div className="video-overlay fade-in">
        <div className="video-header">
            <div>
            <div className="call-title">{isGroup ? "GROUP CALL — DEV TEAM" : `CALL WITH ${contact?.name?.toUpperCase()}`}</div>
            <div className="call-duration">
                <span style={{ color:"#3ddc84", marginRight:6 }}>●</span>
                {fmt(elapsed)} · {members.length} participants
            </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
            <button className="icon-btn" onClick={() => setScreenShare(s => !s)} style={screenShare ? {background:"#2a2a2a",borderColor:"#444",color:"#f5f5f5"} : {}}>
                {Ic.Share(16)}
            </button>
            <button className="icon-btn">{Ic.Users(16)}</button>
            </div>
        </div>

        <div className="video-grid" style={{ gridTemplateColumns: cols, gridTemplateRows: members.length <= 2 ? "1fr" : "1fr 1fr" }}>
            {members.map(m => (
            <div key={m.id} className={`video-tile ${m.speaking ? "speaking" : ""} ${m.isMe ? "me" : ""}`}>
                {screenShare && m.isMe ? (
                <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10 }}>
                    <div style={{ color:"#3ddc84" }}>{Ic.Share(32)}</div>
                    <span style={{ fontSize:12, color:"#555" }}>Sharing screen</span>
                </div>
                ) : (
                <Av initials={m.initials} size={72} radius="50%" />
                )}
                <div className="video-name">{m.name}{m.isMe ? " (You)" : ""}</div>
                {m.muted && (
                <div className="video-muted">{Ic.MicOff(11)} Muted</div>
                )}
                {m.speaking && !m.muted && (
                <div style={{ position:"absolute", bottom:36, left:12, display:"flex", gap:2, alignItems:"flex-end", height:16 }}>
                    {[4,8,12,8,4].map((h,i) => (
                    <div key={i} style={{ width:3, height:h, background:"#3ddc84", borderRadius:2, animation:`typingBounce 0.8s ease-in-out infinite`, animationDelay:`${i*0.1}s` }} />
                    ))}
                </div>
                )}
            </div>
            ))}
        </div>

        <div className="call-controls">
            <button className={`ctrl-btn ${muted ? "active" : "normal"}`} onClick={() => setMuted(m => !m)} title={muted ? "Unmute" : "Mute"}>
            {muted ? Ic.MicOff(20) : Ic.Mic(20)}
            </button>
            <button className={`ctrl-btn ${camOff ? "active" : "normal"}`} onClick={() => setCamOff(c => !c)} title={camOff ? "Turn on camera" : "Turn off camera"}>
            {camOff ? Ic.VideoOff(20) : Ic.Video(20)}
            </button>
            <button className={`ctrl-btn ${screenShare ? "active" : "normal"}`} onClick={() => setScreenShare(s => !s)}>
            {Ic.Share(18)}
            </button>
            <button className="ctrl-btn end" onClick={onEnd} title="End call">
            {Ic.PhoneOff(20)}
            </button>
        </div>
        </div>
    );
}

export default VideoCall;