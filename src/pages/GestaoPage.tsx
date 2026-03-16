import { useEffect, useState } from 'react';
import {
  works,
  notices,
  upcomingTasks,
  schedule,
  alertBanner,
  calendarEvents,
  Work,
  Notice,
  Task,
  AlertBanner as AlertBannerType,
  CalendarEvent
} from '../data/mockData';
import { getNextClassAlert } from '../utils/scheduleAlert';

const defaultData = { works, notices, upcomingTasks, schedule, alertBanner, calendarEvents };

export default function GestaoPage() {
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const stored = localStorage.getItem('gestaoData');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData({
          ...defaultData,
          ...parsed,
          calendarEvents: parsed.calendarEvents ?? defaultData.calendarEvents
        });
      } catch (error) {
        console.error('Erro ao carregar gestaoData:', error);
      }
    }
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => window.clearInterval(intervalId);
  }, []);

  const activeAlert = getNextClassAlert(data.schedule, data.alertBanner, new Date(currentTime));

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Próxima Aula</h2>
        <AlertBanner alert={activeAlert} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Avisos</h2>
        <div className="space-y-4">
          {data.notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Calendário</h2>
        <Calendar events={data.calendarEvents} currentDate={new Date(currentTime)} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Radar de Entregas</h2>
        <UpcomingTasks tasks={data.upcomingTasks} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trabalhos e Grupos</h2>
        <div className="space-y-6">
          {data.works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>
    </main>
  );
}

function AlertBanner({ alert }: { alert: AlertBannerType }) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    warning: 'bg-yellow-400/10 border-yellow-400/20 text-yellow-100',
    success: 'bg-green-500/10 border-green-500/20 text-green-300'
  }[alert.type];

  return (
    <div className={`${styles} border rounded-xl py-4 px-6`}>
      <p className="font-semibold text-sm">⚠️ {alert.message}</p>
      {alert.type === 'warning' && <p className="text-xs mt-1 opacity-70">Próxima aula</p>}
    </div>
  );
}

function UpcomingTasks({ tasks }: { tasks: Task[] }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        task.url ? (
          <a
            key={task.id}
            href={task.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border bg-white/5 border-white/10 p-5 hover:border-white/20 transition-all group cursor-pointer"
          >
            <h3 className="font-bold text-base text-white mb-2">{task.subject}</h3>
            <p className="text-zinc-400 mb-3 text-sm">{task.description}</p>
            <p className="text-xs font-medium text-felixo-purple mt-2">
              🚩 Início: {task.startDate ? formatDate(task.startDate) : 'não informado'}
            </p>
            {task.dueDate && (
              <p className="text-xs font-medium text-felixo-purple">
                📅 Prazo: {formatDate(task.dueDate)}
              </p>
            )}
          </a>
        ) : (
          <div
            key={task.id}
            className="rounded-xl border bg-white/5 border-white/10 p-5 hover:border-white/20 transition-all group"
          >
            <h3 className="font-bold text-base text-white mb-2">{task.subject}</h3>
            <p className="text-zinc-400 mb-3 text-sm">{task.description}</p>
            <p className="text-xs font-medium text-felixo-purple mt-2">
              🚩 Início: {task.startDate ? formatDate(task.startDate) : 'não informado'}
            </p>
            {task.dueDate && (
              <p className="text-xs font-medium text-felixo-purple">
                📅 Prazo: {formatDate(task.dueDate)}
              </p>
            )}
          </div>
        )
      ))}
    </div>
  );
}

