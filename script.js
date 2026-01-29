// ============================================
// THREE.JS ELEGANT PARTICLE SYSTEM
// ============================================

let scene, camera, renderer, particles;

function initThreeJS() {
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 500;
  
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl-canvas'),
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  createParticles();
  
  window.addEventListener('resize', onWindowResize);
  animate();
}

function createParticles() {
  const geometry = new THREE.BufferGeometry();
  const particleCount = 800;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  // Elegant gold and cream tones
  const colorPalette = [
    { r: 0.79, g: 0.66, b: 0.38 }, // Gold
    { r: 0.83, g: 0.69, b: 0.52 }, // Warm beige
    { r: 0.54, g: 0.44, b: 0.34 }  // Soft brown
  ];
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    positions[i3] = (Math.random() - 0.5) * 1000;
    positions[i3 + 1] = (Math.random() - 0.5) * 1000;
    positions[i3 + 2] = (Math.random() - 0.5) * 800;
    
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  
  particles.rotation.y += 0.0002;
  particles.rotation.x += 0.0001;
  
  renderer.render(scene, camera);
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    requestAnimationFrame(animateRing);
  }
  animateRing();
  
  // Expand cursor on hover
  const hoverElements = document.querySelectorAll('a, button, .feature-card, .profile-card');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// ============================================
// PROFILE CARD FLIP ANIMATION
// ============================================

function initProfileCardFlip() {
  const profileCard = document.getElementById('profileCard');
  let isFlipped = false;
  
  profileCard.addEventListener('click', () => {
    isFlipped = !isFlipped;
    
    if (isFlipped) {
      gsap.to(profileCard, {
        duration: 0.8,
        rotateY: 180,
        ease: 'power2.inOut'
      });
      profileCard.classList.add('flipped');
    } else {
      gsap.to(profileCard, {
        duration: 0.8,
        rotateY: 0,
        ease: 'power2.inOut'
      });
      profileCard.classList.remove('flipped');
    }
  });
}

// ============================================
// GSAP ANIMATIONS
// ============================================

function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Scroll-triggered animations
  gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      duration: 0.8,
      y: 60,
      opacity: 0,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
  
  gsap.utils.toArray('.skill-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      duration: 0.8,
      x: index % 2 === 0 ? -60 : 60,
      opacity: 0,
      ease: 'power3.out'
    });
  });
  
  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  });
  
  // Navigation scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.querySelector('.luxury-nav');
    
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// ============================================
// 3D TILT EFFECT FOR CARDS
// ============================================

function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;
      
      gsap.to(card, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// ============================================
// EMAIL COPY TO CLIPBOARD
// ============================================

function initEmailCopy() {
  const emailBtn = document.querySelector('.email-button');
  
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const email = emailBtn.querySelector('.btn-text').textContent;
      
      navigator.clipboard.writeText(email).then(() => {
        showNotification('Email copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 100px;
      right: 30px;
      background: #3d2c1f;
      color: #f5f1e8;
      padding: 1.5rem 2.5rem;
      font-family: 'Manrope', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 20px 60px rgba(61, 44, 31, 0.3);
    ">
      ${message}
    </div>
  `;
  
  document.body.appendChild(notification);
  
  gsap.from(notification.firstElementChild, {
    duration: 0.6,
    x: 100,
    opacity: 0,
    ease: 'power3.out'
  });
  
  setTimeout(() => {
    gsap.to(notification.firstElementChild, {
      duration: 0.5,
      x: 100,
      opacity: 0,
      ease: 'power3.in',
      onComplete: () => notification.remove()
    });
  }, 3000);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: target, offsetY: 100 },
          ease: 'power3.inOut'
        });
      }
    });
  });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
  const buttons = document.querySelectorAll('.contact-btn, .email-button');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        duration: 0.3,
        x: x * 0.3,
        y: y * 0.3,
        ease: 'power2.out'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        duration: 0.6,
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// ============================================
// PARALLAX SCROLL EFFECTS
// ============================================

function initParallax() {
  gsap.utils.toArray('.profile-decoration').forEach((deco, index) => {
    gsap.to(deco, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: (index + 1) * 50,
      rotate: (index + 1) * 15,
      ease: 'none'
    });
  });
}

// ============================================
// REVEAL ANIMATIONS ON SCROLL
// ============================================

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll('.feature-card, .skill-card').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Body fade in
  gsap.to('body', {
    duration: 0.8,
    opacity: 1,
    ease: 'power2.out'
  });
  
  // Initialize all features
  initThreeJS();
  initCustomCursor();
  initProfileCardFlip();
  initGSAP();
  init3DTilt();
  initEmailCopy();
  initSmoothScroll();
  initMagneticButtons();
  initParallax();
  initScrollReveal();
  
  console.log('%c✨ Portfolio Loaded Successfully', 'color: #c9a961; font-size: 18px; font-weight: bold; font-family: Cormorant Garamond;');
});

// Performance optimization for mobile
if (window.innerWidth < 768) {
  ScrollTrigger.config({ 
    limitCallbacks: true,
    ignoreMobileResize: true
  });
}