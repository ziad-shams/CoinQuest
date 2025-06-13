'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PetSVGProps {
  color: string;
  expression: 'happy' | 'neutral' | 'excited';
  scale?: number;
}

const PetSVG: React.FC<PetSVGProps> = ({ color, expression, scale = 1 }) => {
  const expressions = {
    happy: {
      eyes: 'M25,25 Q30,20 35,25 M45,25 Q50,20 55,25',
      mouth: 'M35,45 Q40,50 45,45'
    },
    neutral: {
      eyes: 'M25,25 L35,25 M45,25 L55,25',
      mouth: 'M35,45 L45,45'
    },
    excited: {
      eyes: 'M25,20 Q30,25 35,20 M45,20 Q50,25 55,20',
      mouth: 'M35,45 Q40,55 45,45'
    }
  };

  return (
    <motion.svg
      viewBox="0 0 80 80"
      style={{ width: `${80 * scale}px`, height: `${80 * scale}px` }}
      initial={false}
      animate={{
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
    >
      {/* Body */}
      <motion.path
        d="M15,40 Q40,70 65,40 Q70,20 40,15 Q10,20 15,40"
        fill={color}
        stroke="#000"
        strokeWidth="2"
        initial={false}
        animate={{
          d: [
            'M15,40 Q40,70 65,40 Q70,20 40,15 Q10,20 15,40',
            'M15,42 Q40,72 65,42 Q70,22 40,17 Q10,22 15,42',
            'M15,40 Q40,70 65,40 Q70,20 40,15 Q10,20 15,40'
          ],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }}
      />

      {/* Eyes */}
      <motion.path
        d={expressions[expression].eyes}
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Mouth */}
      <motion.path
        d={expressions[expression].mouth}
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Blush spots */}
      <motion.circle
        cx="20"
        cy="35"
        r="3"
        fill="#FFB6C1"
        opacity="0.5"
      />
      <motion.circle
        cx="60"
        cy="35"
        r="3"
        fill="#FFB6C1"
        opacity="0.5"
      />

      {/* Ears */}
      <motion.path
        d="M25,15 Q30,5 35,15"
        stroke="#000"
        strokeWidth="2"
        fill={color}
      />
      <motion.path
        d="M45,15 Q50,5 55,15"
        stroke="#000"
        strokeWidth="2"
        fill={color}
      />
    </motion.svg>
  );
};

export default PetSVG;