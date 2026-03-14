import { useEffect, useState } from 'react';
import { works, notices, Work, Notice } from '../data/mockData';

export default function GestaoPage() {
  const [data, setData] = useState({ works, notices });

  useEffect(() => {
    const stored = localStorage.getItem('gestaoData');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Avisos</h2>
        <div className="space-y-4">
          {data.notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
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
