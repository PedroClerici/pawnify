import type { FENChar } from '@/types/piece.ts';

export function getKingMoves(
  positions: FENChar[][],
  piece: FENChar,
  rank: number,
  file: number,
) {
  const moves: number[][] = [];
  const ourColor = piece === piece.toLowerCase() ? 'black' : 'white';
  const enemyColor = ourColor === 'white' ? 'black' : 'white';

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const direction of directions) {
    const y = rank + direction[0];
    const x = file + direction[1];
    const isOutOfBounds = positions?.[y]?.[x] === undefined;
    const isEmptyTile = !isOutOfBounds && positions[y][x] === '';

    if (isOutOfBounds) {
      continue;
    }

    if (isEmptyTile) {
      moves.push([y, x]);
      continue;
    }

    const pieceColor =
      positions[y][x] === positions[y][x].toLowerCase() ? 'black' : 'white';

    if (pieceColor === enemyColor) {
      moves.push([y, x]);
    }
  }

  return moves;
}
