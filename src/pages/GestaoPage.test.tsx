import { render, screen } from '@testing-library/react';
import GestaoPage from './GestaoPage';

vi.mock('../data/mockData', () => {
  const today = new Date();
  const eventDate = new Date(today.getFullYear(), today.getMonth(), 15);
  return {
    works: [],
    notices: [],
    upcomingTasks: [],
    schedule: [],
    alertBanner: { type: 'info', message: '' },
    calendarEvents: [
      {
        id: 'evt-test-001',
        subject: 'Teste',
        shortTitle: 'Teste',
        title: 'Evento de Teste',
        openDate: eventDate.toISOString(),
        dueDate: eventDate.toISOString(),
      },
    ],
  };
});

describe('GestaoPage', () => {
  it('should render the calendar with the correct layout', () => {
    render(<GestaoPage />);
    const calendarContainer = screen.getByText('Calendário').parentElement;
    const gridContainer = calendarContainer?.querySelector('.grid');
    expect(gridContainer).toHaveClass('lg:items-start');
  });

  it('should highlight days with events', () => {
    render(<GestaoPage />);
    const dayWithEvent = screen.getByText('15').parentElement?.parentElement;

    if (dayWithEvent) {
      expect(dayWithEvent).toHaveClass('border-felixo-purple/30', 'bg-felixo-purple/10');
    }
  });
});