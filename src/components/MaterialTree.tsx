import { useState, useEffect, useCallback } from 'react';
import { MaterialNode } from '../data/mockData';

// ─── helpers ───
function collectFileIds(node: MaterialNode): string[] {
  if (node.type === 'file') return [node.id];
  return (node.children ?? []).flatMap(collectFileIds);
}

// ─── localStorage key ───
const STORAGE_KEY = 'viewedMaterials';

function loadViewed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore */ }
  return new Set();
}

function saveViewed(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

interface TreeNodeProps {
  node: MaterialNode;
  depth: number;
  collapseSignal: number;
  viewedIds: Set<string>;
  onToggleViewed: (id: string) => void;
}

function TreeNode({ node, depth, collapseSignal, viewedIds, onToggleViewed }: TreeNodeProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [collapseSignal]);

  if (node.type === 'file') {
    const viewed = viewedIds.has(node.id);

    return (
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors group"
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        <button
          onClick={() => onToggleViewed(node.id)}
          className={`flex-shrink-0 w-4 h-4 rounded border transition-colors ${
            viewed
              ? 'bg-green-500 border-green-400 text-white'
              : 'border-zinc-600 hover:border-zinc-400'
          } flex items-center justify-center text-[10px] leading-none`}
          title={viewed ? 'Marcar como não visto' : 'Marcar como visto'}
        >
          {viewed && '✓'}
        </button>
        <a
          href={node.url}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-2 min-w-0 transition-colors ${
            viewed ? 'text-zinc-500' : 'hover:text-white'
          }`}
        >
          <span className="text-base leading-none">📄</span>
          <span className={`truncate ${viewed ? 'line-through' : ''}`}>{node.label}</span>
        </a>
      </div>
    );
  }

  const hasChildren = node.children && node.children.length > 0;
  const fileIds = collectFileIds(node);
  const viewedCount = fileIds.filter((id) => viewedIds.has(id)).length;
  const totalCount = fileIds.length;
  const allViewed = totalCount > 0 && viewedCount === totalCount;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        <span className={`text-[10px] leading-none transition-transform ${open ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <span className="text-base leading-none">{open ? '📂' : '📁'}</span>
        <span className={`truncate ${allViewed ? 'text-zinc-500' : ''}`}>{node.label}</span>
        {totalCount > 0 && (
          <span className={`ml-auto text-xs font-normal ${allViewed ? 'text-green-500' : 'text-zinc-500'}`}>
            {viewedCount}/{totalCount}
          </span>
        )}
      </button>

      {open && (
        <div>
          {hasChildren ? (
            node.children!.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} collapseSignal={collapseSignal} viewedIds={viewedIds} onToggleViewed={onToggleViewed} />
            ))
          ) : (
            <p
              className="text-xs text-zinc-600 italic py-1"
              style={{ paddingLeft: `${(depth + 1) * 20 + 12}px` }}
            >
              Nenhum material ainda
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface Props {
  nodes: MaterialNode[];
}

export default function MaterialTree({ nodes }: Props) {
  const [collapseSignal, setCollapseSignal] = useState(0);
  const [viewedIds, setViewedIds] = useState<Set<string>>(() => loadViewed());

  const handleToggleViewed = useCallback((id: string) => {
    setViewedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveViewed(next);
      return next;
    });
  }, []);

  const allFileIds = nodes.flatMap(collectFileIds);
  const totalViewed = allFileIds.filter((id) => viewedIds.has(id)).length;
  const totalFiles = allFileIds.length;

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Materiais das Aulas
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">
              {totalViewed}/{totalFiles} vistos
            </span>
            <button
              onClick={() => setCollapseSignal((s) => s + 1)}
              className="text-xs text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl"
            >
              Recolher tudo
            </button>
          </div>
        </div>
        <p className="text-sm text-zinc-400 mb-6">
          Clique nas pastas para expandir. Marque o ✓ nos materiais que já viu.
        </p>
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 py-2">
          {nodes.length > 0 ? (
            nodes.map((node) => (
              <TreeNode key={node.id} node={node} depth={0} collapseSignal={collapseSignal} viewedIds={viewedIds} onToggleViewed={handleToggleViewed} />
            ))
          ) : (
            <p className="text-center text-zinc-500 py-8">
              Nenhum material cadastrado.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
