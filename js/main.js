'use strict';

/* Dynamic footer year */
function initYear() {
  var year = new Date().getFullYear();
  document.querySelectorAll('.footer-year').forEach(function(el) {
    el.textContent = year;
  });
}

/* Sticky nav */
function initNav() {
  var nav = document.getElementById('nav');
  if (!nav) return;
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 50); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Mobile drawer */
function initDrawer() {
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('navDrawer');
  if (!toggle || !drawer) return;
  toggle.addEventListener('click', function() {
    var open = toggle.getAttribute('data-open') === 'true';
    if (open) {
      toggle.setAttribute('data-open', 'false');
      toggle.classList.remove('open');
      drawer.style.display = 'none';
      document.body.style.overflow = '';
    } else {
      toggle.setAttribute('data-open', 'true');
      toggle.classList.add('open');
      drawer.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
  drawer.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      toggle.setAttribute('data-open', 'false');
      toggle.classList.remove('open');
      drawer.style.display = 'none';
      document.body.style.overflow = '';
    });
  });
}

/* Scroll reveal — safe fallback */
function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  /* If IntersectionObserver unavailable, just show everything */
  if (!window.IntersectionObserver) {
    els.forEach(function(el) { el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05 });
  els.forEach(function(el) { obs.observe(el); });
}

/* Contact form */
function initContact() {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    /* Replace with: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(Object.fromEntries(new FormData(form))) }) */
    setTimeout(function() {
      var s = document.getElementById('formSuccess');
      if (s) { form.style.display = 'none'; s.style.display = 'block'; }
    }, 800);
  });
}

/* Blog search */
function initBlog() {
  var input = document.getElementById('blogSearch');
  if (!input) return;
  input.addEventListener('input', function() {
    var q = input.value.toLowerCase();
    document.querySelectorAll('.blog-card').forEach(function(c) {
      c.style.display = (!q || c.textContent.toLowerCase().includes(q)) ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initYear();
  initNav();
  initDrawer();
  initReveal();
  initContact();
  initBlog();
});
