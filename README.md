# Felipe Sala Board — Turma de Sistemas de Informação · 6º Período

Plataforma web leve e não-oficial para a turma de **Sistemas de Informação — 6º Período (UGB/FERP)**. Centraliza horários, avisos automáticos de próxima aula, radar de entregas, materiais de aula e links úteis.

> **Acesse**: [felipe-alcantara.github.io/Felipe-Sala-Board](https://felipe-alcantara.github.io/Felipe-Sala-Board/)

---

## Funcionalidades

- **Banner automático** — exibe a próxima aula com matéria, professor e sala, calculado a partir da grade de horários
- **Grade de horários** — tabela semanal completa (seg–sex, 18:30–22:00)
- **Radar de entregas** — cards com prazos e links para atividades pendentes
- **Materiais de aula** — árvore colapsável por matéria > aula > arquivo (download direto via GitHub Releases)
- **Links úteis** — acesso rápido ao Drive, Portal do Aluno, Discord e Biblioteca Virtual

## Stack

| Tecnologia | Uso |
|---|---|
| React 18 + TypeScript | Interface |
| Tailwind CSS 3 | Estilização |
| Vite 5 | Build & dev server |
| GitHub Pages | Hospedagem |
| GitHub Releases | Hospedagem dos arquivos de aula |
| GitHub Actions | CI/CD (deploy automático no push) |

## Desenvolvimento

```bash
npm install     # instalar dependências
npm run dev     # iniciar dev server
npm run build   # build de produção
```

## Estrutura

```
src/
├── App.tsx                  # Navegação entre páginas (SPA sem router)
├── components/              # Componentes reutilizáveis
│   ├── AlertBanner.tsx      # Banner de próxima aula
│   ├── Schedule.tsx         # Grade de horários
│   ├── UpcomingTasks.tsx    # Radar de entregas
│   ├── MaterialTree.tsx     # Árvore de materiais
│   ├── QuickLinks.tsx       # Links úteis
│   ├── Header.tsx           # Cabeçalho com navegação
│   └── Footer.tsx           # Rodapé
├── data/
│   └── mockData.ts          # Dados (horários, tarefas, materiais, links)
├── pages/
│   ├── HomePage.tsx         # Página principal
│   ├── MaterialsPage.tsx    # Página de materiais
│   └── admin/AdminPage.tsx  # Editor de dados (localStorage)
└── utils/
    └── scheduleAlert.ts     # Lógica do banner automático
```

## Adicionando materiais

1. Faça upload na release `materiais`:
   ```bash
   gh release upload materiais "arquivo.pptx" --repo Felipe-Alcantara/Felipe-Sala-Board --clobber
   ```
2. Adicione a entrada em `src/data/mockData.ts` na árvore de materiais correspondente
3. Commit e push — o deploy é automático

## Licença

MIT