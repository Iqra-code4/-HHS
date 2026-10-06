/* ─── DATA ─────────────────────────────────── */
const COMPANIES = [
  { name:"Google",       initials:"G",   industry:"tech",     sector:"Technology",      country:"USA",          jobs:124, badge:"hiring",  size:"100K+ Employees" },
  { name:"Stripe",       initials:"ST",  industry:"finance",  sector:"FinTech",         country:"USA",          jobs:38,  badge:"partner", size:"8K Employees" },
  { name:"Airbnb",       initials:"AB",  industry:"tech",     sector:"Travel & Tech",   country:"USA",          jobs:56,  badge:"hiring",  size:"6K Employees" },
  { name:"Spotify",      initials:"SP",  industry:"media",    sector:"Music & Media",   country:"Sweden",       jobs:44,  badge:"hiring",  size:"9K Employees" },
  { name:"Shopify",      initials:"SH",  industry:"ecommerce",sector:"E-Commerce",      country:"Canada",       jobs:82,  badge:"hiring",  size:"12K Employees" },
  { name:"Figma",        initials:"FG",  industry:"design",   sector:"Design Tools",    country:"USA",          jobs:19,  badge:"partner", size:"1K Employees" },
  { name:"Notion",       initials:"NO",  industry:"tech",     sector:"Productivity",    country:"USA",          jobs:23,  badge:"featured",size:"500 Employees" },
  { name:"Netflix",      initials:"NF",  industry:"media",    sector:"Streaming",       country:"USA",          jobs:67,  badge:"hiring",  size:"13K Employees" },
  { name:"Salesforce",   initials:"SF",  industry:"tech",     sector:"CRM / Cloud",     country:"USA",          jobs:91,  badge:"partner", size:"80K Employees" },
  { name:"NVIDIA",       initials:"NV",  industry:"tech",     sector:"Semiconductors",  country:"USA",          jobs:143, badge:"hiring",  size:"30K Employees" },
  { name:"Revolut",      initials:"RV",  industry:"finance",  sector:"Neobanking",      country:"UK",           jobs:55,  badge:"hiring",  size:"8K Employees" },
  { name:"Canva",        initials:"CV",  industry:"design",   sector:"Design Platform", country:"Australia",    jobs:31,  badge:"featured",size:"4K Employees" },
  { name:"Amazon",       initials:"AM",  industry:"ecommerce",sector:"E-Commerce",      country:"USA",          jobs:210, badge:"partner", size:"1.5M Employees" },
  { name:"Adobe",        initials:"AD",  industry:"design",   sector:"Creative Software","country":"USA",       jobs:74,  badge:"hiring",  size:"30K Employees" },
  { name:"ByteDance",    initials:"BD",  industry:"media",    sector:"Social Media",    country:"China",        jobs:186, badge:"hiring",  size:"100K+ Employees" },
];

const BADGE_HTML = {
  hiring:   `<span class="company-badge badge-hiring">● Actively Hiring</span>`,
  featured: `<span class="company-badge badge-featured">Featured</span>`,
  partner:  `<span class="company-badge badge-partner">★ Partner</span>`,
};

/* ─── RENDER COMPANIES ──────────────────────── */
function renderCompanies(data) {
  const list = document.getElementById('companyList');
  if (!data.length) {
    list.innerHTML = `<div style="padding:3rem;text-align:center;color:var(--t4);font-size:13px;">No companies found for this filter.</div>`;
    return;
  }
  list.innerHTML = data.map((c, i) => `
    <div class="company-row reveal" style="transition-delay:${i * 0.04}s">
      <div class="company-logo-box">${c.initials}</div>
      <div>
        <div class="company-name">${c.name}</div>
        <div class="company-sub">
          <span>${c.sector}</span>
          <span class="company-sub-dot"></span>
          <span>${c.country}</span>
          <span class="company-sub-dot"></span>
          <span>${c.size}</span>
        </div>
      </div>
      ${BADGE_HTML[c.badge] || ''}
      <div>
        <div class="company-jobs">${c.jobs}</div>
        <div class="company-jobs-lbl">Open Roles</div>
      </div>
      <div class="company-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  `).join('');
  // Trigger reveal for newly rendered items
  setTimeout(observeReveal, 50);
}

/* ─── FILTER ────────────────────────────────── */
function filterCompanies(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = filter === 'all'
    ? COMPANIES
    : COMPANIES.filter(c => c.industry === filter);
  renderCompanies(filtered);
}

/* ─── MARQUEE ───────────────────────────────── */
function buildMarquee() {
  const names = COMPANIES.map(c => c.name);
  const track = document.getElementById('marqueeTrack');
  const doubled = [...names, ...names]; // duplicate for seamless loop
  track.innerHTML = doubled.map(n => `
    <span class="marquee-item">
      <span class="marquee-dot"></span>
      ${n}
    </span>
  `).join('');
}

/* ─── SCROLL REVEAL ─────────────────────────── */
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
}

/* ─── MOBILE MENU ───────────────────────────── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

/* ─── NAV SCROLL EFFECT ─────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 40) {
    nav.style.borderBottomColor = 'var(--border2)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
});

/* ─── ANIMATED COUNTER ──────────────────────── */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = el.textContent;
    const num = parseFloat(target.replace(/[^0-9.]/g,''));
    const suffix = target.replace(/[0-9.]/g,'');
    if (isNaN(num)) return;
    let start = 0;
    const duration = 1400;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (num < 100 ? (num * eased).toFixed(num % 1 !== 0 ? 1 : 0) : Math.round(num * eased)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ─── INIT ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildMarquee();
  renderCompanies(COMPANIES);
  observeReveal();

  // Animate counters when hero stats come into view
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(statsEl);
  }
});