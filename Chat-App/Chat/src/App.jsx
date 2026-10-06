import {useState, useEffect, useRef, useCallback } from 'react'
import {RightPanel, MessageBubble} from './RightPanel';
import VideoCall from './VideoCall';
import {Components} from './Components';


  const Av = ({ initials, size=32, radius=8, style={} }) => {
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

  const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #080808;
    --s1:       #0f0f0f;
    --s2:       #141414;
    --s3:       #1a1a1a;
    --s4:       #202020;
    --s5:       #2a2a2a;
    --border:   #242424;
    --border2:  #303030;
    --t1:       #f5f5f5;
    --t2:       #999999;
    --t3:       #555555;
    --t4:       #333333;
    --white:    #ffffff;
    --green:    #3ddc84;
    --red:      #ff4545;
    --yellow:   #f5c542;
  }

  body {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--t1);
    height: 100vh;
    overflow: hidden;
  }

  /* scrollbar */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--s5); border-radius: 4px; }

  /* layout */
  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ── SIDEBAR NAV ── */
  .sidenav {
    width: 64px;
    background: var(--s1);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 0;
    gap: 4px;
    flex-shrink: 0;
    z-index: 10;
  }

  .logo-mark {
    width: 36px; height: 36px;
    background: var(--white);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; color: var(--bg);
    margin-bottom: 18px;
    flex-shrink: 0;
  }

  .nav-icon-btn {
    width: 42px; height: 42px;
    border-radius: 10px;
    border: none; background: transparent;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: var(--t3);
    transition: all 0.18s ease;
    position: relative;
    flex-shrink: 0;
  }
  .nav-icon-btn:hover { background: var(--s4); color: var(--t2); }
  .nav-icon-btn.active { background: var(--white); color: var(--bg); }

  .nav-badge {
    position: absolute; top: 6px; right: 6px;
    width: 8px; height: 8px;
    background: var(--green);
    border-radius: 50%;
    border: 2px solid var(--s1);
  }

  .nav-spacer { flex: 1; }

  .avatar-sm {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: var(--s5);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    color: var(--t1);
    cursor: pointer;
    flex-shrink: 0;
    border: 2px solid var(--border2);
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .avatar-sm:hover { border-color: var(--white); }

  /* ── CHANNELS PANEL ── */
  .channels-panel {
    width: 260px;
    background: var(--s2);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
  }

  .panel-header {
    padding: 16px 16px 12px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .panel-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.15rem;
    letter-spacing: 0.06em;
    color: var(--white);
  }

  .search-bar {
    width: 100%;
    background: var(--s4);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 12px 8px 34px;
    font-family: 'Outfit', sans-serif;
    font-size: 12px; color: var(--t1);
    outline: none;
    transition: border-color 0.2s;
    margin-top: 10px;
  }
  .search-bar::placeholder { color: var(--t4); }
  .search-bar:focus { border-color: var(--border2); }
  .search-wrap { position: relative; }
  .search-icon-pos { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--t3); pointer-events: none; }

  .channels-scroll { overflow-y: auto; flex: 1; padding: 8px 8px; }

  .section-label {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--t3);
    padding: 10px 8px 6px;
  }

  .channel-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
  }
  .channel-item:hover { background: var(--s4); }
  .channel-item.active { background: var(--s5); }

  .channel-avatar {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--s5);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: var(--t1);
    flex-shrink: 0; overflow: hidden;
    position: relative;
  }

  .online-dot {
    position: absolute; bottom: 1px; right: 1px;
    width: 8px; height: 8px;
    background: var(--green);
    border-radius: 50%;
    border: 2px solid var(--s2);
  }

  .channel-info { flex: 1; overflow: hidden; }
  .channel-name { font-size: 13px; font-weight: 600; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .channel-preview { font-size: 11px; color: var(--t3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }

  .channel-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
  .channel-time { font-size: 10px; color: var(--t4); }
  .unread-badge {
    width: 17px; height: 17px;
    background: var(--white);
    color: var(--bg);
    border-radius: 50%;
    font-size: 10px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── MAIN CHAT AREA ── */
  .chat-main {
    flex: 1;
    display: flex; flex-direction: column;
    overflow: hidden;
    background: var(--bg);
  }

  .chat-header {
    height: 56px;
    background: var(--s1);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center;
    padding: 0 20px;
    gap: 12px;
    flex-shrink: 0;
  }

  .chat-header-info { flex: 1; }
  .chat-header-name { font-size: 15px; font-weight: 700; color: var(--white); }
  .chat-header-status { font-size: 11px; color: var(--t3); margin-top: 1px; }

  .header-actions { display: flex; gap: 6px; }

  .icon-btn {
    width: 34px; height: 34px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--t2);
    transition: all 0.15s;
  }
  .icon-btn:hover { background: var(--s3); border-color: var(--border2); color: var(--white); }
  .icon-btn.danger:hover { background: rgba(255,69,69,0.12); border-color: var(--red); color: var(--red); }
  .icon-btn.success { background: var(--green); border-color: var(--green); color: var(--bg); }

  /* messages */
  .messages-area { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 2px; }

  .msg-group { margin-bottom: 12px; }

  .msg-row {
    display: flex; gap: 10px;
    padding: 3px 6px;
    border-radius: 8px;
    transition: background 0.1s;
  }
  .msg-row:hover { background: var(--s2); }
  .msg-row.mine { flex-direction: row-reverse; }

  .msg-avatar {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: var(--s5);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: var(--t1);
    flex-shrink: 0; align-self: flex-end;
  }

  .msg-bubble-wrap { max-width: 65%; display: flex; flex-direction: column; }
  .msg-row.mine .msg-bubble-wrap { align-items: flex-end; }

  .msg-sender { font-size: 11px; font-weight: 600; color: var(--t2); margin-bottom: 3px; }
  .msg-row.mine .msg-sender { text-align: right; }

  .msg-bubble {
    background: var(--s3);
    border: 1px solid var(--border);
    border-radius: 12px 12px 12px 2px;
    padding: 9px 13px;
    font-size: 13.5px; color: var(--t1);
    line-height: 1.55;
    word-break: break-word;
  }
  .msg-row.mine .msg-bubble {
    background: var(--white);
    color: var(--bg);
    border-color: var(--white);
    border-radius: 12px 12px 2px 12px;
  }

  .msg-time { font-size: 10px; color: var(--t4); margin-top: 3px; }

  /* file message */
  .file-bubble {
    background: var(--s3);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 13px;
    display: flex; align-items: center; gap: 10px;
    cursor: pointer;
    transition: border-color 0.15s;
    max-width: 260px;
  }
  .file-bubble:hover { border-color: var(--border2); }
  .msg-row.mine .file-bubble { background: var(--s5); }

  .file-icon-box {
    width: 36px; height: 36px;
    background: var(--s5);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .file-name { font-size: 12px; font-weight: 600; color: var(--t1); }
  .file-size { font-size: 10px; color: var(--t3); margin-top: 2px; }

  /* image message */
  .img-bubble {
    max-width: 240px;
    border-radius: 10px;
    border: 1px solid var(--border);
    overflow: hidden;
    cursor: pointer;
    background: var(--s3);
    display: flex; align-items: center; justify-content: center;
    height: 140px;
    position: relative;
  }

  /* date divider */
  .date-divider {
    display: flex; align-items: center; gap: 10px;
    margin: 12px 0 8px;
  }
  .date-line { flex: 1; height: 1px; background: var(--border); }
  .date-text { font-size: 10px; font-weight: 600; color: var(--t4); text-transform: uppercase; letter-spacing: 0.1em; }

  /* ── INPUT BAR ── */
  .input-bar {
    background: var(--s1);
    border-top: 1px solid var(--border);
    padding: 12px 16px;
    flex-shrink: 0;
  }

  .input-row {
    display: flex; align-items: flex-end; gap: 8px;
    background: var(--s3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 8px 8px 8px 14px;
    transition: border-color 0.2s;
  }
  .input-row:focus-within { border-color: var(--border2); }

  .msg-input {
    flex: 1;
    background: transparent; border: none; outline: none;
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px; color: var(--t1);
    resize: none;
    max-height: 120px;
    line-height: 1.5;
    padding: 4px 0;
  }
  .msg-input::placeholder { color: var(--t4); }

  .input-actions { display: flex; gap: 4px; align-items: flex-end; }

  .input-icon-btn {
    width: 30px; height: 30px;
    background: transparent; border: none;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--t3);
    transition: all 0.15s; flex-shrink: 0;
  }
  .input-icon-btn:hover { background: var(--s5); color: var(--t1); }

  .send-btn {
    width: 34px; height: 34px;
    background: var(--white); border: none;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--bg);
    transition: all 0.15s; flex-shrink: 0;
  }
  .send-btn:hover { background: #ddd; transform: scale(1.05); }
  .send-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

  /* ── RIGHT PANEL ── */
  .right-panel {
    width: 280px;
    background: var(--s1);
    border-left: 1px solid var(--border);
    display: flex; flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
  }

  .rp-header {
    padding: 16px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }

  .rp-tabs {
    display: flex;
    background: var(--s3);
    border-radius: 8px;
    padding: 3px;
    gap: 2px;
    margin: 12px 12px 0;
  }

  .rp-tab {
    flex: 1; padding: 6px 0;
    border: none; background: transparent;
    font-family: 'Outfit', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    cursor: pointer; border-radius: 6px;
    transition: all 0.2s;
    color: var(--t3);
  }
  .rp-tab.active { background: var(--white); color: var(--bg); }

  .rp-scroll { overflow-y: auto; flex: 1; padding: 10px 12px; }

  .member-row {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 6px; border-radius: 8px;
    cursor: pointer; transition: background 0.15s;
  }
  .member-row:hover { background: var(--s3); }

  .member-name { font-size: 13px; font-weight: 600; color: var(--t1); }
  .member-role { font-size: 10px; color: var(--t3); margin-top: 1px; }
  .member-status { margin-left: auto; font-size: 10px; color: var(--t3); }
  .status-online { color: var(--green); }

  .file-row {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 6px; border-radius: 8px;
    cursor: pointer; transition: background 0.15s;
  }
  .file-row:hover { background: var(--s3); }

  .file-row-icon {
    width: 32px; height: 32px;
    background: var(--s4); border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .file-row-name { font-size: 12px; font-weight: 600; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .file-row-meta { font-size: 10px; color: var(--t3); margin-top: 1px; }

  /* ── VIDEO CALL OVERLAY ── */
  .video-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.95);
    z-index: 100;
    display: flex; flex-direction: column;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .video-header {
    padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .call-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.3rem; letter-spacing: 0.06em; color: var(--white);
  }

  .call-duration { font-size: 12px; color: var(--t3); margin-top: 2px; }

  .video-grid {
    flex: 1; padding: 20px;
    display: grid; gap: 12px;
    overflow: hidden;
  }

  .video-tile {
    background: var(--s2);
    border-radius: 14px;
    border: 1px solid var(--border);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    transition: border-color 0.2s;
  }
  .video-tile.speaking { border-color: var(--green); box-shadow: 0 0 0 1px var(--green); }
  .video-tile.me { border-color: var(--border2); }

  .video-name {
    position: absolute; bottom: 10px; left: 12px;
    font-size: 12px; font-weight: 600; color: var(--white);
    background: rgba(0,0,0,0.6); padding: 3px 8px;
    border-radius: 5px;
  }

  .video-muted {
    position: absolute; top: 10px; right: 10px;
    background: rgba(255,69,69,0.85); border-radius: 5px;
    padding: 2px 6px; font-size: 10px; color: white;
    display: flex; align-items: center; gap: 4px;
  }

  .big-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: var(--s5);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; font-weight: 700; color: var(--t1);
  }

  .call-controls {
    padding: 20px;
    display: flex; align-items: center; justify-content: center; gap: 12px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  .ctrl-btn {
    width: 52px; height: 52px;
    border-radius: 50%;
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    color: var(--white);
    font-size: 1rem;
  }
  .ctrl-btn.normal { background: var(--s4); }
  .ctrl-btn.normal:hover { background: var(--s5); transform: scale(1.08); }
  .ctrl-btn.active { background: var(--white); color: var(--bg); }
  .ctrl-btn.active:hover { background: #e0e0e0; transform: scale(1.08); }
  .ctrl-btn.end { background: var(--red); width: 60px; height: 60px; }
  .ctrl-btn.end:hover { background: #ff2020; transform: scale(1.08); }

  /* ── EMOJI PICKER ── */
  .emoji-picker {
    position: absolute; bottom: 56px; left: 0;
    background: var(--s2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px;
    display: flex; flex-wrap: wrap; gap: 4px;
    width: 220px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    z-index: 50;
    animation: popUp 0.15s ease;
  }
  @keyframes popUp { from { opacity: 0; transform: scale(0.9) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  .emoji-btn { width: 30px; height: 30px; border: none; background: transparent; border-radius: 6px; cursor: pointer; font-size: 16px; transition: background 0.1s; }
  .emoji-btn:hover { background: var(--s4); }

  /* ── TOOLTIP ── */
  [data-tip] { position: relative; }
  [data-tip]::after {
    content: attr(data-tip);
    position: absolute; left: 110%; top: 50%; transform: translateY(-50%);
    background: var(--s5); color: var(--t1);
    font-size: 11px; font-weight: 500;
    padding: 4px 8px; border-radius: 5px;
    white-space: nowrap; pointer-events: none;
    opacity: 0; transition: opacity 0.15s;
  }
  [data-tip]:hover::after { opacity: 1; }

  /* ── TYPING INDICATOR ── */
  .typing-indicator { display: flex; align-items: center; gap: 4px; padding: 6px 8px; }
  .typing-dot {
    width: 6px; height: 6px;
    background: var(--t3); border-radius: 50%;
    animation: typingBounce 1.2s ease-in-out infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }

  /* ── FOLDER VIEW ── */
  .folder-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 6px; border-radius: 8px;
    cursor: pointer; transition: background 0.15s;
  }
  .folder-item:hover { background: var(--s3); }
  .folder-icon { width: 30px; height: 30px; background: var(--s4); border-radius: 7px; display: flex; align-items: center; justify-content: center; }

  /* ── RESPONSIVENESS ── */
  @media (max-width: 1100px) { .right-panel { display: none; } }
  @media (max-width: 768px) {
    .channels-panel { position: absolute; z-index: 20; height: 100%; transform: translateX(-100%); transition: transform 0.25s ease; }
    .channels-panel.open { transform: translateX(0); box-shadow: 10px 0 30px rgba(0,0,0,0.5); }
    .sidenav { width: 52px; }
  }

  /* animations */
  .fade-in { animation: fadeIn 0.25s ease; }
  .slide-up { animation: slideUp 0.3s cubic-bezier(.16,1,.3,1); }
  @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
`;

//Icons

const Ic = {
  Chat:      (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Users:     (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Phone:     (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6.07 6.07l1.27-.76a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>,
  Video:     (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Folder:    (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Settings:  (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Search:    (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Hash:      (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  Send:      (s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Attach:    (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
  Smile:     (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  Mic:       (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  MicOff:    (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  VideoOff:  (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Share:     (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  PhoneOff:  (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-.76a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.26 13a2 2 0 0 0-.45 2.11L5 16.38A2 2 0 0 1 4.69 18H1.62a2 2 0 0 1-2-2.18"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Plus:      (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Download:  (s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  FileText:  (s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Image:     (s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  X:         (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Info:      (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Bell:      (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Pin:       (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>,
};

// ─── Data ─────────────────────────────────────────────────────────────────

const CONTACTS = [
  { id:1,  name:"Sarah Chen",    initials:"SC", online:true,  role:"Designer",       unread:3,  time:"2m" },
  { id:2,  name:"Marcus Webb",   initials:"MW", online:true,  role:"Developer",      unread:0,  time:"14m" },
  { id:3,  name:"Priya Nair",    initials:"PN", online:false, role:"Product Lead",   unread:1,  time:"1h" },
  { id:4,  name:"Dev Team 🔧",   initials:"DT", online:true,  role:"Group · 8",      unread:5,  time:"3m", isGroup:true },
  { id:5,  name:"Design Guild",  initials:"DG", online:true,  role:"Group · 5",      unread:0,  time:"1d", isGroup:true },
  { id:6,  name:"Omar Khalil",   initials:"OK", online:false, role:"Marketing",      unread:0,  time:"2d" },
  { id:7,  name:"Lena Fischer",  initials:"LF", online:true,  role:"Data Analyst",   unread:2,  time:"30m" },
];

const CHANNELS = [
  { id:10, name:"general",    type:"channel" },
  { id:11, name:"design",     type:"channel" },
  { id:12, name:"dev-ops",    type:"channel" },
  { id:13, name:"random",     type:"channel" },
];

const SHARED_FILES = [
  { name:"Q4_Report.pdf",        size:"2.4 MB",  type:"pdf",  date:"Today" },
  { name:"Wireframes_v3.fig",    size:"8.1 MB",  type:"fig",  date:"Yesterday" },
  { name:"brand_assets.zip",     size:"42 MB",   type:"zip",  date:"Mar 4" },
  { name:"meeting_notes.docx",   size:"320 KB",  type:"doc",  date:"Mar 3" },
  { name:"sprint_plan.xlsx",     size:"1.2 MB",  type:"xls",  date:"Mar 1" },
];

const FOLDERS = [
  { name:"Design Assets",   files:12 },
  { name:"Dev Resources",   files:8  },
  { name:"Meeting Notes",   files:24 },
  { name:"Project Docs",    files:6  },
];

const buildMessages = () => [
  { id:1,  from:"Sarah Chen",  mine:false, type:"text",  text:"Hey! Did you finish reviewing the new mockups? 👀",          time:"10:22 AM", initials:"SC" },
  { id:2,  from:"You",         mine:true,  type:"text",  text:"Just went through them — the new layout looks great! Really clean.",  time:"10:24 AM", initials:"ME" },
  { id:3,  from:"Sarah Chen",  mine:false, type:"text",  text:"Awesome! I updated the color tokens too. Check the file I sent.",  time:"10:25 AM", initials:"SC" },
  { id:4,  from:"Sarah Chen",  mine:false, type:"file",  fileName:"Wireframes_v4.fig", fileSize:"9.3 MB", fileType:"fig", time:"10:25 AM", initials:"SC" },
  { id:5,  from:"You",         mine:true,  type:"text",  text:"Perfect. I'll review and share feedback by EOD 🚀",         time:"10:27 AM", initials:"ME" },
  { id:6,  from:"Sarah Chen",  mine:false, type:"image", time:"10:28 AM", initials:"SC", imgLabel:"design-preview.png" },
  { id:7,  from:"You",         mine:true,  type:"text",  text:"Love the gradient treatment on the hero section.",          time:"10:30 AM", initials:"ME" },
  { id:8,  from:"Sarah Chen",  mine:false, type:"text",  text:"Thanks! I was inspired by the brand refresh we did last month. Let me know if you want to hop on a call to discuss.",  time:"10:31 AM", initials:"SC" },
];

const EMOJIS = ["😀","😂","😍","🔥","👍","🎉","💯","🤔","😅","👀","✅","🚀","❤️","😎","🙏","💡","📎","⚡","🎯","😬"];

const CALL_MEMBERS = [
  { id:1, name:"Sarah Chen",   initials:"SC", muted:false, speaking:true  },
  { id:2, name:"Marcus Webb",  initials:"MW", muted:true,  speaking:false },
  { id:3, name:"Priya Nair",   initials:"PN", muted:false, speaking:false },
  { id:4, name:"You",          initials:"ME", muted:false, speaking:false, isMe:true },
];

export default function ChatApp() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [activeNav, setActiveNav] = useState("chat");
  const [messages, setMessages] = useState(buildMessages());
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isGroupCall, setIsGroupCall] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = document.getElementById("chatapp-styles");
    if (!el) {
      const s = document.createElement("style");
      s.id = "chatapp-styles";
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    setTyping(false);
    const t = setTimeout(() => setTyping(true), 2000);
    const t2 = setTimeout(() => setTyping(false), 5000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [activeContact]);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    const msg = { id: Date.now(), from:"You", mine:true, type:"text", text: text.trim(), time: new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}), initials:"ME" };
    setMessages(m => [...m, msg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    // simulate reply
    setTimeout(() => {
      const replies = ["Got it, thanks! 👍","Sure, I'll check that out.","Interesting! Let me look into it.","Sounds good to me 🚀","On it!"];
      const reply = { id: Date.now()+1, from: activeContact.name, mine:false, type:"text", text: replies[Math.floor(Math.random()*replies.length)], time: new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}), initials: activeContact.initials };
      setMessages(m => [...m, reply]);
    }, 1500 + Math.random()*1500);
  }, [activeContact]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const handleTextarea = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    const type = ["pdf","doc","docx","xls","xlsx"].includes(ext) ? ext.slice(0,3) : ["fig","sketch"].includes(ext) ? "fig" : ["zip","rar"].includes(ext) ? "zip" : "doc";
    const msg = { id:Date.now(), from:"You", mine:true, type:"file", fileName:file.name, fileSize:`${(file.size/1024).toFixed(0)} KB`, fileType:type, time:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}), initials:"ME" };
    setMessages(m => [...m, msg]);
  };

  const filteredContacts = CONTACTS.filter(c => c.name.toLowerCase().includes(searchQ.toLowerCase()));

  const startVideoCall = (group=false) => { setIsGroupCall(group); setShowVideo(true); };

  return (
    <div className="app">
      {/* ── SIDE NAV ── */}
      <nav className="sidenav">
        <div className="logo-mark">HHS</div>
        {[
          { id:"chat",    icon:Ic.Chat(18),    tip:"Messages",  badge:true  },
          { id:"calls",   icon:Ic.Phone(18),   tip:"Calls"                  },
          { id:"files",   icon:Ic.Folder(18),  tip:"Files"                  },
          { id:"people",  icon:Ic.Users(18),   tip:"People"                 },
        ].map(n => (
          <button key={n.id} className={`nav-icon-btn ${activeNav===n.id?"active":""}`} data-tip={n.tip}
            onClick={() => setActiveNav(n.id)}>
            {n.icon}
            {n.badge && activeNav!==n.id && <span className="nav-badge" />}
          </button>
        ))}
        <div className="nav-spacer" />
        <button className="nav-icon-btn" data-tip="Settings">{Ic.Settings(18)}</button>
        <Av initials="ME" size={34} radius="50%" style={{ border:"2px solid #303030", marginTop:8 }} />
      </nav>

      {/* ── CHANNELS ── */}
      <div className="channels-panel">
        <div className="panel-header">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span className="panel-title">MESSAGES</span>
            <button className="input-icon-btn" style={{ color:"#555" }} onClick={() => {}}>{Ic.Plus(14)}</button>
          </div>
          <div className="search-wrap">
            <span className="search-icon-pos">{Ic.Search(13)}</span>
            <input className="search-bar" placeholder="Search conversations…" value={searchQ} onChange={e => setSearchQ(e.target.value)} />
          </div>
        </div>

        <div className="channels-scroll">
          <div className="section-label">Channels</div>
          {CHANNELS.map(c => (
            <div key={c.id} className={`channel-item ${activeContact?.id===c.id?"active":""}`} onClick={() => setActiveContact(c)}>
              <div style={{ color:"#444", display:"flex", alignItems:"center" }}>{Ic.Hash(14)}</div>
              <span style={{ fontSize:"13px", color:"#999", fontWeight:500 }}>{c.name}</span>
            </div>
          ))}

          <div className="section-label" style={{ marginTop:8 }}>Direct Messages</div>
          {filteredContacts.filter(c => !c.isGroup).map(c => (
            <div key={c.id} className={`channel-item ${activeContact?.id===c.id?"active":""}`} onClick={() => { setActiveContact(c); setMessages(buildMessages()); }}>
              <div className="channel-avatar">
                <Av initials={c.initials} size={36} radius="10px" />
                {c.online && <span className="online-dot" />}
              </div>
              <div className="channel-info">
                <div className="channel-name">{c.name}</div>
                <div className="channel-preview">{c.online ? "Online" : "Offline"}</div>
              </div>
              <div className="channel-meta">
                <span className="channel-time">{c.time}</span>
                {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
              </div>
            </div>
          ))}

          <div className="section-label" style={{ marginTop:8 }}>Groups</div>
          {filteredContacts.filter(c => c.isGroup).map(c => (
            <div key={c.id} className={`channel-item ${activeContact?.id===c.id?"active":""}`} onClick={() => { setActiveContact(c); setMessages(buildMessages()); }}>
              <div className="channel-avatar" style={{ background:"#1e1e1e", fontSize:"18px" }}>
                {c.name.split(" ")[0].slice(-2)}
              </div>
              <div className="channel-info">
                <div className="channel-name">{c.name}</div>
                <div className="channel-preview">{c.role}</div>
              </div>
              <div className="channel-meta">
                <span className="channel-time">{c.time}</span>
                {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHAT MAIN ── */}
      <div className="chat-main">
        {/* Header */}
        <div className="chat-header">
          <Av initials={activeContact?.initials || "??"} size={34} radius="9px" />
          <div className="chat-header-info">
            <div className="chat-header-name">{activeContact?.name}</div>
            <div className="chat-header-status">
              {activeContact?.online
                ? <><span style={{ color:"#3ddc84" }}>● </span>Online</>
                : <span style={{ color:"#444" }}>Offline</span>}
              {activeContact?.isGroup && ` · ${activeContact?.role}`}
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => startVideoCall(false)} title="Video Call">{Ic.Video(15)}</button>
            <button className="icon-btn" onClick={() => startVideoCall(true)} title="Group Call">{Ic.Users(15)}</button>
            <button className="icon-btn" onClick={() => startVideoCall(false)} title="Voice Call">{Ic.Phone(15)}</button>
            <button className="icon-btn" onClick={() => setShowRight(r => !r)} title="Info" style={showRight?{background:"#1e1e1e",borderColor:"#303030"}:{}}>{Ic.Info(15)}</button>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-area">
          <div className="date-divider">
            <div className="date-line" /><span className="date-text">Today</span><div className="date-line" />
          </div>

          {messages.map((msg, i) => {
            const showAvatar = i === 0 || messages[i-1].mine !== msg.mine || messages[i-1].from !== msg.from;
            return (
              <div key={msg.id} className={`msg-row ${msg.mine ? "mine" : ""}`}>
                {showAvatar
                  ? <Av initials={msg.initials} size={32} radius="8px" style={{ alignSelf:"flex-end" }} />
                  : <div style={{ width:32, flexShrink:0 }} />}
                <div className="msg-bubble-wrap">
                  {showAvatar && <div className="msg-sender">{msg.from}</div>}
                  <MessageBubble msg={msg} />
                  <div className="msg-time">{msg.time}</div>
                </div>
              </div>
            );
          })}

          {typing && (
            <div className="msg-row">
              <Av initials={activeContact?.initials||"??"} size={32} radius="8px" style={{ alignSelf:"flex-end" }} />
              <div className="msg-bubble-wrap">
                <div className="msg-sender">{activeContact?.name}</div>
                <div className="msg-bubble" style={{ padding:"10px 14px" }}>
                  <div className="typing-indicator">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="input-bar" style={{ position:"relative" }}>
          {showEmoji && (
            <div className="emoji-picker">
              {EMOJIS.map(e => (
                <button key={e} className="emoji-btn" onClick={() => { setInput(i => i+e); setShowEmoji(false); textareaRef.current?.focus(); }}>{e}</button>
              ))}
            </div>
          )}
          <div className="input-row">
            <div className="input-actions">
              <button className="input-icon-btn" onClick={() => fileInputRef.current?.click()} title="Attach file">{Ic.Attach(15)}</button>
              <input ref={fileInputRef} type="file" style={{ display:"none" }} onChange={handleFileUpload} />
              <button className="input-icon-btn" onClick={() => setShowEmoji(s => !s)} title="Emoji">{Ic.Smile(15)}</button>
            </div>
            <textarea
              ref={textareaRef}
              className="msg-input"
              rows={1}
              placeholder={`Message ${activeContact?.name}…`}
              value={input}
              onChange={handleTextarea}
              onKeyDown={handleKeyDown}
            />
            <div className="input-actions">
              <button className="send-btn" onClick={() => sendMessage(input)} disabled={!input.trim()} title="Send">{Ic.Send(15)}</button>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"center", marginTop:8, gap:16 }}>
            {["Press Enter to send","Shift+Enter for new line"].map(t => (
              <span key={t} style={{ fontSize:"10px", color:"#2a2a2a" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      {showRight && <RightPanel contact={activeContact} messages={messages} />}

      {/* ── VIDEO CALL OVERLAY ── */}
      {showVideo && (
        <VideoCall
          onEnd={() => setShowVideo(false)}
          isGroup={isGroupCall}
          contact={activeContact}
        />
      )}
    </div>
  );
}

export { STYLES, Ic, CONTACTS, Av, CHANNELS, SHARED_FILES, FOLDERS, EMOJIS, CALL_MEMBERS, buildMessages };