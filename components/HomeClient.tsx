'use client';

import { useState } from 'react';
// Import client components directly (they are client components themselves)
import Hero from './Hero';
import MessageCard from './MessageCard';
import Confetti from './Confetti';
import { Toaster } from '@/lib/toast';

export default function HomeClient() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    setShowConfetti(true);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleRestart = () => {
    setIsGiftOpened(false);
    setShowConfetti(false);
  };

  const toastOptions = {
    duration: 3000,
    style: {
      background: 'var(--primary)',
      color: 'var(--text)',
      borderRadius: '12px',
      padding: '12px 20px',
      fontSize: '14px',
    },
  };

  return (
    <>
      {!isGiftOpened && (
        <Hero onOpenGift={handleOpenGift} isGiftOpened={isGiftOpened} />
      )}
      {isGiftOpened && (
        <MessageCard isRevealed={isGiftOpened} onRestart={handleRestart} />
      )}
      <Confetti trigger={showConfetti} onComplete={handleConfettiComplete} />

      <Toaster position="bottom-center" toastOptions={toastOptions} />
    </>
  );
}
