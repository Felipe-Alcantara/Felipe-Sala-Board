import { useState, useEffect } from 'react';
import { MaterialNode } from '../data/mockData';

interface TreeNodeProps {
  node: MaterialNode;
  depth: number;
  collapseSignal: number;
}

function TreeNode({ node, depth, collapseSignal }: TreeNodeProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [collapseSignal]);

  if (node.type === 'file') {
    return (
      <a
        href={node.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        <span className="text-base leading-none">📄</span>
        <span className="truncate">{node.label}</span>
      </a>
    );
  }

  const hasChildren = node.children && node.children.length > 0;

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
        <span className="truncate">{node.label}</span>
        {hasChildren && (
          <span className="ml-auto text-xs text-zinc-500 font-normal">
            {node.children!.length}
          </span>
        )}
      </button>

      {open && (
        <div>
          {hasChildren ? (
            node.children!.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} collapseSignal={collapseSignal} />
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

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Materiais das Aulas
          </h2>
          <button
            onClick={() => setCollapseSignal((s) => s + 1)}
            className="text-xs text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl"
          >
            Recolher tudo
          </button>
        </div>
        <p className="text-sm text-zinc-400 mb-6">
          Clique nas pastas para expandir. Os arquivos abrem direto no Drive.
        </p>
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 py-2">
          {nodes.length > 0 ? (
            nodes.map((node) => (
              <TreeNode key={node.id} node={node} depth={0} collapseSignal={collapseSignal} />
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
