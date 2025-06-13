'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CoinAnimation from './CoinAnimation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>

        <motion.div
          key={`coin-animation-${pathname}`}
          initial={false}
          onAnimationStart={() => {
            // Show coin animation when page transition starts
          }}
          onAnimationComplete={() => {
            // Clean up after animation completes
          }}
        >
          <CoinAnimation count={15} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;