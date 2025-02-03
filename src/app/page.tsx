"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { phrases } from "@/utils/phrases";

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
    const maxWidth = windowDimensions.width - 120;
    const maxHeight = windowDimensions.height - 60;
    let x, y, distance;

    do {
      x = Math.random() * (maxWidth > 0 ? maxWidth : 0);
      y = Math.random() * (maxHeight > 0 ? maxHeight : 0);
      const centerX = windowDimensions.width / 2;
      const centerY = windowDimensions.height / 2;
      distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    } while (distance < 150);

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
    <div className="min-h-screen w-full bg-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* <BloomingFlower show={showSuccess} /> */}
      {!showSuccess ? (
        <>
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
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-2xl text-lg md:text-xl whitespace-nowrap"
              >
                Yes
              </button>
              <button
                onMouseOver={moveButton}
                onClick={moveButton}
                style={noButtonStyle}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-2xl text-lg md:text-xl whitespace-nowrap"
              >
                {noButtonText}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center px-4">
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
          <h1 className="text-2xl md:text-4xl font-bold text-pink-600 mb-4">
            I love you baby.
          </h1>
          <p className="text-lg md:text-xl text-pink-500 mx-1 md:mx-0">
            You are precious to me, and I want to be with you.
          </p>
        </div>
      )}
    </div>
  );
};

export default ValentineProposal;
