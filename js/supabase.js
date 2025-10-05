// Configuração do Supabase
// Usando CDN para compatibilidade com navegadores
const { createClient } = supabase

const supabaseUrl = 'https://vjdinbexcwhpeifrgskk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZGluYmV4Y3docGVpZnJnc2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2Nzk5MzAsImV4cCI6MjA3NTI1NTkzMH0.BAJ1B3l5v9v8VAJ7uicU4Lkq4CGr4DQQe85qibr1mXo'

const supabaseClient = createClient(supabaseUrl, supabaseKey)

// Funções para interagir com o banco de dados

// Função para salvar mensagem de contato
async function saveContactMessage(messageData) {
  try {
    const { data, error } = await supabaseClient
      .from('contact_messages')
      .insert([
        {
          subject: messageData.subject,
          message: messageData.message,
          created_at: new Date().toISOString()
        }
      ])
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error)
    return { success: false, error: error.message }
  }
}

// Função para buscar projetos do portfólio
async function getPortfolioProjects() {
  try {
    const { data, error } = await supabaseClient
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return { success: false, error: error.message }
  }
}

// Função para adicionar novo projeto
async function addPortfolioProject(projectData) {
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
      ])
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao adicionar projeto:', error)
    return { success: false, error: error.message }
  }
}

// Função para buscar estatísticas do portfólio
async function getPortfolioStats() {
  try {
    const { data, error } = await supabaseClient
      .from('portfolio_stats')
      .select('*')
      .single()
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return { success: false, error: error.message }
  }
}

// Função para atualizar estatísticas do portfólio
async function updatePortfolioStats(statsData) {
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
      ])
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao atualizar estatísticas:', error)
    return { success: false, error: error.message }
  }
}

// Função para buscar informações do perfil
async function getProfileInfo() {
  try {
    const { data, error } = await supabaseClient
      .from('profile_info')
      .select('*')
      .single()
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao buscar informações do perfil:', error)
    return { success: false, error: error.message }
  }
}

// Função para atualizar informações do perfil
async function updateProfileInfo(profileData) {
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
      ])
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return { success: false, error: error.message }
  }
}

// Exportar funções para o objeto window para uso global
window.saveContactMessage = saveContactMessage;
window.getPortfolioProjects = getPortfolioProjects;
window.addPortfolioProject = addPortfolioProject;
window.getPortfolioStats = getPortfolioStats;
window.updatePortfolioStats = updatePortfolioStats;
window.getProfileInfo = getProfileInfo;
window.updateProfileInfo = updateProfileInfo;
