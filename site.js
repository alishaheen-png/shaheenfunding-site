// Points the email button at the prefilled draft and fills the Gmail and Outlook fallbacks.
(function () {
  var u = 'ali', d = 'shaheenfunding.com',
    s = encodeURIComponent('Funding enquiry - <company name>'),
    b = encodeURIComponent('Hello,\r\n\r\nWe are [company name], founded in [year], with average monthly revenue of around AED [amount].\r\n\r\nWe are looking for about AED [amount] to fund [what it is for].\r\n\r\nThe best number to reach me on is [number].\r\n\r\nThank you,\r\n'),
    h = 'mailto:' + u + '@' + d + '?subject=' + s + '&body=' + b,
    t = encodeURIComponent(u + '@' + d),
    gm = 'https://mail.google.com/mail/?view=cm&to=' + t + '&su=' + s + '&body=' + b,
    ol = 'https://outlook.office.com/mail/deeplink/compose?to=' + t + '&subject=' + s + '&body=' + b;
  document.querySelectorAll('a.git').forEach(function (a) {
    a.href = h; a.hidden = false;
    a.addEventListener('click', function () {
      var p = document.querySelector('.git-alt'); if (p) { p.hidden = false; }
    });
  });
  document.querySelectorAll('a.git-gm').forEach(function (a) { a.href = gm; });
  document.querySelectorAll('a.git-ol').forEach(function (a) { a.href = ol; });
})();

// One reveal as blocks scroll in. Content stays visible without scripting.
(function () {
  if (!('IntersectionObserver' in window)) { return; }
  document.documentElement.classList.add('js');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-r]').forEach(function (el) { io.observe(el); });
})();

// The four steps travel sideways while their section is pinned. Skipped for reduced motion;
// when the cards cannot fit the screen even in the compact size, the steps stay a normal list.
(function () {
  var how = document.querySelector('.home .how'), track = how && how.querySelector('.steps');
  if (!track || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) { return; }
  var wrap = how.querySelector('.wrap'), head = how.querySelector('h2'), travel = 0, queued = false;
  function fits() {
    var w = getComputedStyle(wrap), t = getComputedStyle(track);
    return parseFloat(w.paddingTop) + parseFloat(w.paddingBottom) + head.offsetHeight + parseFloat(t.marginTop) + track.offsetHeight <= wrap.clientHeight;
  }
  function move() {
    queued = false;
    if (!travel) { return; }
    var p = Math.min(1, Math.max(0, (wrap.offsetTop - how.offsetTop) / travel));
    track.style.transform = 'translate3d(' + (-p * travel) + 'px,0,0)';
  }
  function size() {
    how.style.blockSize = ''; track.style.transform = ''; travel = 0;
    how.classList.add('pin'); how.classList.remove('tight');
    if (!fits()) { how.classList.add('tight'); }
    if (!fits()) { how.classList.remove('pin', 'tight'); return; }
    travel = Math.max(0, track.scrollWidth - track.clientWidth);
    how.style.blockSize = (wrap.offsetHeight + travel) + 'px';
    move();
  }
  window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(move); } }, { passive: true });
  window.addEventListener('resize', size);
  window.addEventListener('load', size);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(size); }
  size();
})();
