-- Schema SQL para o Cyberpunk Portfolio
-- Execute este script no SQL Editor do Supabase para criar as tabelas necessárias

-- Tabela para mensagens de contato
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para projetos do portfólio
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  image_url TEXT,
  project_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para estatísticas do portfólio
CREATE TABLE IF NOT EXISTS portfolio_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  projects_count INTEGER DEFAULT 0,
  years_experience INTEGER DEFAULT 0,
  clients_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Tabela para informações do perfil
CREATE TABLE IF NOT EXISTS profile_info (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL DEFAULT 'CYBER DEVELOPER EMERSON',
  title TEXT NOT NULL DEFAULT 'Desenvolvedor Full-Stack',
  description TEXT DEFAULT 'Desenvolvedor full-stack especializado em criar experiências digitais imersivas e interfaces futuristas.',
  location TEXT DEFAULT 'São Paulo, Brasil',
  email TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  dribbble_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Inserir dados iniciais
INSERT INTO portfolio_stats (id, projects_count, years_experience, clients_count) 
VALUES (1, 50, 5, 100) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO profile_info (id, name, title, description, location) 
VALUES (1, 'CYBER DEVELOPER EMERSON', 'Desenvolvedor Full-Stack', 'Desenvolvedor full-stack especializado em criar experiências digitais imersivas e interfaces futuristas. Com expertise em tecnologias web modernas, transformo ideias em realidade digital.', 'São Paulo, Brasil') 
ON CONFLICT (id) DO NOTHING;

-- Inserir projetos de exemplo
INSERT INTO portfolio_projects (title, description, category, tags, image_url, project_url) VALUES
('NEON CITY', 'Website futurista com animações 3D', 'web', ARRAY['React', 'Three.js'], 'images/project1.svg', '#'),
('CYBER DASH', 'Dashboard analítico com visualizações', 'app', ARRAY['Vue.js', 'D3.js'], 'images/project2.svg', '#'),
('GLITCH UI', 'Sistema de design cyberpunk', 'design', ARRAY['Figma', 'CSS'], 'images/project3.svg', '#'),
('NEURAL NET', 'Plataforma de IA com interface moderna', 'web', ARRAY['Next.js', 'Python'], 'images/project4.svg', '#'),
('CRYPTO TRACKER', 'App de rastreamento de criptomoedas', 'app', ARRAY['React Native', 'API'], 'images/project5.svg', '#'),
('HOLO BRAND', 'Identidade visual holográfica', 'design', ARRAY['Branding', '3D'], 'images/project6.svg', '#')
ON CONFLICT DO NOTHING;

-- Habilitar Row Level Security (RLS) para segurança
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_info ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para permitir leitura pública
CREATE POLICY "Allow public read access" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON portfolio_stats FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON profile_info FOR SELECT USING (true);

-- Política para permitir inserção de mensagens de contato
CREATE POLICY "Allow public insert" ON contact_messages FOR INSERT WITH CHECK (true);

-- Comentários para documentação
COMMENT ON TABLE contact_messages IS 'Armazena mensagens enviadas através do formulário de contato';
COMMENT ON TABLE portfolio_projects IS 'Armazena informações dos projetos do portfólio';
COMMENT ON TABLE portfolio_stats IS 'Armazena estatísticas do portfólio (projetos, experiência, clientes)';
COMMENT ON TABLE profile_info IS 'Armazena informações do perfil do desenvolvedor';
