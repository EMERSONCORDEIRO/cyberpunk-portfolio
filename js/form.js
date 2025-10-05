// Formulário de contato
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.formStatus = document.getElementById('formStatus');
    this.inputs = this.form.querySelectorAll('.form-input');
    
    this.init();
  }
  
  init() {
    // Validação em tempo real
    this.inputs.forEach(input => {
      input.addEventListener('focus', () => {
        this.addFocusEffect(input);
      });
      
      input.addEventListener('blur', () => {
        this.removeFocusEffect(input);
        this.validateInput(input);
      });
      
      input.addEventListener('input', () => {
        this.addTypingEffect(input);
      });
    });
    
    // Submit
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }
  
  addFocusEffect(input) {
    const formGroup = input.closest('.form-group');
    const label = formGroup.querySelector('.form-label');
    
    if (label) {
      label.style.color = 'var(--neon-pink)';
      label.style.textShadow = '0 0 10px var(--neon-pink)';
    }
  }
  
  removeFocusEffect(input) {
    const formGroup = input.closest('.form-group');
    const label = formGroup.querySelector('.form-label');
    
    if (label) {
      label.style.color = '';
      label.style.textShadow = '';
    }
  }
  
  addTypingEffect(input) {
    // Efeito de digitação tipo terminal
    input.style.borderColor = 'var(--neon-cyan)';
    setTimeout(() => {
      input.style.borderColor = '';
    }, 100);
  }
  
  validateInput(input) {
    const formGroup = input.closest('.form-group');
    let isValid = true;
    
    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
    }
    
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(input.value);
    }
    
    if (!isValid) {
      input.style.borderColor = 'var(--neon-pink)';
      input.style.boxShadow = '0 0 10px var(--neon-pink)';
    } else {
      input.style.borderColor = 'var(--neon-green)';
      input.style.boxShadow = '0 0 10px var(--neon-green)';
    }
    
    return isValid;
  }
  
  validateForm() {
    let isValid = true;
    
    this.inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  handleSubmit() {
    if (!this.validateForm()) {
      this.showStatus('Por favor, preencha todos os campos corretamente.', 'error');
      return;
    }
    
    // Efeito de loading
    const submitBtn = this.form.querySelector('.btn-submit');
    const originalText = submitBtn.querySelector('span').textContent;
    submitBtn.querySelector('span').textContent = 'ENVIANDO...';
    submitBtn.disabled = true;
    
    // Simular envio (em produção, aqui seria uma chamada AJAX)
    setTimeout(() => {
      this.showStatus('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
      this.form.reset();
      
      // Resetar inputs
      this.inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      });
      
      // Resetar botão
      submitBtn.querySelector('span').textContent = originalText;
      submitBtn.disabled = false;
      
      // Efeito de glitch no sucesso
      this.triggerSuccessGlitch();
    }, 2000);
  }
  
  showStatus(message, type) {
    this.formStatus.textContent = message;
    this.formStatus.className = `form-status ${type}`;
    
    // Esconder após 5 segundos
    setTimeout(() => {
      this.formStatus.className = 'form-status';
    }, 5000);
  }
  
  triggerSuccessGlitch() {
    const formWrapper = document.querySelector('.contact-form-wrapper');
    formWrapper.style.animation = 'glitch-anim 0.5s';
    
    setTimeout(() => {
      formWrapper.style.animation = '';
    }, 500);
  }
}

// Efeito de scanline nos inputs
class InputScanline {
  constructor() {
    this.inputs = document.querySelectorAll('.form-input');
    this.init();
  }
  
  init() {
    this.inputs.forEach(input => {
      input.addEventListener('focus', () => {
        this.createScanline(input);
      });
    });
  }
  
  createScanline(input) {
    const formGroup = input.closest('.form-group');
    const scanline = document.createElement('div');
    scanline.style.position = 'absolute';
    scanline.style.top = '0';
    scanline.style.left = '0';
    scanline.style.width = '100%';
    scanline.style.height = '2px';
    scanline.style.background = 'var(--neon-cyan)';
    scanline.style.boxShadow = '0 0 10px var(--neon-cyan)';
    scanline.style.animation = 'scanline 1s ease-out';
    scanline.style.pointerEvents = 'none';
    
    formGroup.style.position = 'relative';
    formGroup.appendChild(scanline);
    
    setTimeout(() => {
      scanline.remove();
    }, 1000);
  }
}

// Adicionar animação de scanline ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes scanline {
    0% {
      top: 0;
      opacity: 1;
    }
    100% {
      top: 100%;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
  new InputScanline();
});
