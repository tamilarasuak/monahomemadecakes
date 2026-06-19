  // LOADER
    window.addEventListener('load', () => {
      setTimeout(() => {
        const l = document.getElementById('loader');
        l.style.transition = 'opacity .8s'; l.style.opacity = '0';
        setTimeout(() => l.style.display = 'none', 800);
      }, 1900);
    });

    // CURSOR
    const cursor = document.getElementById('cursor');
    const cRing = document.getElementById('cursor-ring');
    const mGlow = document.getElementById('mouseGlow');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
      mGlow.style.left = mx + 'px'; mGlow.style.top = my + 'px';
    });
    (function ring() { rx += (mx - rx) * .12; ry += (my - ry) * .12; cRing.style.left = rx + 'px'; cRing.style.top = ry + 'px'; requestAnimationFrame(ring); })();
    document.querySelectorAll('a,button,.glass,.cake-card,.fab').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; cRing.style.width = '52px'; cRing.style.height = '52px'; cRing.style.borderColor = 'rgba(212,175,114,.8)'; });
      el.addEventListener('mouseleave', () => { cursor.style.width = '10px'; cursor.style.height = '10px'; cRing.style.width = '34px'; cRing.style.height = '34px'; cRing.style.borderColor = 'rgba(212,175,114,.45)'; });
    });

    // SPARKLES
    document.addEventListener('click', e => {
      for (let i = 0; i < 7; i++) {
        const s = document.createElement('div'); s.className = 'sparkle';
        const a = (i / 7) * 360, r = a * Math.PI / 180, d = 18 + Math.random() * 22;
        s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${2 + Math.random() * 4}px;height:${2 + Math.random() * 4}px;background:${i % 2 ? '#d4af72' : '#c4786e'};transform:translate(${Math.cos(r) * d}px,${Math.sin(r) * d}px);`;
        document.body.appendChild(s); setTimeout(() => s.remove(), 620);
      }
    });

    // SCROLL
    window.addEventListener('scroll', () => {
      const st = window.scrollY, dh = document.documentElement.scrollHeight - window.innerHeight;
      document.getElementById('scroll-progress').style.width = (st / dh * 100) + '%';
      document.getElementById('navbar').classList.toggle('scrolled', st > 60);
    });

    // PARTICLES
    const pc = document.getElementById('particles-container');
    const emojis = ['🌹', '✨', '🌸', '⭐', '💫', '🌺', '✦', '🌟', '🍓', '🌼'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div'); p.className = 'particle';
      const sz = 10 + Math.random() * 14;
      p.style.cssText = `left:${Math.random() * 100}%;bottom:-5%;font-size:${sz}px;width:${sz}px;height:${sz}px;background:transparent;animation-duration:${9 + Math.random() * 14}s;animation-delay:${Math.random() * 14}s;`;
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      pc.appendChild(p);
    }

    // REVEAL
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 70); obs.unobserve(e.target); } });
    }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // COUNTERS
    function counter(el, target, sfx) {
      let c = 0, step = target / 60;
      const t = setInterval(() => { c = Math.min(c + step, target); el.textContent = Math.floor(c).toLocaleString() + (c >= target ? sfx : ''); if (c >= target) clearInterval(t); }, 25);
    }
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const el = e.target, tg = parseInt(el.dataset.target), sfx = el.closest('.stat-item').querySelector('.stat-label').textContent.includes('%') ? '%' : '+'; counter(el, tg, sfx); co.unobserve(el); } });
    }, { threshold: .5 });
    document.querySelectorAll('.stat-num[data-target]').forEach(el => co.observe(el));

    // STORE STATUS
    (function () {
      const now = new Date(), m = now.getHours() * 60 + now.getMinutes();
      const open = m >= 480 && m < 1290;
      const ti = document.getElementById('timingsInner');
      const sb = document.getElementById('statusBadge');
      const st = document.getElementById('statusText');
      if (open) { ti.classList.add('s-open'); sb.className = 'status-badge'; sb.style.cssText = 'color:var(--champagne);border-color:var(--champagne);display:inline-flex;align-items:center;gap:.6rem;padding:.5rem 1.4rem;font-family:Cinzel,serif;font-size:.7rem;letter-spacing:.25em;margin-bottom:2rem;'; st.textContent = 'WE ARE OPEN NOW'; }
      else { ti.classList.add('s-closed'); sb.style.cssText = 'color:var(--rose-light);border-color:var(--rose-light);display:inline-flex;align-items:center;gap:.6rem;padding:.5rem 1.4rem;font-family:Cinzel,serif;font-size:.7rem;letter-spacing:.25em;margin-bottom:2rem;'; st.textContent = 'CLOSED · OPENS 8:00 AM'; }
    })();

    // SWIPERS
    new Swiper('.gallerySwiper', { loop: true, autoplay: { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }, effect: 'fade', fadeEffect: { crossFade: true }, speed: 1000, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, pagination: { el: '.swiper-pagination', clickable: true }, grabCursor: true });
    new Swiper('.testiSwiper', { loop: true, autoplay: { delay: 3500, disableOnInteraction: false }, speed: 800, slidesPerView: 1, centeredSlides: true, pagination: { el: '.swiper-pagination', clickable: true }, grabCursor: true, breakpoints: { 768: { slidesPerView: 1.15 }, 1024: { slidesPerView: 1.3 } } });

    // MOBILE MENU
    document.getElementById('hamburger').addEventListener('click', () => document.getElementById('mobileMenu').classList.add('open'));
    document.getElementById('mobileClose').addEventListener('click', closeMM);
    function closeMM() { document.getElementById('mobileMenu').classList.remove('open'); }

    // CARD TILT (desktop only)
    if (window.innerWidth > 768) {
      document.querySelectorAll('.glass').forEach(c => {
        c.addEventListener('mousemove', e => {
          const r = c.getBoundingClientRect(), dx = (e.clientX - r.left - r.width / 2) / (r.width / 2), dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
          c.style.transform = `translateY(-5px) rotateX(${-dy * 3.5}deg) rotateY(${dx * 3.5}deg)`;
        });
        c.addEventListener('mouseleave', () => { c.style.transform = ''; });
      });
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });