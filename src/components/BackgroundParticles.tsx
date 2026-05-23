import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const PARTICLE_COUNT = 35;

export default function BackgroundParticles() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.5
      })),
    []
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none select-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-200 shadow-[0_0_15px_rgba(192,132,252,0.8)] blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size
          }}
          animate={{ y: [0, -150], opacity: [0, p.opacity, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
}
