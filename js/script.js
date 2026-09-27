document.addEventListener('DOMContentLoaded', function () {
  var slides = document.querySelectorAll('.slide');
  var track = document.getElementById('track');
  var dotsWrap = document.getElementById('dots');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var current = 0;
  var total = slides.length;

  // Size the track and each slide based on how many slides exist,
  // so adding/removing a <section class="slide"> in index.html just works.
  track.style.width = (total * 100) + '%';
  slides.forEach(function (s) {
    s.style.width = (100 / total) + '%';
  });

  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(b);
  });
  var dots = dotsWrap.querySelectorAll('button');

  function goTo(i) {
    if (window.innerWidth <= 760) {
      slides[i].scrollIntoView({ behavior: 'smooth' });
      return;
    }
    current = Math.max(0, Math.min(total - 1, i));
    track.style.transform = 'translateX(-' + (current * (100 / total)) + '%)';
    dots.forEach(function (d, idx) { d.classList.toggle('active', idx === current); });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  nextBtn.addEventListener('click', function () { goTo(current + 1); });
  prevBtn.addEventListener('click', function () { goTo(current - 1); });

  var brandLink = document.getElementById('brandLink');
  if (brandLink) {
    brandLink.addEventListener('click', function (e) { e.preventDefault(); goTo(0); });
  }

  document.querySelectorAll('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      goTo(parseInt(el.getAttribute('data-goto'), 10));
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  var touchStartX = null;
  track.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; });
  track.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) goTo(current + (diff < 0 ? 1 : -1));
    touchStartX = null;
  });

  window.addEventListener('resize', function () { goTo(current); });

  goTo(0);
});