import { QuickLink } from '../data/mockData';

interface Props {
  links: QuickLink[];
}

export default function QuickLinks({ links }: Props) {
  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Links Úteis
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group rounded-2xl bg-white text-black border border-white/10 p-4 text-center font-medium text-sm hover:bg-zinc-100 transition-all shadow-sm"
            >
              <span className="relative z-10">{link.title}</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
