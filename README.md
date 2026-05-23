# 🎓 Felipe Sala Board — Sistemas de Informação · 6º Período

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Plataforma web não-oficial da turma de Sistemas de Informação (UGB/FERP) — horários, avisos, entregas e materiais em um só lugar.**

[🌐 Demo Online](https://felipe-alcantara.github.io/Felipe-Sala-Board/) • [🚀 Como Usar](#-como-usar) • [📁 Estrutura](#-estrutura-do-projeto) • [⭐ Funcionalidades](#-funcionalidades)

</div>

---

## 📋 Índice

- [🌐 **Demo Online**](#-demo-online) ⭐ **DESTAQUE**
- [📋 Sobre o Projeto](#-sobre-o-projeto)
- [🛠️ Stack](#%EF%B8%8F-stack)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⭐ Funcionalidades](#-funcionalidades)
- [🚀 Como Usar](#-como-usar)
- [📦 Adicionando Materiais](#-adicionando-materiais)
- [📝 Licença](#-licença)
- [👤 Autor](#-autor)
- [🤝 Contribuições](#-contribuições)

---

## 🌐 Demo Online ⭐

> **🚀 ACESSE A PLATAFORMA DIRETAMENTE NO NAVEGADOR**
>
> **[👉 felipe-alcantara.github.io/Felipe-Sala-Board 👈](https://felipe-alcantara.github.io/Felipe-Sala-Board/)**

### 💡 Por que usar?

- **🕒 Banner Inteligente**: mostra automaticamente qual é a próxima aula com base na grade
- **📅 Tudo no mesmo lugar**: horários, avisos, prazos e materiais centralizados
- **📲 Acesso rápido**: links diretos para Drive, Portal do Aluno, Discord e Biblioteca
- **⚙️ Sem instalação**: roda direto pelo GitHub Pages, sem login

---

## 📋 Sobre o Projeto

Plataforma **web leve, não-oficial e open-source** para a turma de **Sistemas de Informação — 6º Período (UGB/FERP)**. Centraliza horários, avisos automáticos de próxima aula, radar de entregas, materiais de aula e links úteis em uma única interface.

A aplicação é **client-side**, sem backend: os dados ficam em `mockData.ts` e podem ser editados localmente via página de **Gestão** (salvos no `localStorage`). Os materiais ficam hospedados como assets em **GitHub Releases**.

### ✨ **NOVO: Página de Gestão!**
- 📅 Calendário interativo com eventos da turma
- ✅ Marcação de status pessoal para cada evento
- 📝 Visualização consolidada de avisos e trabalhos

---

## 🛠️ Stack

### Frontend

| Tecnologia | Uso |
|------------|-----|
| **React 18** | Interface |
| **TypeScript** | Tipagem forte |
| **Tailwind CSS 3** | Estilização utilitária |
| **Framer Motion** | Animações |
| **Vite 5** | Build & dev server |

### Infraestrutura

| Ferramenta | Uso |
|------------|-----|
| **GitHub Pages** | Hospedagem |
| **GitHub Releases** | Hospedagem dos arquivos de aula |
| **GitHub Actions** | CI/CD (deploy automático no push) |
| **Vitest + Testing Library** | Testes unitários |

---

## 📁 Estrutura do Projeto

```
Felipe-Sala-Board/
│
├── 📁 src/                      # Código-fonte
│   ├── 📁 components/           # Componentes reutilizáveis
│   │   ├── AlertBanner.tsx      # Banner de próxima aula
│   │   ├── Schedule.tsx         # Grade de horários
│   │   ├── UpcomingTasks.tsx    # Radar de entregas
│   │   ├── MaterialTree.tsx     # Árvore de materiais
│   │   ├── QuickLinks.tsx       # Links úteis
│   │   ├── Header.tsx           # Cabeçalho com navegação
│   │   └── Footer.tsx           # Rodapé
│   ├── 📁 pages/                # Páginas da aplicação
│   │   ├── HomePage.tsx         # Painel principal
│   │   ├── GestaoPage.tsx       # Gestão (calendário + tarefas)
│   │   ├── MaterialsPage.tsx    # Materiais de aula
│   │   └── admin/AdminPage.tsx  # Editor de dados (localStorage)
│   ├── 📁 data/
│   │   └── mockData.ts          # Horários, tarefas, materiais, links
│   ├── 📁 utils/
│   │   └── scheduleAlert.ts     # Lógica do banner automático
│   ├── 📁 mocks/                # Mocks para testes
│   ├── App.tsx                  # Navegação SPA
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globais + sistema Felixo
│
├── 📁 felixo-standards/         # Padrões de design (referência)
├── 📁 .github/                  # CI/CD (GitHub Actions)
├── IA.md                        # Contexto operacional para IA
├── README.md                    # Este arquivo
└── LICENSE
```

---

## ⭐ Funcionalidades

### 🔔 Banner Automático de Próxima Aula
Calcula em tempo real qual é a próxima aula com base no horário atual e na grade configurada, exibindo matéria, professor e sala.

### 📅 Grade de Horários
Tabela semanal completa (segunda a sexta, 18:30–22:00) com **código de cores por sala/laboratório** para identificação visual rápida.

### 🎯 Radar de Entregas
Cards com prazos, datas de início e links diretos para atividades pendentes da turma.

### 📚 Materiais de Aula
Árvore colapsável por **matéria → aula → arquivo**, com download direto via GitHub Releases.

### 🗂️ Página de Gestão
Calendário mensal com eventos, controle de status pessoal por evento (concluído / pendente) e listagem de avisos e trabalhos.

### 🔗 Links Úteis
Acesso rápido a Drive, Portal do Aluno, Discord da turma e Biblioteca Virtual.

---

## 🚀 Como Usar

### Opção 1: Acesso direto (Recomendado!) 🌐

**🚀 Link direto:** [felipe-alcantara.github.io/Felipe-Sala-Board](https://felipe-alcantara.github.io/Felipe-Sala-Board/)

Sem instalação, sem login. Funciona em qualquer navegador moderno.

### Opção 2: Rodar localmente (Desenvolvedores)

#### Instalação

```bash
# Clone o repositório
git clone https://github.com/Felipe-Alcantara/Felipe-Sala-Board.git

# Entre na pasta
cd Felipe-Sala-Board

# Instale dependências
npm install
```

#### Executando

```bash
# Inicia o dev server em http://localhost:5173
npm run dev

# Build de produção (gera /dist)
npm run build

# Pré-visualiza o build de produção
npm run preview

# Roda os testes
npm test
```

---

## 📦 Adicionando Materiais

1. **Faça upload** do arquivo na release `materiais`:
   ```bash
   gh release upload materiais "arquivo.pptx" \
     --repo Felipe-Alcantara/Felipe-Sala-Board --clobber
   ```

2. **Adicione a entrada** correspondente em [src/data/mockData.ts](src/data/mockData.ts) na árvore de materiais

3. **Commit e push** — o deploy via GitHub Actions é automático

---

## ⚠️ Limitações

- **Sem backend**: dados são estáticos (definidos em `mockData.ts`) ou locais (`localStorage` via página de Gestão)
- **Sem sincronização entre dispositivos**: edições na Gestão ficam apenas no navegador atual
- **Projeto não-oficial**: feito por aluno, sem vínculo institucional com a UGB/FERP

---

## 📝 Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE).

## 👤 Autor

**Felipe Martin**
- GitHub: [@Felipe-Alcantara](https://github.com/Felipe-Alcantara)
- Repositório: [Felipe-Sala-Board](https://github.com/Felipe-Alcantara/Felipe-Sala-Board)

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades
- 📖 Melhorar a documentação
- 🎨 Propor melhorias visuais

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!
