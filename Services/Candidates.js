/* ─── CANDIDATE DATA ────────────────────────── */
const CANDIDATES = [
  { name:"Zara Ahmed",       initials:"ZA", role:"Full Stack Engineer",       field:"engineering", skills:["React","Node.js","AWS","TypeScript"],   salary:"$120K",  badge:"top",      exp:"5 yrs", location:"New York, USA",      rating:5, available:true  },
  { name:"Kai Morrison",     initials:"KM", role:"Product Manager",           field:"product",     skills:["Roadmapping","Agile","GTM","Figma"],     salary:"$130K",  badge:"top",      exp:"7 yrs", location:"San Francisco, USA",  rating:5, available:true  },
  { name:"Priya Lamba",      initials:"PL", role:"UX / Product Designer",     field:"design",      skills:["Figma","Prototyping","Research","CSS"],   salary:"$105K",  badge:"open",     exp:"4 yrs", location:"London, UK",          rating:5, available:true  },
  { name:"Omar Shaikh",      initials:"OS", role:"ML Engineer",               field:"data",        skills:["Python","TensorFlow","PyTorch","MLOps"],  salary:"$155K",  badge:"top",      exp:"6 yrs", location:"Toronto, Canada",     rating:5, available:true  },
  { name:"Lena Fischer",     initials:"LF", role:"Data Analyst",              field:"data",        skills:["SQL","Tableau","Python","dbt"],           salary:"$95K",   badge:"new",      exp:"2 yrs", location:"Berlin, Germany",     rating:4, available:true  },
  { name:"Aryan Kapoor",     initials:"AK", role:"Backend Engineer",          field:"engineering", skills:["Go","PostgreSQL","Docker","Kubernetes"],  salary:"$135K",  badge:"open",     exp:"5 yrs", location:"Dubai, UAE",          rating:5, available:true  },
  { name:"Sofia Mendes",     initials:"SM", role:"Growth Marketing Lead",     field:"marketing",   skills:["SEO","Paid Media","Analytics","HubSpot"], salary:"$100K",  badge:"open",     exp:"6 yrs", location:"Lisbon, Portugal",    rating:5, available:true  },
  { name:"James Wu",         initials:"JW", role:"iOS Developer",             field:"engineering", skills:["Swift","SwiftUI","Xcode","CoreData"],     salary:"$125K",  badge:"employed", exp:"4 yrs", location:"Sydney, Australia",   rating:4, available:false },
  { name:"Nadia Hassan",     initials:"NH", role:"Brand Designer",            field:"design",      skills:["Illustrator","Brand ID","Motion","PS"],   salary:"$88K",   badge:"new",      exp:"3 yrs", location:"Cairo, Egypt",        rating:4, available:true  },
  { name:"Lucas Petit",      initials:"LP", role:"Financial Analyst",         field:"finance",     skills:["Excel","Modelling","Bloomberg","SQL"],    salary:"$98K",   badge:"open",     exp:"4 yrs", location:"Paris, France",       rating:5, available:true  },
  { name:"Aisha Nwachukwu",  initials:"AN", role:"DevOps Engineer",           field:"engineering", skills:["Terraform","CI/CD","AWS","Monitoring"],   salary:"$140K",  badge:"top",      exp:"6 yrs", location:"Lagos, Nigeria",      rating:5, available:true  },
  { name:"Hiroshi Tanaka",   initials:"HT", role:"Data Scientist",            field:"data",        skills:["Python","R","SparkML","Statistics"],      salary:"$145K",  badge:"employed", exp:"8 yrs", location:"Tokyo, Japan",        rating:5, available:false },
  { name:"Chloe Dubois",     initials:"CD", role:"Content Strategist",        field:"marketing",   skills:["Copywriting","SEO","CMS","Analytics"],    salary:"$80K",   badge:"new",      exp:"2 yrs", location:"Montreal, Canada",    rating:4, available:true  },
  { name:"Raj Patel",        initials:"RP", role:"Cloud Architect",           field:"engineering", skills:["Azure","GCP","Networking","Security"],    salary:"$160K",  badge:"top",      exp:"9 yrs", location:"Mumbai, India",       rating:5, available:true  },
  { name:"Mei Lin",          initials:"ML", role:"Motion Designer",           field:"design",      skills:["After Effects","Lottie","3D","Cinema4D"],  salary:"$92K",  badge:"open",     exp:"4 yrs", location:"Singapore",           rating:5, available:true  },
  { name:"Daniel Osei",      initials:"DO", role:"Quantitative Analyst",      field:"finance",     skills:["Python","R","VBA","Risk Modelling"],      salary:"$130K",  badge:"top",      exp:"5 yrs", location:"Accra, Ghana",        rating:5, available:true  },
];

