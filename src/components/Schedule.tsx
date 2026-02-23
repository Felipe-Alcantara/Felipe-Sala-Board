import { ScheduleClass } from '../data/mockData';

interface Props {
  schedule: ScheduleClass[];
}

const days = ['monday', 'tuesday', 'wednesday', 'thursday'] as const;

const dayLabels = ['Segunda', 'Terça', 'Quarta', 'Quinta'];

const roomLegend = [
  { key: 'Lab.01', cellClass: 'bg-[#8e8e8e]', textClass: 'text-zinc-900' },
  { key: 'Lab.02', cellClass: 'bg-[#28457a]', textClass: 'text-zinc-50' },
  { key: 'Lab.03', cellClass: 'bg-[#ead88f]', textClass: 'text-zinc-900' },
  { key: 'Lab.04', cellClass: 'bg-[#ffa000]', textClass: 'text-zinc-900' },
  { key: 'Lab.05', cellClass: 'bg-[#879fca]', textClass: 'text-zinc-900' },
  { key: 'Lab.06', cellClass: 'bg-[#e6ab80]', textClass: 'text-zinc-900' },
  { key: 'Lab.08', cellClass: 'bg-[#b3b3b3]', textClass: 'text-zinc-900' },
  { key: 'Lab.09', cellClass: 'bg-[#5a8735]', textClass: 'text-zinc-50' },
  { key: 'Lab.10', cellClass: 'bg-[#f5c400]', textClass: 'text-zinc-900' },
  { key: 'Bloco IV - sala 505', cellClass: 'bg-[#ececec]', textClass: 'text-zinc-900' },
  { key: 'Bloco IV - 301', cellClass: 'bg-[#db5de4]', textClass: 'text-zinc-900' },
  { key: 'Bloco IV - 302', cellClass: 'bg-[#ff6f00]', textClass: 'text-zinc-900' }
] as const;

function parseScheduleCell(raw: string) {
  const parts = raw
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { subject: '' };
  }

  if (parts.length === 1) {
    return { subject: parts[0] };
  }

  if (parts.length === 2) {
    const [subject, secondPart] = parts;
    const looksLikeRoom = secondPart.startsWith('Lab.') || secondPart.startsWith('Bloco');

    if (looksLikeRoom) {
      return { subject, room: secondPart };
    }

    return { subject, teacher: secondPart };
  }

  return {
    subject: parts[0],
    teacher: parts[1],
    room: parts[2]
  };
}

function resolveCellColor(room?: string) {
  if (!room) {
    return 'bg-zinc-900/70 text-zinc-100';
  }

  const legendItem = roomLegend.find((item) => room.includes(item.key));

  if (!legendItem) {
    return 'bg-zinc-900/70 text-zinc-100';
  }

  return `${legendItem.cellClass} ${legendItem.textClass}`;
}

export default function Schedule({ schedule }: Props) {
  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Grade de Horários
        </h2>
        <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-200 mb-4">
          6º Período
        </p>
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-950/50">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-left font-bold text-white text-sm border-r border-white/5">
                  Horário
                </th>
                {dayLabels.map((day) => (
                  <th key={day} className="p-3 text-left font-bold text-white text-sm border-r border-white/5 last:border-r-0">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((slot, index) => (
                <tr key={index} className="border-t border-white/5">
                  <td className="p-3 font-semibold text-felixo-purple text-sm border-r border-white/5">
                    {slot.time}
                  </td>
                  {days.map((day) => {
                    const cellValue = slot[day];

                    if (!cellValue) {
                      return (
                        <td
                          key={day}
                          className="p-3 text-zinc-300 text-sm border-r border-white/5 last:border-r-0 bg-zinc-900/70"
                        >
                          <span className="text-zinc-600">-</span>
                        </td>
                      );
                    }

                    const parsedCell = parseScheduleCell(cellValue);

                    if (parsedCell.subject === '...') {
                      return (
                        <td
                          key={day}
                          className="p-3 text-sm border-r border-white/5 last:border-r-0 bg-zinc-800/70 text-zinc-500 text-center font-semibold tracking-wide"
                        >
                          ...
                        </td>
                      );
                    }

                    return (
                      <td
                        key={day}
                        className={`p-3 text-sm border-r border-white/5 last:border-r-0 align-top ${resolveCellColor(parsedCell.room)}`}
                      >
                        <p className="font-semibold leading-tight">{parsedCell.subject}</p>
                        {parsedCell.teacher ? (
                          <p className="mt-1 text-xs font-semibold leading-tight">{parsedCell.teacher}</p>
                        ) : null}
                        {parsedCell.room ? (
                          <p className="mt-1 text-[11px] font-medium leading-tight opacity-90">{parsedCell.room}</p>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
