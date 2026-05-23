import Button from './ui/Button';

interface Props {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Painel' },
  { id: 'gestao', label: 'Gestão' },
  { id: 'materials', label: 'Materiais' }
] as const;

export default function Header({ onNavigate, currentPage = 'home' }: Props) {
  return (
    <header className="py-14 px-6 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3 text-felixo-purple-glow">
          Turma de Sistemas de Informação - 6º Período
        </h1>
        <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed mb-6">
          Portal não-oficial da turma. Centralize horários, avisos e entregas em um só lugar.
        </p>
        {onNavigate && (
          <nav className="flex gap-3">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={currentPage === item.id ? 'default' : 'ghost'}
                active={currentPage === item.id}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
