import { Task } from '../data/mockData';

interface Props {
  tasks: Task[];
}

export default function UpcomingTasks({ tasks }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Radar de Entregas
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-3xl border bg-zinc-950/50 border-white/10 p-5 hover:border-white/20 transition-all felixo-card-glow group"
            >
              <h3 className="font-bold text-base text-white mb-2">
                {task.subject}
              </h3>
              <p className="text-zinc-400 mb-3 text-sm leading-relaxed">
                {task.description}
              </p>
              <p className="text-xs font-medium text-felixo-purple">
                📅 {formatDate(task.dueDate)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
