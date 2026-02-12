import { CSSProperties } from 'react';

/**
 * Generates a solvable puzzle by simulating random valid moves from the solved state
 * This ensures the puzzle is always solvable (random shuffles can create unsolvable states)
 */
export function shufflePuzzle(moves: number = 150): number[] {
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  let emptyIndex = 8;

  for (let i = 0; i < moves; i++) {
    const validMoves = getValidMoves(emptyIndex);
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];

    // Swap tiles
    [tiles[emptyIndex], tiles[randomMove]] = [tiles[randomMove], tiles[emptyIndex]];
    emptyIndex = randomMove;
  }

  return tiles;
}

/**
 * Returns array of indices that can move into the empty space
 * A tile can move if it's orthogonally adjacent (not diagonal)
 */
export function getValidMoves(emptyIndex: number): number[] {
  const row = Math.floor(emptyIndex / 3);
  const col = emptyIndex % 3;
  const moves: number[] = [];

  // Up
  if (row > 0) moves.push(emptyIndex - 3);
  // Down
  if (row < 2) moves.push(emptyIndex + 3);
  // Left
  if (col > 0) moves.push(emptyIndex - 1);
  // Right
  if (col < 2) moves.push(emptyIndex + 1);

  return moves;
}

/**
 * Checks if the puzzle is in the solved state
 */
export function isWinCondition(tiles: number[]): boolean {
  const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  return tiles.every((tile, i) => tile === solved[i]);
}

/**
 * Checks if a tile at the given index can move (is adjacent to empty space)
 */
export function canMoveTile(tileIndex: number, emptyIndex: number): boolean {
  const validMoves = getValidMoves(emptyIndex);
  return validMoves.includes(tileIndex);
}

/**
 * Returns CSS background style for a puzzle tile
 * Uses background-position to show the correct portion of the image
 */
export function getTileBackgroundStyle(
  tileNumber: number,
  imagePath: string
): CSSProperties {
  if (tileNumber === 0) {
    return {}; // Empty tile has no background
  }

  // Position is 0-7 (tileNumber 1-8)
  const position = tileNumber - 1;
  const row = Math.floor(position / 3);
  const col = position % 3;

  return {
    backgroundImage: `url('${imagePath}')`,
    backgroundSize: '300%', // 3x3 grid = 300%
    backgroundPosition: `${col * 50}% ${row * 50}%`,
  };
}

/**
 * Formats seconds into MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
