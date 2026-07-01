document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle Logic
  const themeSwitch = document.getElementById('theme-switch');
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });

  // 2. Interactive Dashboard Tab Slider
  const menuItems = document.querySelectorAll('.dash-menu-item');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');
  const paginationDots = document.querySelectorAll('.dash-pagination .dot');
  const indicatorText = document.querySelector('.slide-indicator-text');
  const btnPrev = document.getElementById('btn-prev-dash');
  const btnNext = document.getElementById('btn-next-dash');
  let currentTab = 1;

  function switchTab(tabIndex) {
    if (tabIndex < 1) tabIndex = 4;
    if (tabIndex > 4) tabIndex = 1;
    currentTab = tabIndex;

    // Update Menu Items active status
    menuItems.forEach(item => {
      if (parseInt(item.getAttribute('data-tab')) === currentTab) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Tab Panes active status
    tabPanes.forEach((pane, idx) => {
      if (idx + 1 === currentTab) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Update Dots active status
    paginationDots.forEach((dot, idx) => {
      if (idx + 1 === currentTab) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update indicator text
    if (indicatorText) {
      indicatorText.textContent = `${currentTab}/4`;
    }
  }

  // Click on Sidebar Menu Item
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = parseInt(item.getAttribute('data-tab'));
      switchTab(tab);
    });
  });

  // Click on Pagination Dots
  paginationDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slide = parseInt(dot.getAttribute('data-slide'));
      switchTab(slide);
    });
  });

  // Click on Arrows
  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      switchTab(currentTab - 1);
    });
    btnNext.addEventListener('click', () => {
      switchTab(currentTab + 1);
    });
  }

  // 3. Mock Chat Bubble Pop-In Effect
  const chatBubbles = document.querySelectorAll('.chat-bubble');
  
  function resetChat() {
    chatBubbles.forEach((bubble) => {
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(15px)';
      bubble.style.transition = 'all 0.4s ease';
    });
  }

  function playChatAnimation() {
    chatBubbles.forEach((bubble, idx) => {
      setTimeout(() => {
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateY(0)';
      }, idx * 800); // simulate typing gap
    });
  }

  const chatContainer = document.querySelector('.chat-window-mockup');
  if (chatContainer) {
    resetChat();
    // Run once on load
    setTimeout(playChatAnimation, 600);

    // Replay when mouse enters to showcase the action
    chatContainer.addEventListener('mouseenter', () => {
      resetChat();
      setTimeout(playChatAnimation, 100);
    });
  }

  // 4. Contact Form Submit Handling
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formLoader = document.getElementById('form-loader');
  const successToast = document.getElementById('success-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Disable button & Show loader
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      formLoader.style.display = 'inline-block';
      
      // Simulate networking request
      setTimeout(() => {
        formLoader.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        // Show Toast
        successToast.classList.add('show');
        
        // Reset Form
        contactForm.reset();

        // Hide toast after 4.5 seconds
        setTimeout(() => {
          successToast.classList.remove('show');
        }, 4500);

      }, 400);
    });
  }

  // 5. FAQ Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const panel = header.nextElementSibling;
      const isActive = item.classList.contains('active');

      // Close other accordions in the same container (Exclusive behavior)
      const siblingItems = item.parentElement.querySelectorAll('.accordion-item');
      siblingItems.forEach(sibling => {
        if (sibling !== item) {
          sibling.classList.remove('active');
          const siblingPanel = sibling.querySelector('.accordion-panel');
          if (siblingPanel) {
            siblingPanel.style.maxHeight = null;
            siblingPanel.style.opacity = '0';
          }
        }
      });

      // Toggle current accordion
      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
        panel.style.opacity = '0';
      } else {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.opacity = '1';
      }
    });
  });

  // 5. Preloader SVG Text Stroke & Melt Animation (CodePen & Wokine inspired)
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Stage 1: Reveal letters by adding class to preloader
    setTimeout(() => {
      preloader.classList.add('reveal-letters');
      const aura = document.getElementById('preloader-aura');
      if (aura) aura.classList.add('reveal');
    }, 150);

    // Stage 1.5: Springy bounce-pop scale and float
    setTimeout(() => {
      const svg = preloader.querySelector('.preloader-svg');
      if (svg) svg.classList.add('bounce-pop');
    }, 1150);

    // Stage 1.7: Melt ice cream effect
    setTimeout(() => {
      const svg = preloader.querySelector('.preloader-svg');
      const aura = document.getElementById('preloader-aura');
      if (svg) svg.classList.add('melting');
      if (aura) {
        aura.style.opacity = '0';
        aura.style.transform = 'scale(0.8) translate3d(0, 50px, 0)';
      }
      
      const meltMap = document.getElementById('melt-map');
      if (meltMap) {
        let start = null;
        const duration = 650; // ms
        function animateMelt(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const scaleVal = Math.min((progress / duration) * 150, 150);
          meltMap.setAttribute('scale', scaleVal);
          if (progress < duration) {
            requestAnimationFrame(animateMelt);
          }
        }
        requestAnimationFrame(animateMelt);
      }
    }, 1900);

    // Stage 2: Slide preloader background away (oblique skew)
    setTimeout(() => {
      preloader.classList.add('slide-away');
    }, 2550);

    // Stage 3: Load Hero elements with staggered transitions and zoom-out mesh bg
    setTimeout(() => {
      document.body.classList.add('page-loaded');
    }, 2650);

    // Stage 4: Remove preloader from display to free up pointer events
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 3850);
  }

  // 6. Interactive Cursor Spotlight Follow
  initCursorSpotlight();

  // 7. CSS 3D Card Tilt Effects
  initCard3DTilt();

  // 8. Premium Custom Cursor & Magnetic Buttons (CodePen inspired)
  initMagneticButtons();

});

// 3D Tilt Cards Implementation
function initCard3DTilt() {
  const cards = document.querySelectorAll('.solution-card, .step-card, .feature-card, .pain-item, .guarantee-card, .stat-showcase-card, .pricing-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;
      
      const rotateX = -normY * 6;
      const rotateY = normX * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
      
      const shadowX = -normX * 8;
      const shadowY = -normY * 8;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(255,255,255,0.005)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.boxShadow = '';
      card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

// Apple-style Interactive Cursor Spotlight
function initCursorSpotlight() {
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) return;
  
  window.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(() => {
      cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursorGlow.style.opacity = '1';
    });
  });
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
  });
}



// Premium Magnetic Buttons Implementation
function initMagneticButtons() {
  const magnetics = document.querySelectorAll('.btn, .pricing-btn, .menu-link, .accordion-header');
  
  magnetics.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      // Calculate distance from cursor to center of element
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Pull element toward cursor (maximum 15px translation)
      el.style.transform = `translate3d(${x * 0.42}px, ${y * 0.42}px, 0) scale(1.04)`;
      
      // Update shiny glow position inside the button
      const shineX = e.clientX - rect.left;
      const shineY = e.clientY - rect.top;
      el.style.setProperty('--shine-x', `${shineX}px`);
      el.style.setProperty('--shine-y', `${shineY}px`);
    });
    
    el.addEventListener('mouseleave', () => {
      // Spring back with overshoot bounce
      el.style.transform = 'translate3d(0, 0, 0) scale(1)';
      el.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    el.addEventListener('mouseenter', () => {
      // Disable transition during active follow to prevent lag
      el.style.transition = 'none';
    });
  });
}



