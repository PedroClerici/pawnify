import type { FENChar } from '../types/piece.ts';

export function convertToFen(positions: FENChar[][]) {
  const fenRanks = [];

  for (let i = 0; i < 8; i++) {
    const rank = positions[i];

    let fenRank = '';
    let emptyCount = 0;

    for (let j = 0; j < 8; j++) {
      const piece = rank[j];

      if (piece === '') {
        emptyCount++;
        continue;
      }

      if (emptyCount > 0) {
        fenRank += emptyCount;
        emptyCount = 0;
      }

      fenRank += piece;
    }

    if (emptyCount > 0) {
      fenRank += emptyCount;
    }

    fenRanks.push(fenRank);
  }

  // TODO: implement this:
  // - Active color: 'w' (white to move)
  // - Castling availability: '-' (no castling available)
  // - En passant target square: '-' (no en passant target)
  // - Halfmove clock: '0' (number of halfmoves since the last capture or pawn advance)
  // - Fullmove number: '1' (starts at 1 and increments after Black's move)

  return `${fenRanks.join('/')}`;
}