function NoticeCard({ notice }: { notice: Notice }) {
  const typeColors = {
    info: 'bg-blue-500/10 border-blue-500/20',
    warning: 'bg-yellow-500/10 border-yellow-500/20',
    urgent: 'bg-red-500/10 border-red-500/20'
  };

  return (
    <div className={`p-4 rounded-xl border ${typeColors[notice.type]}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white">{notice.title}</h3>
        <span className="text-sm text-zinc-400">{new Date(notice.date).toLocaleDateString('pt-BR')}</span>
      </div>
      <p className="text-zinc-300">{notice.content}</p>
    </div>
  );
}

function Calendar({ events, currentDate }: { events: CalendarEvent[]; currentDate: Date }) {
  const referenceDate = new Date(currentDate);
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const monthStart = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmptyDays = (monthStart.getDay() + 6) % 7;
  const totalCells = leadingEmptyDays + daysInMonth;
  const trailingEmptyDays = (7 - (totalCells % 7)) % 7;
  const monthLabel = monthStart.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const eventsByDay = new Map<string, CalendarEvent[]>();
  events.forEach((event) => {
    const key = toDateKey(new Date(event.dueDate ?? event.openDate));
    const bucket = eventsByDay.get(key) ?? [];
    bucket.push(event);
    eventsByDay.set(key, bucket);
  });

  const sortedEvents = [...events].sort((a, b) => {
    const aDate = new Date(a.dueDate ?? a.openDate).getTime();
    const bDate = new Date(b.dueDate ?? b.openDate).getTime();
    return aDate - bDate;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white capitalize">{monthLabel}</h3>
            <p className="text-xs text-zinc-400">Atividades registradas</p>
          </div>
          <span className="text-xs text-zinc-400">{events.length} atividade(s)</span>
        </div>

        <div className="grid grid-cols-7 text-xs text-zinc-400 mb-2">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
            <span key={day} className="text-center">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 text-sm">
          {Array.from({ length: leadingEmptyDays }).map((_, index) => (
            <div key={`empty-start-${index}`} className="min-h-[72px] rounded-lg border border-transparent" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const cellDate = new Date(year, month, day);
            const key = toDateKey(cellDate);
            const dayEvents = eventsByDay.get(key) ?? [];
            const isToday = isSameDay(cellDate, currentDate);

            return (
              <div
                key={key}
                className={`min-h-[72px] rounded-lg border p-2 ${
                  isToday ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/5'
                } ${dayEvents.length > 0 ? 'ring-1 ring-felixo-purple/40' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isToday ? 'text-white' : 'text-zinc-300'}`}>
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] text-felixo-purple font-semibold">{dayEvents.length}</span>
                  )}
                </div>
                {dayEvents.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <span
                        key={event.id}
                        className="block truncate rounded bg-felixo-purple/15 px-1.5 py-0.5 text-[10px] text-felixo-purple"
                      >
                        {event.shortTitle}
                      </span>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-zinc-400">+{dayEvents.length - 2} mais</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {Array.from({ length: trailingEmptyDays }).map((_, index) => (
            <div key={`empty-end-${index}`} className="min-h-[72px] rounded-lg border border-transparent" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {sortedEvents.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-400">
            Nenhuma atividade registrada.
          </div>
        ) : (
          sortedEvents.map((event) => (
            <CalendarEventCard key={event.id} event={event} currentDate={currentDate} />
          ))
        )}
      </div>
    </div>
  );
}

function CalendarEventCard({ event, currentDate }: { event: CalendarEvent; currentDate: Date }) {
  const openLabel = formatDateTime(event.openDate);
  const dueLabel = formatDateTime(event.dueDate);
  const lastModifiedLabel = event.lastModified ? formatDateTime(event.lastModified) : null;
  const isPast = new Date(event.dueDate).getTime() < currentDate.getTime();
  const statusLabel = event.status === 'submitted' ? 'Entregue' : event.status === 'open' ? 'Aberta' : 'Encerrada';
  const showPastBadge = isPast && statusLabel !== 'Encerrada';
  const statusClasses =
    event.status === 'submitted'
      ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-200'
      : event.status === 'open'
        ? 'border-yellow-500/30 bg-yellow-500/15 text-yellow-200'
        : 'border-white/10 bg-white/10 text-zinc-200';

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-felixo-purple font-semibold uppercase tracking-wide">{event.subject}</span>
        {event.courseCode && <span className="text-zinc-400">[{event.courseCode}]</span>}
        {event.courseTrack && <span className="text-zinc-500">({event.courseTrack})</span>}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        {event.classLabel && <p className="text-sm text-zinc-400">{event.classLabel}</p>}
      </div>

      {event.description && <p className="text-sm text-zinc-300">{event.description}</p>}

      <div className="text-xs text-zinc-400">
        Aberto: {openLabel} • Vencimento: {dueLabel}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className={`rounded-full border px-2 py-1 ${statusClasses}`}>{statusLabel}</span>
        {showPastBadge && (
          <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-zinc-200">
            Encerrada
          </span>
        )}
        {event.submissionStatus && (
          <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-zinc-200">
            {event.submissionStatus}
          </span>
        )}
        {event.gradeStatus && (
          <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-zinc-200">
            {event.gradeStatus}
          </span>
        )}
      </div>

      {event.submittedEarly && <p className="text-xs text-zinc-400">Envio: {event.submittedEarly}</p>}
      {lastModifiedLabel && <p className="text-xs text-zinc-400">Última modificação: {lastModifiedLabel}</p>}
      {event.attachments && event.attachments.length > 0 && (
        <p className="text-xs text-zinc-400">
          Arquivos: {event.attachments.map((file) => file.name).join(', ')}
        </p>
      )}

      {(event.objective || event.requirements || event.tips || event.notes) && (
        <details className="rounded-lg border border-white/10 bg-white/5 p-4">
          <summary className="cursor-pointer text-sm text-felixo-purple font-semibold">Detalhes da atividade</summary>
          <div className="mt-3 space-y-3 text-sm text-zinc-300">
            {event.objective && (
              <p>
                <span className="text-zinc-400">Objetivo:</span> {event.objective}
              </p>
            )}

            {event.requirements && event.requirements.length > 0 && (
              <div>
                <p className="text-zinc-400">Elementos obrigatórios:</p>
                <ul className="mt-2 space-y-1">
                  {event.requirements.map((item, index) => (
                    <li key={`${event.id}-req-${index}`} className="text-zinc-300">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.tips && event.tips.length > 0 && (
              <div>
                <p className="text-zinc-400">Dicas para os alunos:</p>
                <ul className="mt-2 space-y-1">
                  {event.tips.map((tip, index) => (
                    <li key={`${event.id}-tip-${index}`} className="text-zinc-300">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.notes && <p className="text-zinc-400">{event.notes}</p>}
          </div>
        </details>
      )}
    </div>
  );
}

function WorkCard({ work }: { work: Work }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm text-felixo-purple font-semibold">{work.subject}</span>
          <h3 className="text-xl font-bold text-white mt-1">{work.title}</h3>
          <p className="text-zinc-400 mt-2">{work.description}</p>
        </div>
        {work.dueDate && (
          <span className="text-sm text-zinc-400">
            Prazo: {new Date(work.dueDate).toLocaleDateString('pt-BR')}
          </span>
        )}
      </div>

      {work.groups && work.groups.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-felixo-purple hover:text-felixo-purple/80 font-semibold mb-4"
          >
            {expanded ? '▼' : '▶'} {work.groups.length} grupo(s)
          </button>

          {expanded && (
            <div className="space-y-4 mt-4">
              {work.groups.map((group) => (
                <div key={group.id} className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <h4 className="font-semibold text-white mb-2">{group.name}</h4>
                  <div className="mb-3">
                    <span className="text-sm text-zinc-400">Membros: </span>
                    <span className="text-sm text-zinc-300">{group.members.join(', ')}</span>
                  </div>
                  {group.files && group.files.length > 0 && (
                    <div>
                      <span className="text-sm text-zinc-400 block mb-2">Arquivos:</span>
                      <div className="space-y-1">
                        {group.files.map((file, idx) => (
                          <a
                            key={idx}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-felixo-purple hover:text-felixo-purple/80 block"
                          >
                            📄 {file.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
