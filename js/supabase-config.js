// Configuração do Supabase - Versão corrigida para navegador
// Este arquivo deve ser carregado após o CDN do Supabase

// Aguardar o carregamento do Supabase
function waitForSupabase() {
  return new Promise((resolve) => {
    if (window.supabase) {
      resolve();
    } else {
      const checkSupabase = setInterval(() => {
        if (window.supabase) {
          clearInterval(checkSupabase);
          resolve();
        }
      }, 100);
    }
  });
}

// Inicializar Supabase quando disponível
waitForSupabase().then(() => {
  const supabaseUrl = 'https://vjdinbexcwhpeifrgskk.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZGluYmV4Y3docGVpZnJnc2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2Nzk5MzAsImV4cCI6MjA3NTI1NTkzMH0.BAJ1B3l5v9v8VAJ7uicU4Lkq4CGr4DQQe85qibr1mXo';
  
  const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
  
  // Função para salvar mensagem de contato
  window.saveContactMessage = async function(messageData) {
    try {
      const { data, error } = await supabaseClient
        .from('contact_messages')
        .insert([
          {
            subject: messageData.subject,
            message: messageData.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
      return { success: false, error: error.message };
    }
  };

  // Função para buscar projetos do portfólio
  window.getPortfolioProjects = async function() {
    try {
      const { data, error } = await supabaseClient
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return { success: false, error: error.message };
    }
  };

  // Função para adicionar novo projeto
  window.addPortfolioProject = async function(projectData) {
    try {
      const { data, error } = await supabaseClient
        .from('portfolio_projects')
        .insert([
          {
            title: projectData.title,
            description: projectData.description,
            category: projectData.category,
            tags: projectData.tags,
            image_url: projectData.image_url,
            project_url: projectData.project_url,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
      return { success: false, error: error.message };
    }
  };

  // Função para buscar estatísticas do portfólio
  window.getPortfolioStats = async function() {
    try {
      const { data, error } = await supabaseClient
        .from('portfolio_stats')
        .select('*')
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      return { success: false, error: error.message };
    }
  };

  // Função para atualizar estatísticas do portfólio
  window.updatePortfolioStats = async function(statsData) {
    try {
      const { data, error } = await supabaseClient
        .from('portfolio_stats')
        .upsert([
          {
            id: 1,
            projects_count: statsData.projects_count,
            years_experience: statsData.years_experience,
            clients_count: statsData.clients_count,
            updated_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error);
      return { success: false, error: error.message };
    }
  };

  // Função para buscar informações do perfil
  window.getProfileInfo = async function() {
    try {
      const { data, error } = await supabaseClient
        .from('profile_info')
        .select('*')
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar informações do perfil:', error);
      return { success: false, error: error.message };
    }
  };

  // Função para atualizar informações do perfil
  window.updateProfileInfo = async function(profileData) {
    try {
      const { data, error } = await supabaseClient
        .from('profile_info')
        .upsert([
          {
            id: 1,
            name: profileData.name,
            title: profileData.title,
            description: profileData.description,
            location: profileData.location,
            email: profileData.email,
            github_url: profileData.github_url,
            linkedin_url: profileData.linkedin_url,
            twitter_url: profileData.twitter_url,
            dribbble_url: profileData.dribbble_url,
            updated_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { success: false, error: error.message };
    }
  };

  // Marcar que o Supabase está pronto
  window.supabaseReady = true;
  
  // Disparar evento personalizado para notificar que o Supabase está pronto
  window.dispatchEvent(new CustomEvent('supabaseReady'));
  
  console.log('✅ Supabase configurado e pronto para uso!');
});
