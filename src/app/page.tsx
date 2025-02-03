"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { phrases } from "@/utils/phrases";
import BackgroundMusic from "@/components/BackgroundMusic";
import GlowingHeartsBackground from "@/components/GlowingHearts";
import FloatingPetals from "@/components/Petals";

const ValentineProposal = () => {
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({
    position: "static",
  });
  const [noButtonText, setNoButtonText] = useState("No");
  const [showSuccess, setShowSuccess] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const moveButton = () => {
    const padding = 20;
    const buttonWidth = 120;
    const buttonHeight = 40;
    const safeDistance = 150; // Minimum distance from Yes button

    // Calculate safe boundaries
    const maxX = Math.max(0, windowDimensions.width - buttonWidth - padding);
    const maxY = Math.max(0, windowDimensions.height - buttonHeight - padding);

    // Yes button center position
    const yesButtonCenter = {
      x: windowDimensions.width / 2,
      y: windowDimensions.height / 2,
    };

    let x, y;
    let isValidPosition = false;
    let attempts = 0;

    do {
      x = Math.min(Math.max(padding, Math.random() * maxX), maxX);
      y = Math.min(Math.max(padding, Math.random() * maxY), maxY);

      // Calculate distance from Yes button center to new No button center
      const distance = Math.sqrt(
        Math.pow(x + buttonWidth / 2 - yesButtonCenter.x, 2) +
          Math.pow(y + buttonHeight / 2 - yesButtonCenter.y, 2),
      );

      // Position is valid if it's far enough from the Yes button
      isValidPosition = distance >= safeDistance;

      attempts++;
    } while (!isValidPosition && attempts < 50);

    // Fallback position if no valid spot found
    if (!isValidPosition) {
      const angle = Math.random() * 2 * Math.PI;
      x = yesButtonCenter.x + Math.cos(angle) * safeDistance - buttonWidth / 2;
      y = yesButtonCenter.y + Math.sin(angle) * safeDistance - buttonHeight / 2;

      // Ensure the fallback position is within bounds
      x = Math.min(Math.max(padding, x), maxX);
      y = Math.min(Math.max(padding, y), maxY);
    }

    setNoButtonStyle({
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      transition: "all 0.3s ease",
    });
    setNoButtonText(phrases[Math.floor(Math.random() * phrases.length)]);
    setYesScale(yesScale + 0.2);
  };

  const handleYes = () => {
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen w-full bg-pink-50 flex flex-col items-center justify-center p-4 relative z-10 overflow-hidden">
      <GlowingHeartsBackground showHearts={showSuccess} />
      <BackgroundMusic play={showSuccess} />

      {!showSuccess ? (
        <>
          <FloatingPetals />
          <div className="w-full max-w-lg text-center px-4">
            <div className="relative w-48 h-48 md:w-80 md:h-80 mx-auto mb-4">
              <Image
                src="https://media.tenor.com/BBS_EGuWfVsAAAAj/peach-shy.gif"
                alt="Milk and Mocha Bears Love"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-pink-600 mb-8">
              <div className="flex flex-col items-center justify-center gap-3">
                <div>Riddhima Kapoor!</div>
                <div>Will... you.. be. my Valentine?</div>
              </div>
            </h1>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleYes}
                style={{
                  transform: `scale(${yesScale})`,
                  transition: "transform 0.3s ease",
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-2xl text-md md:text-xl whitespace-nowrap"
              >
                Yes
              </button>
              <button
                onMouseOver={moveButton}
                onClick={moveButton}
                style={noButtonStyle}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-2xl text-md md:text-xl whitespace-normal max-w-[200px] min-h-[40px]"
              >
                {noButtonText}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center px-4 relative">
          <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] mx-auto mb-4">
            <Image
              src="https://gifdb.com/images/high/back-hug-morning-kisses-vc1o8cdcbgk7twpc.webp"
              alt="us kissing"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
          <div className="relative inline-block p-1 rounded-3xl">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl -z-10" />
            <h1 className="text-2xl md:text-4xl font-bold text-pink-600 mb-4">
              I love you baby.
            </h1>
            <p className="text-lg md:text-xl text-pink-500">
              You are precious to me, and I want to be with you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValentineProposal;
