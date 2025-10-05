// Arquivo principal - coordena todos os módulos
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c CYBERPUNK PORTFOLIO LOADED ', 'background: #00ffff; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px;');
  console.log('%c System initialized successfully ', 'background: #ff00ff; color: #0a0a0a; font-size: 14px; padding: 5px;');
  
  // Inserir SVGs nos elementos
  loadSVGs();
  
  // Preloader
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Carregar SVGs
function loadSVGs() {
  // Hero SVG
  const heroSvg = document.querySelector('.hero-section .hero-svg');
  if (heroSvg) {
    fetch('images/hero-bg.svg')
      .then(response => response.text())
      .then(data => {
        heroSvg.outerHTML = data;
      })
      .catch(err => console.log('Hero SVG não encontrado'));
  }
  
  // Avatar SVG
  const avatarSvg = document.querySelector('.avatar-svg');
  if (avatarSvg) {
    fetch('images/avatar.svg')
      .then(response => response.text())
      .then(data => {
        avatarSvg.outerHTML = data;
      })
      .catch(err => console.log('Avatar SVG não encontrado'));
  }
  
  // Project SVGs
  const projectSvgs = document.querySelectorAll('.project-svg');
  projectSvgs.forEach((svg, index) => {
    const projectNumber = index + 1;
    fetch(`images/project${projectNumber}.svg`)
      .then(response => response.text())
      .then(data => {
        svg.outerHTML = data;
      })
      .catch(err => console.log(`Project ${projectNumber} SVG não encontrado`));
  });
  
  // Service SVGs
  const serviceIcons = document.querySelectorAll('.service-icon svg');
  const serviceNames = ['web', 'uiux', 'backend', 'mobile'];
  serviceIcons.forEach((svg, index) => {
    if (serviceNames[index]) {
      fetch(`images/service-${serviceNames[index]}.svg`)
        .then(response => response.text())
        .then(data => {
          svg.outerHTML = data;
        })
        .catch(err => console.log(`Service ${serviceNames[index]} SVG não encontrado`));
    }
  });
}

// Performance optimization
window.addEventListener('load', () => {
  // Lazy loading para imagens
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// Easter egg - Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    activateMatrixMode();
  }
});

function activateMatrixMode() {
  console.log('%c MATRIX MODE ACTIVATED! ', 'background: #00ff00; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
  
  // Mudar todas as cores para verde Matrix
  document.documentElement.style.setProperty('--neon-cyan', '#00ff00');
  document.documentElement.style.setProperty('--neon-pink', '#00ff00');
  document.documentElement.style.setProperty('--neon-green', '#00ff00');
  
  // Adicionar efeito de chuva de caracteres
  createMatrixRain();
  
  // Resetar após 10 segundos
  setTimeout(() => {
    location.reload();
  }, 10000);
}

function createMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '10000';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);
  
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  const matrixInterval = setInterval(draw, 33);
  
  setTimeout(() => {
    clearInterval(matrixInterval);
    canvas.remove();
  }, 10000);
}

// Debug mode
if (window.location.hash === '#debug') {
  console.log('Debug mode enabled');
  document.body.style.outline = '2px solid red';
  
  // Mostrar grid
  const style = document.createElement('style');
  style.textContent = `
    * {
      outline: 1px solid rgba(255, 0, 255, 0.1) !important;
    }
  `;
  document.head.appendChild(style);
}
