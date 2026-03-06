import { AlertBanner, ScheduleClass } from '../data/mockData';

type ScheduleDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

const weekDays: Array<{ key: ScheduleDay; dayNumber: number; label: string }> = [
  { key: 'monday', dayNumber: 1, label: 'segunda-feira' },
  { key: 'tuesday', dayNumber: 2, label: 'terca-feira' },
  { key: 'wednesday', dayNumber: 3, label: 'quarta-feira' },
  { key: 'thursday', dayNumber: 4, label: 'quinta-feira' },
  { key: 'friday', dayNumber: 5, label: 'sexta-feira' }
];

interface ParsedScheduleCell {
  subject: string;
  teacher?: string;
  room?: string;
}

interface NextClassCandidate {
  date: Date;
  dayOffset: number;
  startTime: string;
  classInfo: ParsedScheduleCell;
}

export function parseScheduleCell(raw: string): ParsedScheduleCell {
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

function getStartTime(timeRange: string) {
  const match = timeRange.match(/(\d{1,2}:\d{2})/);

  if (!match) {
    return null;
  }

  const [hours, minutes] = match[1].split(':').map(Number);

  return {
    label: match[1],
    hours,
    minutes
  };
}

function buildCandidate(schedule: ScheduleClass[], now: Date) {
  let closestClass: NextClassCandidate | null = null;

  for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
    const candidateDate = new Date(now);
    candidateDate.setHours(0, 0, 0, 0);
    candidateDate.setDate(now.getDate() + dayOffset);

    const weekDay = weekDays.find((day) => day.dayNumber === candidateDate.getDay());

    if (!weekDay) {
      continue;
    }

    for (const slot of schedule) {
      const rawCell = slot[weekDay.key];

      if (!rawCell) {
        continue;
      }

      const classInfo = parseScheduleCell(rawCell);

      if (!classInfo.subject || classInfo.subject === '...') {
        continue;
      }

      const startTime = getStartTime(slot.time);

      if (!startTime) {
        continue;
      }

      const classDate = new Date(candidateDate);
      classDate.setHours(startTime.hours, startTime.minutes, 0, 0);

      if (classDate <= now) {
        continue;
      }

      if (!closestClass || classDate < closestClass.date) {
        closestClass = {
          date: classDate,
          dayOffset,
          startTime: startTime.label,
          classInfo
        };
      }
    }
  }

  return closestClass;
}

function resolveWhenLabel(dayOffset: number, date: Date) {
  if (dayOffset === 0) {
    return 'hoje';
  }

  if (dayOffset === 1) {
    return 'amanha';
  }

  const weekDay = weekDays.find((day) => day.dayNumber === date.getDay());

  return weekDay?.label ?? 'nos proximos dias';
}

export function getNextClassAlert(schedule: ScheduleClass[], fallbackAlert: AlertBanner, now = new Date()): AlertBanner {
  const nextClass = buildCandidate(schedule, now);

  if (!nextClass) {
    return fallbackAlert;
  }

  const parts = [
    `Proxima aula: ${nextClass.classInfo.subject}`,
    `${resolveWhenLabel(nextClass.dayOffset, nextClass.date)} as ${nextClass.startTime}`
  ];

  if (nextClass.classInfo.teacher) {
    parts.push(`com ${nextClass.classInfo.teacher}`);
  }

  if (nextClass.classInfo.room) {
    parts.push(`em ${nextClass.classInfo.room}`);
  }

  return {
    message: parts.join(' ') + '.',
    type: 'warning'
  };
}