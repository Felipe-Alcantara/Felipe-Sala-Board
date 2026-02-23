export interface Task {
  id: string;
  subject: string;
  description: string;
  dueDate: string;
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

export const alertBanner: AlertBanner = {
  message: 'Prova de Cálculo II na próxima sexta-feira (14/06) - Estudar limites e derivadas',
  type: 'warning'
};

export const upcomingTasks: Task[] = [
  {
    id: '1',
    subject: 'Programação Web',
    description: 'Projeto final - Sistema de gerenciamento',
    dueDate: '2024-06-10'
  },
  {
    id: '2',
    subject: 'Banco de Dados',
    description: 'Lista de exercícios sobre normalização',
    dueDate: '2024-06-12'
  },
  {
    id: '3',
    subject: 'Engenharia de Software',
    description: 'Documentação de requisitos do projeto',
    dueDate: '2024-06-15'
  }
];

export const schedule: ScheduleClass[] = [
  {
    time: '18:30 - 19:20',
    monday: 'Inteligência Artificial | Marcelo Arantes | Lab.03 / Bloco I',
    tuesday: 'Complexidade de Algoritmos | Marcelo Arantes | Lab.06 - 405 / Bloco IV',
    wednesday: 'Computação Gráfica | Fábio Gonçalves | Lab.01',
    thursday: 'Elaboração e Projeto de Pesquisa | André Ricardo | Lab.03 / Bloco I',
    friday: '...'
  },
  {
    time: '19:20 - 20:10',
    monday: 'Inteligência Artificial | Lab.03 / Bloco I',
    tuesday: 'Implantação e Gerência de Projetos | David Ricci | Lab.06 - 405 / Bloco IV',
    wednesday: 'Computação Gráfica | Lab.01',
    thursday: 'Elaboração e Projeto de Pesquisa | André Ricardo | Lab.03 / Bloco I',
    friday: '...'
  },
  {
    time: '20:20 - 21:10',
    monday: 'Complexidade de Algoritmos | Marcelo Arantes | Lab.03 / Bloco I',
    tuesday: 'Implantação e Gerência de Projetos | Lab.06 - 405 / Bloco IV',
    wednesday: 'Computação Gráfica | Lab.01',
    thursday: 'Interação Homem Computador | Matheus Silva | Lab.03 / Bloco I',
    friday: '...'
  },
  {
    time: '21:10 - 22:00',
    monday: 'Complexidade de Algoritmos | Lab.03 / Bloco I',
    tuesday: 'Implantação e Gerência de Projetos | Lab.06 - 405 / Bloco IV',
    wednesday: 'Inteligência Artificial | Marcelo Arantes | Lab.01',
    thursday: 'Interação Homem Computador | Lab.03 / Bloco I',
    friday: '...'
  }
];

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
