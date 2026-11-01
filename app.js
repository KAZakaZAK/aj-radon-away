(function () {
  'use strict';

  var CONTACT_EMAIL = 'jesse.whitt@ajradonaway.com';

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('menu-open', open);
  }

  if (window.matchMedia) {
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  var dialog = document.getElementById('booking');
  var lastTrigger = null;

  document.querySelectorAll('[data-open-booking]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lastTrigger = btn;
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        document.getElementById('bk-phone').focus();
      } else {
        window.location.hash = '#contact';
      }
    });
  });

  dialog.addEventListener('close', function () {
    if (lastTrigger) lastTrigger.focus();
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  function digits(value) {
    return value.replace(/\D/g, '');
  }

  function validPhone(value) {
    var d = digits(value);
    return d.length === 10 || (d.length === 11 && d.charAt(0) === '1');
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setError(input, message) {
    var err = document.getElementById(input.id + '-err');
    err.textContent = message || '';
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
    } else {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  function composeMail(subject, lines) {
    return 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cf-name');
    var phone = document.getElementById('cf-phone');
    var email = document.getElementById('cf-email');
    var status = document.getElementById('cf-status');
    var firstBad = null;

    setError(name, name.value.trim() ? '' : 'Enter your name.');
    setError(phone, validPhone(phone.value) ? '' : 'Enter a 10 digit phone number.');
    setError(email, !email.value.trim() || validEmail(email.value.trim()) ? '' : 'Enter a valid email address.');

    [name, phone, email].some(function (field) {
      if (field.getAttribute('aria-invalid') === 'true') { firstBad = field; return true; }
      return false;
    });

    if (firstBad) {
      firstBad.focus();
      status.textContent = '';
      return;
    }

    var lines = ['Name: ' + name.value.trim(), 'Phone: ' + phone.value.trim()];
    if (email.value.trim()) lines.push('Email: ' + email.value.trim());
    status.textContent = 'Opening your email app. You can also call 614-824-0849.';
    window.location.href = composeMail('Radon service request', lines);
  });

  var bookingForm = document.getElementById('booking-form');
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var phone = document.getElementById('bk-phone');
    var status = document.getElementById('bk-status');

    if (!validPhone(phone.value)) {
      setError(phone, 'Enter a 10 digit phone number.');
      phone.focus();
      status.textContent = '';
      return;
    }
    setError(phone, '');
    status.textContent = 'Opening your email app. You can also call 614-824-0849.';
    window.location.href = composeMail('Call back request', ['Phone: ' + phone.value.trim()]);
  });

  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
