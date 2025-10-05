// Carregador de dados dinâmicos do Supabase
class DataLoader {
  constructor() {
    this.init();
  }
  
  async waitForSupabase() {
    // Aguardar até que o Supabase esteja pronto
    if (window.supabaseReady) {
      return;
    }
    
    return new Promise((resolve) => {
      window.addEventListener('supabaseReady', resolve, { once: true });
    });
  }
  
  async init() {
    try {
      await this.loadPortfolioStats();
      await this.loadPortfolioProjects();
      await this.loadProfileInfo();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }
  
  async loadPortfolioStats() {
    try {
      // Aguardar o carregamento do Supabase
      await this.waitForSupabase();
      const { getPortfolioStats } = window;
      const result = await getPortfolioStats();
      
      if (result.success && result.data) {
        this.updateStats(result.data);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      // Usar valores padrão se houver erro
      this.updateStats({
        projects_count: 50,
        years_experience: 5,
        clients_count: 100
      });
    }
  }
  
  updateStats(stats) {
    const projectsElement = document.querySelector('[data-target="50"]');
    const experienceElement = document.querySelector('[data-target="5"]');
    const clientsElement = document.querySelector('[data-target="100"]');
    
    if (projectsElement) {
      projectsElement.setAttribute('data-target', stats.projects_count);
      this.animateCounter(projectsElement, stats.projects_count);
    }
    
    if (experienceElement) {
      experienceElement.setAttribute('data-target', stats.years_experience);
      this.animateCounter(experienceElement, stats.years_experience);
    }
    
    if (clientsElement) {
      clientsElement.setAttribute('data-target', stats.clients_count);
      this.animateCounter(clientsElement, stats.clients_count);
    }
  }
  
  animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 50);
  }
  
  async loadPortfolioProjects() {
    try {
      await this.waitForSupabase();
      const { getPortfolioProjects } = window;
      const result = await getPortfolioProjects();
      
      if (result.success && result.data && result.data.length > 0) {
        this.updatePortfolioGrid(result.data);
      }
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  }
  
  updatePortfolioGrid(projects) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    // Limpar grid atual
    portfolioGrid.innerHTML = '';
    
    // Adicionar projetos do banco de dados
    projects.forEach(project => {
      const projectElement = this.createProjectElement(project);
      portfolioGrid.appendChild(projectElement);
    });
    
    // Reinicializar efeitos após atualizar o DOM
    setTimeout(() => {
      new PortfolioFilter();
      new ProjectHoverEffect();
    }, 100);
  }
  
  createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'portfolio-item';
    projectDiv.setAttribute('data-category', project.category);
    
    const tagsHtml = project.tags ? project.tags.map(tag => `<span>${tag}</span>`).join('') : '';
    
    projectDiv.innerHTML = `
      <div class="project-card">
        <div class="project-image">
          <svg class="project-svg" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG do projeto será inserido -->
          </svg>
          <div class="project-overlay">
            <div class="project-info">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-desc">${project.description}</p>
              <div class="project-tags">
                ${tagsHtml}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    return projectDiv;
  }
  
  async loadProfileInfo() {
    try {
      await this.waitForSupabase();
      const { getProfileInfo } = window;
      const result = await getProfileInfo();
      
      if (result.success && result.data) {
        this.updateProfileInfo(result.data);
      }
    } catch (error) {
      console.error('Erro ao carregar informações do perfil:', error);
    }
  }
  
  updateProfileInfo(profile) {
    // Atualizar título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && profile.name) {
      heroTitle.textContent = profile.name;
      heroTitle.setAttribute('data-text', profile.name);
    }
    
    // Atualizar descrição
    const aboutText = document.querySelector('.about-text');
    if (aboutText && profile.description) {
      aboutText.innerHTML = profile.description.replace(
        /(full-stack|tecnologias web modernas)/gi,
        '<span class="highlight">$1</span>'
      );
    }
    
    // Atualizar localização
    const locationInfo = document.querySelector('.info-value');
    if (locationInfo && profile.location) {
      locationInfo.textContent = profile.location;
    }
    
    // Atualizar links sociais se disponíveis
    if (profile.github_url) {
      const githubLink = document.querySelector('a[aria-label="GitHub"]');
      if (githubLink) githubLink.href = profile.github_url;
    }
    
    if (profile.linkedin_url) {
      const linkedinLink = document.querySelector('a[aria-label="LinkedIn"]');
      if (linkedinLink) linkedinLink.href = profile.linkedin_url;
    }
    
    if (profile.twitter_url) {
      const twitterLink = document.querySelector('a[aria-label="Twitter"]');
      if (twitterLink) twitterLink.href = profile.twitter_url;
    }
    
    if (profile.dribbble_url) {
      const dribbbleLink = document.querySelector('a[aria-label="Dribbble"]');
      if (dribbbleLink) dribbbleLink.href = profile.dribbble_url;
    }
  }
}

// Função para adicionar novo projeto (para uso futuro)
async function addNewProject(projectData) {
  try {
    const { addPortfolioProject } = window;
    const result = await addPortfolioProject(projectData);
    
    if (result.success) {
      console.log('Projeto adicionado com sucesso!');
      // Recarregar projetos
      const dataLoader = new DataLoader();
      await dataLoader.loadPortfolioProjects();
    } else {
      console.error('Erro ao adicionar projeto:', result.error);
    }
  } catch (error) {
    console.error('Erro ao adicionar projeto:', error);
  }
}

// Função para atualizar estatísticas (para uso futuro)
async function updateStats(newStats) {
  try {
    const { updatePortfolioStats } = window;
    const result = await updatePortfolioStats(newStats);
    
    if (result.success) {
      console.log('Estatísticas atualizadas com sucesso!');
      // Recarregar estatísticas
      const dataLoader = new DataLoader();
      await dataLoader.loadPortfolioStats();
    } else {
      console.error('Erro ao atualizar estatísticas:', result.error);
    }
  } catch (error) {
    console.error('Erro ao atualizar estatísticas:', error);
  }
}

// Inicializar carregamento de dados quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new DataLoader();
});

// Exportar funções para uso global
window.addNewProject = addNewProject;
window.updateStats = updateStats;
