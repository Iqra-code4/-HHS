import { useState, useEffect, useRef } from "react";
import Ask from "./Ask";

// ─── Inline styles object ───────────────────────────────────────────────────
const C = {
  bg: "#0a0a0a",
  surface: "#111111",
  card: "#161616",
  border: "#242424",
  borderHover: "#3a3a3a",
  textPrimary: "#f5f5f5",
  textSecondary: "#888888",
  textMuted: "#444444",
  inputBg: "#1a1a1a",
  inputBorder: "#2a2a2a",
  inputFocus: "#404040",
  white: "#ffffff",
  errorRed: "#ff4444",
  successGreen: "#3ddc84",
  accentWhite: "#e8e8e8",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Outfit', sans-serif;
    background: ${C.bg};
    color: ${C.textPrimary};
    min-height: 100vh;
    overflow-x: hidden;
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes gridPulse {
    0%, 100% { opacity: 0.03; }
    50%       { opacity: 0.07; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }

  .page-enter { animation: fadeSlideUp 0.55s cubic-bezier(.16,1,.3,1) both; }
  .form-enter-left  { animation: slideLeft  0.45s cubic-bezier(.16,1,.3,1) both; }
  .form-enter-right { animation: slideRight 0.45s cubic-bezier(.16,1,.3,1) both; }

  .auth-input {
    width: 100%;
    background: ${C.inputBg};
    border: 1.5px solid ${C.inputBorder};
    border-radius: 8px;
    padding: 13px 16px 13px 44px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: ${C.textPrimary};
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    caret-color: ${C.white};
  }

  .auth-input::placeholder { color: ${C.textMuted}; }

  .auth-input:focus {
    border-color: ${C.inputFocus};
    background: #1e1e1e;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.04);
  }

  .auth-input.error {
    border-color: ${C.errorRed};
    animation: shake 0.35s ease;
  }

  .btn-primary {
    width: 100%;
    background: ${C.white};
    color: ${C.bg};
    border: none;
    border-radius: 8px;
    padding: 14px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .btn-primary:hover:not(:disabled) {
    background: ${C.accentWhite};
    box-shadow: 0 8px 24px rgba(255,255,255,0.1);
    transform: translateY(-1px);
  }

  .btn-primary:active:not(:disabled) { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

  .btn-ghost {
    background: transparent;
    border: 1.5px solid ${C.border};
    border-radius: 8px;
    padding: 11px 20px;
    color: ${C.textSecondary};
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }

  .btn-ghost:hover {
    border-color: ${C.borderHover};
    color: ${C.textPrimary};
    background: rgba(255,255,255,0.03);
  }

  .tab-btn {
    flex: 1;
    padding: 11px;
    background: transparent;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    border-radius: 6px;
  }

  .tab-btn.active {
    background: ${C.white};
    color: ${C.bg};
  }

  .tab-btn.inactive {
    color: ${C.textMuted};
  }

  .tab-btn.inactive:hover { color: ${C.textSecondary}; }

  .strength-bar {
    height: 3px;
    border-radius: 2px;
    transition: width 0.3s ease, background 0.3s ease;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0,0,0,0.2);
    border-top-color: ${C.bg};
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: ${C.border};
  }

  .toggle-password {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: ${C.textMuted};
    transition: color 0.2s;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .toggle-password:hover { color: ${C.textSecondary}; }

  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${C.textMuted};
    pointer-events: none;
  }

  .checkbox-custom {
    width: 16px; height: 16px;
    border: 1.5px solid ${C.inputBorder};
    border-radius: 4px;
    background: ${C.inputBg};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .checkbox-custom.checked {
    background: ${C.white};
    border-color: ${C.white};
  }

  .success-overlay {
    position: absolute;
    inset: 0;
    background: ${C.card};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    animation: fadeSlideUp 0.4s ease both;
    z-index: 10;
  }

  @media (max-width: 768px) {
    .auth-layout { flex-direction: column !important; }
    .auth-panel-left { display: none !important; }
    .auth-card { border-radius: 0 !important; min-height: 100vh; padding: 2rem 1.5rem !important; }
  }
`;

// Icons

const Icon = {
  Mail: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Lock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  User: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  Eye: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>,
  Google: () => <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
  Github: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  Check: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  CheckCircle: () => <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
};

// Helpers

function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function passwordStrength(p) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "#ff4444", "#ff9900", "#88cc00", "#3ddc84"];

// ─── Input Field Component ────────────────────────────────────────────────────

function InputField({ icon: IconComp, type = "text", placeholder, value, onChange, error, showToggle, onToggle, showPass, autoComplete }) {
  return (
    <div style={{ position: "relative" }}>
      <span className="input-icon"><IconComp /></span>
      <input
        className={`auth-input${error ? " error" : ""}`}
        type={showToggle ? (showPass ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        style={showToggle ? { paddingRight: "44px" } : {}}
      />
      {showToggle && (
        <button type="button" className="toggle-password" onClick={onToggle} tabIndex={-1}>
          {showPass ? <Icon.EyeOff /> : <Icon.Eye />}
        </button>
      )}
      {error && (
        <p style={{ color: C.errorRed, fontSize: "11px", marginTop: "5px", display: "flex", alignItems: "center", gap: "4px" }}>
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export const SignupForm = ({onSwitch}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const strength = password ? passwordStrength(password) : 0;

    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = "Full name is required";
        if (!email) e.email = "Email is required";
        else if (!validateEmail(email)) e.email = "Enter a valid email address";
        if (!password) e.password = "Password is required";
        else if (password.length < 8) e.password = "Minimum 8 characters";
        if (!confirm) e.confirm = "Please confirm your password";
        else if (confirm !== password) e.confirm = "Passwords don't match";
        if (!agree) e.agree = "You must accept the terms";
        return e;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setLoading(true);
        setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
        {success && (
            <div className="success-overlay">
            <div style={{ color: C.successGreen }}><Icon.CheckCircle /></div>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.05em", color: C.white }}>ACCOUNT CREATED!</p>
            <p style={{ fontSize: "13px", color: C.textSecondary }}>Welcome aboard 🎉</p>
            <button className="btn-primary" style={{ width: "auto", padding: "10px 24px", marginTop: "8px" }} onClick={onSwitch}>
                Sign In Now
            </button>
            </div>
        )}

        <div className="form-enter-left">
            <p style={{ fontSize: "13px", color: C.textSecondary, marginBottom: "1.75rem" }}>
            Create your account — free forever, no credit card needed.
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "1.25rem" }}>
            <button className="btn-ghost" style={{ flex: 1 }}><Icon.Google /><span>Google</span></button>
            <button className="btn-ghost" style={{ flex: 1 }}><Icon.Github /><span>GitHub</span></button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
            <div className="divider-line" />
            <span style={{ fontSize: "11px", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>or fill in details</span>
            <div className="divider-line" />
            </div>

            <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <InputField
                icon={Icon.User} placeholder="Full name"
                value={name} onChange={e => setName(e.target.value)}
                error={errors.name} autoComplete="name"
                />
                <InputField
                icon={Icon.Mail} type="email" placeholder="Email address"
                value={email} onChange={e => setEmail(e.target.value)}
                error={errors.email} autoComplete="email"
                />
                <div>
                <InputField
                    icon={Icon.Lock} placeholder="Password (min. 8 chars)"
                    value={password} onChange={e => setPassword(e.target.value)}
                    error={errors.password} showToggle
                    showPass={showPass} onToggle={() => setShowPass(v => !v)}
                    autoComplete="new-password"
                />
                {password && (
                    <div style={{ marginTop: "8px" }}>
                    <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                        {[1,2,3,4].map(i => (
                        <div key={i} className="strength-bar" style={{
                            flex: 1,
                            background: i <= strength ? strengthColors[strength] : C.inputBorder,
                        }} />
                        ))}
                    </div>
                    <span style={{ fontSize: "11px", color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
                    </div>
                )}
                </div>
                <InputField
                icon={Icon.Lock} placeholder="Confirm password"
                value={confirm} onChange={e => setConfirm(e.target.value)}
                error={errors.confirm} showToggle
                showPass={showConfirm} onToggle={() => setShowConfirm(v => !v)}
                autoComplete="new-password"
                />
            </div>

            <div style={{ margin: "16px 0" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}
                onClick={() => setAgree(v => !v)}>
                <div className={`checkbox-custom${agree ? " checked" : ""}`} style={{ marginTop: "2px" }}>
                    {agree && <Icon.Check />}
                </div>
                <span style={{ fontSize: "12px", color: C.textSecondary, lineHeight: 1.5 }}>
                    I agree to the{" "}
                    <span style={{ color: C.textPrimary, textDecoration: "underline", cursor: "pointer" }}>Terms of Service</span>
                    {" "}and{" "}
                    <span style={{ color: C.textPrimary, textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>
                </span>
                </label>
                {errors.agree && <p style={{ color: C.errorRed, fontSize: "11px", marginTop: "5px" }}>⚠ {errors.agree}</p>}
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
                {loading
                ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}><span className="spinner" /> Creating account…</span>
                : <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>Create Account <Icon.ArrowRight /></span>}
            </button>
            </form>

            <p style={{ textAlign: "center", fontSize: "13px", color: C.textMuted, marginTop: "1.25rem" }}>
            Already have an account?{" "}
            <button onClick={onSwitch} style={{ background: "none", border: "none", color: C.textPrimary, fontWeight: 600, cursor: "pointer", textDecoration: "underline", fontFamily: "'Outfit', sans-serif", fontSize: "13px" }}>
                Sign in
            </button>
            </p>
        </div>
        </div>
    );
}

export const LoginForm = ({onSwitch}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const e = {};
        if (!email) e.email = "Email is required";
        else if (!validateEmail(email)) e.email = "Enter a valid email address";
        if (!password) e.password = "Password is required";
        else if (password.length < 6) e.password = "At least 6 characters required";
        return e;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setLoading(true);
        setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
        {success && (
            <div className="success-overlay">
            <div style={{ color: C.successGreen }}><Icon.CheckCircle /></div>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.05em", color: C.white }}>SIGNED IN!</p>
            <p style={{ fontSize: "13px", color: C.textSecondary }}>Welcome back 👋</p>
            </div>
        )}

        <div className="form-enter-right">
            <p style={{ fontSize: "13px", color: C.textSecondary, marginBottom: "2rem" }}>
            Welcome back — enter your credentials to continue.
            </p>

            {/* Social logins */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}>
            <button className="btn-ghost" style={{ flex: 1 }}><Icon.Google /><span>Google</span></button>
            <button className="btn-ghost" style={{ flex: 1 }}><Icon.Github /><span>GitHub</span></button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
            <div className="divider-line" />
            <span style={{ fontSize: "11px", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>or with email</span>
            <div className="divider-line" />
            </div>

            <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <InputField
                icon={Icon.Mail} type="email" placeholder="Email address"
                value={email} onChange={e => setEmail(e.target.value)}
                error={errors.email} autoComplete="email"
                />
                <InputField
                icon={Icon.Lock} placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)}
                error={errors.password} showToggle
                showPass={showPass} onToggle={() => setShowPass(v => !v)}
                autoComplete="current-password"
                />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                onClick={() => setRemember(v => !v)}>
                <div className={`checkbox-custom${remember ? " checked" : ""}`}>
                    {remember && <Icon.Check />}
                </div>
                <span style={{ fontSize: "12px", color: C.textSecondary }}>Remember me</span>
                </label>
                <button type="button" style={{ background: "none", border: "none", fontSize: "12px", color: C.textSecondary, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.white}
                onMouseLeave={e => e.target.style.color = C.textSecondary}>
                Forgot password?
                </button>
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
                {loading
                ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}><span className="spinner" /> Signing in…</span>
                : <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>Sign In <Icon.ArrowRight /></span>}
            </button>
            </form>

            <p style={{ textAlign: "center", fontSize: "13px", color: C.textMuted, marginTop: "1.5rem" }}>
            No account?{" "}
            <button onClick={onSwitch} style={{ background: "none", border: "none", color: C.textPrimary, fontWeight: 600, cursor: "pointer", textDecoration: "underline", fontFamily: "'Outfit', sans-serif", fontSize: "13px" }}>
                Create one
            </button>
            </p>
        </div>
        </div>
    );
};

export const LeftPanel = () => {
  return (
    <div
      className="auth-panel-left"
      style={{
        width: "42%",
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "3rem",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        animation: "gridPulse 4s ease-in-out infinite",
      }} />

      {/* large decorative text */}
      <div style={{
        position: "absolute", bottom: "-20px", right: "-10px",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "11rem", color: "rgba(255,255,255,0.025)",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
      }}>AUTH</div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "3rem" }}>
          <div style={{
            width: "32px", height: "32px",
            background: C.white,
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "14px", fontWeight: 800, color: C.bg, fontFamily: "'Outfit', sans-serif" }}>H</span>
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "15px", color: C.textPrimary, letterSpacing: "0.05em" }}>
            Hire and Hired Stars
          </span>
        </div>

        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.8rem", color: C.white, lineHeight: 1, letterSpacing: "0.02em", marginBottom: "1rem" }}>
          YOUR NEXT<br />CHAPTER<br />STARTS<br />HERE.
        </h2>
        <p style={{ fontSize: "13px", color: C.textSecondary, lineHeight: 1.7, maxWidth: "260px" }}>
          Join thousands of professionals who found their perfect role through our platform.
        </p>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {[
          { num: "24K+", label: "Active Listings" },
          { num: "96%", label: "Placement Rate" },
          { num: "8.5K", label: "Companies" },
        ].map(({ num, label }) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 0",
            borderBottom: `1px solid ${C.border}`,
          }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: C.white, letterSpacing: "0.05em" }}>{num}</span>
            <span style={{ fontSize: "12px", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};



export default function AuthApp() {
  const [tab, setTab] = useState("login"); // "login" | "signup"
  const styleRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("auth-styles")) {
      const el = document.createElement("style");
      el.id = "auth-styles";
      el.textContent = css;
      document.head.appendChild(el);
      styleRef.current = el;
    }
    return () => { if (styleRef.current) styleRef.current.remove(); };
  }, []);

  const switchToSignup = () => setTab("signup");
  const switchToLogin  = () => setTab("login");

  return (
    <div className="page-enter" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "stretch",
      background: C.bg,
    }}>
      {/* Left decorative panel */}
      <LeftPanel />

      {/* Right auth panel */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: C.bg,
      }}>
        <div className="auth-card" style={{
          width: "100%",
          maxWidth: "420px",
          background: C.card,
          borderRadius: "20px",
          border: `1px solid ${C.border}`,
          padding: "2.5rem",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        }}>
          {/* Tab switcher */}
          <div style={{
            display: "flex",
            background: C.inputBg,
            border: `1px solid ${C.inputBorder}`,
            borderRadius: "8px",
            padding: "4px",
            marginBottom: "1.75rem",
            gap: "4px",
          }}>
            <button className={`tab-btn ${tab === "login" ? "active" : "inactive"}`}
              onClick={() => setTab("login")}>
              Sign In
            </button>
            <button className={`tab-btn ${tab === "signup" ? "active" : "inactive"}`}
              onClick={() => setTab("signup")}>
              Sign Up
            </button>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2.4rem",
              letterSpacing: "0.03em",
              color: C.white,
              lineHeight: 1,
              marginBottom: "4px",
            }}>
              {tab === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}
            </h1>
          </div>

          {/* Form */}
          <div key={tab} style={{ overflow: "hidden", position: "relative" }}>
            {tab === "login"
              ? <LoginForm onSwitch={switchToSignup} />
              : <SignupForm onSwitch={switchToLogin} />}
          </div>
        </div>
      </div>
    </div>
  );
}
