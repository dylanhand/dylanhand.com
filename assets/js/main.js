'use strict';

function initializeApp() {
  // Enable JS-dependent features
  document.body.classList.add('js-enabled');
  setupMenuNav();
  setupScrollAnimations();
  makeVideosResponsive();
}

function setupMenuNav() {
  const headerOverlay = document.querySelector('.header__overlay');
  const menuList = document.querySelector('.main-nav__box');
  const menuOpenIcon = document.querySelector('.main-nav__open');
  const menuCloseIcon = document.querySelector('.main-nav__close');

  function menuOpen() {
    menuList.classList.add('visible');
    headerOverlay.classList.add('visible');
  }

  function menuClose() {
    menuList.classList.add('hidden');
    headerOverlay.classList.add('hidden');

    setTimeout(() => {
      menuList.classList.remove('hidden');
      headerOverlay.classList.remove('hidden');
    }, 320);

    menuList.classList.remove('visible');
    headerOverlay.classList.remove('visible');
  }

  menuOpenIcon.addEventListener('click', menuOpen);
  menuCloseIcon.addEventListener('click', menuClose);
  headerOverlay.addEventListener('click', menuClose);
}

function setupScrollAnimations() {
  const ANIMATE_CLASS = 'animate';

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const rect = entry.boundingClientRect;
      
      if (entry.isIntersecting) {
        entry.target.classList.add(ANIMATE_CLASS);
      } else if (rect.top >= 0) {
        // Only remove animation if element is leaving through bottom
        // Keep animated if element scrolled off the top
        entry.target.classList.remove(ANIMATE_CLASS);
      }
    });
  }, observerOptions);

  // Set up animations for all elements
  document.querySelectorAll('[data-animate]').forEach(element => {
    observer.observe(element);
    
    if (isElementInView(element)) {
      element.classList.add(ANIMATE_CLASS);
    }
  });

  function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
}

function makeVideosResponsive() {
  const selectors = [
    'iframe[src*="player.vimeo.com"]',
    'iframe[src*="youtube.com"]',
    'iframe[src*="youtube-nocookie.com"]',
    'iframe[src*="kickstarter.com"][src*="video.html"]',
    'iframe[src*="ted.com"]',
    "object",
    "embed",
  ];

  const contentAreas = document.querySelectorAll(
    ".post__content, .page__content"
  );

  contentAreas.forEach((area) => {
    const videos = area.querySelectorAll(selectors.join(","));

    videos.forEach((video) => {
      if (
        video.tagName.toLowerCase() === "embed" &&
        video.parentNode.tagName.toLowerCase() === "object"
      ) {
        return;
      }

      if (video.parentNode.className === "fluid-width-video-wrapper") {
        return;
      }

      // Get dimensions
      let width =
        parseInt(video.getAttribute("width"), 10) || video.clientWidth;
      let height =
        parseInt(video.getAttribute("height"), 10) || video.clientHeight;
      const aspectRatio = height / width;

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "fluid-width-video-wrapper";
      wrapper.style.paddingTop = aspectRatio * 100 + "%";

      // Insert wrapper
      video.parentNode.insertBefore(wrapper, video);
      wrapper.appendChild(video);

      // Remove fixed dimensions
      video.removeAttribute("height");
      video.removeAttribute("width");
    });
  });

  // Add CSS for responsive videos
  if (!document.getElementById('fit-vids-style')) {
    const style = document.createElement('style');
    style.id = 'fit-vids-style';
    style.textContent = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
    document.head.appendChild(style);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}