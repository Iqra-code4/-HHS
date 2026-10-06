import { useEffect, useMemo, useState } from 'react'
import './Candidates.css'
import Navbar from './Navbar'

const CANDIDATES = [
  { name: 'Zara Ahmed', initials: 'ZA', role: 'Full Stack Engineer', field: 'engineering', skills: ['React', 'Node.js', 'AWS', 'TypeScript'], salary: '$120K', badge: 'top', exp: '5 yrs', location: 'New York, USA', rating: 5, available: true },
  { name: 'Kai Morrison', initials: 'KM', role: 'Product Manager', field: 'product', skills: ['Roadmapping', 'Agile', 'GTM', 'Figma'], salary: '$130K', badge: 'top', exp: '7 yrs', location: 'San Francisco, USA', rating: 5, available: true },
  { name: 'Priya Lamba', initials: 'PL', role: 'UX / Product Designer', field: 'design', skills: ['Figma', 'Prototyping', 'Research', 'CSS'], salary: '$105K', badge: 'open', exp: '4 yrs', location: 'London, UK', rating: 5, available: true },
  { name: 'Omar Shaikh', initials: 'OS', role: 'ML Engineer', field: 'data', skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'], salary: '$155K', badge: 'top', exp: '6 yrs', location: 'Toronto, Canada', rating: 5, available: true },
  { name: 'Lena Fischer', initials: 'LF', role: 'Data Analyst', field: 'data', skills: ['SQL', 'Tableau', 'Python', 'dbt'], salary: '$95K', badge: 'new', exp: '2 yrs', location: 'Berlin, Germany', rating: 4, available: true },
  { name: 'Aryan Kapoor', initials: 'AK', role: 'Backend Engineer', field: 'engineering', skills: ['Go', 'PostgreSQL', 'Docker', 'Kubernetes'], salary: '$135K', badge: 'open', exp: '5 yrs', location: 'Dubai, UAE', rating: 5, available: true },
  { name: 'Sofia Mendes', initials: 'SM', role: 'Growth Marketing Lead', field: 'marketing', skills: ['SEO', 'Paid Media', 'Analytics', 'HubSpot'], salary: '$100K', badge: 'open', exp: '6 yrs', location: 'Lisbon, Portugal', rating: 5, available: true },
  { name: 'James Wu', initials: 'JW', role: 'iOS Developer', field: 'engineering', skills: ['Swift', 'SwiftUI', 'Xcode', 'CoreData'], salary: '$125K', badge: 'employed', exp: '4 yrs', location: 'Sydney, Australia', rating: 4, available: false },
  { name: 'Nadia Hassan', initials: 'NH', role: 'Brand Designer', field: 'design', skills: ['Illustrator', 'Brand ID', 'Motion', 'PS'], salary: '$88K', badge: 'new', exp: '3 yrs', location: 'Cairo, Egypt', rating: 4, available: true },
  { name: 'Lucas Petit', initials: 'LP', role: 'Financial Analyst', field: 'finance', skills: ['Excel', 'Modelling', 'Bloomberg', 'SQL'], salary: '$98K', badge: 'open', exp: '4 yrs', location: 'Paris, France', rating: 5, available: true },
  { name: 'Aisha Nwachukwu', initials: 'AN', role: 'DevOps Engineer', field: 'engineering', skills: ['Terraform', 'CI/CD', 'AWS', 'Monitoring'], salary: '$140K', badge: 'top', exp: '6 yrs', location: 'Lagos, Nigeria', rating: 5, available: true },
  { name: 'Hiroshi Tanaka', initials: 'HT', role: 'Data Scientist', field: 'data', skills: ['Python', 'R', 'SparkML', 'Statistics'], salary: '$145K', badge: 'employed', exp: '8 yrs', location: 'Tokyo, Japan', rating: 5, available: false },
  { name: 'Chloe Dubois', initials: 'CD', role: 'Content Strategist', field: 'marketing', skills: ['Copywriting', 'SEO', 'CMS', 'Analytics'], salary: '$80K', badge: 'new', exp: '2 yrs', location: 'Montreal, Canada', rating: 4, available: true },
  { name: 'Raj Patel', initials: 'RP', role: 'Cloud Architect', field: 'engineering', skills: ['Azure', 'GCP', 'Networking', 'Security'], salary: '$160K', badge: 'top', exp: '9 yrs', location: 'Mumbai, India', rating: 5, available: true },
  { name: 'Mei Lin', initials: 'ML', role: 'Motion Designer', field: 'design', skills: ['After Effects', 'Lottie', '3D', 'Cinema4D'], salary: '$92K', badge: 'open', exp: '4 yrs', location: 'Singapore', rating: 5, available: true },
  { name: 'Daniel Osei', initials: 'DO', role: 'Quantitative Analyst', field: 'finance', skills: ['Python', 'R', 'VBA', 'Risk Modelling'], salary: '$130K', badge: 'top', exp: '5 yrs', location: 'Accra, Ghana', rating: 5, available: true },
]

const BADGE_CFG = {
  open: { label: '● Open to Work', cls: 'badge-open' },
  top: { label: '★ Top Talent', cls: 'badge-top' },
  new: { label: '◆ New Profile', cls: 'badge-new' },
  employed: { label: 'Currently Hired', cls: 'badge-employed' },
}

const MARQUEE_ROLES = [
  'Full Stack Engineer',
  'UX Designer',
  'Data Scientist',
  'Product Manager',
  'ML Engineer',
  'Cloud Architect',
  'DevOps Engineer',
  'Brand Designer',
  'Growth Marketer',
  'Financial Analyst',
  'iOS Developer',
  'Motion Designer',
  'Quantitative Analyst',
  'Content Strategist',
]

const PAGE_SIZE = 4

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(8)
  const [mobileOpen, setMobileOpen] = useState(false)

  const filteredCandidates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return CANDIDATES.filter((candidate) => {
      const matchField = activeFilter === 'all' || candidate.field === activeFilter
      const matchSearch =
        !q ||
        candidate.name.toLowerCase().includes(q) ||
        candidate.role.toLowerCase().includes(q) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(q))
      return matchField && matchSearch
    })
  }, [activeFilter, searchQuery])

  const visibleCandidates = filteredCandidates.slice(0, visibleCount)
  const showLoadMore = filteredCandidates.length > visibleCount
  const marqueeItems = useMemo(() => [...MARQUEE_ROLES, ...MARQUEE_ROLES], [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07 },
    )

    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [visibleCandidates.length, filteredCandidates.length, activeFilter, searchQuery])

  useEffect(() => {
    const heroStats = document.querySelector('.hero-stats')
    if (!heroStats) return

    const animateCounters = () => {
      document.querySelectorAll('[data-target]').forEach((el) => {
        const target = parseFloat(el.dataset.target)
        const suffix = el.dataset.suffix || ''
        let start
        const duration = 1400
        const step = (ts) => {
          if (!start) start = ts
          const progress = Math.min((ts - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          el.textContent = (target >= 100 ? Math.round(target * eased) : (target * eased).toFixed(0)) + suffix
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      })
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          animateCounters()
          statsObserver.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    statsObserver.observe(heroStats)
    return () => statsObserver.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('mainNav')
      if (nav) {
        nav.style.borderBottomColor = window.scrollY > 40 ? 'var(--border2)' : 'var(--border)'
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFilter = (field) => {
    setActiveFilter(field)
    setVisibleCount(8)
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
    setVisibleCount(8)
  }

  const loadMore = () => {
    setVisibleCount((count) => count + PAGE_SIZE)
  }

  const toggleMenu = () => setMobileOpen((open) => !open)

  return (
    <div className="candidates-page">
        <Navbar />

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow glow-a" />
        <div className="hero-glow glow-b" />

        <div className="hero-content">
          <div className="hero-eyebrow reveal">
            <span className="eyebrow-dot" />
            For Candidates & Students
          </div>
          <h1 className="hero-title reveal d1">
            <span className="line-outline">LAUNCH YOUR</span>
            <br />
            <span className="line-solid">CAREER</span>
            <br />
            <span className="line-outline">WITHOUT LIMITS.</span>
          </h1>

          <div className="hero-body">
            <div>
              <p className="hero-desc reveal d2">
                Whether you're a fresh graduate or a seasoned professional, Hire and Hired Stars gives you every tool, connection, and resource to land the role you deserve — faster.
              </p>
              <div className="hero-cta reveal d3">
                <a href="#candidates" className="btn-white">
                  Explore Talent
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#services" className="btn-ghost">Our Services</a>
              </div>
            </div>

            <div className="hero-stats reveal d3">
              <div className="hero-stat">
                <div className="stat-num" data-target="200" data-suffix="K+">200K+</div>
                <div className="stat-lbl">Candidates</div>
              </div>
              <div className="hero-stat">
                <div className="stat-num" data-target="13" data-suffix="D">13D</div>
                <div className="stat-lbl">Avg. Hire Time</div>
              </div>
              <div className="hero-stat">
                <div className="stat-num" data-target="96" data-suffix="%">96%</div>
                <div className="stat-lbl">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-track">
          {marqueeItems.map((role, index) => (
            <span className="marquee-item" key={`${role}-${index}`}>
              <span className="m-dot" />
              {role}
            </span>
          ))}
        </div>
      </div>

      <section className="services-section" id="services">
        <div className="section-inner">
          <div className="services-header">
            <div>
              <div className="section-tag reveal">What We Offer</div>
              <h2 className="section-title reveal d1">ADVANTAGES FOR<br />CANDIDATES</h2>
            </div>
            <p className="section-desc reveal d2" style={{ marginTop: 0 }}>
              Everything a modern job seeker needs — AI-matching, resume tools, mentorship, and direct access to top employers worldwide.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card reveal">
              <span className="service-num">01</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="service-title">Groups</div>
              <p className="service-desc">Students are placed in small accountability groups where they : Learn together, Build projects together and Practice interviews to surface your top matches. This reduces isolation, laziness and increases consistency plus completion rates - no endless scrolling.</p>
              <div className="service-tags"><span className="s-tag">Skilled people</span><span className="s-tag">Personalised</span><span className="s-tag">Real-Time</span></div>
            </div>
            <div className="service-card reveal d1">
              <span className="service-num">02</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className="service-title">Resume Builder</div>
              <p className="service-desc">Create an ATS-optimised, visually stunning resume in minutes. Our builder adapts in real-time with AI suggestions for every role you target.</p>
              <div className="service-tags"><span className="s-tag">ATS-Ready</span><span className="s-tag">40+ Templates</span><span className="s-tag">AI Suggestions</span></div>
            </div>
            <div className="service-card reveal d2">
              <span className="service-num">03</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="service-title">Mentorship Network</div>
              <p className="service-desc">Connect with 5,000+ industry mentors across engineering, design, finance, and more. Book 1-on-1 sessions to accelerate your career growth.</p>
              <div className="service-tags"><span className="s-tag">5K+ Mentors</span><span className="s-tag">1-on-1 Sessions</span><span className="s-tag">Free Tier</span></div>
            </div>
            <div className="service-card reveal d1">
              <span className="service-num">04</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="service-title">Interview Prep</div>
              <p className="service-desc">Practise with AI mock interviews tailored to your target role. Get instant feedback on answers, body language scores, and filler-word tracking.</p>
              <div className="service-tags"><span className="s-tag">AI Mock Calls</span><span className="s-tag">Role-Specific</span><span className="s-tag">Video Analysis</span></div>
            </div>
            <div className="service-card reveal d2">
              <span className="service-num">05</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div className="service-title">Opportunities</div>
              <p className="service-desc">Top-performing students get opportunities to: Work on real platform project, Gain real-world experience, and build production-level applications So instead of waiting for internships… They build experience by the tasks and projects, which we will give them.</p>
              <div className="service-tags"><span className="s-tag">Live Data</span><span className="s-tag">By Role & City</span><span className="s-tag">Equity Insights</span></div>
            </div>
            <div className="service-card reveal d3">
              <span className="service-num">06</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div className="service-title">Rewards</div>
              <p className="service-desc">We will give them tasks, if they will complete it, they will receive prizes, certificates, So then can add it in their resume. Then they will receive a verified skill profile, showing their real capability level (Beginner, Intermediate, Job-Ready). This makes their profile stronger than a normal CV.</p>
              <div className="service-tags"><span className="s-tag">Prices</span><span className="s-tag">Certificates</span><span className="s-tag">Ranks</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="candidates-section" id="candidates">
        <div className="section-inner">
          <div className="candidates-header">
            <div>
              <div className="section-tag reveal">Talent Showcase</div>
              <h2 className="section-title reveal d1">TOP CANDIDATES<br />&amp; STUDENTS</h2>
            </div>
            <p className="section-desc reveal d2" style={{ marginTop: 0, textAlign: 'right' }}>
              Discover pre-vetted professionals ready for their next challenge.
            </p>
          </div>

          <div className="search-filter-bar reveal">
            <div className="search-wrap">
              <span className="search-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                className="search-input"
                type="text"
                placeholder="Search by name, skill, or role…"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="filter-row reveal d1" id="filterRow">
            {[
              { label: 'All', value: 'all' },
              { label: 'Engineering', value: 'engineering' },
              { label: 'Design', value: 'design' },
              { label: 'Product', value: 'product' },
              { label: 'Data & AI', value: 'data' },
              { label: 'Marketing', value: 'marketing' },
              { label: 'Finance', value: 'finance' },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`filter-btn${activeFilter === filter.value ? ' active' : ''}`}
                onClick={() => handleFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="candidates-grid reveal" id="candidatesGrid">
            {visibleCandidates.length === 0 ? (
              <div className="no-results">No candidates found — try a different search or filter.</div>
            ) : (
              visibleCandidates.map((candidate, index) => {
                const badge = BADGE_CFG[candidate.badge] || BADGE_CFG.open
                const stars = Array.from({ length: 5 }, (_, starIndex) => (starIndex < candidate.rating ? '★' : '☆')).join('')
                return (
                  <div className="candidate-card reveal" key={candidate.name} style={{ transitionDelay: `${(index % PAGE_SIZE) * 0.06}s` }}>
                    <div className="candidate-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="candidate-avatar">{candidate.initials}</div>
                        <div>
                          <div className="candidate-name">{candidate.name}</div>
                          <div className="candidate-role">{candidate.role}</div>
                        </div>
                      </div>
                      <span className={`candidate-badge ${badge.cls}`}>{badge.label}</span>
                    </div>
                    <div className="candidate-meta">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {candidate.location}
                      <span className="c-dot" />
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {candidate.exp} exp.
                    </div>
                    <div className="skill-tags">
                      {candidate.skills.map((skill) => (
                        <span className="skill-tag" key={skill}>{skill}</span>
                      ))}
                    </div>
                    <div className="candidate-footer">
                      <div>
                        <div className="candidate-salary">
                          {candidate.salary}
                          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: 500, color: 'var(--t4)' }}> /yr</span>
                        </div>
                        <div className="candidate-salary-lbl">Expected</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <div className="rating-stars">{stars}</div>
                        <button type="button" className="view-btn">View Profile</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="load-more-wrap reveal">
            {showLoadMore && (
              <button className="load-more-btn" type="button" onClick={loadMore}>
                Load More Candidates
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="section-inner">
          <div className="section-tag reveal">How It Works</div>
          <h2 className="section-title reveal d1">YOUR PATH FROM<br />PROFILE TO OFFER</h2>

          <div className="process-steps">
            <div className="process-step reveal">
              <div className="step-num">01</div>
              <div className="step-title">Build Your Profile</div>
              <p className="step-desc">Create a rich, ATS-optimised profile in under 10 minutes. Add skills, experience, portfolio, and your dream roles.</p>
              <span className="step-arrow">→</span>
            </div>
            <div className="process-step reveal d1">
              <div className="step-num">02</div>
              <div className="step-title">Get Matched</div>
              <p className="step-desc">Our AI surfaces your top-matched jobs daily. You'll receive ranked listings with salary insights and culture-fit scores.</p>
              <span className="step-arrow">→</span>
            </div>
            <div className="process-step reveal d2">
              <div className="step-num">03</div>
              <div className="step-title">Apply &amp; Prepare</div>
              <p className="step-desc">One-click apply to any role. Prepare for your job by mock interviews, projects and tasks from us.</p>
              <span className="step-arrow">→</span>
            </div>
            <div className="process-step reveal d3">
              <div className="step-num">04</div>
              <div className="step-title">Land the Job</div>
              <p className="step-desc">Receive offers, negotiate with data-backed salary guidance, and onboard smoothly — all within HHS.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="section-inner">
          <div className="section-tag reveal">Career Resources</div>
          <h2 className="section-title reveal d1">EVERYTHING YOU NEED<br />TO SUCCEED</h2>

          <div className="resources-grid">
            <div className="resource-card reveal d1">
              <div className="bg-number">01</div>
              <div className="resource-tag">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Resume Lab
              </div>
              <div className="resource-icon-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="resource-title">Resume &amp; Cover Letter Lab</div>
              <p className="resource-desc">40+ professional templates, AI-powered content suggestions, and real-time ATS scoring so your application always gets through.</p>
              <ul className="resource-list">
                <li><span className="r-check">✓</span> ATS keyword optimiser</li>
                <li><span className="r-check">✓</span> Tailored cover letter AI</li>
                <li><span className="r-check">✓</span> LinkedIn profile sync</li>
                <li><span className="r-check">✓</span> Export to PDF / DOCX</li>
              </ul>
            </div>
            <div className="resource-card reveal d2">
              <div className="bg-number">02</div>
              <div className="resource-tag">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
                Interview Prep
              </div>
              <div className="resource-icon-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              </div>
              <div className="resource-title">AI Interview Simulator</div>
              <p className="resource-desc">Role-specific mock interviews powered by AI. Record video responses, get scored on content, clarity, and confidence in seconds.</p>
              <ul className="resource-list">
                <li><span className="r-check">✓</span> 1,000+ question bank</li>
                <li><span className="r-check">✓</span> Video &amp; tone analysis</li>
                <li><span className="r-check">✓</span> STAR method coaching</li>
                <li><span className="r-check">✓</span> Instant scorecard</li>
              </ul>
            </div>
            <div className="resource-card wide featured reveal d1">
              <div className="bg-number">03</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                <div>
                  <div className="resource-tag">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    Skill Accelerator
                  </div>
                  <div className="resource-icon-lg">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div className="resource-title">Skill Accelerator<br />Program</div>
                  <p className="resource-desc">500+ micro-courses, certification paths, and weekly live workshops taught by industry practitioners. Earn badges employers actually recognise.</p>
                </div>
                <div>
                  <ul className="resource-list" style={{ marginTop: 0 }}>
                    <li><span className="r-check">✓</span> 500+ curated courses</li>
                    <li><span className="r-check">✓</span> Live workshops weekly</li>
                    <li><span className="r-check">✓</span> Verified skill badges</li>
                    <li><span className="r-check">✓</span> Learning paths by role</li>
                    <li><span className="r-check">✓</span> Offline access (Pro)</li>
                    <li><span className="r-check">✓</span> Certificate of completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-tag reveal">Success Stories</div>
          <h2 className="section-title reveal d1">CANDIDATES WHO<br />MADE IT</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="t-quote">"</div>
              <p className="t-text">I'd been applying blindly for 5 months. HHS's AI matched me to a senior role at Stripe within two weeks. The resume builder alone got me double the callbacks.</p>
              <div className="t-author">
                <div className="t-avatar">ZA</div>
                <div>
                  <div className="t-name">Zara Ahmed</div>
                  <div className="t-role">Software Engineer · Stripe</div>
                </div>
                <div className="t-stars">★★★★★</div>
              </div>
            </div>
            <div className="testimonial-card reveal d1">
              <div className="t-quote">"</div>
              <p className="t-text">The mock interview feature is insane. I did 10 practice sessions and walked into Google completely prepared. Got the offer first try. Worth every penny.</p>
              <div className="t-author">
                <div className="t-avatar">KM</div>
                <div>
                  <div className="t-name">Kai Morrison</div>
                  <div className="t-role">Product Manager · Google</div>
                </div>
                <div className="t-stars">★★★★★</div>
              </div>
            </div>
            <div className="testimonial-card reveal d2">
              <div className="t-quote">"</div>
              <p className="t-text">As a bootcamp grad, I was worried about competing. HHS showed me exactly which skills to build and connected me with a mentor who helped me pivot into UX Design.</p>
              <div className="t-author">
                <div className="t-avatar">PL</div>
                <div>
                  <div className="t-name">Priya Lamba</div>
                  <div className="t-role">UX Designer · Airbnb</div>
                </div>
                <div className="t-stars">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="plans-section" id="plans">
        <div className="section-inner">
          <div className="section-tag reveal">Candidate Plans</div>
          <h2 className="section-title reveal d1">FREE TO START,<br />PRO TO ACCELERATE</h2>

          <div className="plans-grid">
            <div className="plan-card reveal">
              <div className="plan-top" />
              <div className="plan-tier">Free</div>
              <div className="plan-price">$0</div>
              <div className="plan-period">forever · no credit card</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li className="plan-feature"><span className="p-check">✓</span> Public profile &amp; portfolio</li>
                <li className="plan-feature"><span className="p-check">✓</span> 5 job applications / month</li>
                <li className="plan-feature"><span className="p-check">✓</span> Basic AI job matching</li>
                <li className="plan-feature"><span className="p-check">✓</span> 1 resume template</li>
                <li className="plan-feature"><span className="p-dash">—</span> <span style={{ color: 'var(--t4)' }}>Interview simulator</span></li>
                <li className="plan-feature"><span className="p-dash">—</span> <span style={{ color: 'var(--t4)' }}>Salary intelligence</span></li>
                <li className="plan-feature"><span className="p-dash">—</span> <span style={{ color: 'var(--t4)' }}>Mentor access</span></li>
              </ul>
              <button className="plan-btn plan-btn-outline" type="button">Get Started Free</button>
            </div>
            <div className="plan-card featured reveal d1">
              <div className="plan-top" />
              <div className="plan-tier" style={{ color: 'var(--t2)' }}>
                Pro
                <span style={{ background: 'var(--white)', color: 'var(--bg)', fontSize: '9px', padding: '2px 7px', borderRadius: '3px', marginLeft: '8px', fontWeight: 800, letterSpacing: '.1em' }}>
                  POPULAR
                </span>
              </div>
              <div className="plan-price">$29</div>
              <div className="plan-period">per month · cancel anytime</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li className="plan-feature"><span className="p-check">✓</span> Unlimited applications</li>
                <li className="plan-feature"><span className="p-check">✓</span> Advanced AI job matching</li>
                <li className="plan-feature"><span className="p-check">✓</span> 40+ resume templates</li>
                <li className="plan-feature"><span className="p-check">✓</span> AI interview simulator</li>
                <li className="plan-feature"><span className="p-check">✓</span> Full salary intelligence</li>
                <li className="plan-feature"><span className="p-check">✓</span> Mentor network access</li>
                <li className="plan-feature"><span className="p-dash">—</span> <span style={{ color: 'var(--t4)' }}>Dedicated career coach</span></li>
              </ul>
              <button className="plan-btn plan-btn-solid" type="button">Start Free Trial</button>
            </div>
            <div className="plan-card reveal d2">
              <div className="plan-top" />
              <div className="plan-tier">Elite</div>
              <div className="plan-price">$79</div>
              <div className="plan-period">per month · billed monthly</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li className="plan-feature"><span className="p-check">✓</span> Everything in Pro</li>
                <li className="plan-feature"><span className="p-check">✓</span> Dedicated career coach</li>
                <li className="plan-feature"><span className="p-check">✓</span> Priority candidate listing</li>
                <li className="plan-feature"><span className="p-check">✓</span> Direct recruiter intros</li>
                <li className="plan-feature"><span className="p-check">✓</span> Offline course access</li>
                <li className="plan-feature"><span className="p-check">✓</span> Negotiation playbook</li>
                <li className="plan-feature"><span className="p-check">✓</span> 30-day job guarantee*</li>
              </ul>
              <button className="plan-btn plan-btn-outline" type="button">Go Elite</button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner reveal">
          <div>
            <h2 className="cta-title">YOUR NEXT ROLE<br />IS ONE CLICK AWAY.</h2>
            <p className="cta-sub">Join 200,000+ candidates already accelerating their careers on HHS. Create your free profile in under 5 minutes.</p>
          </div>
          <div className="cta-actions">
            <a href="#" className="btn-white">
              Create Free Profile
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#plans" className="btn-ghost">View Plans</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="nav-logo-mark" style={{ width: '29px', height: '27px', fontSize: '13px' }}>HHS</div>
            <span className="footer-copy" style={{ color: 'var(--t3)' }}>© 2026 Hire and Hired Stars. All rights reserved.</span>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Candidates
