// Efeitos de glitch
class GlitchEffect {
  constructor() {
    this.glitchElements = document.querySelectorAll('.glitch');
    this.init();
  }
  
  init() {
    this.glitchElements.forEach(element => {
      // Glitch aleatório
      setInterval(() => {
        if (Math.random() > 0.95) {
          this.triggerGlitch(element);
        }
      }, 100);
    });
  }
  
  triggerGlitch(element) {
    element.style.animation = 'none';
    setTimeout(() => {
      element.style.animation = '';
    }, 10);
  }
}

// Text scramble effect
class TextScramble {
  constructor(element) {
    this.element = element;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.element.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="glitch-char">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    this.element.innerHTML = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Typing effect para o hero
class TypingEffect {
  constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
    this.element = element;
    this.texts = texts;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.pauseTime = pauseTime;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    
    this.type();
  }
  
  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
    
    if (!this.isDeleting && this.charIndex === currentText.length) {
      speed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      speed = 500;
    }
    
    setTimeout(() => this.type(), speed);
  }
}

// Inicializar efeitos
document.addEventListener('DOMContentLoaded', () => {
  new GlitchEffect();
  
  // Typing effect no hero
  const typedElement = document.getElementById('typed-text');
  if (typedElement) {
    const texts = [
      'Desenvolvedor Full-Stack',
      'Designer UI/UX',
      'Criador de Experiências',
      'Especialista em Web'
    ];
    new TypingEffect(typedElement, texts, 80, 40, 2000);
  }
});
