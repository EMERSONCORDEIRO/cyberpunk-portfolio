// Navegação
class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.themeToggle = document.getElementById('themeToggle');
    
    this.init();
  }
  
  init() {
    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    this.navToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      this.navToggle.classList.toggle('active');
    });
    
    // Smooth scroll e fechar menu mobile
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
        
        // Fechar menu mobile
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
      });
    });
    
    // Theme toggle
    this.themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      
      // Salvar preferência
      const isLightMode = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
