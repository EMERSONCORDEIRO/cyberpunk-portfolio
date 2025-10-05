// Filtro de portfólio
class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.portfolioItems = document.querySelectorAll('.portfolio-item');
    
    this.init();
  }
  
  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remover active de todos os botões
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar active ao botão clicado
        button.classList.add('active');
        
        // Filtrar items
        const filter = button.getAttribute('data-filter');
        this.filterItems(filter);
      });
    });
  }
  
  filterItems(filter) {
    this.portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hide');
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.classList.add('hide');
        }, 300);
      }
    });
  }
}

// Hover effect nos projetos
class ProjectHoverEffect {
  constructor() {
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }
  
  init() {
    this.projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.addGlitchEffect(card);
      });
      
      card.addEventListener('mousemove', (e) => {
        this.tiltCard(card, e);
      });
      
      card.addEventListener('mouseleave', () => {
        this.resetCard(card);
      });
    });
  }
  
  addGlitchEffect(card) {
    const title = card.querySelector('.project-title');
    if (title) {
      title.style.animation = 'glitch-anim 0.3s';
      setTimeout(() => {
        title.style.animation = '';
      }, 300);
    }
  }
  
  tiltCard(card, e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  }
  
  resetCard(card) {
    card.style.transform = '';
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioFilter();
  new ProjectHoverEffect();
});
