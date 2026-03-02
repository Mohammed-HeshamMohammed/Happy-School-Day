'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

const confettiColors = ['#FFB6E6', '#FFD8A8', '#FFE5F1', '#FFC5E6', '#FFD4E5'];

type ConfettiPiece = {
  key: number;
  delay: number;
  duration: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  rotateTo: number;
  driftX: number;
};

export default function Confetti({ trigger, onComplete }: ConfettiProps) {
  const [windowHeight, setWindowHeight] = useState(800);
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    if (!trigger) return;

    const nextPieces: ConfettiPiece[] = Array.from({ length: 50 }).map(
      (_, i) => {
        const delay = Math.random() * 0.5;
        const duration = 1.5 + Math.random() * 0.5;
        const x = Math.random() * 100;
        const y = -10 - Math.random() * 20;
        const rotation = Math.random() * 360;
        const color =
          confettiColors[Math.floor(Math.random() * confettiColors.length)];

        return {
          key: i,
          delay,
          duration,
          x,
          y,
          rotation,
          color,
          rotateTo: rotation + 360 * (2 + Math.random()),
          driftX: (Math.random() - 0.5) * 200,
        };
      }
    );
    setPieces(nextPieces);

    const duration = 2000;
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      setPieces([]);
    };
  }, [trigger, onComplete]);

  if (!trigger) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.key}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
          }}
          initial={{
            opacity: 1,
            y: 0,
            rotate: p.rotation,
            scale: 1,
          }}
          animate={{
            opacity: [1, 1, 0],
            y: windowHeight + 100,
            rotate: p.rotateTo,
            scale: [1, 1.2, 0.8, 0],
            x: p.driftX,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
