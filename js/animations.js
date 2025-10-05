// Animações de scroll
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.init();
  }
  
  init() {
    // Intersection Observer para animações
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, this.observerOptions);
    
    // Adicionar classes de animação
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      if (index > 0) { // Pular hero section
        section.classList.add('fade-in');
        observer.observe(section);
      }
    });
    
    // Animar cards individualmente
    const cards = document.querySelectorAll('.project-card, .service-card, .info-card');
    cards.forEach((card, index) => {
      card.classList.add('fade-in');
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
    
    // Animar estatísticas
    this.animateStats();
  }
  
  animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
  }
  
  countUp(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
}

// Parallax effect
class ParallaxEffect {
  constructor() {
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      // Parallax no hero
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
      }
      
      // Parallax nos SVGs
      const svgs = document.querySelectorAll('.hero-svg, .avatar-svg');
      svgs.forEach(svg => {
        const rect = svg.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        if (scrollPercent > 0 && scrollPercent < 1) {
          svg.style.transform = `translateY(${scrollPercent * 50}px)`;
        }
      });
    });
  }
}

// Glitch effect em botões
class ButtonGlitch {
  constructor() {
    this.buttons = document.querySelectorAll('.btn');
    this.init();
  }
  
  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        this.triggerGlitch(btn);
      });
    });
  }
  
  triggerGlitch(button) {
    const glitchEl = button.querySelector('.btn-glitch');
    if (!glitchEl) return;
    
    glitchEl.style.opacity = '0.3';
    glitchEl.style.animation = 'glitch-anim 0.3s';
    
    setTimeout(() => {
      glitchEl.style.opacity = '0';
      glitchEl.style.animation = '';
    }, 300);
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  new ParallaxEffect();
  new ButtonGlitch();
});
