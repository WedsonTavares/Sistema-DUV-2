# Frontend - Sistema de Gerenciamento de DUVs

## 🎯 Visão Geral

Interface web moderna e responsiva para o sistema de gerenciamento de **Documentos Únicos Virtuais (DUVs)** de viagens marítimas, desenvolvida para o processo seletivo da Seals Solutions 2025.

Aplicação **React/TypeScript** com **styled-components** e design system personalizado, oferecendo uma experiência visual elegante e funcional para gestão de navios, pessoas e documentos de viagem.

## 🏗️ Arquitetura Frontend

### Stack Tecnológica
- **React 18** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **styled-components** - CSS-in-JS para estilização
- **React Router** - Navegação entre páginas
- **Radix UI** - Componentes primitivos acessíveis
- **Framer Motion** - Animações fluidas
- **Class Variance Authority** - Utilitário para variantes de componentes

### Arquitetura de Componentes
```
src/
├── components/          # Componentes reutilizáveis
│   ├── DUVList.tsx     # Lista de DUVs com cards
│   ├── DUVDetail.tsx   # Detalhes de um DUV específico
│   ├── NavioList.tsx   # Lista de navios com imagens
│   ├── PessoaList.tsx  # Lista de pessoas (passageiros/tripulantes)
│   └── *.styled.ts     # Styled components específicos
├── pages/              # Páginas da aplicação
│   ├── DUVListPage.tsx    # Página inicial - Dashboard
│   ├── DUVDetailPage.tsx  # Detalhes do DUV
│   ├── NavioListPage.tsx  # Listagem de navios
│   └── PessoaListPage.tsx # Listagem de pessoas
├── services/           # Comunicação com API
│   └── api.ts          # Cliente HTTP para backend
├── styles/             # Sistema de design
│   ├── theme.ts        # Tokens de design marítimo
│   ├── GlobalStyle.ts  # Estilos globais
│   ├── components.ts   # Componentes base
│   └── PageStyles.styled.ts # Estilos de páginas
├── types/              # Definições TypeScript
│   └── index.ts        # Interfaces principais
└── styled.d.ts         # Extensão de tipos do styled-components
```

## 🎨 Design System

### Paleta de Cores Marítima
```typescript
const colors = {
  // Cores primárias marítimas
  primary: {
    50: '#e6f3ff',   // Azul oceano claro
    100: '#b3d9ff',
    500: '#0066cc',  // Azul oceano principal
    600: '#0052a3',
    900: '#003366'   // Azul oceano escuro
  },
  
  // Cores secundárias náuticas
  secondary: {
    50: '#f0f9ff',   // Azul céu claro
    100: '#e0f2fe',
    500: '#0ea5e9',  // Azul céu
    600: '#0284c7',
    900: '#0c4a6e'   // Azul céu escuro
  },
  
  // Status e feedback
  success: '#10b981',  // Verde marítimo
  warning: '#f59e0b',  // Âmbar
  error: '#ef4444',    // Vermelho coral
  
  // Tons neutros
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    500: '#6b7280',
    700: '#374151',
    900: '#111827'
  }
}
```

### Tipografia
- **Família**: Inter (sistema), sans-serif
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Escala**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px

### Espaçamento e Layout
- **Grid**: Sistema flexível baseado em CSS Grid
- **Breakpoints**: Mobile-first (320px, 768px, 1024px, 1280px)
- **Espaçamento**: Escala de 4px (4, 8, 12, 16, 24, 32, 48, 64px)

## 🧩 Componentes Principais

### DUVList - Dashboard Principal
- **Função**: Exibe cards com todos os DUVs cadastrados
- **Recursos**: 
  - Cards responsivos com informações do DUV
  - Imagem do navio de cruzeiro
  - Data da viagem formatada
  - Navegação para detalhes
  - Loading states e error handling

### DUVDetail - Detalhes do Documento
- **Função**: Mostra informações completas de um DUV
- **Recursos**:
  - Dados do navio associado
  - Lista de passageiros e tripulantes
  - Separação visual clara entre tipos de pessoa
  - Fotos dos passageiros quando disponíveis
  - Indicadores visuais para tripulantes (SID)

### NavioList - Catálogo de Navios
- **Função**: Lista todos os navios disponíveis
- **Recursos**:
  - Cards com imagens dos navios
  - Informações de bandeira e especificações
  - Design responsivo em grid
  - Placeholders para imagens não disponíveis

### PessoaList - Gestão de Pessoas
- **Função**: Lista passageiros e tripulantes
- **Recursos**:
  - Separação visual entre passageiros e tripulação
  - Fotos de perfil quando disponíveis
  - Badges para identificação de tripulantes (SID)
  - Filtros por tipo de pessoa

## 📱 Responsividade

