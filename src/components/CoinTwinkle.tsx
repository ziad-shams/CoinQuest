
import React, { useEffect, useState } from 'react';

interface CoinTwinkleProps {
  trigger: boolean;
  onComplete?: () => void;
}

const CoinTwinkle: React.FC<CoinTwinkleProps> = ({ trigger, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-8 h-8 rounded-full gradient-bg coin-twinkle"
          style={{
            left: `${50 + (Math.cos((i * 60) * Math.PI / 180) * 100)}%`,
            top: `${50 + (Math.sin((i * 60) * Math.PI / 180) * 100)}%`,
            animationDelay: `${i * 100}ms`
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-white font-bold">
            ⭐
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinTwinkle;
