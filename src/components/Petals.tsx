"use client";
import React, { useState, useEffect } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
}

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const createPetals = () => {
      const isMobile = window.innerWidth <= 768;
      const numPetals = isMobile ? 15 : 25;
      return Array.from({ length: numPetals }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * (isMobile ? 15 : 25) + 10,
        rotation: Math.random() * 360,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 10,
      }));
    };

    setPetals(createPetals());
    const interval = setInterval(() => setPetals(createPetals()), 15000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute will-change-transform"
          style={{
            left: `${petal.left}%`,
            top: "-5%",
            animation: `petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 100 100"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              animation: `petal-spin ${Math.random() * 2 + 3}s linear infinite`,
            }}
            className="fill-pink-200"
          >
            <path d="M50 0 C60 30 90 40 100 50 C90 60 60 70 50 100 C40 70 10 60 0 50 C10 40 40 30 50 0" />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes petal-fall {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(120vh)
              translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }
        @keyframes petal-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingPetals;
