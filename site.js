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
