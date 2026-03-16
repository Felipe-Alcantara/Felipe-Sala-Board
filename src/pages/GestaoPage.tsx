import { useEffect, useMemo, useState } from 'react';
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
const calendarUserStatusStorageKey = 'gestaoCalendarUserStatus';

type CalendarUserStatus = 'will' | 'sent';

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
  const [selectedMonth, setSelectedMonth] = useState(() => startOfMonth(currentDate));
  const [userStatusById, setUserStatusById] = useState<Record<string, CalendarUserStatus>>(() => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(calendarUserStatusStorageKey);
    if (!stored) return {};
    try {
      const parsed = JSON.parse(stored);
      if (!parsed || typeof parsed !== 'object') return {};
      return parsed as Record<string, CalendarUserStatus>;
    } catch (error) {
      console.error('Erro ao carregar status do calendário:', error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(calendarUserStatusStorageKey, JSON.stringify(userStatusById));
  }, [userStatusById]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((event) => {
      const anchorDate = getEventAnchorDate(event);
      const key = toDateKey(anchorDate);
      const bucket = map.get(key) ?? [];
      bucket.push(event);
      map.set(key, bucket);
    });
    map.forEach((bucket) =>
      bucket.sort((a, b) => getEventAnchorDate(a).getTime() - getEventAnchorDate(b).getTime())
    );
    return map;
  }, [events]);

  const gridDays = useMemo(() => getMonthGridDays(selectedMonth), [selectedMonth]);

  const eventsInMonth = useMemo(() => {
    return events
      .filter((event) => isSameMonth(getEventAnchorDate(event), selectedMonth))
      .sort((a, b) => getEventAnchorDate(a).getTime() - getEventAnchorDate(b).getTime());
  }, [events, selectedMonth]);

  const handleStatusChange = (eventId: string, status: CalendarUserStatus) => {
    setUserStatusById((prev) => {
      const next = { ...prev };
      if (prev[eventId] === status) {
        delete next[eventId];
        return next;
      }
      next[eventId] = status;
      return next;
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white capitalize">{formatMonthLabel(selectedMonth)}</h3>
            <p className="text-xs text-zinc-400">Atividades registradas no mês</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSelectedMonth(addMonths(selectedMonth, -1))}
              className="rounded-lg border border-white/10 px-2 py-1 text-zinc-300 transition hover:border-white/30 hover:text-white"
              aria-label="Mês anterior"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => setSelectedMonth(startOfMonth(currentDate))}
              className="rounded-lg border border-white/10 px-3 py-1 text-zinc-300 transition hover:border-white/30 hover:text-white"
            >
              Hoje
            </button>
            <button
              type="button"
              onClick={() => setSelectedMonth(addMonths(selectedMonth, 1))}
              className="rounded-lg border border-white/10 px-2 py-1 text-zinc-300 transition hover:border-white/30 hover:text-white"
              aria-label="Próximo mês"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
          <span>{eventsInMonth.length} atividade(s)</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-felixo-purple/70" />
            Dias com atividade
          </span>
        </div>

        <div className="grid grid-cols-7 text-xs text-zinc-400 mb-2">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
            <span key={day} className="text-center">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3">
          {gridDays.map((day) => {
            const key = toDateKey(day);
            const dayEvents = eventsByDate.get(key) ?? [];
            const isToday = isSameDay(day, currentDate);
            const isCurrentMonth = isSameMonth(day, selectedMonth);
            const hasEvents = dayEvents.length > 0;
            const tooltip = hasEvents
              ? `${formatShortDate(day)} • ${dayEvents.map((event) => event.shortTitle).join(' • ')}`
              : formatShortDate(day);

            return (
              <div
                key={key}
                title={tooltip}
                className={`aspect-square rounded-xl border p-2 transition ${
                  isCurrentMonth ? 'border-white/10 bg-white/5' : 'border-transparent bg-transparent text-zinc-600/60'
                } ${isToday ? 'ring-2 ring-felixo-purple/50' : ''} ${
                  hasEvents ? 'hover:border-felixo-purple/60' : 'hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className={isCurrentMonth ? 'text-zinc-300' : 'text-zinc-600'}>{day.getDate()}</span>
                  {hasEvents && <span className="text-felixo-purple font-semibold">{dayEvents.length}</span>}
                </div>
                {hasEvents && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <span key={event.id} className="h-1.5 w-1.5 rounded-full bg-felixo-purple/80" />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[10px] text-zinc-400">+{dayEvents.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {eventsInMonth.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-400">
            Nenhuma atividade registrada neste mês.
          </div>
        ) : (
          eventsInMonth.map((event) => (
            <CalendarEventCard
              key={event.id}
              event={event}
              currentDate={currentDate}
              userStatus={userStatusById[event.id]}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

function CalendarEventCard({
  event,
  currentDate,
  userStatus,
  onStatusChange
}: {
  event: CalendarEvent;
  currentDate: Date;
  userStatus?: CalendarUserStatus;
  onStatusChange: (eventId: string, status: CalendarUserStatus) => void;
}) {
  const openLabel = formatDateTime(event.openDate);
  const dueLabel = formatDateTime(event.dueDate);
  const lastModifiedLabel = event.lastModified ? formatDateTime(event.lastModified) : null;
  const isPast = new Date(event.dueDate).getTime() < currentDate.getTime();
  const portalEntries = [
    event.submissionStatus ? `Status de envio: ${event.submissionStatus}` : null,
    event.gradeStatus ? `Status da avaliação: ${event.gradeStatus}` : null,
    event.submittedEarly ? `Tempo restante: ${event.submittedEarly}` : null,
    lastModifiedLabel ? `Última modificação: ${lastModifiedLabel}` : null
  ].filter(Boolean) as string[];

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

      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span>Aberto: {openLabel}</span>
        <span>•</span>
        <span>Vencimento: {dueLabel}</span>
        {isPast && (
          <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-zinc-300">
            Prazo encerrado
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-400">Minha intenção:</span>
        <button
          type="button"
          onClick={() => onStatusChange(event.id, 'will')}
          aria-pressed={userStatus === 'will'}
          className={`rounded-full border px-2 py-1 transition ${
            userStatus === 'will'
              ? 'border-felixo-purple/60 bg-felixo-purple/15 text-felixo-purple'
              : 'border-white/10 text-zinc-300 hover:border-white/30'
          }`}
        >
          Vou enviar
        </button>
        <button
          type="button"
          onClick={() => onStatusChange(event.id, 'sent')}
          aria-pressed={userStatus === 'sent'}
          className={`rounded-full border px-2 py-1 transition ${
            userStatus === 'sent'
              ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-200'
              : 'border-white/10 text-zinc-300 hover:border-white/30'
          }`}
        >
          Enviei
        </button>
      </div>

      {(event.objective ||
        event.requirements ||
        event.tips ||
        event.notes ||
        portalEntries.length > 0 ||
        (event.attachments && event.attachments.length > 0)) && (
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

            {portalEntries.length > 0 && (
              <div>
                <p className="text-zinc-400">Registro do portal:</p>
                <ul className="mt-2 space-y-1">
                  {portalEntries.map((entry, index) => (
                    <li key={`${event.id}-portal-${index}`} className="text-zinc-300">
                      • {entry}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.attachments && event.attachments.length > 0 && (
              <p>
                <span className="text-zinc-400">Arquivos anexados:</span>{' '}
                {event.attachments.map((file) => file.name).join(', ')}
              </p>
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

function getEventAnchorDate(event: CalendarEvent) {
  return new Date(event.dueDate ?? event.openDate);
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function isSameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfWeek(date: Date, weekStartsOn = 1) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfWeek(date: Date, weekStartsOn = 1) {
  const start = startOfWeek(date, weekStartsOn);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function getMonthGridDays(monthDate: Date) {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const gridStart = startOfWeek(monthStart, 1);
  const gridEnd = endOfWeek(monthEnd, 1);
  const days: Date[] = [];

  for (let day = gridStart; day <= gridEnd; day = addDays(day, 1)) {
    days.push(new Date(day));
  }

  return days;
}

function formatMonthLabel(date: Date) {
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString('pt-BR');
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
