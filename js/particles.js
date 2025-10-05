// Partículas de fundo
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 100;
    this.connectionDistance = 150;
    
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.init());
  }
  
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: this.getRandomColor()
      });
    }
  }
  
  getRandomColor() {
    const colors = ['#ff00ff', '#00ffff', '#00ff00'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  drawParticle(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = particle.color;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = particle.color;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }
  
  drawConnection(p1, p2, distance) {
    const opacity = 1 - (distance / this.connectionDistance);
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3})`;
    this.ctx.lineWidth = 0.5;
    this.ctx.stroke();
  }
  
  updateParticle(particle) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Desenhar conexões
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.connectionDistance) {
          this.drawConnection(this.particles[i], this.particles[j], distance);
        }
      }
    }
    
    // Desenhar e atualizar partículas
    this.particles.forEach(particle => {
      this.drawParticle(particle);
      this.updateParticle(particle);
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});
