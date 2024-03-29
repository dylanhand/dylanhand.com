$(document).ready(function() {
  'use strict';

  var headerOverlay = $('.header__overlay'),
    menuList = $('.main-nav__box'),
    menuOpenIcon = $('.main-nav__open'),
    menuCloseIcon = $('.main-nav__close');


  /* =======================
  // Menu and Navigation
  ======================= */
  menuOpenIcon.click(function() {
    menuOpen();
  })

  menuCloseIcon.click(function () {
    menuClose();
  })

  headerOverlay.click(function () {
    menuClose();
  });

  function menuOpen() {
    menuList.addClass('visible');
    headerOverlay.addClass('visible');
  }

  function menuClose() {
    menuList.addClass('hidden');
    headerOverlay.addClass('hidden');

    // This is pretty garbage but it appears that if a transition is set, 
    // then this whole menu flashes when going back from a blog post.
    // If you're reading this and know a better way, get @ me dog
    setTimeout(function() {
      menuList.removeClass('hidden');
      headerOverlay.removeClass('hidden');
    }, 320);

    menuList.removeClass('visible');
    headerOverlay.removeClass('visible');
  }


  /* ================================
  // AOS - Animate On Scroll Library
  ================================ */
  AOS.init();


  /* =======================
  // Responsive Videos
  ======================= */
  $(".post__content, .page__content").fitVids({
    customSelector: ['iframe[src*="ted.com"]']
  });


});
