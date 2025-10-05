# Configuração do Supabase para Cyberpunk Portfolio

## Pré-requisitos
- Conta no Supabase (https://supabase.com)
- Projeto criado no Supabase com as credenciais fornecidas

## Configuração do Banco de Dados

### 1. Executar o Schema SQL
1. Acesse o painel do Supabase
2. Vá para **SQL Editor**
3. Copie e execute o conteúdo do arquivo `database/schema.sql`
4. Isso criará todas as tabelas necessárias:
   - `contact_messages` - Para mensagens do formulário de contato
   - `portfolio_projects` - Para projetos do portfólio
   - `portfolio_stats` - Para estatísticas (projetos, experiência, clientes)
   - `profile_info` - Para informações do perfil

### 2. Verificar as Tabelas Criadas
Após executar o SQL, você deve ver as seguintes tabelas no **Table Editor**:
- ✅ contact_messages
- ✅ portfolio_projects  
- ✅ portfolio_stats
- ✅ profile_info

### 3. Configurar Row Level Security (RLS)
O script SQL já configura automaticamente:
- **Leitura pública** para projetos, estatísticas e perfil
- **Inserção pública** apenas para mensagens de contato
- **Segurança** para dados sensíveis

## Funcionalidades Implementadas

### 📧 Formulário de Contato
- Salva mensagens diretamente no Supabase
- Validação em tempo real
- Efeitos visuais cyberpunk
- Feedback de sucesso/erro

### 📊 Estatísticas Dinâmicas
- Carrega dados do banco de dados
- Animação de contadores
- Atualizável via banco de dados

### 🎨 Projetos do Portfólio
- Carrega projetos do Supabase
- Filtros por categoria
- Dados completamente dinâmicos

### 👤 Informações do Perfil
- Nome, descrição e localização dinâmicos
- Links sociais configuráveis
- Atualizável via banco de dados

## Como Usar

### Adicionar Novo Projeto
```sql
INSERT INTO portfolio_projects (title, description, category, tags, image_url, project_url) 
VALUES ('Meu Projeto', 'Descrição do projeto', 'web', ARRAY['React', 'Node.js'], 'images/projeto.svg', 'https://meusite.com');
```

### Atualizar Estatísticas
```sql
UPDATE portfolio_stats 
SET projects_count = 75, years_experience = 7, clients_count = 150 
WHERE id = 1;
```

### Atualizar Perfil
```sql
UPDATE profile_info 
SET name = 'Novo Nome', description = 'Nova descrição', location = 'Nova Cidade' 
WHERE id = 1;
```

### Ver Mensagens de Contato
```sql
SELECT * FROM contact_messages ORDER BY created_at DESC;
```

## Estrutura de Arquivos

```
cyberpunk-portfolio/
├── js/
│   ├── supabase.js          # Configuração e funções do Supabase
│   ├── data-loader.js       # Carregamento dinâmico de dados
│   ├── form.js              # Formulário integrado com Supabase
│   └── ...outros arquivos
├── database/
│   └── schema.sql           # Schema do banco de dados
└── SUPABASE_SETUP.md        # Este arquivo
```

## Credenciais Configuradas

- **URL**: https://vjdinbexcwhpeifrgskk.supabase.co
- **Chave Anon**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
- **Configuração**: Já incluída em `js/supabase.js`

## Próximos Passos

1. ✅ Execute o schema SQL no Supabase
2. ✅ Verifique se as tabelas foram criadas
3. ✅ Teste o formulário de contato
4. ✅ Personalize os dados do perfil e projetos
5. ✅ Deploy do site

## Suporte

Se encontrar problemas:
1. Verifique se o schema SQL foi executado corretamente
2. Confirme se as políticas RLS estão ativas
3. Verifique o console do navegador para erros JavaScript
4. Teste a conectividade com o Supabase

O site agora está totalmente integrado com o Supabase e pronto para uso em produção!
