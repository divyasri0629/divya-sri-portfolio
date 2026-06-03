const PROJECTS_DATA = {
  graduway: {
    title: 'GraduWay',
    tag: 'ALUMNI SYSTEM',
    tech: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'SQL'],
    desc: 'GraduWay is an interactive, cross-platform alumni application designed to bridge the gap between current students and university graduates. It facilitates career guidance, mentorship workflows, and event planning. The application incorporates full authentication structures, secure route filters, and responsive visual architectures.',
    features: [
      'Interactive alumni search directory with location and major filter models.',
      'One-on-one direct message coordination channels with push notification layers.',
      'Structured job listing boards and referral request systems.',
      'Centralized event calendar for alumni reunions and industry seminars.'
    ],
    github: 'https://github.com/NagaSaiTejo/GraduWay',
    live: 'https://github.com/NagaSaiTejo/GraduWay'
  },
  crackit: {
    title: 'CrackIt',
    tag: 'INTERVIEW PREPARATION',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    desc: 'CrackIt is a comprehensive frontend web application designed as an interview preparation hub. It aggregates essential study materials, structured programming tutorials, and mock test evaluations to help IT graduates succeed in technical recruitment cycles.',
    features: [
      'Interactive mock assessment portal with timing trackers and instant score cards.',
      'Curated repository of top Data Structures & Algorithms (DSA) questions with step-by-step solutions.',
      'Interactive roadmap indicators for various domains (Backend, Frontend, Flutter).',
      'Bookmark features utilizing localStorage for saving complex practice problems.'
    ],
    github: 'https://github.com/divyasri0629/CrackIt',
    live: 'https://github.com/divyasri0629/CrackIt'
  },
  resqblood: {
    title: 'ResQblood',
    tag: 'EMERGENCY HEALTH COORDINATOR',
    tech: ['Node.js', 'Express.js', 'MySQL', 'JavaScript'],
    desc: 'ResQblood is a full-stack web application developed to handle urgent blood donation needs. By connecting local donors with emergency seekers in real-time, the app streamlines search protocols during high-stress healthcare scenarios.',
    features: [
      'Localized donor availability tracker with immediate distance sorting.',
      'Quick request generation system with direct SMS fallback communication integration.',
      'Secure dashboard for blood banks to manage stock metrics and emergency needs.',
      'Strict verification procedures to screen for eligible blood donations.'
    ],
    github: 'https://github.com/divyasri0629/ResQblood',
    live: 'https://github.com/divyasri0629/ResQblood'
  },
  'career-app': {
    title: 'Career Application',
    tag: 'CAREER WORKFLOW TRACKER',
    tech: ['Flutter', 'Dart', 'REST APIs', 'Postman'],
    desc: 'A cross-platform mobile application developed with Flutter and Dart, allowing job candidates to search, apply, and monitor the stages of their career applications. Features an intuitive dashboard representing application status pipelines.',
    features: [
      'Visual pipeline tracker showing stages: Applied, Screening, Interview, Offered, Rejected.',
      'Seamless REST API integration fetching live employment opportunities from simulated feeds.',
      'Local notifications for interview reminders and deadline warnings.',
      'Integrated resume reviewer extracting keywords against target job summaries.'
    ],
    github: '',
    live: ''
  },
  'resume-builder': {
    title: 'Resume Builder',
    tag: 'DYNAMIC DOCUMENT GENERATOR',
    tech: ['HTML5', 'CSS Grid', 'Bootstrap', 'JavaScript'],
    desc: 'An interactive web-based utility allowing users to dynamically input their educational details, achievements, and technical skills to render and export clean, ATS-compliant PDF resumes in real-time.',
    features: [
      'Modular form sections allowing easy ordering of blocks (Education, Experience, Skills).',
      'Real-time split-pane print preview updating styles instantaneously.',
      'Preset layout design themes (Minimal, Modern, Professional, Bold).',
      'Local storage caching to save user states across page refreshes.'
    ],
    github: '',
    live: ''
  }
};

