// Builds the "Get in touch" email draft links at runtime so the address never sits in the HTML as text.
(function () {
  var u = 'ali', d = 'shaheenfunding.com',
    s = encodeURIComponent('Funding enquiry - <company name>'),
    b = encodeURIComponent('Hi Ali,\r\n\r\nCompany: \r\nWhat we need funding for: \r\nRough amount (AED): \r\nBest number to reach me: \r\n'),
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
  // One Get in touch per screen: the nav action stays out of view while the hero action is visible.
  var hero = document.querySelector('.hero a.git'), nav = document.querySelector('.nav a.git');
  if (hero && nav && 'IntersectionObserver' in window) {
    var top = nav.closest('.nav').offsetHeight, r = hero.getBoundingClientRect();
    nav.classList.toggle('is-off', r.top < innerHeight && r.bottom > top);
    new IntersectionObserver(function (e) { nav.classList.toggle('is-off', e[0].isIntersecting); },
      { rootMargin: '-' + top + 'px 0px 0px 0px' }).observe(hero);
  }
})();
