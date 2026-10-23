/* AEC — Formulaire de devis à étapes (sans dépendance) */
(function () {
  var WHATSAPP = '242050238985'; // numéro WhatsApp d'AEC (identique au site)
  var form = document.getElementById('xc-quote');
  if (!form) return;
  var $ = function (k) { return form.querySelector('[data-xc="' + k + '"]'); };
  var panes = form.querySelectorAll('.xc-pane');
  var names = ['Votre projet', 'Vos coordonnées', 'Validation'];
  var step = 1;

  function val(n) { return (form.elements[n].value || '').trim(); }
  function projet() { var r = form.querySelector('input[name=projet]:checked'); return r ? r.value : ''; }

  function show(n) {
    step = n;
    panes.forEach(function (p) { p.hidden = Number(p.getAttribute('data-step')) !== n; });
    $('bar').style.width = (n / 3 * 100) + '%';
    $('label').textContent = 'Étape ' + n + ' sur 3';
    $('name').textContent = names[n - 1];
    $('prev').hidden = (n === 1);
    $('next').hidden = (n === 3);
    if (n === 3) {
      $('rProjet').textContent = projet();
      $('rNom').textContent = val('nom');
      $('rTel').textContent = val('tel');
      $('rLieu').textContent = val('lieu');
    }
  }

  $('next').addEventListener('click', function () {
    if (step === 1) {
      var ok = !!projet(); $('err1').hidden = ok; if (ok) show(2);
    } else if (step === 2) {
      var ok2 = val('nom') && val('tel') && val('lieu'); $('err2').hidden = !!ok2; if (ok2) show(3);
    }
  });
  $('prev').addEventListener('click', function () { show(step - 1); });

  // Choisir une carte passe automatiquement à l'étape 2
  form.querySelectorAll('input[name=projet]').forEach(function (r) {
    r.addEventListener('change', function () { $('err1').hidden = true; setTimeout(function () { show(2); }, 220); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = "Bonjour AEC, je souhaite une étude pour mon projet.\n\n" +
      "Projet : " + projet() + "\nNom : " + val('nom') + "\nContact : " + val('tel') + "\nLocalisation : " + val('lieu');
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank');
  });
})();

/* AEC — Accordéons « Ce que nous résolvons » (un seul ouvert à la fois) */
(function () {
  var root = document.getElementById('xaAccordion');
  if (!root) return;
  var items = root.querySelectorAll('.xa-item');
  root.addEventListener('click', function (e) {
    var head = e.target.closest('.xa-head');
    if (!head) return;
    var item = head.parentNode, wasOpen = item.classList.contains('open');
    items.forEach(function (it) { it.classList.remove('open'); it.querySelector('.xa-head').setAttribute('aria-expanded', 'false'); });
    if (!wasOpen) { item.classList.add('open'); head.setAttribute('aria-expanded', 'true'); }
  });
})();
