(function () {
  'use strict';

  /* ── Preloader ─────────────────────────────────────────── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var pl = document.getElementById('preloader');
      if (pl) pl.classList.add('gone');
    }, 1500);
  });

  /* ── Navbar scroll state ───────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('solid');
    } else {
      nav.classList.remove('solid');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active nav link highlight ─────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  function updateActiveLink() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (a) { a.style.color = ''; });
        var active = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
        if (active && !active.classList.contains('nav-btn')) active.style.color = 'var(--gold)';
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── Mobile menu ───────────────────────────────────────── */
  var burger   = document.getElementById('burger');
  var mobMenu  = document.getElementById('mobMenu');
  var mobClose = document.getElementById('mobClose');

  function openMob()  { mobMenu.classList.add('open');  burger.classList.add('open');  document.body.classList.add('locked'); }
  function closeMob() { mobMenu.classList.remove('open'); burger.classList.remove('open'); document.body.classList.remove('locked'); }

  burger.addEventListener('click', openMob);
  mobClose.addEventListener('click', closeMob);
  document.querySelectorAll('.mob-link').forEach(function (l) {
    l.addEventListener('click', closeMob);
  });

  /* ── Smooth scroll ─────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 78;
      var top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Scroll reveal (IntersectionObserver) ──────────────── */
  var rvEls = document.querySelectorAll('.rv');
  var rvObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        rvObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  rvEls.forEach(function (el) { rvObs.observe(el); });

  /* ── Counter animation ─────────────────────────────────── */
  var counters = document.querySelectorAll('.stat-n[data-target]');
  var cntObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el     = entry.target;
      var end    = parseInt(el.dataset.target, 10);
      var suffix = el.dataset.suffix || '';
      var dur    = 1600;
      var start  = performance.now();

      function tick(now) {
        var pct  = Math.min((now - start) / dur, 1);
        var ease = 1 - Math.pow(1 - pct, 3); // ease-out cubic
        el.textContent = Math.floor(ease * end) + suffix;
        if (pct < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(function (el) { cntObs.observe(el); });

  /* ── Hero parallax (subtle) ────────────────────────────── */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = 'scale(1.04) translateY(' + (window.scrollY * 0.18) + 'px)';
      }
    }, { passive: true });
  }

  /* ── Order form → mailto ───────────────────────────────── */
  var form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name  = (document.getElementById('f-name').value  || '').trim();
      var phone = (document.getElementById('f-phone').value || '').trim();
      var email = (document.getElementById('f-email').value || '').trim();
      var msg   = (document.getElementById('f-msg').value   || '').trim();

      var subject = encodeURIComponent('Packaging Enquiry from ' + (name || 'Website'));
      var body    = encodeURIComponent(
        'Name: '  + name  + '\n' +
        'Phone: ' + phone + '\n' +
        'Email: ' + email + '\n\n' +
        'Requirements:\n' + msg
      );
      window.open(
        'https://mail.google.com/mail/?view=cm&fs=1&to=info%40paxpaarth.com&su=' + subject + '&body=' + body,
        '_blank'
      );
    });
  }

})();
