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

// O banner amarelo (warning) exibe a atividade/aula mais próxima no calendário
export const alertBanner: AlertBanner = {
  message: 'Aula de Inteligência Artificial com Marcelo Arantes segunda-feira às 18:30 no Lab.03 / Bloco I',
  type: 'warning'
};

export const upcomingTasks: Task[] = [
  {
    id: '1',
    subject: 'Elaboração de Projeto de Pesquisa',
    description: 'Aula 1 - ficha cadastral do TCC',
    startDate: '2026-02-19',
    url: 'https://nead.ugb.edu.br/mod/url/view.php?id=11201'
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
