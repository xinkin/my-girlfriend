"use client";
import React, { useState, useEffect } from "react";

interface Heart {
  id: number;
  left: number;
  top: number;
  scale: number;
  delay: number;
}

interface Props {
  showHearts?: boolean;
}

const GlowingHeartsBackground: React.FC<Props> = ({ showHearts = false }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const createHeartPositions = () => {
      const positions: Heart[] = [];
      const numHearts = isMobile ? 35 : 50; // Increased for desktop
      const minDistance = isMobile ? 15 : 12; // Adjusted for desktop

      const isValidPosition = (x: number, y: number): boolean => {
        return positions.every((heart) => {
          const dx = heart.left - x;
          const dy = heart.top - y;
          return Math.sqrt(dx * dx + dy * dy) >= minDistance;
        });
      };

      if (isMobile) {
        // Keep existing mobile logic
        const sectorsX = 4;
        const sectorsY = 5;
        const heartsPerSector = Math.ceil(numHearts / (sectorsX * sectorsY));

        for (let sx = 0; sx < sectorsX; sx++) {
          for (let sy = 0; sy < sectorsY; sy++) {
            for (let i = 0; i < heartsPerSector; i++) {
              let attempts = 0;
              let validPosition = false;
              let x, y;

              while (!validPosition && attempts < 20) {
                x = (sx / sectorsX) * 90 + Math.random() * (90 / sectorsX) + 5;
                y = (sy / sectorsY) * 90 + Math.random() * (90 / sectorsY) + 5;
                validPosition = isValidPosition(x, y);
                attempts++;
              }

              if (validPosition && positions.length < numHearts) {
                positions.push({
                  id: positions.length,
                  left: x!,
                  top: y!,
                  scale: 0.7 + Math.random() * 0.3,
                  delay: Math.random() * 3,
                });
              }
            }
          }
        }
      } else {
        // New desktop distribution logic
        let attempts = 0;
        while (positions.length < numHearts && attempts < 1000) {
          const x = Math.random() * 95; // Use more of the screen width
          const y = Math.random() * 95; // Use more of the screen height

          if (isValidPosition(x, y)) {
            positions.push({
              id: positions.length,
              left: x,
              top: y,
              scale: 0.9 + Math.random() * 0.4,
              delay: Math.random() * 3,
            });
          }
          attempts++;
        }
      }
      return positions;
    };

    setHearts(createHeartPositions());
  }, [isMobile]);

  if (!showHearts) return null;

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-50 to-white overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-pulse"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            transform: `scale(${heart.scale})`,
            animationDelay: `${heart.delay}s`,
            zIndex: 0,
          }}
        >
          <svg
            width={isMobile ? "40" : "50"}
            height={isMobile ? "40" : "50"}
            viewBox="0 0 24 24"
            className="filter drop-shadow-[0_0_10px_rgba(244,114,182,0.7)]"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="none"
              stroke="rgb(244,114,182)"
              strokeWidth="1.5"
              className="animate-glow"
            />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 10px rgba(244, 114, 182, 0.7));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(244, 114, 182, 0.9));
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GlowingHeartsBackground;
