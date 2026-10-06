import { useEffect, useState } from 'react'
import './HHS.css'
import Navbar from './Navbar'
import Footer from './Footer'

const HHS = () => {

  return (
    <>
      <Navbar/>
      <section className="hero">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 hero-content">
              <p className="hero-eyebrow">
                <i className="fas fa-bolt me-2" />The Future of Talent Acquisition
              </p>
              <h1 className="hero-title">
                Find Your
                <br />
                <span>Dream Job</span>
                <br />
                Today.
              </h1>
              <p className="hero-sub">
                Connect with top employers and discover thousands of opportunities tailored to your skills and ambitions. Your career breakthrough starts here.
              </p>

              <div className="search-wrapper">
                <div className="search-input-group">
                  <i className="fas fa-search" />
                  <input type="text" className="search-input" placeholder="Job title" />
                </div>
                <div className="search-divider" />
                <div className="search-input-group">
                  <i className="fas fa-map-marker-alt" />
                  <input type="text" className="search-input" placeholder="City, remote..." />
                </div>
                <button className="btn-search">
                  <i className="fas fa-search" /> Search Jobs
                </button>
              </div>

              <div className="hero-tags">
                <span className="tag">UI/UX Design</span>
                <span className="tag">Software Engineer</span>
                <span className="tag">Product Manager</span>
                <span className="tag">Data Science</span>
                <span className="tag">Marketing</span>
                <span className="tag">Web Development</span>
                <span className="tag">App Development</span>
              </div>
            </div>

            <div className="col-lg-5 hero-side d-none d-lg-block position-relative">
              <div className="hero-panel">
                <div className="stat-item">
                  <div className="stat-num">10K+</div>
                  <div className="stat-label">Active Job Listings</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">4.5K</div>
                  <div className="stat-label">Companies Hiring</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">96%</div>
                  <div className="stat-label">Placement Success</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">110+</div>
                  <div className="stat-label">Countries Covered</div>
                </div>
              </div>

              <div className="floating-badge" style={{ bottom: '-25px', left: '-50px' }}>
                <div className="badge-icon">
                  <i className="fas fa-check" />
                </div>
                <div>
                  <div className="badge-text-main">New Match!</div>
                  <div className="badge-text-sub">Senior Dev — Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-7 fade-up">
              <p className="section-label">
                <i className="fas fa-layer-group me-2" />What We Offer
              </p>
              <h2 className="section-title">Our Services</h2>
              <p className="mt-3" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.6 }}>
                Comprehensive talent solutions designed to connect exceptional professionals with forward-thinking companies.
              </p>
            </div>
          </div>
          <div className="row g-5 justify-content-center">
            <div className="col-sm-12 col-lg-5 fade-up">
              <div className="service-card mx-auto">
                <div className="service-icon">
                  <i className="fas fa-users" />
                </div>
                <div className="service-title">For Candidates</div>
                <div className="service-desc">
                  Students are placed in small accountability groups where they:
                  <ul>
                    <li>Learn together</li>
                    <li>Build projects together</li>
                    <li>Practice interviews</li>
                  </ul>
                  This reduces isolation, laziness and increases consistency plus completion rates.
                </div>

                <div className="service-desc" style={{ marginTop: '1rem' }}>
                  Top-performing students get opportunities to: work on real platform project, gain real-world experience, and build production-level applications.
                  So instead of waiting for internships… they build experience inside the ecosystem.
                  Students will complete some:
                  <ul>
                    <li>Technical tasks</li>
                    <li>We will give tasks to every candidate if they want.</li>
                  </ul>
                  Then they will receive a verified skill profile, showing their real capability level (Beginner, Intermediate, Advanced, Job-Ready).
                  This makes their profile stronger than a normal CV.
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-5 fade-up">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-chart-line" />
                </div>
                <div className="service-title">For Companies</div>
                <div className="service-desc">
                  We are a tech talent screening and development platform focused on identifying and preparing high-potential students and fresh graduates. Unlike traditional job portals, we do not just list candidates. We pre-train, assess, and verify them before recommendation.
                </div>
                <div className="service-desc" style={{ marginTop: '1rem' }}>
                  <h6 className="fw-bold">What Companies Get :</h6>
                  <ul>
                    <li>Access to pre-screened candidates</li>
                    <li>You don’t need to waste your time, we will offer you the best candidates, so you can interview them.</li>
                  </ul>
                  We solve your problem by delivering pre-evaluated candidates.
                </div>
                <div className="service-desc" style={{ marginTop: '1rem' }}>
                  <h6 className="fw-bold">Each candidate has :</h6>
                  <ul>
                    <li>Technical skill score based on their skills</li>
                    <li>Project portfolio</li>
                    <li>Collaboration record</li>
                    <li>Score of their Communication, explanation and Intelligence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="jobs-section">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-7 fade-up">
              <p className="section-label">
                <i className="fas fa-briefcase me-2" />Latest Openings
              </p>
              <h2 className="section-title">Featured Jobs</h2>
            </div>
            <div className="col-lg-5 text-lg-end mt-3 mt-lg-0 fade-up">
              <a href="#" className="btn-apply">
                Browse All Jobs <i className="fas fa-arrow-right ms-1" />
              </a>
            </div>
          </div>
          <div className="jobs-grid">
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo">G</div>
                  <div>
                    <div className="job-title">Senior UX Designer</div>
                    <div className="job-company">Google • San Francisco</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-full">Full-time</span>
                  <span className="job-badge badge-remote">Remote OK</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$140K–$180K</span>
                  <a href="#" className="btn-apply">
                    Apply
                  </a>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: 'var(--rust)' }}>
                    MS
                  </div>
                  <div>
                    <div className="job-title">Cloud Architect</div>
                    <div className="job-company">Microsoft • Seattle</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-full">Full-time</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$160K–$210K</span>
                  <a href="#" className="btn-apply">
                    Apply
                  </a>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: 'var(--sage)' }}>
                    SP
                  </div>
                  <div>
                    <div className="job-title">Growth Marketing Lead</div>
                    <div className="job-company">Spotify • Remote</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-remote">Remote</span>
                  <span className="job-badge badge-full">Full-time</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$110K–$140K</span>
                  <a href="#" className="btn-apply">
                    Apply
                  </a>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: '#1a1a2e', color: 'var(--gold-light)' }}>
                    SH
                  </div>
                  <div>
                    <div className="job-title">Full Stack Developer</div>
                    <div className="job-company">Shopify • Toronto</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-full">Full-time</span>
                  <span className="job-badge badge-remote">Remote OK</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$120K–$155K</span>
                  <a href="#" className="btn-apply">
                    Apply
                  </a>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: '#2a0a4a', color: '#c084fc' }}>
                    NF
                  </div>
                  <div>
                    <div className="job-title">Data Scientist</div>
                    <div className="job-company">Netflix • Los Angeles</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-full">Full-time</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$145K–$185K</span>
                  <a href="#" className="btn-apply">
                    Apply
                  </a>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: '#0f2a0f', color: '#6ee7b7' }}>
                    AB
                  </div>
                  <div>
                    <div className="job-title">Product Designer</div>
                    <div className="job-company">Airbnb • Remote</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-remote">Remote</span>
                  <span className="job-badge badge-part">Contract</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$95K–$125K</span>
                  <a href="#" className="btn-apply">
                    Apply
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container">
          <div className="about-wrapper">
            <div className="about-image fade-up">
              <div className="about-img-placeholder">
                <i className="fas fa-handshake" style={{ fontSize: '5rem', color: 'rgba(250, 250, 250, 0.682)', position: 'relative', zIndex: 1 }} />
                <div className="about-big-text">HHS</div>
              </div>
            </div>
            <div className="about-content fade-up">
              <p className="section-label" style={{ color: '#ffffff' }}>
                <i className="fas fa-info-circle me-2" />Our Story
              </p>
              <h2 className="section-title mb-4" style={{ color: '#ffffff' }}>
                We Bridge Talent
                <br />
                With Opportunity.
              </h2>
              <p style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.75 }}>
                Founded in 2026, HHS has helped over 200,000 professionals find careers they love — while helping thousands of companies build world-class teams. We believe the right match changes lives.
              </p>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-shield-alt" />
                </div>
                <div>
                  <div className="about-feature-title">Verified Employers</div>
                  <div className="about-feature-desc">Every employer on our platform goes through verification to protect candidates.</div>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-brain" />
                </div>
                <div>
                  <div className="about-feature-title">Companies</div>
                  <div className="about-feature-desc">Our platform give canditates based on their score level to you, Find your dream candidate.</div>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-globe" />
                </div>
                <div>
                  <div className="about-feature-title">Global Reach</div>
                  <div className="about-feature-desc">With opportunities spanning 110+ countries, your next dream job could be anywhere in the world.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        <Footer />
    </>
  )
}

export default HHS
