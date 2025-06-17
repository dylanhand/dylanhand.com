document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Menu Elements
  const headerOverlay = document.querySelector('.header__overlay');
  const menuList = document.querySelector('.main-nav__box');
  const menuOpenIcon = document.querySelector('.main-nav__open');
  const menuCloseIcon = document.querySelector('.main-nav__close');

  /* =======================
  // Menu and Navigation
  ======================= */
  menuOpenIcon.addEventListener('click', menuOpen);
  menuCloseIcon.addEventListener('click', menuClose);
  headerOverlay.addEventListener('click', menuClose);

  function menuOpen() {
    menuList.classList.add('visible');
    headerOverlay.classList.add('visible');
  }

  function menuClose() {
    menuList.classList.add('hidden');
    headerOverlay.classList.add('hidden');

    setTimeout(function() {
      menuList.classList.remove('hidden');
      headerOverlay.classList.remove('hidden');
    }, 320);

    menuList.classList.remove('visible');
    headerOverlay.classList.remove('visible');
  }

  /* ================================
  // AOS - Animate On Scroll Library
  ================================ */
  AOS.init();

  /* =======================
  // Responsive Videos
  ======================= */
  function makeVideosResponsive() {
    const selectors = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]',
      'iframe[src*="ted.com"]',
      'object',
      'embed'
    ];

    const contentAreas = document.querySelectorAll('.post__content, .page__content');
    
    contentAreas.forEach(area => {
      const videos = area.querySelectorAll(selectors.join(','));
      
      videos.forEach(video => {
        if (video.tagName.toLowerCase() === 'embed' && video.parentNode.tagName.toLowerCase() === 'object') {
          return;
        }

        if (video.parentNode.className === 'fluid-width-video-wrapper') {
          return;
        }

        // Get dimensions
        let width = parseInt(video.getAttribute('width'), 10) || video.clientWidth;
        let height = parseInt(video.getAttribute('height'), 10) || video.clientHeight;
        const aspectRatio = height / width;

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'fluid-width-video-wrapper';
        wrapper.style.paddingTop = (aspectRatio * 100) + '%';

        // Insert wrapper
        video.parentNode.insertBefore(wrapper, video);
        wrapper.appendChild(video);

        // Remove original dims
        video.removeAttribute('height');
        video.removeAttribute('width');
      });
    });
  }

  // Add responsive video styles if not already present
  if (!document.getElementById('fit-vids-style')) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
    const style = document.createElement('style');
    style.id = 'fit-vids-style';
    style.textContent = css;
    head.appendChild(style);
  }

  makeVideosResponsive();
});
