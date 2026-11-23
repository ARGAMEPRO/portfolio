(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
    io.observe(el);
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // свечение, следующее за курсором в первом экране
  var hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(pointer:fine)').matches) {
    var light = document.createElement('div');
    light.style.cssText =
      'position:absolute;width:520px;height:520px;border-radius:50%;pointer-events:none;' +
      'background:radial-gradient(circle,rgba(143,184,255,.10),transparent 62%);' +
      'transform:translate(-50%,-50%);transition:opacity .4s;opacity:0;z-index:0';
    hero.style.position = 'relative';
    hero.appendChild(light);

    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      light.style.left = e.clientX - r.left + 'px';
      light.style.top = e.clientY - r.top + 'px';
      light.style.opacity = '1';
    });
    hero.addEventListener('pointerleave', function () { light.style.opacity = '0'; });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* переключатель тарифов */
(function(){
  const tabs = document.querySelectorAll('.price-tab');
  if(!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.toggle('is-on', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      document.querySelectorAll('.price-panel').forEach(p => {
        p.classList.toggle('is-on', p.id === 'panel-' + tab.dataset.tab);
      });
    });
  });
})();