const BADGE_CFG = {
  open:     { label:"● Open to Work",  cls:"badge-open"     },
  top:      { label:"★ Top Talent",    cls:"badge-top"      },
  new:      { label:"◆ New Profile",   cls:"badge-new"      },
  employed: { label:"Currently Hired", cls:"badge-employed" },
};

const MARQUEE_ROLES = ["Full Stack Engineer","UX Designer","Data Scientist","Product Manager","ML Engineer","Cloud Architect","DevOps Engineer","Brand Designer","Growth Marketer","Financial Analyst","iOS Developer","Motion Designer","Quantitative Analyst","Content Strategist"];

/* ─── STATE ─────────────────────────────────── */
let activeFilter = "all";
let searchQuery  = "";
let visibleCount = 8;
const PAGE_SIZE  = 4;

/* ─── RENDER ────────────────────────────────── */
function getFiltered() {
  return CANDIDATES.filter(c => {
    const matchField = activeFilter === "all" || c.field === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q)
      || c.role.toLowerCase().includes(q)
      || c.skills.some(s => s.toLowerCase().includes(q));
    return matchField && matchSearch;
  });
}

function renderCandidates() {
  const grid = document.getElementById("candidatesGrid");
  const filtered = getFiltered();
  const visible  = filtered.slice(0, visibleCount);

  if (!visible.length) {
    grid.innerHTML = `<div style="padding:3rem;text-align:center;color:var(--t4);font-size:13px;grid-column:1/-1">No candidates found — try a different search or filter.</div>`;
    document.getElementById("loadMoreBtn").style.display = "none";
    return;
  }

  grid.innerHTML = visible.map((c, i) => {
    const badge = BADGE_CFG[c.badge] || BADGE_CFG.open;
    const stars = "★".repeat(c.rating) + "☆".repeat(5 - c.rating);
    return `
    <div class="candidate-card reveal" style="transition-delay:${(i % PAGE_SIZE) * 0.06}s">
      <div class="candidate-header">
        <div style="display:flex;align-items:center;gap:12px">
          <div class="candidate-avatar">${c.initials}</div>
          <div>
            <div class="candidate-name">${c.name}</div>
            <div class="candidate-role">${c.role}</div>
          </div>
        </div>
        <span class="candidate-badge ${badge.cls}">${badge.label}</span>
      </div>

      <div class="candidate-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${c.location}
        <span class="c-dot"></span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${c.exp} exp.
      </div>

      <div class="skill-tags">
        ${c.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}
      </div>

      <div class="candidate-footer">
        <div>
          <div class="candidate-salary">${c.salary}<span style="font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;color:var(--t4)"> /yr</span></div>
          <div class="candidate-salary-lbl">Expected</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="rating-stars">${stars}</div>
          <button class="view-btn">View Profile</button>
        </div>
      </div>
    </div>`;
  }).join("");

  const btn = document.getElementById("loadMoreBtn");
  btn.style.display = filtered.length > visibleCount ? "inline-block" : "none";
  setTimeout(observeReveal, 50);
}

/* ─── FILTER ────────────────────────────────── */
function filterCandidates(filter, btn) {
  activeFilter = filter;
  visibleCount = 8;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderCandidates();
}

/* ─── SEARCH ────────────────────────────────── */
function handleSearch() {
  searchQuery  = document.getElementById("searchInput").value;
  visibleCount = 8;
  renderCandidates();
}

/* ─── LOAD MORE ─────────────────────────────── */
function loadMore() {
  visibleCount += PAGE_SIZE;
  renderCandidates();
}

/* ─── MARQUEE ───────────────────────────────── */
function buildMarquee() {
  const doubled = [...MARQUEE_ROLES, ...MARQUEE_ROLES];
  document.getElementById("marqueeTrack").innerHTML =
    doubled.map(r => `<span class="marquee-item"><span class="m-dot"></span>${r}</span>`).join("");
}

/* ─── SCROLL REVEAL ─────────────────────────── */
function observeReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
}

/* ─── ANIMATED COUNTERS ─────────────────────── */
function animateCounters() {
  document.querySelectorAll("[data-target]").forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    let start; const duration = 1400;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target >= 100 ? Math.round(target * e) : (target * e).toFixed(0)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ─── NAV SCROLL ────────────────────────────── */
window.addEventListener("scroll", () => {
  document.getElementById("mainNav").style.borderBottomColor =
    window.scrollY > 40 ? "var(--border2)" : "var(--border)";
});

/* ─── MOBILE MENU ───────────────────────────── */
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

/* ─── INIT ──────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  buildMarquee();
  renderCandidates();
  observeReveal();

  // Counter animation on hero stats entering view
  const statsEl = document.querySelector(".hero-stats");
  if (statsEl) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animateCounters(); }
    }, { threshold: 0.5 }).observe(statsEl);
  }
});