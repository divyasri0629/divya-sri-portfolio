import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // 1. TYPING SUBTITLE LOOP
  initTypewriter();

  // 2. HERO ENTRANCE ANIMATION (Reel-inspired, fast-paced layered cuts)
  const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Reset opacity initially to prevent flash of unstyled content
  gsap.set('.reveal-item', { opacity: 0 });
  gsap.set('.header', { y: -100 });
  gsap.set('.card-3d-1', { x: 150, y: 150, rotation: 0, opacity: 0 });
  gsap.set('.card-3d-2', { x: 200, y: 200, rotation: 0, opacity: 0 });
  gsap.set('.card-3d-3', { x: 250, y: 250, rotation: 0, opacity: 0 });

  heroTL
    .to('.header', { y: 0, duration: 1, ease: 'power3.out' })
    .to('.hero-badge', { opacity: 1, scale: 1, y: 0, startAt: { scale: 0.5, y: -20 }, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5')
    .to('.hero-title', { opacity: 1, y: 0, startAt: { y: 40 }, duration: 0.8 }, '-=0.4')
    .to('.hero-subtitle', { opacity: 1, y: 0, startAt: { y: 20 }, duration: 0.6 }, '-=0.6')
    .to('.hero-tagline', { opacity: 1, y: 0, startAt: { y: 20 }, duration: 0.6 }, '-=0.5')
    .to('.hero-ctas .btn', { 
      opacity: 1, 
      y: 0, 
      startAt: { y: 15 }, 
      stagger: 0.1, 
      duration: 0.5 
    }, '-=0.4')
    // Fast overscaling layered entry for the 3D card stack (inspired by reel cuts)
    .to('.card-3d-3', { 
      opacity: 1, 
      x: 60, 
      y: 60, 
      rotationX: 10,
      rotationY: -15, 
      z: -120, 
      duration: 0.7,
      ease: 'power3.out' 
    }, '-=0.6')
    .to('.card-3d-2', { 
      opacity: 1, 
      x: 30, 
      y: 30, 
      rotationX: 10,
      rotationY: -15, 
      z: -60, 
      duration: 0.7,
      ease: 'power3.out' 
    }, '-=0.55')
    .to('.card-3d-1', { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      rotationX: 10,
      rotationY: -15, 
      z: 0, 
      duration: 0.7,
      ease: 'power3.out' 
    }, '-=0.5')
    .to('.scroll-indicator', { opacity: 1, y: 0, startAt: { y: -20 }, duration: 0.8 }, '-=0.2');


  // 3. SECTION REVEAL ANIMATIONS (ScrollTrigger)
  const sections = ['#about', '#skills', '#projects', '#experience', '#education', '#achievements', '#contact'];

  sections.forEach((sectionId) => {
    const section = document.querySelector(sectionId);
    if (!section) return;

    // Header reveal (tag, title, line)
    const header = section.querySelector('.section-header');
    if (header) {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Custom inner elements reveals based on section
    if (sectionId === '#about') {
      gsap.from('.about-image-wrapper', {
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 80%'
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'power2.out'
      });

      gsap.from('.about-info-wrapper > *', {
        scrollTrigger: {
          trigger: '.about-info-wrapper',
          start: 'top 80%'
        },
        opacity: 0,
        x: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    if (sectionId === '#skills') {
      // Reveal the skill cards
      gsap.from('.skill-category-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: animateProgressBars
      });
    }

    if (sectionId === '#projects') {
      gsap.from('.project-card-wrapper', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    if (sectionId === '#experience') {
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    if (sectionId === '#education') {
      gsap.from('.education-card', {
        scrollTrigger: {
          trigger: '.education-grid',
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    if (sectionId === '#achievements') {
      gsap.from('.achievement-badge-card', {
        scrollTrigger: {
          trigger: '.achievements-list',
          start: 'top 80%'
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out'
      });
    }

    if (sectionId === '#contact') {
      gsap.from('.contact-text-column > *', {
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%'
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });

      gsap.from('.contact-form-column', {
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 75%'
        },
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  });
}

// Helper to animate progress bars once skills section triggers
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar-fill');
  bars.forEach((bar) => {
    const percent = bar.getAttribute('data-percent');
    bar.style.width = `${percent}%`;
  });
}

// Typewriter Subtitle Logic
function initTypewriter() {
  const typedEl = document.getElementById('typed-headline');
  if (!typedEl) return;

  const roles = [
    'Full‑Stack Developer',
    'Flutter Specialist',
    'Data Structures & Algorithms Enthusiast',
    'Creative UI Designer'
  ];

  let currentRoleIdx = 0;
  let currentCharIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const fullText = roles[currentRoleIdx];
    
    if (isDeleting) {
      // Remove character
      typedEl.textContent = fullText.substring(0, currentCharIdx - 1);
      currentCharIdx--;
      typingSpeed = 50; // Faster deleting
    } else {
      // Add character
      typedEl.textContent = fullText.substring(0, currentCharIdx + 1);
      currentCharIdx++;
      typingSpeed = 100; // Normal typing speed
    }

    // Handle state switch
    if (!isDeleting && currentCharIdx === fullText.length) {
      // Wait at the end of typing
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && currentCharIdx === 0) {
      isDeleting = false;
      // Move to next role
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      typingSpeed = 500; // Wait slightly before typing next
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing
  setTimeout(type, 1000);
}
