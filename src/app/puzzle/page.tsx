"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  shufflePuzzle,
  isWinCondition,
  canMoveTile,
  getTileBackgroundStyle,
  formatTime,
} from "@/utils/puzzleHelpers";

const PUZZLE_IMAGE = "/images/puzzle-image.png";

const PuzzlePage = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Initialize puzzle on mount
  useEffect(() => {
    const shuffled = shufflePuzzle(150);
    setTiles(shuffled);
    setEmptyIndex(shuffled.indexOf(0));
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !showWin) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, showWin]);

  const handleTileClick = (index: number) => {
    // Don't allow moves if game is won or during preview
    if (showWin || showPreview) return;

    // Start timer on first move
    if (moves === 0 && !isRunning) {
      setIsRunning(true);
    }

    // Check if this tile can move
    if (!canMoveTile(index, emptyIndex)) {
      return;
    }

    // Swap tiles
    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];

    setTiles(newTiles);
    setEmptyIndex(index);
    setMoves((prev) => prev + 1);

    // Check win condition
    if (isWinCondition(newTiles)) {
      setShowWin(true);
      setIsRunning(false);
    }
  };

  const resetPuzzle = () => {
    const shuffled = shufflePuzzle(150);
    setTiles(shuffled);
    setEmptyIndex(shuffled.indexOf(0));
    setMoves(0);
    setTimer(0);
    setIsRunning(false);
    setShowWin(false);
    setShowPreview(false);
  };

  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  if (showWin) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-white flex flex-col items-center justify-center p-4">
        <div className="text-center px-4 relative">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto mb-6">
            <Image
              src={PUZZLE_IMAGE}
              alt="Our moment together"
              fill
              className="object-contain rounded-2xl shadow-2xl"
              priority
            />
          </div>
          <div className="relative inline-block p-6 md:p-8 rounded-3xl max-w-2xl">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-3xl -z-10" />
            <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">
              You did it, my love! yay
            </h1>
            <div className="text-pink-400 text-base md:text-lg mb-6">
              Solved in <span className="font-bold">{moves}</span> moves •{" "}
              <span className="font-bold">{formatTime(timer)}</span>
            </div>
            <button
              onClick={resetPuzzle}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-200 hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-2">
          Sliding Puzzle
        </h1>
        <p className="text-pink-500 text-sm md:text-base mb-6">
          Click tiles to slide them into place
        </p>

        {/* Preview Modal */}
        {showPreview && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={togglePreview}
          >
            <div className="relative">
              <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                <Image
                  src={PUZZLE_IMAGE}
                  alt="Preview"
                  fill
                  className="object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>
              <p className="text-white text-center mt-4 text-sm md:text-base">
                Click anywhere to close
              </p>
            </div>
          </div>
        )}

        {/* Puzzle Grid */}
        <div className="inline-block bg-pink-200 p-1 md:p-1.5 rounded-2xl shadow-xl mb-6">
          <div className="grid grid-cols-3 gap-0.5 md:gap-1 w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            {tiles.map((tile, index) => {
              const isEmpty = tile === 0;
              const isMovable = canMoveTile(index, emptyIndex);

              return (
                <div
                  key={index}
                  onClick={() => handleTileClick(index)}
                  className={`
                    rounded transition-all duration-200
                    ${
                      isEmpty
                        ? "bg-pink-100/30 border border-dashed border-pink-300/50"
                        : "bg-pink-100 border border-pink-300/60"
                    }
                    ${
                      isMovable && !isEmpty
                        ? "cursor-pointer hover:scale-105 hover:border-pink-500 hover:shadow-lg"
                        : isEmpty
                          ? ""
                          : "cursor-not-allowed"
                    }
                  `}
                  style={
                    !isEmpty ? getTileBackgroundStyle(tile, PUZZLE_IMAGE) : {}
                  }
                  aria-label={isEmpty ? "Empty space" : `Tile ${tile}`}
                />
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 md:gap-8 mb-6 text-pink-600">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">{moves}</div>
            <div className="text-sm md:text-base">Moves</div>
          </div>
          <div className="w-px h-12 bg-pink-300" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">
              {formatTime(timer)}
            </div>
            <div className="text-sm md:text-base">Time</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 md:gap-4 flex-wrap justify-center">
          <button
            onClick={togglePreview}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 hover:scale-105"
          >
            Preview
          </button>
          <button
            onClick={resetPuzzle}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 hover:scale-105"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuzzlePage;
