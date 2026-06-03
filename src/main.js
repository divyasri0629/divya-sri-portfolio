import './style.css';
import { initHeroScene } from './hero-scene.js';
import { initAnimations } from './animations.js';
import { initProjects } from './projects.js';
import lottie from 'lottie-web';

document.addEventListener('DOMContentLoaded', () => {
  // 1. INITIALIZE WEBGL & GSAP SYSTEMS
  try {
    initHeroScene();
  } catch (err) {
    console.error('Three.js initialization failed:', err);
  }

  try {
    initAnimations();
  } catch (err) {
    console.error('GSAP animations initialization failed:', err);
  }

  try {
    initProjects();
  } catch (err) {
    console.error('Projects modules initialization failed:', err);
  }

  // 2. THEME SWITCHER (Light/Dark Mode)
  initThemeSystem();

  // 3. RESPONSIVE MOBILE NAVIGATION
  initMobileNav();

  // 4. BACKGROUND AUDIO CONTROLLER (Extra Credit)
  initAudioSystem();

  // 5. CONTACT FORM VALIDATION & HANDLING
  initContactForm();

  // 6. LOTTIE MICRO-ANIMATION
  initLottieAnimation();
  
  // 7. ACTIVE NAVIGATION LINK ON SCROLL
  initScrollSpy();
});

// Theme switcher system
function initThemeSystem() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const icon = themeToggle.querySelector('i');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, icon);

  // Broadside changes to Three.js canvas
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: savedTheme } }));
  }, 100);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    updateThemeIcon(newTheme, icon);
    
    // Dispatch event for Three.js listener
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }));
  });
}

function updateThemeIcon(theme, iconEl) {
  if (!iconEl) return;
  if (theme === 'dark') {
    iconEl.className = 'fa-solid fa-sun';
    iconEl.title = 'Switch to Light Mode';
  } else {
    iconEl.className = 'fa-solid fa-moon';
    iconEl.title = 'Switch to Dark Mode';
  }
}

// Mobile navigation menu overlays
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !overlay) return;

  function toggleMenu() {
    const isActive = overlay.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Animate burger bars
    const bars = toggle.querySelectorAll('.bar');
    if (isActive) {
      bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  }

  toggle.addEventListener('click', toggleMenu);
  
  links.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
}

// Background audio system (Muted by default, loops)
function initAudioSystem() {
  const audioToggle = document.getElementById('audio-toggle');
  const audio = document.getElementById('bg-audio');
  
  if (!audioToggle || !audio) return;
  
  const icon = audioToggle.querySelector('i');
  
  // Set lower default volume for ambient style
  audio.volume = 0.15;
  
  audioToggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        icon.className = 'fa-solid fa-volume-high';
        audioToggle.style.boxShadow = 'var(--shadow-neon)';
      }).catch(err => {
        console.warn('Audio play was prevented by browser security policy:', err);
      });
    } else {
      audio.pause();
      icon.className = 'fa-solid fa-volume-xmark';
      audioToggle.style.boxShadow = 'none';
    }
  });
}

// Contact form processing
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  if (!form || !status) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    
    if (!name || !email || !message) {
      status.className = 'form-status error';
      status.textContent = 'Please fill out all required fields.';
      return;
    }
    
    // Simulate successful API submission
    status.className = 'form-status';
    status.textContent = 'Sending message...';
    
    setTimeout(() => {
      status.className = 'form-status success';
      status.textContent = 'Thank you! Your message has been sent successfully.';
      form.reset();
    }, 1200);
  });
}

// Lottie animation badges
function initLottieAnimation() {
  const container = document.getElementById('lottie-skill-badge');
  if (!container) return;

  try {
    lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // Load a lightweight floating trophy badge
      path: 'https://assets10.lottiefiles.com/packages/lf20_ydo1amqp.json'
    });
  } catch (e) {
    console.warn('Lottie failed to load from CDN. Using SVG fallback.', e);
    // Silent fallback
    container.innerHTML = '<i class="fa-solid fa-medal" style="font-size: 2.2rem; color: var(--color-accent-pink);"></i>';
  }
}

// Active navigation highlight on scroll
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // offset header
      const id = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = id;
      }
    });

    if (currentId) {
      updateActiveLinks(currentId, navLinks);
      updateActiveLinks(currentId, mobileLinks);
    }
  });
}

function updateActiveLinks(activeId, links) {
  links.forEach((link) => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${activeId}`) {
      link.classList.add('active');
    }
  });
}
