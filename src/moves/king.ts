import type { Move } from '@/types/move.ts';
import type { FENChar } from '@/types/piece.ts';
import type { Vector2 } from '@/types/vector2.ts';

export function getKingMoves(
  positions: FENChar[][],
  piece: FENChar,
  rank: number,
  file: number,
) {
  const moves: Move[] = [];
  const ourColor = piece === piece.toLowerCase() ? 'black' : 'white';
  const enemyColor = ourColor === 'white' ? 'black' : 'white';

  const directions: Vector2[] = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];

  for (const direction of directions) {
    const coords = {
      x: file + direction.x,
      y: rank + direction.y,
    };
    const isOutOfBounds = positions?.[coords.y]?.[coords.x] === undefined;
    const isEmptyTile = !isOutOfBounds && positions[coords.y][coords.x] === '';

    if (isOutOfBounds) {
      continue;
    }

    if (isEmptyTile) {
      moves.push({ coords, type: 'move' });
      continue;
    }

    const pieceColor =
      positions[coords.y][coords.x] ===
      positions[coords.y][coords.x].toLowerCase()
        ? 'black'
        : 'white';

    if (pieceColor === enemyColor) {
      moves.push({ coords, type: 'capture' });
    }
  }

  return moves;
}
