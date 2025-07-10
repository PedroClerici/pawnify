import type { Move } from '@/types/move.ts';
import type { FENChar } from '@/types/piece.ts';
import type { Vector2 } from '@/types/vector2.ts';

export function getPawnMoves(
  positions: FENChar[][],
  previousPositions: FENChar[][],
  piece: FENChar,
  rank: number,
  file: number,
) {
  const moves: Move[] = [];
  const ourColor = piece === piece.toLowerCase() ? 'black' : 'white';
  const ourForward = ourColor === 'white' ? -1 : 1;
  const enemyColor = ourColor === 'white' ? 'black' : 'white';

  const directions: Vector2[] = [
    { x: 0, y: ourForward },
    { x: -1, y: ourForward },
    { x: 1, y: ourForward },
  ];

  for (const direction of directions) {
    const coords = {
      x: file + direction.x,
      y: rank + direction.y,
    };
    const isOutOfBounds = positions?.[coords.y]?.[coords.x] === undefined;
    const isEmptyTile = !isOutOfBounds && positions[coords.y][coords.x] === '';
    const isStartingRank = rank % 5 === 1;
    const isEnPassantRank = rank === 4 || rank === 3;
    const isCorner = !isOutOfBounds && coords.x !== file;

    if (isOutOfBounds) {
      continue;
    }

    if (isEmptyTile && !isCorner) {
      moves.push({ coords, type: 'move' });
    }

    if (isStartingRank && !isCorner) {
      moves.push({
        coords: { y: coords.y + ourForward, x: coords.x },
        type: 'move',
      });
    }

    if (!isEmptyTile && isCorner) {
      const cornerPieceColor =
        positions[coords.y][coords.x] ===
        positions[coords.y][coords.x].toLowerCase()
          ? 'black'
          : 'white';

      if (cornerPieceColor === enemyColor) {
        moves.push({ coords, type: 'capture' });
      }
    }

    if (isEnPassantRank) {
      const isEnPassantPiece =
        previousPositions[coords.y + direction.y][coords.x].toLowerCase() ===
          'p' && positions[rank][coords.x].toLowerCase() === 'p';

      const enPassantPieceColor =
        previousPositions[coords.y + direction.y][coords.x] ===
        previousPositions[coords.y + direction.y][coords.x].toLowerCase()
          ? 'black'
          : 'white';

      if (isEnPassantPiece && enPassantPieceColor === enemyColor && isCorner) {
        moves.push({ coords, type: 'move' });
        moves.push({ coords: { y: rank, x: coords.x }, type: 'enPassant' });
      }
    }
  }

  return moves;
}
