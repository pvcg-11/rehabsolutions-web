// ===============================================
// Navbar scroll effect
// ===============================================
const navbar = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===============================================
// Smooth scrolling for navigation links
// ===============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// ===============================================
// Active navigation link on scroll
// ===============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===============================================
// Scroll reveal animations
// ===============================================
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===============================================
// Counter animation
// ===============================================
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

const animateCounters = () => {
  if (counterAnimated) return;
  
  const heroSection = document.getElementById('hero');
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  
  if (window.pageYOffset > heroBottom - window.innerHeight) {
    counterAnimated = true;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60 FPS
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }
};

window.addEventListener('scroll', animateCounters);

// ===============================================
// Parallax effect for hero section
// ===============================================
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  if (hero && scrolled < hero.offsetHeight) {
    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
});

// ===============================================
// Back to top button
// ===============================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===============================================
// Stop video when modal closes
// ===============================================
const videoModal = document.getElementById('videoModal');
const demoVideo = document.getElementById('demoVideo');

if (videoModal && demoVideo) {
  videoModal.addEventListener('hidden.bs.modal', function () {
    // Stop video by reloading iframe src
    const videoSrc = demoVideo.src;
    demoVideo.src = '';
    demoVideo.src = videoSrc;
  });
}

// ===============================================
// Carousel auto-pause on hover
// ===============================================
const carousel = document.querySelector('#productCarousel');

if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 4000,
    ride: 'carousel'
  });
  
  carousel.addEventListener('mouseenter', () => {
    bsCarousel.pause();
  });
  
  carousel.addEventListener('mouseleave', () => {
    bsCarousel.cycle();
  });
}

// ===============================================
// Add hover effect to benefit cards
// ===============================================
const benefitCards = document.querySelectorAll('.benefit-card');

benefitCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// ===============================================
// Lazy loading for images
// ===============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===============================================
// Enhanced scroll indicator
// ===============================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const firstSection = document.getElementById('producto');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Hide scroll indicator after scrolling
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '0.8';
      scrollIndicator.style.pointerEvents = 'auto';
    }
  });
}

// ===============================================
// Add ripple effect to buttons
// ===============================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===============================================
// Performance optimization: Throttle scroll events
// ===============================================
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
  // Your scroll functions here are already optimized
}, 100));

// ===============================================
// Initialize tooltips if Bootstrap tooltips are used
// ===============================================
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// ===============================================
// Loading animation
// ===============================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial reveal
  setTimeout(() => {
    revealOnScroll();
  }, 100);
});

// ===============================================
// Console message for developers
// ===============================================
console.log('%cRehabSolutions', 'color: #4F46E5; font-size: 24px; font-weight: bold;');
console.log('%cDesarrollado con ❤️ para mejorar vidas', 'color: #6B7280; font-size: 14px;');
console.log('%cProyecto académico - 2025', 'color: #9CA3AF; font-size: 12px;');

// ===============================================
// Easter egg: Konami code
// ===============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiPattern.join('')) {
    console.log('🎉 ¡Código Konami activado! Eres increíble.');
    document.body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(rainbowStyle);