export function initProjects() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  
  if (!modal) return;
  
  const modalClose = modal.querySelector('.modal-close-btn');
  const modalBackdrop = modal.querySelector('.modal-backdrop');
  
  // 1. INTERACTIVE 3D TILT EFFECT FOR CARDS
  // Bypassed if prefers-reduced-motion is active
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate relative to card
        const y = e.clientY - rect.top;  // y coordinate relative to card
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt rotation (max 10 degrees)
        const tiltX = (centerY - y) / 12;
        const tiltY = (x - centerX) / 12;
        
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.05s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.4s ease';
      });
    });

    // Apply similar tilt to hero 3D floating cards
    const heroCards = document.querySelectorAll('.card-3d');
    heroCards.forEach((card, idx) => {
      // Calculate depth translation offsets
      const zOffset = idx === 0 ? 0 : idx === 1 ? -60 : -120;
      const xyOffset = idx === 0 ? 0 : idx === 1 ? 30 : 60;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (centerY - y) / 10 + 10; // add initial 10deg rotateX
        const tiltY = (x - centerX) / 10 - 15; // add initial -15deg rotateY
        
        card.style.transform = `translate3d(${xyOffset}px, ${xyOffset}px, ${zOffset}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        card.style.zIndex = '10';
        card.style.transition = 'transform 0.05s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `translate3d(${xyOffset}px, ${xyOffset}px, ${zOffset}px) rotateX(10deg) rotateY(-15deg) scale3d(1, 1, 1)`;
        card.style.zIndex = 3 - idx;
        card.style.transition = 'transform 0.5s ease';
      });
    });
  }

  // 2. MODAL TRIGGER LOGIC
  const openButtons = document.querySelectorAll('.open-modal-btn');
  
  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering card tilt resets or bubbles
      
      const cardWrapper = btn.closest('[data-project-id]');
      if (!cardWrapper) return;
      
      const projectId = cardWrapper.getAttribute('data-project-id');
      const project = PROJECTS_DATA[projectId];
      if (!project) return;
      
      populateModal(project);
      openModal(modal);
    });
  });

  // Handle closing modal
  modalClose.addEventListener('click', () => closeModal(modal));
  modalBackdrop.addEventListener('click', () => closeModal(modal));

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(modal);
    }
  });
}

function populateModal(project) {
  const modalTitle = document.getElementById('modal-title');
  const modalTech = document.getElementById('modal-tech');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalCode = document.getElementById('modal-code-link');
  const modalLive = document.getElementById('modal-live-link');
  
  // Fill text
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  
  // Fill tech tags
  modalTech.innerHTML = '';
  project.tech.forEach((t) => {
    const span = document.createElement('span');
    span.textContent = t;
    modalTech.appendChild(span);
  });
  
  // Fill features
  modalFeatures.innerHTML = '';
  project.features.forEach((feat) => {
    const li = document.createElement('li');
    li.textContent = feat;
    modalFeatures.appendChild(li);
  });
  
  // Set source code buttons
  if (project.github) {
    modalCode.style.display = 'inline-flex';
    modalCode.setAttribute('href', project.github);
  } else {
    modalCode.style.display = 'none';
  }
  
  if (project.live) {
    modalLive.style.display = 'inline-flex';
    modalLive.setAttribute('href', project.live);
  } else {
    modalLive.style.display = 'none';
  }

  // Showcase visual icon matching project type
  const showcase = document.querySelector('.modal-image-showcase');
  let iconHTML = '';
  if (project.title === 'GraduWay') {
    iconHTML = '<i class="fa-solid fa-graduation-cap" style="font-size: 5rem; color: var(--color-accent);"></i>';
  } else if (project.title === 'CrackIt') {
    iconHTML = '<i class="fa-solid fa-award" style="font-size: 5rem; color: var(--color-accent-pink);"></i>';
  } else if (project.title === 'ResQblood') {
    iconHTML = '<i class="fa-solid fa-droplet" style="font-size: 5rem; color: #EF4444;"></i>';
  } else if (project.title === 'Career Application') {
    iconHTML = '<i class="fa-solid fa-briefcase" style="font-size: 5rem; color: var(--color-accent-purple);"></i>';
  } else {
    iconHTML = '<i class="fa-solid fa-file-invoice" style="font-size: 5rem; color: var(--color-accent);"></i>';
  }
  showcase.innerHTML = `<div class="modal-placeholder-img">${iconHTML}<span>${project.tag}</span></div>`;
}

function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scroll
  
  // Keyboard focus locking
  modal.querySelector('.modal-close-btn').focus();
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Unlock scroll
}
