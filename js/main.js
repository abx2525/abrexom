/* ============================================================
   ABREXOM — main.js
   Nav, scroll reveal, mobile drawer, dynamic year, contact form
   ============================================================ */
'use strict';

/* ── Dynamic footer year ──────────────────────────────────── */
function initYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Sticky nav ───────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Active nav link ──────────────────────────────────────── */
function initActiveLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav__links a, .nav__drawer a').forEach(a => {
    const href = a.getAttribute('href') || '';
    // Match exact page
    const isHome = (path === '/' || path.endsWith('/index.html')) && (href === '/index.html' || href === '/');
    const isMatch = !isHome && href !== '/index.html' && href !== '/' && path.includes(href.replace('/pages/', '').replace('.html', ''));
    if (isHome || isMatch) a.classList.add('active');
  });
}

/* ── Mobile nav drawer ────────────────────────────────────── */
function initDrawer() {
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  if (!toggle || !drawer) return;

  const openDrawer = () => {
    toggle.classList.add('open');
    drawer.style.display = 'flex';
    requestAnimationFrame(() => drawer.classList.add('open'));
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { drawer.style.display = 'none'; }, 300);
  };

  toggle.addEventListener('click', () => {
    toggle.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.classList.contains('open')) closeDrawer();
  });
}

/* ── Scroll reveal ────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── Contact form ─────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    /* ── Wire to Formspree when ready:
       const res = await fetch('https://formspree.io/f/YOUR_ID', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(Object.fromEntries(new FormData(form)))
       });
       if (!res.ok) throw new Error('Failed');
    ── */

    // Simulated delay — remove when Formspree is connected
    await new Promise(r => setTimeout(r, 800));

    const success = document.getElementById('formSuccess');
    if (success) {
      form.style.display = 'none';
      success.style.display = 'block';
    } else {
      btn.textContent = '✦  Message sent';
    }
  });
}

/* ── Blog search ──────────────────────────────────────────── */
function initBlogFilter() {
  const input = document.getElementById('blogSearch');
  const cards = document.querySelectorAll('.blog-card');
  if (!input || !cards.length) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    cards.forEach(card => {
      card.style.display = !q || card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

/* ── Mobile: fix inline grid styles that don't respond ───── */
function initMobileGridFix() {
  const isMobile = () => window.innerWidth <= 480;

  function fixGrids() {
    // Values strip on homepage
    const valuesGrid = document.querySelector('.strip-dark .grid-values');
    if (valuesGrid) {
      valuesGrid.style.gridTemplateColumns = isMobile() ? '1fr' : 'repeat(3,1fr)';
      valuesGrid.style.gap = isMobile() ? '2rem' : '3rem';
    }

    // About page 2x2 values grid
    const aboutGrid = document.querySelector('.about-values-grid');
    if (aboutGrid) {
      aboutGrid.style.gridTemplateColumns = isMobile() ? '1fr' : '1fr 1fr';
    }

    // Hero buttons wrap nicely
    const heroBtns = document.querySelector('.hero-btns');
    if (heroBtns) {
      heroBtns.style.flexDirection = isMobile() ? 'column' : 'row';
      heroBtns.style.alignItems = isMobile() ? 'center' : 'flex-start';
    }
  }

  fixGrids();
  window.addEventListener('resize', fixGrids, { passive: true });
}

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNav();
  initActiveLink();
  initDrawer();
  initReveal();
  initContactForm();
  initBlogFilter();
  initMobileGridFix();
});
