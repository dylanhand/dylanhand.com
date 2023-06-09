loadScriptAsync('https://www.googletagmanager.com/gtag/js?id={{ site.google-analytics }}', function() {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', '{{ site.google-analytics }}');
})
