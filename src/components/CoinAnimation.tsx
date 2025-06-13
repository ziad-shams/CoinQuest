'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CoinSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="2"
      initial={{ scale: 0 }}
      animate={{
        scale: [0, 1, 1, 1, 0],
        rotateY: [0, 180, 360],
      }}
      transition={{
        duration: 1.5,
        times: [0, 0.2, 0.5, 0.8, 1],
        ease: "easeInOut",
      }}
    />
    <motion.path
      d="M8 12h8M12 8v8"
      stroke="#B8860B"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  </svg>
);

interface CoinAnimationProps {
  count?: number;
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({ count = 10 }) => {
  const coins = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {coins.map((i) => {
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 1 + Math.random() * 0.5;

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: randomX,
              y: -50,
              opacity: 0,
            }}
            animate={{
              y: window.innerHeight + 50,
              opacity: [0, 1, 1, 0],
              x: randomX + (Math.random() - 0.5) * 100,
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: "easeIn",
              times: [0, 0.1, 0.9, 1],
            }}
          >
            <CoinSVG />
          </motion.div>
        );
      })}
    </div>
  );
};

export default CoinAnimation;