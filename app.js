(function () {
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function zamknij() { menu.classList.remove('otw'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Otwórz menu'); }
  burger.addEventListener('click', function () {
    var otw = menu.classList.toggle('otw');
    burger.setAttribute('aria-expanded', otw ? 'true' : 'false');
    burger.setAttribute('aria-label', otw ? 'Zamknij menu' : 'Otwórz menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') zamknij(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zamknij(); });

  // dolny pasek na telefonie: dopiero gdy przyciski z hero znikną z ekranu
  var mob = document.getElementById('mob');
  var akcje = document.querySelector('.hero-akcje');
  if ('IntersectionObserver' in window && akcje) {
    new IntersectionObserver(function (w) {
      mob.classList.toggle('widac', !w[0].isIntersecting && w[0].boundingClientRect.top < 0);
    }).observe(akcje);
  }

  // formularz: bez serwera, składa gotową wiadomość e-mail
  var form = document.getElementById('form');
  var info = document.getElementById('formInfo');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var mail = f.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      info.textContent = 'Podaj adres e-mail, na który mamy odpowiedzieć.';
      info.className = 'form-info blad';
      f.email.focus();
      return;
    }
    var rel = [f.skad.value.trim(), f.dokad.value.trim()].filter(Boolean).join(' - ');
    var linie = [
      'Firma: ' + (f.firma.value.trim() || '-'),
      'Relacja: ' + (rel || '-'),
      'Ładunek: ' + (f.ladunek.value.trim() || '-'),
      'Ilość: ' + (f.ilosc.value.trim() || '-'),
      'Termin: ' + (f.termin.value.trim() || '-'),
      'Telefon: ' + (f.tel.value.trim() || '-'),
      'E-mail: ' + mail,
      '',
      f.uwagi.value.trim()
    ];
    var temat = 'Zapytanie o przewóz' + (rel ? ': ' + rel : '');
    info.textContent = 'Otwieramy program pocztowy z gotową wiadomością do biuro@luk-train.pl.';
    info.className = 'form-info';
    window.location.href = 'mailto:biuro@luk-train.pl?subject=' + encodeURIComponent(temat) + '&body=' + encodeURIComponent(linie.join('\n'));
  });
})();
