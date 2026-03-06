export interface Task {
  id: string;
  subject: string;
  description: string;
  startDate: string;
  dueDate?: string;
  url?: string;
}

export interface ScheduleClass {
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
}

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface AlertBanner {
  message: string;
  type: 'info' | 'warning' | 'success';
}

// ─── MATERIAIS / CONTEÚDOS ───
// Estrutura de árvore para organizar materiais por matéria e aula.
//
// Cada nó pode ser:
//   - 'folder' → pasta colapsável (contém children)
//   - 'file'   → item final com link (contém url)
//
// Exemplo:
//   {
//     id: '1',
//     label: 'Inteligência Artificial',
//     type: 'folder',
//     children: [
//       { id: '1-1', label: 'Aula 01 - Introdução', type: 'file', url: 'https://...' },
//       { id: '1-2', label: 'Aula 02 - Redes Neurais', type: 'folder', children: [
//         { id: '1-2-1', label: 'Slides', type: 'file', url: 'https://...' },
//         { id: '1-2-2', label: 'Lista de exercícios', type: 'file', url: 'https://...' }
//       ]}
//     ]
//   }
export interface MaterialNode {
  id: string;
  label: string;
  type: 'folder' | 'file';
  url?: string;
  children?: MaterialNode[];
}

// ─── AVISO PRINCIPAL ───
// Usado como fallback quando não há próxima aula na grade.
// O banner é calculado automaticamente a partir da grade de horários.
// type: 'info' (azul) | 'warning' (amarelo) | 'success' (verde)
export const alertBanner: AlertBanner = {
  message: 'Aula de Inteligência Artificial com Marcelo Arantes segunda-feira às 18:30 no Lab.03 / Bloco I',
  type: 'warning'
};

// ─── RADAR DE ENTREGAS ───
// Cada tarefa aparece como um card na seção "Radar de Entregas".
//
// Campos:
//   id          → identificador único (use qualquer string, ex: '1', '2', ...)
//   subject     → nome da matéria
//   description → descrição da atividade
//   startDate   → data de início, obrigatória (formato 'YYYY-MM-DD')
//   dueDate     → prazo final, opcional (formato 'YYYY-MM-DD')
//   url         → link externo, opcional (se presente, o card fica clicável)
//
// Exemplo:
//   {
//     id: '2',
//     subject: 'Inteligência Artificial',
//     description: 'Entrega do trabalho sobre redes neurais',
//     startDate: '2026-03-10',
//     dueDate: '2026-03-20',
//     url: 'https://nead.ugb.edu.br/...'
//   }
export const upcomingTasks: Task[] = [
  {
    id: '1',
    subject: 'Elaboração de Projeto de Pesquisa',
    description: 'Aula 1 - ficha cadastral do TCC',
    startDate: '2026-02-19',
    url: 'https://nead.ugb.edu.br/mod/url/view.php?id=11201'
  }
];

// ─── GRADE DE HORÁRIOS ───
// Cada entrada representa uma faixa de horário na tabela semanal.
// O banner automático de "próxima aula" é calculado a partir desses dados.
//
// Campos:
//   time      → faixa de horário (ex: '18:30 - 19:20')
//   monday    → aula de segunda (opcional)
//   tuesday   → aula de terça (opcional)
//   wednesday → aula de quarta (opcional)
//   thursday  → aula de quinta (opcional)
//   friday    → aula de sexta (opcional)
//
// Formato de cada aula: 'Matéria | Professor | Sala'
//   - Só matéria:             'Inteligência Artificial'
//   - Matéria + sala:         'Inteligência Artificial | Lab.03 / Bloco I'
//   - Matéria + prof + sala:  'Inteligência Artificial | Marcelo Arantes | Lab.03 / Bloco I'
//   - Usar '...' para indicar continuação de aula anterior
export const schedule: ScheduleClass[] = [
  {
    time: '18:30 - 19:20',
    monday: 'Inteligência Artificial | Marcelo Arantes | Lab.03 / Bloco I',
    tuesday: 'Complexidade de Algoritmos | Marcelo Arantes | Lab.06 - 405 / Bloco IV',
    wednesday: '...',
    thursday: 'Elaboração e Projeto de Pesquisa | André Ricardo | Lab.03 / Bloco I',
    friday: 'Computação Gráfica | Fábio Gonçalves | Lab.01'
  },
  {
    time: '19:20 - 20:10',
    monday: 'Inteligência Artificial | Lab.03 / Bloco I',
    tuesday: 'Implantação e Gerência de Projetos | David Ricci | Lab.06 - 405 / Bloco IV',
    wednesday: '...',
    thursday: 'Elaboração e Projeto de Pesquisa | André Ricardo | Lab.03 / Bloco I',
    friday: 'Computação Gráfica | Lab.01'
  },
  {
    time: '20:20 - 21:10',
    monday: 'Complexidade de Algoritmos | Marcelo Arantes | Lab.03 / Bloco I',
    tuesday: 'Implantação e Gerência de Projetos | Lab.06 - 405 / Bloco IV',
    wednesday: '...',
    thursday: 'Interação Homem Computador | Matheus Silva | Lab.03 / Bloco I',
    friday: 'Computação Gráfica | Lab.01'
  },
  {
    time: '21:10 - 22:00',
    monday: 'Complexidade de Algoritmos | Lab.03 / Bloco I',
    tuesday: 'Implantação e Gerência de Projetos | Lab.06 - 405 / Bloco IV',
    wednesday: '...',
    thursday: 'Interação Homem Computador | Lab.03 / Bloco I',
    friday: 'Inteligência Artificial | Marcelo Arantes | Lab.01'
  }
];

