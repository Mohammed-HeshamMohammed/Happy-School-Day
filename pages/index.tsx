"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import MessageCard from '@/components/MessageCard';
import Confetti from '@/components/Confetti';
import { Toaster } from '@/lib/toast';

export default function Home() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mountedDate, setMountedDate] = useState<string>('');

  useEffect(() => {
    setMountedDate(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

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
      <Head>
        <title>Happy First Day of School Day 👑</title>
        <meta
          name="description"
          content="A special surprise for First Day of School - A delightful interactive experience with love letters, music, and memories"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="First Day of School Day, love letter, surprise, romantic, interactive"
        />
        <meta name="author" content="Made with 💕" />

        {/* Favicon - Multiple formats for better browser support */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Happy National Princess Day 👑" />
        <meta
          property="og:description"
          content="A special surprise for National Princess Day - A delightful interactive experience with love letters, music, and memories"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta
          property="og:url"
          content="https://first-day-of-school.vercel.app"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Happy First Day of School 👑" />
        <meta
          name="twitter:description"
          content="A special surprise for First Day of School Day"
        />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="theme-color" content="#fff8e7" />
        <link rel="canonical" href="https://first-day-of-school .vercel.app" />
      </Head>

      <main className="min-h-screen relative">
        {/*
          Keep both components mounted to avoid a layout flash/flicker
          during the switch. We toggle visibility/interaction using
          Tailwind utility classes so mounting doesn't happen on click.
        */}

        <motion.div
          initial={false}
          animate={{ opacity: isGiftOpened ? 0 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-hidden={isGiftOpened}
          className={`w-full ${
            isGiftOpened ? 'pointer-events-none absolute inset-0' : 'relative'
          }`}
        >
          <Hero onOpenGift={handleOpenGift} isGiftOpened={isGiftOpened} />
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: isGiftOpened ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-hidden={!isGiftOpened}
          className={`w-full ${
            isGiftOpened ? 'relative z-10' : 'pointer-events-none absolute inset-0'
          }`}
        >
          <MessageCard isRevealed={isGiftOpened} onRestart={handleRestart} />
        </motion.div>
        <Confetti trigger={showConfetti} onComplete={handleConfettiComplete} />

        <footer className="px-4 py-8 text-center text-text/60 relative z-50">
          <p className="text-sm">
            National Princess Day —{' '}
            {mountedDate}
          </p>
          <p className="text-xs mt-2">Made with 💕</p>
        </footer>
      </main>

      <Toaster position="bottom-center" toastOptions={toastOptions} />
    </>
  );
}
