// =========================================================
// Portfolio Script
// Handles: mobile nav toggle, smooth scroll close, fade-in
// animations on scroll, and dynamic footer year.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Dynamic copyright year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Mobile navigation toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.classList.toggle('is-active', isOpen);
    });

    // Close the mobile menu after a nav link is clicked
    nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Fade-in on scroll using IntersectionObserver ---- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }
});
