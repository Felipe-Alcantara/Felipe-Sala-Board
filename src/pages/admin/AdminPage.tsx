import { useState, useEffect } from 'react';
import { Task, ScheduleClass, QuickLink } from '../../data/mockData';

export default function AdminPage() {
  const [data, setData] = useState({
    alertBanner: { message: '', type: 'info' as const },
    upcomingTasks: [] as Task[],
    schedule: [] as ScheduleClass[],
    quickLinks: [] as QuickLink[]
  });

  useEffect(() => {
    const stored = localStorage.getItem('boardData');
    if (stored) setData(JSON.parse(stored));
  }, []);

  const saveData = () => {
    localStorage.setItem('boardData', JSON.stringify(data));
    const blob = new Blob([`export const alertBanner = ${JSON.stringify(data.alertBanner, null, 2)};\n\nexport const upcomingTasks = ${JSON.stringify(data.upcomingTasks, null, 2)};\n\nexport const schedule = ${JSON.stringify(data.schedule, null, 2)};\n\nexport const quickLinks = ${JSON.stringify(data.quickLinks, null, 2)};`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mockData.ts';
    a.click();
    alert('Dados salvos! Substitua o arquivo src/data/mockData.ts');
  };

  const addTask = () => {
    setData(prev => ({
      ...prev,
      upcomingTasks: [...prev.upcomingTasks, { id: Date.now().toString(), subject: '', description: '', dueDate: '' }]
    }));
  };

  const updateTask = (id: string, field: keyof Task, value: string) => {
    setData(prev => ({
      ...prev,
      upcomingTasks: prev.upcomingTasks.map(t => t.id === id ? { ...t, [field]: value } : t)
    }));
  };

  const deleteTask = (id: string) => {
    setData(prev => ({
      ...prev,
      upcomingTasks: prev.upcomingTasks.filter(t => t.id !== id)
    }));
  };

  const addSchedule = () => {
    setData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { time: '' }]
    }));
  };

  const updateSchedule = (index: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      schedule: prev.schedule.map((s, i) => i === index ? { ...s, [field]: value } : s)
    }));
  };

  const deleteSchedule = (index: number) => {
    setData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const addLink = () => {
    setData(prev => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { id: Date.now().toString(), title: '', url: '' }]
    }));
  };

  const updateLink = (id: string, field: keyof QuickLink, value: string) => {
    setData(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.map(l => l.id === id ? { ...l, [field]: value } : l)
    }));
  };

  const deleteLink = (id: string) => {
    setData(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.filter(l => l.id !== id)
    }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin - Editor de Conteúdo</h1>
          <button onClick={saveData} className="bg-felixo-purple hover:bg-felixo-purple-bright text-white px-6 py-3 rounded-2xl font-semibold transition">
            💾 Salvar e Baixar
          </button>
        </div>

        {/* Alert Banner */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-zinc-950/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Aviso Principal</h2>
          <input
            className="w-full mb-3 h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
            placeholder="Mensagem do aviso"
            value={data.alertBanner.message}
            onChange={e => setData(prev => ({ ...prev, alertBanner: { ...prev.alertBanner, message: e.target.value } }))}
          />
          <select
            className="w-full h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
            value={data.alertBanner.type}
            onChange={e => setData(prev => ({ ...prev, alertBanner: { ...prev.alertBanner, type: e.target.value as any } }))}
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="success">Success</option>
          </select>
        </section>

        {/* Tasks */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-zinc-950/50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Tarefas</h2>
            <button onClick={addTask} className="bg-white text-black px-4 py-2 rounded-xl font-medium text-sm hover:bg-zinc-100 transition">
              + Adicionar
            </button>
          </div>
          {data.upcomingTasks.map(task => (
            <div key={task.id} className="mb-4 p-4 rounded-xl bg-zinc-900/50 border border-white/5">
              <input
                className="w-full mb-2 h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
                placeholder="Matéria"
                value={task.subject}
                onChange={e => updateTask(task.id, 'subject', e.target.value)}
              />
              <input
                className="w-full mb-2 h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
                placeholder="Descrição"
                value={task.description}
                onChange={e => updateTask(task.id, 'description', e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
                  value={task.dueDate}
                  onChange={e => updateTask(task.id, 'dueDate', e.target.value)}
                />
                <button onClick={() => deleteTask(task.id)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm hover:bg-red-500/30 transition">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Schedule */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-zinc-950/50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Horários</h2>
            <button onClick={addSchedule} className="bg-white text-black px-4 py-2 rounded-xl font-medium text-sm hover:bg-zinc-100 transition">
              + Adicionar
            </button>
          </div>
          {data.schedule.map((slot, index) => (
            <div key={index} className="mb-4 p-4 rounded-xl bg-zinc-900/50 border border-white/5">
              <input
                className="w-full mb-2 h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
                placeholder="Horário (ex: 08:00 - 09:40)"
                value={slot.time}
                onChange={e => updateSchedule(index, 'time', e.target.value)}
              />
              <div className="grid grid-cols-5 gap-2 mb-2">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                  <input
                    key={day}
                    className="h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
                    placeholder={day.slice(0, 3)}
                    value={(slot as any)[day] || ''}
                    onChange={e => updateSchedule(index, day, e.target.value)}
                  />
                ))}
              </div>
              <button onClick={() => deleteSchedule(index)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm hover:bg-red-500/30 transition">
                🗑️
              </button>
            </div>
          ))}
        </section>

        {/* Quick Links */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-zinc-950/50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Links Úteis</h2>
            <button onClick={addLink} className="bg-white text-black px-4 py-2 rounded-xl font-medium text-sm hover:bg-zinc-100 transition">
              + Adicionar
            </button>
          </div>
          {data.quickLinks.map(link => (
            <div key={link.id} className="mb-4 p-4 rounded-xl bg-zinc-900/50 border border-white/5">
              <input
                className="w-full mb-2 h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
                placeholder="Título"
                value={link.title}
                onChange={e => updateLink(link.id, 'title', e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  className="flex-1 h-10 rounded-xl bg-zinc-800/50 border border-white/10 px-3 text-sm text-white outline-none"
                  placeholder="URL"
                  value={link.url}
                  onChange={e => updateLink(link.id, 'url', e.target.value)}
                />
                <button onClick={() => deleteLink(link.id)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm hover:bg-red-500/30 transition">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
