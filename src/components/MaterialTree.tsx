import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Folder, FolderOpen, FileText, Check } from 'lucide-react';
import { MaterialNode } from '../data/mockData';

// ─── helpers ───
function collectFileIds(node: MaterialNode): string[] {
  if (node.type === 'file') return [node.id];
  return (node.children ?? []).flatMap(collectFileIds);
}

// ─── localStorage keys ───
const STORAGE_KEY = 'viewedMaterials';
const VIEW_MODE_KEY = 'materialViewMode';

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

type ViewMode = 'simple' | 'dynamic';

function loadViewMode(): ViewMode {
  try {
    const raw = localStorage.getItem(VIEW_MODE_KEY);
    if (raw === 'simple') return 'simple';
  } catch { /* ignore */ }
  return 'dynamic';
}

// ═══════════════════════════════════════
// VISUALIZAÇÃO SIMPLES (original)
// ═══════════════════════════════════════

interface SimpleTreeNodeProps {
  node: MaterialNode;
  depth: number;
  collapseSignal: number;
  viewedIds: Set<string>;
  onToggleViewed: (id: string) => void;
}

function SimpleTreeNode({ node, depth, collapseSignal, viewedIds, onToggleViewed }: SimpleTreeNodeProps) {
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
              <SimpleTreeNode key={child.id} node={child} depth={depth + 1} collapseSignal={collapseSignal} viewedIds={viewedIds} onToggleViewed={onToggleViewed} />
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

// ═══════════════════════════════════════
// VISUALIZAÇÃO DINÂMICA (inspirada no Category Tree Explorer)
// ═══════════════════════════════════════

interface DynamicTreeNodeProps {
  node: MaterialNode;
  depth: number;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  viewedIds: Set<string>;
  onToggleViewed: (id: string) => void;
}

function DynamicTreeNode({ node, depth, expandedIds, onToggleExpand, viewedIds, onToggleViewed }: DynamicTreeNodeProps) {
  if (node.type === 'file') {
    const viewed = viewedIds.has(node.id);

    return (
      <motion.div
        className="group relative flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-white/5"
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      >
        <button
          onClick={() => onToggleViewed(node.id)}
          className={`flex-shrink-0 w-4 h-4 rounded border transition-all ${
            viewed
              ? 'bg-green-500 border-green-400 text-white scale-110'
              : 'border-zinc-600 hover:border-purple-400 hover:bg-purple-400/10'
          } flex items-center justify-center`}
          title={viewed ? 'Marcar como não visto' : 'Marcar como visto'}
        >
          {viewed && <Check size={10} />}
        </button>

        <a
          href={node.url}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-2 min-w-0 flex-1 transition-colors ${
            viewed ? 'text-zinc-500' : 'text-zinc-300 hover:text-white'
          }`}
        >
          <FileText size={14} className={viewed ? 'text-zinc-600' : 'text-purple-400/70'} />
          <span className={`truncate ${viewed ? 'line-through' : ''}`}>{node.label}</span>
        </a>
      </motion.div>
    );
  }

  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const fileIds = collectFileIds(node);
  const viewedCount = fileIds.filter((id) => viewedIds.has(id)).length;
  const totalCount = fileIds.length;
  const allViewed = totalCount > 0 && viewedCount === totalCount;

  return (
    <div>
      <motion.button
        onClick={() => onToggleExpand(node.id)}
        className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-white hover:bg-white/5 transition-colors"
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        whileTap={{ scale: 0.98 }}
      >
        {hasChildren ? (
          <motion.span
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center w-4 h-4"
          >
            <ChevronRight size={14} className="text-zinc-400" />
          </motion.span>
        ) : (
          <span className="w-4" />
        )}

        {hasChildren ? (
          isExpanded
            ? <FolderOpen size={16} className="text-purple-400 flex-shrink-0" />
            : <Folder size={16} className="text-purple-400 flex-shrink-0" />
        ) : (
          <div className="w-4 h-4 rounded bg-purple-400/20 border border-purple-400/40 flex-shrink-0" />
        )}

        <span className={`truncate ${allViewed ? 'text-zinc-500' : ''}`}>{node.label}</span>

        {totalCount > 0 && (
          <span className={`ml-auto text-xs font-normal flex items-center gap-1.5 ${allViewed ? 'text-green-500' : 'text-zinc-500'}`}>
            {allViewed && <Check size={12} className="text-green-500" />}
            {viewedCount}/{totalCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {hasChildren ? (
              node.children!.map((child) => (
                <DynamicTreeNode
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  expandedIds={expandedIds}
                  onToggleExpand={onToggleExpand}
                  viewedIds={viewedIds}
                  onToggleViewed={onToggleViewed}
                />
              ))
            ) : (
              <p
                className="text-xs text-zinc-600 italic py-1"
                style={{ paddingLeft: `${(depth + 1) * 16 + 12}px` }}
              >
                Nenhum material ainda
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════
// CONTAINER PRINCIPAL
// ═══════════════════════════════════════

interface Props {
  nodes: MaterialNode[];
}

export default function MaterialTree({ nodes }: Props) {
  // ─── Estado compartilhado ───
  const [viewedIds, setViewedIds] = useState<Set<string>>(() => loadViewed());
  const [viewMode, setViewMode] = useState<ViewMode>(() => loadViewMode());

  // ─── Estado da view simples ───
  const [collapseSignal, setCollapseSignal] = useState(0);

  // ─── Estado da view dinâmica ───
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleToggleViewed = useCallback((id: string) => {
    setViewedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveViewed(next);
      return next;
    });
  }, []);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleCollapseAll = useCallback(() => {
    if (viewMode === 'simple') {
      setCollapseSignal((s) => s + 1);
    } else {
      setExpandedIds(new Set());
    }
  }, [viewMode]);

  const handleSwitchView = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem(VIEW_MODE_KEY, mode);
  }, []);

  const allFileIds = useMemo(() => nodes.flatMap(collectFileIds), [nodes]);
  const totalViewed = allFileIds.filter((id) => viewedIds.has(id)).length;
  const totalFiles = allFileIds.length;

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Materiais das Aulas
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs text-zinc-400">
              {totalViewed}/{totalFiles} vistos
            </span>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={viewMode === 'simple'}
                onChange={(e) => handleSwitchView(e.target.checked ? 'simple' : 'dynamic')}
                className="accent-purple-500 w-3.5 h-3.5 rounded cursor-pointer"
              />
              <span className="text-xs text-zinc-400 whitespace-nowrap">Modo simplificado</span>
            </label>

            <button
              onClick={handleCollapseAll}
              className="text-xs text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl whitespace-nowrap"
            >
              Recolher tudo
            </button>
          </div>
        </div>
        <p className="text-sm text-zinc-400 mb-6">
          Clique nas pastas para expandir. Clique no nome do arquivo para abri-lo (nova aba). Marque o ✓ nos materiais que já viu.
        </p>
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 py-2">
          {nodes.length > 0 ? (
            viewMode === 'simple' ? (
              nodes.map((node) => (
                <SimpleTreeNode key={node.id} node={node} depth={0} collapseSignal={collapseSignal} viewedIds={viewedIds} onToggleViewed={handleToggleViewed} />
              ))
            ) : (
              nodes.map((node) => (
                <DynamicTreeNode key={node.id} node={node} depth={0} expandedIds={expandedIds} onToggleExpand={handleToggleExpand} viewedIds={viewedIds} onToggleViewed={handleToggleViewed} />
              ))
            )
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
