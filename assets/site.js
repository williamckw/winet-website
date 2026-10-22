(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  menuButton?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('open') ?? false;
    menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });

  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('.brand:not(.brand-v2)').forEach((brand) => {
    brand.classList.add('brand-v2');
    brand.innerHTML = `
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 92 60">
          <defs>
            <linearGradient id="legacyBrandA" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#48d6f5"/><stop offset="1" stop-color="#1688f2"/></linearGradient>
            <linearGradient id="legacyBrandB" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#28c0f0"/><stop offset=".62" stop-color="#1e72e8"/><stop offset="1" stop-color="#123b89"/></linearGradient>
          </defs>
          <path d="M2 10h18l11 19-9 16L2 10Z" fill="url(#legacyBrandA)"/>
          <path d="M25 45 47 7h14L39 45H25Z" fill="url(#legacyBrandB)"/>
          <path d="m47 7 23 38 9-16c4-7 8-9 13-9v17c-1 0-2 1-3 3l-3 5H69L47 7Z" fill="url(#legacyBrandA)"/>
        </svg>
      </span>
      <span class="brand-copy"><strong>WINET<span>.</span></strong><small>SOLUTION ENTERPRISE</small><em>微 尼 科 技</em></span>`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible', 'is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const progress = document.querySelector('.page-progress span');
  const header = document.querySelector('.header');
  const updateScroll = () => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    const ratio = scrollable > 0 ? scrollY / scrollable : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    header?.classList.toggle('is-scrolled', scrollY > 20);
  };
  addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    const aura = document.querySelector('.cursor-aura');
    addEventListener('pointermove', (event) => {
      if (aura) {
        aura.style.setProperty('--x', `${event.clientX}px`);
        aura.style.setProperty('--y', `${event.clientY}px`);
      }
    }, { passive: true });

    document.querySelectorAll('[data-parallax-root]').forEach((root) => {
      root.addEventListener('pointermove', (event) => {
        const bounds = root.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        root.querySelectorAll('[data-depth]').forEach((layer) => {
          const depth = Number(layer.dataset.depth || 0);
          layer.style.setProperty('--parallax-x', `${x * depth}px`);
          layer.style.setProperty('--parallax-y', `${y * depth}px`);
        });
      });
      root.addEventListener('pointerleave', () => root.querySelectorAll('[data-depth]').forEach((layer) => {
        layer.style.setProperty('--parallax-x', '0px');
        layer.style.setProperty('--parallax-y', '0px');
      }));
    });

    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const power = Number(card.dataset.tilt || 4);
        const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * power * 2;
        const rotateX = -((event.clientY - bounds.top) / bounds.height - 0.5) * power * 2;
        card.style.setProperty('--tilt-x', `${rotateX}deg`);
        card.style.setProperty('--tilt-y', `${rotateY}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });

    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const bounds = button.getBoundingClientRect();
        button.style.setProperty('--magnet-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.12}px`);
        button.style.setProperty('--magnet-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--magnet-x', '0px');
        button.style.setProperty('--magnet-y', '0px');
      });
    });
  }

  const animateCount = (element) => {
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || '';
    if (reduceMotion) {
      element.textContent = `${target}${suffix}`;
      return;
    }
    const start = performance.now();
    const duration = 1300;
    const tick = (now) => {
      const progressValue = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 4);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progressValue < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCount(entry.target);
    countObserver.unobserve(entry.target);
  }), { threshold: 0.7 });
  document.querySelectorAll('[data-count]').forEach((counter) => countObserver.observe(counter));

  const systemViews = {
    operations: {
      label: 'OPERATIONS', title: 'Your business, in motion.',
      oneLabel: 'Active workflows', one: '24', oneNote: 'Across 6 departments',
      twoLabel: 'Tasks automated', two: '68%', twoNote: 'Up 12% this month',
      chart: 'Operational momentum', signal: '3 bottlenecks prevented'
    },
    customers: {
      label: 'CUSTOMERS', title: 'Every relationship, understood.',
      oneLabel: 'Active customers', one: '1,284', oneNote: '96 added this month',
      twoLabel: 'Response rate', two: '91%', twoNote: '12% above target',
      chart: 'Customer engagement', signal: '18 opportunities identified'
    },
    insights: {
      label: 'INSIGHTS', title: 'Decisions, made visible.',
      oneLabel: 'Live data sources', one: '08', oneNote: 'All sources healthy',
      twoLabel: 'Forecast accuracy', two: '94%', twoNote: 'Up 8% this quarter',
      chart: 'Business performance', signal: 'Next growth trend detected'
    }
  };

  const fieldMap = {
    label: '#system-view-label', title: '#system-title', oneLabel: '#metric-one-label', one: '#metric-one',
    oneNote: '#metric-one-note', twoLabel: '#metric-two-label', two: '#metric-two', twoNote: '#metric-two-note',
    chart: '#chart-label', signal: '#system-signal'
  };
  const systemWindow = document.querySelector('.system-window');
  document.querySelectorAll('.view-tab').forEach((tab) => tab.addEventListener('click', () => {
    const view = systemViews[tab.dataset.view];
    if (!view) return;
    document.querySelectorAll('.view-tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    systemWindow?.classList.add('is-updating');
    setTimeout(() => {
      Object.entries(fieldMap).forEach(([key, selector]) => {
        const field = document.querySelector(selector);
        if (field) field.textContent = view[key];
      });
      systemWindow?.classList.remove('is-updating');
    }, reduceMotion ? 0 : 180);
  }));

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
