import { useEffect, useMemo, useState } from 'react'
import './Companies.css'
import Navbar from './Navbar'

const COMPANIES = [
  { name: 'Google', initials: 'G', industry: 'tech', sector: 'Technology', country: 'USA', jobs: 124, badge: 'hiring', size: '100K+ Employees' },
  { name: 'Stripe', initials: 'ST', industry: 'finance', sector: 'FinTech', country: 'USA', jobs: 38, badge: 'partner', size: '8K Employees' },
  { name: 'Airbnb', initials: 'AB', industry: 'tech', sector: 'Travel & Tech', country: 'USA', jobs: 56, badge: 'hiring', size: '6K Employees' },
  { name: 'Spotify', initials: 'SP', industry: 'media', sector: 'Music & Media', country: 'Sweden', jobs: 44, badge: 'hiring', size: '9K Employees' },
  { name: 'Shopify', initials: 'SH', industry: 'ecommerce', sector: 'E-Commerce', country: 'Canada', jobs: 82, badge: 'hiring', size: '12K Employees' },
  { name: 'Figma', initials: 'FG', industry: 'design', sector: 'Design Tools', country: 'USA', jobs: 19, badge: 'partner', size: '1K Employees' },
  { name: 'Notion', initials: 'NO', industry: 'tech', sector: 'Productivity', country: 'USA', jobs: 23, badge: 'featured', size: '500 Employees' },
  { name: 'Netflix', initials: 'NF', industry: 'media', sector: 'Streaming', country: 'USA', jobs: 67, badge: 'hiring', size: '13K Employees' },
  { name: 'Salesforce', initials: 'SF', industry: 'tech', sector: 'CRM / Cloud', country: 'USA', jobs: 91, badge: 'partner', size: '80K Employees' },
  { name: 'NVIDIA', initials: 'NV', industry: 'tech', sector: 'Semiconductors', country: 'USA', jobs: 143, badge: 'hiring', size: '30K Employees' },
  { name: 'Revolut', initials: 'RV', industry: 'finance', sector: 'Neobanking', country: 'UK', jobs: 55, badge: 'hiring', size: '8K Employees' },
  { name: 'Canva', initials: 'CV', industry: 'design', sector: 'Design Platform', country: 'Australia', jobs: 31, badge: 'featured', size: '4K Employees' },
  { name: 'Amazon', initials: 'AM', industry: 'ecommerce', sector: 'E-Commerce', country: 'USA', jobs: 210, badge: 'partner', size: '1.5M Employees' },
  { name: 'Adobe', initials: 'AD', industry: 'design', sector: 'Creative Software', country: 'USA', jobs: 74, badge: 'hiring', size: '30K Employees' },
  { name: 'ByteDance', initials: 'BD', industry: 'media', sector: 'Social Media', country: 'China', jobs: 186, badge: 'hiring', size: '100K+ Employees' },
]

const BADGE_CFG = {
  hiring: { label: '● Actively Hiring', cls: 'badge-hiring' },
  featured: { label: 'Featured', cls: 'badge-featured' },
  partner: { label: '★ Partner', cls: 'badge-partner' },
}

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Tech', value: 'tech' },
  { label: 'Finance', value: 'finance' },
  { label: 'Design & Creative', value: 'design' },
  { label: 'E-Commerce', value: 'ecommerce' },
  { label: 'Media', value: 'media' },
]

const Companies = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [mobileOpen, setMobileOpen] = useState(false)

  const filteredCompanies = useMemo(
    () => (activeFilter === 'all' ? COMPANIES : COMPANIES.filter((company) => company.industry === activeFilter)),
    [activeFilter],
  )

  const marqueeItems = useMemo(() => [...COMPANIES.map((company) => company.name), ...COMPANIES.map((company) => company.name)], [])

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
      { threshold: 0.08 },
    )

    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [filteredCompanies.length, activeFilter])

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav')
      if (!nav) return
      nav.style.borderBottomColor = window.scrollY > 40 ? 'var(--border2)' : 'var(--border)'
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const animateCounters = () => {
      document.querySelectorAll('.stat-num').forEach((el) => {
        const targetText = el.textContent || ''
        const numeric = parseFloat(targetText.replace(/[^0-9.]/g, ''))
        const suffix = targetText.replace(/[0-9.]/g, '')
        if (Number.isNaN(numeric)) return
        let start
        const duration = 1400
        const step = (timestamp) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = numeric < 100 ? (numeric * eased).toFixed(numeric % 1 !== 0 ? 1 : 0) : Math.round(numeric * eased)
          el.textContent = `${current}${suffix}`
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      })
    }

    const statsEl = document.querySelector('.hero-stats')
    if (!statsEl) return

    const statsObserver = new IntersectionObserver(
      (entries, io) => {
        if (entries[0]?.isIntersecting) {
          animateCounters()
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    statsObserver.observe(statsEl)
    return () => statsObserver.disconnect()
  }, [])

  const toggleMenu = () => setMobileOpen((open) => !open)
  const selectFilter = (value) => setActiveFilter(value)

  return (
    <div className="companies-page">
        <Navbar />

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="hero-content">
          <div className="hero-eyebrow reveal">
            <span className="hero-eyebrow-dot" />
            For Companies
          </div>

          <h1 className="hero-title reveal reveal-delay-1">
            <span className="line-outline">BUILD YOUR</span>
            <br />
            <span className="line-accent">DREAM TEAM</span>
            <br />
            <span className="line-outline">FASTER.</span>
          </h1>

          <div className="hero-body">
            <div>
              <p className="hero-desc reveal reveal-delay-2">
                We are a tech talent screening and development platform focused on identifying and preparing high-potential students and fresh graduates. Unlike traditional job portals, we do not just list candidates. We pre-train, assess, and verify them before recommendation.
              </p>
              <div className="hero-cta reveal reveal-delay-3">
                <a href="#companies" className="btn-white">
                  Browse Top Companies
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#services" className="btn-ghost-dark">Our Services</a>
              </div>
            </div>

            <div className="hero-stats reveal reveal-delay-3">
              <div className="hero-stat">
                <div className="stat-num">4.5K</div>
                <div className="stat-lbl">Companies</div>
              </div>
              <div className="hero-stat">
                <div className="stat-num">96%</div>
                <div className="stat-lbl">Retention</div>
              </div>
              <div className="hero-stat">
                <div className="stat-num">13D</div>
                <div className="stat-lbl">Avg. Hire</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-section">
        <div className="marquee-track">
          {marqueeItems.map((name, index) => (
            <span className="marquee-item" key={`${name}-${index}`}>
              <span className="marquee-dot" />
              {name}
            </span>
          ))}
        </div>
      </div>

      <section className="services-section" id="services">
        <div className="section-inner">
          <div className="services-header">
            <div>
              <div className="section-tag reveal">What We Offer</div>
              <h2 className="section-title reveal reveal-delay-1">ADVANTAGES<br />FOR COMPANIES</h2>
            </div>
            <p className="section-desc reveal reveal-delay-2" style={{ marginTop: 0 }}>
              Everything you need to attract, assess, and hire top talent — in one unified platform built for modern teams.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card reveal">
              <span className="service-num">01</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="service-title">Candidates</div>
              <p className="service-desc">
                Access to pre-screened candidates You don’t need to waste your time, we will offer you the best candidates, So you can interview them. We solve your problem by delivering pre-evaluated candidates.
              </p>
              <div className="service-tags">
                <span className="s-tag">Great Communication</span>
                <span className="s-tag">Ranked Results</span>
                <span className="s-tag">Collaboration record</span>
                <span className="s-tag">Discipline record</span>
              </div>
            </div>
            <div className="service-card reveal reveal-delay-1">
              <span className="service-num">02</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="service-title">Talent in Candidates</div>
              <p className="service-desc">
                Each candidate has : Technical skill score based on their skills, Project portfolio, Collaboration record, Score of their Communication, explanation and Intelligence.
              </p>
              <div className="service-tags">
                <span className="s-tag">Skilled</span>
                <span className="s-tag">Guarented</span>
                <span className="s-tag">Well-prepared</span>
              </div>
            </div>
            <div className="service-card reveal reveal-delay-2">
              <span className="service-num">03</span>
              <div className="service-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="service-title">Preparation</div>
              <p className="service-desc">
                We trained students by giving tasks from us with a salary for them, So they become familiar and more talented for jobs.
              </p>
              <div className="service-tags">
                <span className="s-tag">Job Ready</span>
                <span className="s-tag">Team Collaboration</span>
                <span className="s-tag">Project management</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="companies-section" id="companies">
        <div className="section-inner">
          <div className="companies-header">
            <div>
              <div className="section-tag reveal">Top Partners</div>
              <h2 className="section-title reveal reveal-delay-1">WORLD-CLASS<br />COMPANIES</h2>
            </div>
            <p className="section-desc reveal reveal-delay-2" style={{ marginTop: 0, textAlign: 'right' }}>
              Industry leaders who trust HHS to build their teams.
            </p>
          </div>

          <div className="filter-row reveal">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`filter-btn${activeFilter === filter.value ? ' active' : ''}`}
                onClick={() => selectFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="company-list reveal">
            {filteredCompanies.map((company, index) => {
              const badge = BADGE_CFG[company.badge]
              return (
                <div className="company-row reveal" key={company.name} style={{ transitionDelay: `${index * 0.04}s` }}>
                  <div className="company-logo-box">{company.initials}</div>
                  <div>
                    <div className="company-name">{company.name}</div>
                    <div className="company-sub">
                      <span>{company.sector}</span>
                      <span className="company-sub-dot" />
                      <span>{company.country}</span>
                      <span className="company-sub-dot" />
                      <span>{company.size}</span>
                    </div>
                  </div>
                  {badge && <span className={`company-badge ${badge.cls}`}>{badge.label}</span>}
                  <div>
                    <div className="company-jobs">{company.jobs}</div>
                    <div className="company-jobs-lbl">Open Roles</div>
                  </div>
                  <div className="company-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="section-inner">
          <div className="section-tag reveal">How It Works</div>
          <h2 className="section-title reveal reveal-delay-1">4 STEPS TO<br />YOUR NEXT HIRE</h2>

          <div className="process-steps">
            <div className="process-step reveal">
              <div className="step-num">01</div>
              <div className="step-title">Create Profile</div>
              <p className="step-desc">Set up your company profile in minutes. Add culture, benefits, team photos, and what makes you a great company.</p>
              <span className="step-connector">→</span>
            </div>
            <div className="process-step reveal reveal-delay-1">
              <div className="step-num">02</div>
              <div className="step-title">Post Roles</div>
              <p className="step-desc">Publish job listings with smart templates. Our AI enriches your descriptions to attract the right talent organically.</p>
              <span className="step-connector">→</span>
            </div>
            <div className="process-step reveal reveal-delay-2">
              <div className="step-num">03</div>
              <div className="step-title">Review Matches</div>
              <p className="step-desc">Receive a ranked shortlist of pre-matched candidates within 24 hours. Browse profiles, skills, and portfolio work.</p>
              <span className="step-connector">→</span>
            </div>
            <div className="process-step reveal reveal-delay-3">
              <div className="step-num">04</div>
              <div className="step-title">Hire &amp; Onboard</div>
              <p className="step-desc">Interview, extend offers, and onboard — all within the platform. Average time-to-hire is just 18 days.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="section-inner">
          <div className="section-tag reveal">Transparent Pricing</div>
          <h2 className="section-title reveal reveal-delay-1">PLANS FOR EVERY<br />TEAM SIZE</h2>

          <div className="pricing-grid">
            <div className="pricing-card reveal">
              <div className="pricing-card-top" />
              <div className="pricing-tier">Starter</div>
              <div className="pricing-price">$0</div>
              <div className="pricing-period">per month · billed annually</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="check">✓</span> 3 active job listings</li>
                <li className="pricing-feature"><span className="check">✓</span> 20 Random candidate views / mo</li>
                <li className="pricing-feature"><span className="check">✓</span> Basic AI matching</li>
                <li className="pricing-feature"><span className="check">✓</span> Email support</li>
                <li className="pricing-feature"><span className="dash">—</span> <span style={{ color: 'var(--t4)' }}>Analytics dashboard</span></li>
                <li className="pricing-feature"><span className="dash">—</span> <span style={{ color: 'var(--t4)' }}>Dedicated CSM</span></li>
                <li className="pricing-feature"><span className="dash">—</span> <span style={{ color: 'var(--t4)' }}>API access</span></li>
              </ul>
              <button className="pricing-btn pricing-btn-outline" type="button">Get Started</button>
            </div>
            <div className="pricing-card featured reveal reveal-delay-1">
              <div className="pricing-card-top" />
              <div className="pricing-tier" style={{ color: 'var(--white)' }}>
                Growth
                <span style={{ background: 'var(--white)', color: 'var(--bg)', fontSize: '9px', padding: '2px 7px', borderRadius: '3px', marginLeft: '8px', fontWeight: 800, letterSpacing: '0.1em' }}>
                  POPULAR
                </span>
              </div>
              <div className="pricing-price">$799</div>
              <div className="pricing-period">per month · billed annually</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="check">✓</span> 15 active job listings</li>
                <li className="pricing-feature"><span className="check">✓</span> Unlimited candidate views</li>
                <li className="pricing-feature"><span className="check">✓</span> Advanced AI matching</li>
                <li className="pricing-feature"><span className="check">✓</span> Priority support</li>
                <li className="pricing-feature"><span className="check">✓</span> Analytics dashboard</li>
                <li className="pricing-feature"><span className="check">✓</span> Employer branding tools</li>
                <li className="pricing-feature"><span className="dash">—</span> <span style={{ color: 'var(--t4)' }}>Dedicated CSM</span></li>
              </ul>
              <button className="pricing-btn pricing-btn-solid" type="button">Start Free Trial</button>
            </div>
            <div className="pricing-card reveal reveal-delay-2">
              <div className="pricing-card-top" />
              <div className="pricing-tier">Enterprise</div>
              <div className="pricing-price">Custom</div>
              <div className="pricing-period">tailored to your team size</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="check">✓</span> Unlimited listings</li>
                <li className="pricing-feature"><span className="check">✓</span> Unlimited views &amp; contacts</li>
                <li className="pricing-feature"><span className="check">✓</span> Custom AI training</li>
                <li className="pricing-feature"><span className="check">✓</span> 24/7 dedicated support</li>
                <li className="pricing-feature"><span className="check">✓</span> Advanced analytics &amp; API</li>
                <li className="pricing-feature"><span className="check">✓</span> Dedicated CSM</li>
                <li className="pricing-feature"><span className="check">✓</span> SSO &amp; custom integrations</li>
              </ul>
              <button className="pricing-btn pricing-btn-outline" type="button">Talk to Sales</button>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-tag reveal">Social Proof</div>
          <h2 className="section-title reveal reveal-delay-1">WHAT COMPANIES<br />SAY ABOUT US</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">We scaled our engineering team from 8 to 40 people in under 6 months. The quality of candidates was unmatched — every single hire has been exceptional.</p>
              <div className="testimonial-author">
                <div className="t-avatar">AK</div>
                <div>
                  <div className="t-name">Arjun Kapoor</div>
                  <div className="t-role">CTO · Finova Labs</div>
                </div>
                <div className="t-stars">★★★★★</div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-1">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">Hire and Hired Stars cut our average time-to-hire from 52 days down to 19. The AI matching is genuinely impressive — it just works.</p>
              <div className="testimonial-author">
                <div className="t-avatar">SL</div>
                <div>
                  <div className="t-name">Sophie Laurent</div>
                  <div className="t-role">Head of People · Nuvola</div>
                </div>
                <div className="t-stars">★★★★★</div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-2">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">The employer branding tools helped us tell our story better. Applications went up 3x after we relaunched our company profile through HHS.</p>
              <div className="testimonial-author">
                <div className="t-avatar">MW</div>
                <div>
                  <div className="t-name">Marcus Webb</div>
                  <div className="t-role">Talent Lead · Orbit Design</div>
                </div>
                <div className="t-stars">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner reveal">
          <div>
            <h2 className="cta-title">READY TO BUILD<br />YOUR DREAM TEAM?</h2>
            <p className="cta-sub">Join 8,500+ companies already hiring smarter. Start your free trial today — no credit card required.</p>
          </div>
          <div className="cta-actions">
            <a href="#" className="btn-white">
              Start Free Trial
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#" className="btn-ghost-dark">Talk to Sales</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="nav-logo-mark" style={{ width: '30px', height: '30px', fontSize: '13px' }}>HHS</div>
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

export default Companies
