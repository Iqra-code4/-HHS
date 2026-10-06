import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── Whiteboard ── */
function Whiteboard() {
  const canvasRef  = useRef(null);
  const drawing    = useRef(false);
  const lastPos    = useRef(null);
  const history    = useRef([]);
  const [tool,   setTool]  = useState("pen");
  const [color,  setColor] = useState("#1a1a1a");
  const [size,   setSize]  = useState(3);
  const [canUndo,setUndo]  = useState(false);

  const COLORS = ["#1a1a1a","#333333","#555555","#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#8b5cf6","#ec4899","#06b6d4","#ffffff"];

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect();
    const sc = canvas.width / r.width;
    if (e.touches) return { x:(e.touches[0].clientX-r.left)*sc, y:(e.touches[0].clientY-r.top)*sc };
    return { x:(e.clientX-r.left)*sc, y:(e.clientY-r.top)*sc };
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    history.current.push(canvas.toDataURL());
    if (history.current.length > 30) history.current.shift();
    setUndo(true);
  };

  const start = e => {
    saveState();
    drawing.current = true;
    lastPos.current = getPos(e, canvasRef.current);
  };
  const draw = e => {
    if (!drawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool==="eraser" ? "#F8F8F0" : color;
    ctx.lineWidth   = tool==="eraser" ? size*6 : size;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();
    lastPos.current = pos;
  };
  const stop = () => { drawing.current = false; };

  const undo = () => {
    if (!history.current.length) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx    = canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img,0,0);
    };
    img.src = history.current.pop();
    if (!history.current.length) setUndo(false);
  };
  const clear = () => {
    saveState();
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
  };
  const download = () => {
    const a = document.createElement("a");
    a.download = "whiteboard.png";
    a.href = canvasRef.current.toDataURL();
    a.click();
  };

  return (
    <div className="panel" style={{ padding:24 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:16 }}>
        <span style={{ fontFamily:"var(--font-d)", fontSize:20, letterSpacing:3 }}>WHITEBOARD</span>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          {/* Tool tabs */}
          {["pen","eraser","text-marker"].map(t => (
            <button key={t} className={`btn btn-pill ${tool===t?"active":""}`}
              style={{ fontSize:11, padding:"5px 14px" }}
              onClick={() => setTool(t)}>
              {t==="pen"?"✏️ Pen":t==="eraser"?"⬜ Erase":"🖍 Marker"}
            </button>
          ))}
          {/* Size */}
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <input type="range" min="1" max="16" value={size} onChange={e=>setSize(+e.target.value)} style={{ width:70 }}/>
            <span style={{ fontSize:11, color:"var(--tx4)", minWidth:22 }}>{size}px</span>
          </div>
          {/* Actions */}
          <button className="btn btn-icon" onClick={undo} style={{ opacity:canUndo?1:0.35 }} title="Undo">↩</button>
          <button className="btn btn-icon" onClick={clear} title="Clear">🗑</button>
          <button className="btn btn-icon" onClick={download} title="Download">⬇</button>
        </div>
      </div>

      {/* Color palette */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
        {COLORS.map(c => (
          <div key={c} onClick={() => { setColor(c); setTool("pen"); }}
            style={{
              width:24, height:24, borderRadius:6,
              background:c, cursor:"pointer",
              border:`2px solid ${color===c&&tool!=="eraser"?"var(--tx)":"transparent"}`,
              boxShadow: color===c&&tool!=="eraser" ? "0 0 0 1px var(--b3)" : "none",
              transition:"all 0.15s",
            }} />
        ))}
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="wb-canvas"
        width={1200} height={420}
        style={{ width:"100%", height:"auto", minHeight:200 }}
        onMouseDown={start} onMouseMove={draw} onMouseUp={stop} onMouseLeave={stop}
        onTouchStart={start} onTouchMove={draw} onTouchEnd={stop} />
    </div>
  );
}

export default Whiteboard;