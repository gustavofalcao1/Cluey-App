# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Não lançado] - Processo de Atualização

### Adicionado
- Branch `dev-v2` para desenvolvimento da nova versão
- Arquivo `PLAN.md` com plano detalhado de atualização
- Arquivo `CHANGELOG.md` para documentar mudanças

### Implementado
- Atualização do Expo SDK para a versão 52
- Atualização de todas as dependências do React Native e Expo para versões compatíveis
- Modernização da integração com Firebase usando a nova API modular
- Atualização da API OpenAI para usar o modelo gpt-3.5-turbo e o endpoint de chat completions
- Atualização das variáveis de ambiente para usar o prefixo EXPO_PUBLIC_
- Substituição de Constants.manifest pelo Constants.expoConfig
- Correção de erros de ESLint para melhorar a qualidade do código
- Implementação dos métodos de login social como placeholders (Google, Facebook, GitHub)
- Resolução de problemas iniciais de compatibilidade para permitir a execução do app
- Implementação completa dos métodos de login social com bibliotecas específicas para React Native

### Em Progresso
- Testes do fluxo completo de autenticação
- Validação do comportamento e respostas da IA
- Adaptação de componentes para garantir compatibilidade com Expo Go

### Planejado
- Adaptação de componentes problemáticos sem alterar aparência ou comportamento
- Garantia de funcionamento do sistema de temas e localização
- Testes completos de todas as funcionalidades no Expo Go
- Documentação das mudanças técnicas realizadas
- Preparação para merge com a branch principal

## [0.0.1] - Data de lançamento original

### Funcionalidades
- Autenticação de usuários via Firebase
- Integração com OpenAI para chat inteligente
- Sistema de múltiplos idiomas (EN, PT, ES, FR)
- Temas claro e escuro
- Chat com IA e entre usuários