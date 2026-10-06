import React from 'react'
import './HHS.css'

const Footer = () => {
  return (
    <>
        <section className="cta-section">
        <div className="container text-center position-relative">
          <p className="section-label" style={{ color: 'var(--white)', opacity: 0.4 }}>
            <i className="fas fa-rocket me-2" />Get Started Today
          </p>
          <h2 className="cta-title mb-4">
            Ready to Make
            <br />
            Your Next Move?
          </h2>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href="#" className="btn-cta-dark">
              <i className="fas fa-user-plus" /> Find a Job
            </a>
            <a href="#" className="btn-cta-dark" style={{ background: 'rgb(240, 240, 240)', color: 'var(--ink)' }}>
              <i className="fas fa-building" /> Post a Job
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="">
              <div className="footer-brand mb-2">Hire and Hired Stars</div>
              <p className="footer-text" style={{ maxWidth: '280px', lineHeight: 1.7 }}>
                Connecting world-class talent with exceptional companies since 2026.
              </p>
              <div className="mt-3">
                <a href="#" className="social-btn">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-btn">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href="#" className="social-btn">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#" className="social-btn">
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="footer-head">Start A new JOURNEY</div>
              <a className="footer-link" href="#about">
                About Us
              </a>
              <a className="footer-link" href="#">
                Companies
              </a>
              <a className="footer-link" href="#about">
                Candidates
              </a>
              <a className="footer-link" href="#">
                Services
              </a>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="footer-head">Support</div>
              <a className="footer-link" href="#">
                Help Center
              </a>
              <a className="footer-link" href="#">
                Privacy Policy
              </a>
              <a className="footer-link" href="#">
                Terms of Use
              </a>
              <a className="footer-link" href="#">
                Contact
              </a>
            </div>
          </div>
          <div
            className="footer-bottom"
            style={{ borderColor: 'rgba(255, 255, 255, 0.087) !important' }}
          >
            <p className="footer-text mb-0">© 2026 HHS. All rights reserved.</p>
            <p className="footer-text mb-0">
              Made with <i className="fas fa-heart" style={{ color: '#5c5c5c', fontSize: '0.7rem' }} /> for talent worldwide
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer