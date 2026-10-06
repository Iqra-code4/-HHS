
/* ─── MARQUEE DATA ──────────────────────── */
const MARQUEE_WORDS = [
  "Our Story","Founded 2026","30 Team Members","Islamabd, Pakistan","110 Countries",
  "200K+ Placements","Forbes 30 Under 30","AI-Powered","4.5K Companies","Human-First"
];

/* ─── TIMELINE DATA ─────────────────────── */
const TIMELINE = [
  { year:"2025", side:"left",  badge:"Origin",       title:"HHS Founding Plan",            desc:"We believes students deserve better opportunities to learn, collaborate, and build real-world skills. The goal of this project is to help students move from learning to real career opportunities through community, practical experience, and skill-based growth, and to help companies find the right talent without wasting their time." },
  { year:"2026", side:"right",  badge:"Growth",        title:"Building HHS",           desc:"Started working on the platform, without any team." },
  { year:"2026", side:"left", badge:"Today",         title:"200,000 Lives Changed",           desc:"HHS reaches 20,000 successful placements, operates across 110+ countries, and maintains a 96% candidate satisfaction score. We're just getting started." },
];

/* ─── BUILD MARQUEE ─────────────────────── */
function buildMarquee() {
  const doubled = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  document.getElementById("marqueeTrack").innerHTML =
    doubled.map(w => `<span class="marquee-item"><span class="m-dot"></span>${w}</span>`).join("");
}

/* ─── BUILD TIMELINE ────────────────────── */
function buildTimeline() {
  document.getElementById("tlEntries").innerHTML = TIMELINE.map(e => `
    <div class="tl-entry ${e.side} reveal">
      ${e.side === "left" ? `
        <div class="tl-card">
          <span class="tl-badge">${e.badge}</span>
          <div class="tl-year">${e.year}</div>
          <div class="tl-title">${e.title}</div>
          <p class="tl-desc">${e.desc}</p>
        </div>
        <div class="tl-dot"><div class="tl-dot-inner"></div></div>
        <div class="tl-blank"></div>
      ` : `
        <div class="tl-blank"></div>
        <div class="tl-dot"><div class="tl-dot-inner"></div></div>
        <div class="tl-card">
          <span class="tl-badge">${e.badge}</span>
          <div class="tl-year">${e.year}</div>
          <div class="tl-title">${e.title}</div>
          <p class="tl-desc">${e.desc}</p>
        </div>
      `}
    </div>
  `).join("");
}


/* ─── SCROLL REVEAL ─────────────────────── */
function observeReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
}

/* ─── ANIMATED COUNTERS ─────────────────── */
function animateCounters() {
  document.querySelectorAll("[data-target]").forEach(el => {
    const raw = el.dataset.target;
    const target = parseFloat(raw);
    const suffix = el.dataset.suffix || "";
    if (isNaN(target)) return;
    let start; const dur = 1600;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target >= 1000 ? Math.round(target * eased) : target >= 100 ? Math.round(target * eased) : (target * eased).toFixed(0);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ─── NAV SCROLL ────────────────────────── */
window.addEventListener("scroll", () => {
  document.getElementById("mainNav").style.borderBottomColor =
    window.scrollY > 40 ? "var(--border2)" : "var(--border)";
});

/* ─── MOBILE MENU ───────────────────────── */
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

/* ─── INIT ──────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  buildMarquee();
  buildTimeline();
  observeReveal();

  // Re-observe after dynamic content renders
  setTimeout(observeReveal, 100);

  // Counter animation on stat strip entering view
  const statsEl = document.querySelector(".hero-stat-strip");
  if (statsEl) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animateCounters(); }
    }, { threshold: 0.5 }).observe(statsEl);
  }
});