import type { FENChar } from '@/types/piece.ts';

export function getQueenMoves(
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
    for (let i = 1; i < 8; i++) {
      const y = rank + i * direction[0];
      const x = file + i * direction[1];
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
        break;
      }

      if (pieceColor === ourColor) {
        break;
      }
    }
  }

  return moves;
}
