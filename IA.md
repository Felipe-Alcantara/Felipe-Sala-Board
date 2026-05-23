# 🤖 IA.md — Contexto Operacional do Felipe Sala Board

> **O que é**: Memória técnica viva deste projeto, mantida para permitir que qualquer IA (ou nova sessão) retome contexto sem reler todo o código ou o histórico completo da conversa.
>
> **Padrão de origem**: [felixo-standards/IA.md](felixo-standards/IA.md) (Felixo System Design).
>
> **Regra fundamental**: registre decisões, bugs, testes e integrações **aqui**, não espalhados em vários lugares. Atualize sempre que algo relevante mudar.

---

## 🎯 OBJETIVO DO PROJETO

[2026-05-23] Plataforma web **não-oficial e open-source** para a turma de **Sistemas de Informação — 6º Período (UGB/FERP)**. Centraliza horários, avisos de próxima aula, radar de entregas, materiais de aula e links úteis em uma única interface client-side.

- **Público**: alunos da turma (uso interno, sem login)
- **Hospedagem**: GitHub Pages (gratuita, deploy automático)
- **Prioridade**: simplicidade > escalabilidade. Sem backend.

---

## 🏁 METAS & MILESTONES

- [2026-05-23] ✅ Banner automático de próxima aula
- [2026-05-23] ✅ Grade de horários com código de cores por sala
- [2026-05-23] ✅ Radar de entregas (tarefas com prazo)
- [2026-05-23] ✅ Página de Materiais com árvore colapsável
- [2026-05-23] ✅ Quick Links (Drive, Portal, Discord, Biblioteca)
- [2026-05-23] ✅ Página de Gestão com calendário e tarefas futuras
- [2026-05-23] ✅ Suporte a testes com Vitest + Testing Library
- [2026-05-23] 🔄 Adequação aos padrões `felixo-standards/`
  - ✅ README.md no padrão Felixo
  - 🔄 IA.md preenchido (este arquivo)
  - ⬜ Sistema completo de glow (`index.css`)
  - ⬜ Glow de marca no Header
  - ⬜ `BackgroundParticles`
  - ⬜ Componentes UI base (`Button`, `Card`, `Badge`)

---

## 🛠️ STACK & DEPENDÊNCIAS

[2026-05-23] **Frontend**
- React 18.3 + TypeScript 5.4
- Tailwind CSS 3.4 + PostCSS + Autoprefixer
- Vite 5.2 (build & dev server)
- Framer Motion 12 (animações)
- lucide-react 0.577 (ícones)

[2026-05-23] **Testes**
- Vitest 1.6 + jsdom 24
- @testing-library/react 16
- @testing-library/jest-dom 6.4

[2026-05-23] **Infra**
- GitHub Pages para hospedagem
- GitHub Releases para arquivos de materiais (`gh release upload materiais`)
- GitHub Actions para deploy automático
- `gh-pages` para deploy manual via `npm run deploy`

---

## 📐 DECISÕES DE ARQUITETURA

- [2026-05-23] **SPA sem router** — Navegação via `useState` em [src/App.tsx](src/App.tsx). Motivo: 3 páginas só, não justifica `react-router`.
- [2026-05-23] **Sem backend** — Dados estáticos em [src/data/mockData.ts](src/data/mockData.ts). Edição local via `localStorage` na página de Gestão. Motivo: hospedagem GitHub Pages, escopo pequeno.
- [2026-05-23] **Materiais em GitHub Releases** — Em vez de versionar binários no repo. Motivo: mantém o repo leve e usa o GitHub como CDN.
- [2026-05-23] **localStorage para edição** — Página `admin/AdminPage.tsx` e `GestaoPage.tsx` persistem mudanças no navegador do usuário. Motivo: sem backend, sem custo, mas sem sincronização entre dispositivos (limitação conhecida).
- [2026-05-23] **Tailwind sem `@apply` para utilitários do projeto** — Classes utilitárias do design Felixo ficam como CSS puro em `index.css` (`.felixo-card-glow`, etc.). Motivo: alinhamento com o padrão Felixo.

---

## 🎨 DECISÕES DE DESIGN & CONVENÇÕES

- [2026-05-23] **Stack visual segue [felixo-standards/PADRÕES DE DESIGN/DESIGN_SYSTEM_PARA_FRONTEND.md](felixo-standards/PADRÕES%20DE%20DESIGN/DESIGN_SYSTEM_PARA_FRONTEND.md)** — Paleta Felixo Purple (`#C084FC` / `#A855F7`), fundo `from-black via-zinc-950 to-black`, fonte Space Grotesk.
- [2026-05-23] **Nomenclatura de arquivos: PascalCase para componentes** (`AlertBanner.tsx`) — diverge do guia (`kebab-case`), mas segue a convenção React/TS dominante. Decisão consciente.
- [2026-05-23] **Container principal**: `max-w-7xl mx-auto px-6`.
- [2026-05-23] **Border radius**: `rounded-3xl` para cards grandes, `rounded-2xl` para cards menores, `rounded-xl` para inputs/botões pequenos.
- [2026-05-23] **README e textos da UI em português**; código (variáveis, funções) em inglês.
- [2026-05-23] **Commits**: estilo Conventional Commits em português (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`).

---

## 🧪 TESTES IMPORTANTES

- [2026-05-23] **`src/pages/GestaoPage.test.tsx`** — cobre renderização do calendário, listagem de eventos e marcação de status no `localStorage`.
- [2026-05-23] Comando: `npm test` (Vitest com jsdom).
- [2026-05-23] Mock de `localStorage` em [src/mocks/localStorage.ts](src/mocks/localStorage.ts).

---

## 🐛 BUGS & FIXES RELEVANTES

_Sem bugs relevantes registrados até o momento. Atualizar conforme aparecerem._

---

## 🔗 INTEGRAÇÕES & SERVIÇOS EXTERNOS

- [2026-05-23] **GitHub Releases (`materiais`)** — Hospeda os arquivos de aula (PPTX, PDF). URLs são construídas em `mockData.ts`. Upload via `gh release upload materiais "arquivo" --repo Felipe-Alcantara/Felipe-Sala-Board --clobber`.
- [2026-05-23] **GitHub Pages** — Deploy automático via `.github/workflows/` no push para `main`. Base path configurado no `vite.config.ts`.
- [2026-05-23] **Google Fonts (Space Grotesk)** — Importada via `@import url(...)` em `src/index.css`.

---

## 📝 NOTAS GERAIS

- [2026-05-23] Repo contém pasta `felixo-standards/` versionada como referência local dos padrões. Não é submódulo — é cópia sincronizada via método 1 do README do padrão.
- [2026-05-23] Página `admin/AdminPage.tsx` não tem proteção — quem souber a URL acessa. OK porque tudo é client-side e fica só no `localStorage` do usuário.
- [2026-05-23] **Limitação ativa**: edições no admin/gestão não sincronizam entre dispositivos. Aceitável pelo escopo.

---

## 🧠 CHAIN OF THOUGHT

_Registrar aqui raciocínios complexos, debug difícil ou decisões que envolvam múltiplos caminhos._

---

> **Assinatura**
> Mantido por **Felipe Martin** ([@Felipe-Alcantara](https://github.com/Felipe-Alcantara)).
> Baseado no template de [felixo-standards/IA.md](felixo-standards/IA.md).
