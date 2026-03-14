interface Props {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export default function Header({ onNavigate, currentPage = 'home' }: Props) {
  return (
    <header className="py-14 px-6 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3 text-white animate-text-glow">
          Turma de Sistemas de Informação - 6º Período
        </h1>
        <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed mb-6">
          Portal não-oficial da turma. Centralize horários, avisos e entregas em um só lugar.
        </p>
        {onNavigate && (
          <nav className="flex gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentPage === 'home'
                  ? 'bg-felixo-purple text-white'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Painel
            </button>
            <button
              onClick={() => onNavigate('gestao')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentPage === 'gestao'
                  ? 'bg-felixo-purple text-white'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Gestão
            </button>
            <button
              onClick={() => onNavigate('materials')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentPage === 'materials'
                  ? 'bg-felixo-purple text-white'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Materiais
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