### Abordagem Mobile-First
```css
/* Mobile (320px+) */
.container {
  padding: 16px;
  grid-template-columns: 1fr;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Características Responsivas
- **Grid fluido**: Adapta número de colunas por tela
- **Tipografia escalável**: Tamanhos ajustados por breakpoint
- **Imagens responsivas**: Aspect ratio mantido em todos os tamanhos
- **Touch-friendly**: Botões e áreas de toque adequadas para mobile

## 🚀 Performance e Otimização

### Técnicas Implementadas
- **Code Splitting**: Lazy loading de páginas
- **Otimização de imagens**: Aspect ratio e loading lazy
- **Memoização**: React.memo em componentes custosos
- **Bundle optimization**: Tree shaking automático
- **CSS-in-JS otimizado**: styled-components com SSR ready

### Métricas de Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.0s

## 🔧 Scripts Disponíveis

### Desenvolvimento
```bash
npm start          # Inicia servidor de desenvolvimento (porta 3000)
npm run dev        # Alias para npm start
```

### Build e Deploy
```bash
npm run build      # Build otimizado para produção
npm run preview    # Preview do build local
```

### Qualidade de Código
```bash
npm run lint       # ESLint para verificação de código
npm run lint:fix   # Correção automática de problemas
npm run type-check # Verificação de tipos TypeScript
```

### Testes
```bash
npm test           # Executa testes em modo watch
npm run test:ci    # Executa testes para CI/CD
npm run test:coverage # Gera relatório de cobertura
```

## 📦 Dependências Principais

### Runtime Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "styled-components": "^6.1.8",
  "framer-motion": "^10.16.16",
  "@radix-ui/react-slot": "^1.0.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0"
}
```

### Development Dependencies
```json
{
  "typescript": "^4.9.5",
  "@types/react": "^18.2.43",
  "@types/react-dom": "^18.2.17",
  "@types/styled-components": "^5.1.34",
  "eslint": "^8.54.0",
  "prettier": "^3.1.0"
}
```

## 🌊 Decisões Técnicas

### Migração do TailwindCSS para styled-components
**Motivação**: Melhor integração com TypeScript, tema centralizado, e melhor performance em runtime.

**Benefícios**:
- Tipagem completa do tema
- CSS-in-JS com melhor tree-shaking
- Componentes auto-documentados
- Melhor experiência do desenvolvedor

### Design System Marítimo
**Inspiração**: Elementos visuais relacionados ao mar, navegação e viagens marítimas.

**Características**:
- Paleta de azuis oceânicos
- Iconografia náutica
- Espaçamentos harmoniosos
- Tipografia clara e legível

### Arquitetura de Componentes
**Padrão**: Composição sobre herança, com separação clara entre lógica e apresentação.

**Estrutura**:
- Componentes de apresentação (dumb components)
- Hooks customizados para lógica
- Styled components para estilização
- Types dedicados para cada domínio

## 🎯 Funcionalidades Implementadas

### ✅ Dashboard de DUVs
- Listagem de todos os documentos
- Cards visuais com informações-chave
- Imagens dos navios de cruzeiro
- Navegação intuitiva

### ✅ Detalhamento de DUV
- Informações completas do documento
- Dados do navio associado
- Lista de passageiros e tripulantes
- Separação visual clara por tipo

### ✅ Gestão de Navios
- Catálogo visual com imagens
- Informações de bandeira
- Grid responsivo

### ✅ Gestão de Pessoas
- Lista de passageiros e tripulantes
- Fotos de perfil
- Identificação visual de tripulantes
- Badges informativos

## 🚀 Próximos Passos

### Melhorias Planejadas
- [ ] Implementar busca e filtros avançados
- [ ] Adicionar paginação para listas grandes
- [ ] Implementar tema escuro/claro
- [ ] Adicionar testes unitários e de integração
- [ ] Implementar PWA (Progressive Web App)
- [ ] Adicionar internacionalização (i18n)

### Funcionalidades Futuras
- [ ] Dashboard com métricas e gráficos
- [ ] Exportação de relatórios em PDF
- [ ] Notificações em tempo real
- [ ] Gestão de usuários e permissões
- [ ] API de integração com sistemas externos

## 🔍 Estrutura de Dados

### Interfaces TypeScript
```typescript
interface DUV {
  id: string;
  numero: string;
  data_viagem: string;
  navio_id: string;
  pessoas?: Pessoa[];
}

interface Navio {
  id: string;
  nome: string;
  bandeira: string;
  imagem?: string;
}

interface Pessoa {
  id: string;
  nome: string;
  tipo: 'passageiro' | 'tripulante';
  documento: string;
  sid?: string;
  foto?: string;
}
```

## 📖 Documentação de Componentes

### Exemplo de Uso - DUVList
```tsx
import { DUVList } from './components/DUVList';

function DashboardPage() {
  return (
    <Container>
      <Title>Documentos Únicos Virtuais</Title>
      <DUVList 
        duvs={duvs}
        onDUVClick={handleDUVClick}
        loading={loading}
        error={error}
      />
    </Container>
  );
}
```

### Exemplo de Tema
```tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Suas rotas aqui */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
```

---

**Desenvolvido com 💙 para o processo seletivo Seals Solutions 2025**

*Sistema de gerenciamento marítimo moderno, responsivo e intuitivo.*
