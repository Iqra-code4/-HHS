 // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // stagger children
        const siblings = e.target.parentElement.querySelectorAll('.fade-up');
        siblings.forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 100);
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Active nav link
  document.querySelectorAll('.nav-link-custom').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-link-custom').forEach(l => l.style.color = '');
      this.style.color = 'var(--gold)';
    });
  });