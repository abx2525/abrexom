/* ============================================================
   ABREXOM — main.js
   Shared across all pages: nav, scroll reveal, mobile drawer
   ============================================================ */
'use strict';

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
  const path = window.location.pathname.replace(/\/$/, '') || '/index';
  document.querySelectorAll('.nav__links a, .nav__drawer a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/index';
    if (path.endsWith(href) || (path === '' && href === '/index')) {
      a.classList.add('active');
    }
  });
}

/* ── Mobile nav drawer ────────────────────────────────────── */
function initDrawer() {
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  if (!toggle || !drawer) return;
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    if (open) {
      drawer.style.display = 'flex';
      requestAnimationFrame(() => drawer.classList.add('open'));
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      setTimeout(() => { drawer.style.display = 'none'; }, 300);
      document.body.style.overflow = '';
    }
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      drawer.classList.remove('open');
      setTimeout(() => { drawer.style.display = 'none'; }, 300);
      document.body.style.overflow = '';
    });
  });
}

/* ── Scroll reveal ────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
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

    /* Replace with your Formspree endpoint:
       const res = await fetch('https://formspree.io/f/YOUR_ID', {
         method: 'POST', headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(Object.fromEntries(new FormData(form)))
       });
    */
    await new Promise(r => setTimeout(r, 900)); // remove when wired up

    const success = document.getElementById('formSuccess');
    if (success) { form.style.display = 'none'; success.style.display = 'block'; }
    else { btn.textContent = '✦  Message sent'; }
  });
}

/* ── Blog search / filter ─────────────────────────────────── */
function initBlogFilter() {
  const input = document.getElementById('blogSearch');
  const cards = document.querySelectorAll('.blog-card');
  if (!input || !cards.length) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

/* ── Notify form (index) ──────────────────────────────────── */
function initNotify() {
  const form = document.getElementById('notifyForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    /* Wire to Formspree or email platform:
       await fetch('https://formspree.io/f/YOUR_ID', {
         method:'POST', headers:{'Content-Type':'application/json'},
         body: JSON.stringify({email})
       });
    */
    console.log('Notify:', email);
    form.innerHTML = '<p class="t-body" style="color:var(--gold)">✦ &nbsp;You\'re on the list. Thank you.</p>';
  });
}

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initActiveLink();
  initDrawer();
  initReveal();
  initContactForm();
  initBlogFilter();
  initNotify();
});
