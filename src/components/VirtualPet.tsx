'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PetSVG from './PetSVG';

interface PetAccessory {
  id: string;
  name: string;
  type: 'hat' | 'outfit' | 'background';
  cost: number;
  equipped: boolean;
  svgPath: string;
  color: string;
  position: {
    x: number;
    y: number;
    scale: number;
  };
}

interface VirtualPetProps {
  level: number;
  happiness: number;
  accessories: PetAccessory[];
  onAccessoryToggle: (accessoryId: string) => void;
}

const VirtualPet: React.FC<VirtualPetProps> = ({
  level,
  happiness,
  accessories,
  onAccessoryToggle
}) => {
  const [petExpression, setPetExpression] = useState<'happy' | 'neutral' | 'excited'>('neutral');
  const [petColor, setPetColor] = useState('#9C27B0'); // Default purple color

  useEffect(() => {
    // Change expression based on happiness level
    if (happiness >= 80) setPetExpression('excited');
    else if (happiness >= 50) setPetExpression('happy');
    else setPetExpression('neutral');
  }, [happiness]);

  const equippedAccessories = accessories.filter(acc => acc.equipped);

  return (
    <div className="relative w-full max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Level {level} Pet</h3>
        <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${happiness}%` }}
          />
        </div>
      </div>

      <div className="relative w-64 h-64 mx-auto">
        {/* Background accessories */}
        <AnimatePresence>
          {equippedAccessories
            .filter(acc => acc.type === 'background')
            .map(acc => (
              <motion.svg
                key={acc.id}
                className="absolute inset-0"
                viewBox="0 0 80 80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.path
                  d={acc.svgPath}
                  fill={acc.color}
                  transform={`translate(${acc.position.x} ${acc.position.y}) scale(${acc.position.scale})`}
                />
              </motion.svg>
            ))}
        </AnimatePresence>

        {/* Main Pet */}
        <motion.div
          className="absolute inset-0"
          animate={{
            y: [0, -10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        >
          <PetSVG
            color={petColor}
            expression={petExpression}
            scale={1.5}
          />

          {/* Outfit accessories */}
          <AnimatePresence>
            {equippedAccessories
              .filter(acc => acc.type === 'outfit')
              .map(acc => (
                <motion.svg
                  key={acc.id}
                  className="absolute inset-0"
                  viewBox="0 0 80 80"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.path
                    d={acc.svgPath}
                    fill={acc.color}
                    transform={`translate(${acc.position.x} ${acc.position.y}) scale(${acc.position.scale})`}
                  />
                </motion.svg>
              ))}
          </AnimatePresence>

          {/* Hat accessories */}
          <AnimatePresence>
            {equippedAccessories
              .filter(acc => acc.type === 'hat')
              .map(acc => (
                <motion.svg
                  key={acc.id}
                  className="absolute inset-0"
                  viewBox="0 0 80 80"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <motion.path
                    d={acc.svgPath}
                    fill={acc.color}
                    transform={`translate(${acc.position.x} ${acc.position.y}) scale(${acc.position.scale})`}
                  />
                </motion.svg>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {accessories.map((acc) => (
          <button
            key={acc.id}
            className={`p-2 rounded-lg text-sm font-medium transition-colors ${acc.equipped ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
            onClick={() => onAccessoryToggle(acc.id)}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>{acc.name}</span>
              <span className="text-xs">{acc.cost} 🪙</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualPet;