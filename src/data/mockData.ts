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

export interface WorkGroup {
  id: string;
  name: string;
  members: string[];
  files?: { name: string; url: string }[];
}

export interface Work {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate?: string;
  groups?: WorkGroup[];
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'urgent';
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
          { id: 'ia-0-1', label: 'Inteligência Artificial - Aula 0 - Apresentação (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Inteligencia.Artificial.-.Aula.0.-.Apresentacao.pptx' }
        ]
      },
      {
        id: 'ia-1',
        label: 'Aula 1 - Introdução',
        type: 'folder',
        children: [
          { id: 'ia-1-1', label: 'Inteligência Artificial - Aula 1 - Introdução (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Inteligencia.Artificial.-.Aula.1.-.Introducao.pptx' }
        ]
      },
      {
        id: 'ia-2',
        label: 'Aula 2 - Agentes',
        type: 'folder',
        children: [
          { id: 'ia-2-1', label: 'Inteligência Artificial - Aula 2 - Agentes (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Inteligencia.Artificial.-.Aula.2.-.Agentes.pptx' },
          { id: 'ia-2-2', label: 'Exercício - Agente Reativo para Estação de Tratamento de Água', type: 'file', url: 'https://colab.research.google.com/drive/1IZA_0sQoJSvZsxtcNYE3OF-x-wM77sID?usp=sharing' },
          { id: 'ia-2-3', label: 'Correção do Exercício - Estação de Tratamento de Água (ETA)', type: 'file', url: 'https://colab.research.google.com/drive/1v3bh8jGmrW5DB6GadFEVHTUiPy9HO6F_?usp=sharing' }
        ]
      },
      {
        id: 'ia-3',
        label: 'Aula 3 - Métodos de Busca - Desinformados',
        type: 'folder',
        children: [
          { id: 'ia-3-1', label: 'Inteligência Artificial - Aula 3 - Métodos Desinformados (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Inteligencia.Artificial.-.Aula.3.-.Metodos.Desinformados.-.2026.1.pptx' },
          { id: 'ia-3-2', label: 'Mapa da Romênia (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Mapa.da.Romenia.pptx' },
          { id: 'ia-3-3', label: 'Quiz - Métodos de Busca - Desinformadas', type: 'file', url: 'https://forms.gle/GyMTzuesXv9fDec4A' }
        ]
      },
      {
        id: 'ia-4',
        label: 'Aula 4 - Métodos de Busca - Informados',
        type: 'folder',
        children: [
          { id: 'ia-4-1', label: 'Inteligência Artificial - Aula 4 - Métodos Informados (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Inteligencia.Artificial.-.Aula.4.-.Metodos.Informados.-.2026.1.pptx' },
          { id: 'ia-4-2', label: 'Quiz - Busca Informada', type: 'file', url: 'https://gemini.google.com/share/f3e3b48afeeb' }
        ]
      }
    ]
  },
  {
    id: 'ca',
    label: 'Complexidade de Algoritmos',
    type: 'folder',
    children: [
      {
        id: 'ca-0',
        label: 'Aula 0 - Apresentação',
        type: 'folder',
        children: [
          { id: 'ca-0-1', label: 'Complexidade de Algoritmos - Aula 0 - Apresentação (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Complexidade.de.Algoritmos.-.Aula.0.-.Apresentacao.pptx' }
        ]
      },
      {
        id: 'ca-1',
        label: 'Aula 1 - Introdução',
        type: 'folder',
        children: [
          { id: 'ca-1-1', label: 'Complexidade de Algoritmos - Aula 1 - Introdução (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Complexidade.de.Algoritmos.-.Aula.1.-.Introducao.pptx' },
          { id: 'ca-1-2', label: 'Exercício de Fixação - Aula 1', type: 'file', url: 'https://gemini.google.com/share/6f58102d2638' }
        ]
      },
      {
        id: 'ca-2',
        label: 'Aula 2 - Complexidade Exata',
        type: 'folder',
        children: [
          { id: 'ca-2-1', label: 'Complexidade de Algoritmos - Aula 2 - Complexidade Exata (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Complexidade.de.Algoritmos.-.Aula.2.-.Complexidade.Exata.pptx' },
          { id: 'ca-2-2', label: 'Correção - Exercícios (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Correcao.-.Exercicios.pptx' }
        ]
      },
      {
        id: 'ca-3',
        label: 'Aula 3 - Medidas de Complexidade',
        type: 'folder',
        children: [
          { id: 'ca-3-1', label: 'Complexidade de Algoritmos - Aula 3 - Medidas de Complexidade (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Complexidade.de.Algoritmos.-.Aula.3.-.Medidas.de.Complexidade.pptx' },
          { id: 'ca-3-2', label: 'Quiz - Medidas de Complexidade', type: 'file', url: 'https://forms.gle/HjVA1VPzoYAWodAz7' }
        ]
      },
      {
        id: 'ca-4',
        label: 'Aula 4 - Comportamento Assintótico',
        type: 'folder',
        children: [
          { id: 'ca-4-1', label: 'Complexidade de Algoritmos - Aula 4 - Comportamento Assintótico (PPTX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Complexidade.de.Algoritmos.-.Aula.4.-.Comportamento.Assintotico.pptx' },
          { id: 'ca-4-2', label: 'Quiz - Comportamento Assintótico', type: 'file', url: 'https://gemini.google.com/share/f7da04cec6cb' }
        ]
      }
    ]
  },
  {
    id: 'cg',
    label: 'Computação Gráfica',
    type: 'folder',
    children: [
      {
        id: 'cg-1',
        label: 'Aula 01 - Apresentação da Disciplina',
        type: 'folder',
        children: [
          { id: 'cg-1-1', label: 'Computação Gráfica - Apresentação (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Computacao_Grafica.pdf' }
        ]
      },
      {
        id: 'cg-2',
        label: 'Aula 02 - Fundamentos da Computação Gráfica',
        type: 'folder',
        children: [
          { id: 'cg-2-1', label: 'Computação Gráfica - Aula 02 - Ajustado (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Computacao.Grafica.-.Aula02.-.Ajustado.pdf' },
          { id: 'cg-2-2', label: 'Atividade Complementar para AV1', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Atividade.Complementar.para.AV1.md' }
        ]
      },
      {
        id: 'cg-3',
        label: 'Aula 03 - Desenhando Primitivas',
        type: 'folder',
        children: [
          { id: 'cg-3-1', label: 'Conteúdo Aula 01 (ZIP)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Conteudo_Aula_01.zip' },
          { id: 'cg-3-2', label: 'Exercício 01 (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Exercicio01.pdf' }
        ]
      }
    ]
  },
  {
    id: 'epp',
    label: 'Elaboração de Projeto de Pesquisa',
    type: 'folder',
    children: [
      {
        id: 'epp-0',
        label: 'Aula 0 - Apresentação da Disciplina',
        type: 'folder',
        children: [
          { id: 'epp-0-1', label: 'Aula 0 - Ementa TCC (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/aula0_ementa_tcc.pdf' }
        ]
      },
      {
        id: 'epp-1',
        label: 'Aula 1 - Ficha Cadastral',
        type: 'folder',
        children: [
          { id: 'epp-1-1', label: 'Ficha de Cadastro do TCC', type: 'file', url: 'https://forms.office.com/pages/responsepage.aspx?id=eiYNkPCb-k6n6_152SwYqL9OcXKqlZhNi1Ai7n3CthVUMTZJSTcxV1RBU0VMNjVEWENERzVXSTVGTC4u&route=shorturl' }
        ]
      },
      {
        id: 'epp-2',
        label: 'Aula 2 - Estrutura do Artigo',
        type: 'folder',
        children: [
          { id: 'epp-2-1', label: 'Aula 2 - EPP (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/aula2_epp.pdf' },
          { id: 'epp-2-2', label: 'Termo de Autorização para Divulgação de Informações de Empresas (DOCX)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/TERMO.DE.AUTORIZACAO.PARA.DIVULGACAO.DE.INFORMACOES.DE.EMPRESAS.docx' }
        ]
      },
      {
        id: 'epp-3',
        label: 'Aula 3 - Título',
        type: 'folder',
        children: [
          { id: 'epp-3-1', label: 'Aula 3 - EPP (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/aula3_epp.pdf' }
        ]
      }
    ]
  },
  {
    id: 'igp',
    label: 'Implantação e Gestão de Projetos',
    type: 'folder',
    children: [
      {
        id: 'igp-1',
        label: 'Aula 01',
        type: 'folder',
        children: [
          { id: 'igp-1-1', label: 'Unidade I - Introdução (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Unidade.I.-.Introducao.pdf' }
        ]
      },
      {
        id: 'igp-2',
        label: 'Aula 02 - 10/03/2026',
        type: 'folder',
        children: [
          { id: 'igp-2-1', label: 'Gestão de Projetos (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/1.GESTAO.DE.PROJETOS.pdf' },
          { id: 'igp-2-2', label: 'Análise SWOT (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/ME_Analise-Swot.pdf' },
          { id: 'igp-2-3', label: 'Análise SWOT - O que é, para que serve, benefícios e como fazer', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Analise.SWOT.o.que.e.para.que.serve.beneficios.e.como.fazer.md' },
          { id: 'igp-2-4', label: 'Tabela SWOT (FOFA)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/Tabela.SWOT.FOFA.md' }
        ]
      }
    ]
  },
  {
    id: 'ihc',
    label: 'Interação Homem-Computador',
    type: 'folder',
    children: [
      {
        id: 'ihc-1',
        label: 'Aula 01 - Apresentação',
        type: 'folder',
        children: [
          { id: 'ihc-1-1', label: 'IHC - Apresentação (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/1.AULA.IHC.APRESENTACAO.pdf' }
        ]
      },
      {
        id: 'ihc-2',
        label: 'Aula 02 - Introdução',
        type: 'folder',
        children: [
          { id: 'ihc-2-1', label: 'IHC - Introdução (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/2.AULA.IHC.INTRODUCAO.pdf' }
        ]
      },
      {
        id: 'ihc-3',
        label: 'Aula 03 - Histórico',
        type: 'folder',
        children: [
          { id: 'ihc-3-1', label: 'IHC - Histórico (PDF)', type: 'file', url: 'https://github.com/Felipe-Alcantara/Felipe-Sala-Board/releases/download/materiais/3.AULA.IHC.HISTORICO.pdf' }
        ]
      }
    ]
  }
];

// ─── TRABALHOS E GRUPOS ───
export const works: Work[] = [
  {
    id: '1',
    subject: 'Inteligência Artificial',
    title: 'Trabalho sobre Redes Neurais',
    description: 'Implementação de uma rede neural simples',
    dueDate: '2026-04-15',
    groups: [
      {
        id: '1-1',
        name: 'Grupo 1',
        members: ['João Silva', 'Maria Santos'],
        files: [
          { name: 'Proposta.pdf', url: 'https://exemplo.com/proposta.pdf' }
        ]
      },
      {
        id: '1-2',
        name: 'Grupo 2',
        members: ['Pedro Costa', 'Ana Lima'],
        files: []
      }
    ]
  }
];

// ─── AVISOS ───
export const notices: Notice[] = [
  {
    id: '1',
    title: 'Prova de IA adiada',
    content: 'A prova de Inteligência Artificial foi adiada para 20/04',
    date: '2026-03-15',
    type: 'warning'
  }
];