// ─── LINKS ÚTEIS ───
// Cards de acesso rápido exibidos na seção "Links Úteis".
//
// Campos:
//   id    → identificador único
//   title → texto exibido no card
//   url   → endereço do link
export const quickLinks: QuickLink[] = [
  {
    id: '1',
    title: 'Drive da Turma',
    url: 'https://drive.google.com'
  },
  {
    id: '2',
    title: 'Portal do Aluno',
    url: 'https://portal.exemplo.edu.br'
  },
  {
    id: '3',
    title: 'Discord da Turma',
    url: 'https://discord.gg/exemplo'
  },
  {
    id: '4',
    title: 'Biblioteca Virtual',
    url: 'https://biblioteca.exemplo.edu.br'
  }
];

// ─── ÁRVORE DE MATERIAIS ───
// Dados da página "Materiais" organizados por matéria > aula > arquivo.
// Substitua os exemplos abaixo pelos links reais do Drive da turma.
export const materials: MaterialNode[] = [
  {
    id: 'ia',
    label: 'Inteligência Artificial',
    type: 'folder',
    children: [
      {
        id: 'ia-0',
        label: 'Aula 0 - Apresentação da Disciplina',
        type: 'folder',
        children: [
          { id: 'ia-0-1', label: 'Inteligência Artificial - Aula 0 - Apresentação (PPTX)', type: 'file', url: 'https://drive.google.com' }
        ]
      },
      {
        id: 'ia-1',
        label: 'Aula 1 - Introdução',
        type: 'folder',
        children: [
          { id: 'ia-1-1', label: 'Inteligência Artificial - Aula 1 - Introdução (PPTX)', type: 'file', url: 'https://drive.google.com' }
        ]
      },
      {
        id: 'ia-2',
        label: 'Aula 2 - Agentes',
        type: 'folder',
        children: [
          { id: 'ia-2-1', label: 'Inteligência Artificial - Aula 2 - Agentes (PPTX)', type: 'file', url: 'https://drive.google.com' },
          { id: 'ia-2-2', label: 'Exercício - Agente Reativo para Estação de Tratamento de Água', type: 'file', url: 'https://drive.google.com' },
          { id: 'ia-2-3', label: 'Correção do Exercício - Estação de Tratamento de Água (ETA)', type: 'file', url: 'https://drive.google.com' }
        ]
      }
    ]
  },
  {
    id: 'ca',
    label: 'Complexidade de Algoritmos',
    type: 'folder',
    children: [
      { id: 'ca-1', label: 'Aula 01 - Análise Assintótica', type: 'file', url: 'https://drive.google.com' }
    ]
  },
  {
    id: 'igp',
    label: 'Implantação e Gerência de Projetos',
    type: 'folder',
    children: []
  },
  {
    id: 'epp',
    label: 'Elaboração e Projeto de Pesquisa',
    type: 'folder',
    children: []
  },
  {
    id: 'cg',
    label: 'Computação Gráfica',
    type: 'folder',
    children: []
  },
  {
    id: 'ihc',
    label: 'Interação Homem Computador',
    type: 'folder',
    children: []
  }
];
