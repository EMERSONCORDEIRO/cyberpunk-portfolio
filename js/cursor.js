// Cursor personalizado
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.follower = document.querySelector('.cursor-follower');
    this.cursorPos = { x: 0, y: 0 };
    this.followerPos = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    // Atualizar posição do cursor
    document.addEventListener('mousemove', (e) => {
      this.cursorPos.x = e.clientX;
      this.cursorPos.y = e.clientY;
    });
    
    // Efeitos em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        this.follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
    
    // Animar cursor
    this.animate();
  }
  
  animate() {
    // Cursor principal segue o mouse diretamente
    this.cursor.style.left = this.cursorPos.x + 'px';
    this.cursor.style.top = this.cursorPos.y + 'px';
    
    // Follower segue com delay (easing)
    this.followerPos.x += (this.cursorPos.x - this.followerPos.x) * 0.1;
    this.followerPos.y += (this.cursorPos.y - this.followerPos.y) * 0.1;
    
    this.follower.style.left = this.followerPos.x + 'px';
    this.follower.style.top = this.followerPos.y + 'px';
    
    requestAnimationFrame(() => this.animate());
  }
}

// Inicializar apenas em dispositivos não-touch
document.addEventListener('DOMContentLoaded', () => {
  if (!('ontouchstart' in window)) {
    new CustomCursor();
  }
});
