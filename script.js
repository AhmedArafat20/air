// ===== Ambient frost particles (hero background) =====
(function () {
  var canvas = document.getElementById('frost-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    var hero = document.querySelector('.hero');
    var w = window.innerWidth;
    var h = hero ? hero.offsetHeight : 640;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function makeParticles() {
    particles = [];
    var count = Math.min(46, Math.floor(window.innerWidth / 28));
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (canvas.height / devicePixelRatio),
        r: Math.random() * 1.6 + 0.6,
        speed: Math.random() * 0.25 + 0.06,
        drift: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.5 + 0.15
      });
    }
  }

  function draw() {
    var w = canvas.width / devicePixelRatio;
    var h = canvas.height / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(191,239,250,' + p.alpha + ')';
      ctx.fill();
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > h) { p.y = -4; p.x = Math.random() * w; }
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  makeParticles();
  window.addEventListener('resize', function () {
    resize();
    makeParticles();
  });
  draw();
})();

// ===== Fade-in on scroll for sections =====
(function () {
  var targets = document.querySelectorAll('.service-card, .why-item, .contact-card, .about-text, .about-stats');
  if (!('IntersectionObserver' in window) || !targets.length) return;

  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function (el) { io.observe(el); });
})();
