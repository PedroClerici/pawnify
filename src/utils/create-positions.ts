import type { FENChar } from '../types/piece.ts';

export function createPositions() {
  const positions: FENChar[][] = Array(8)
    .fill('')
    .map(() => Array(8).fill(''));

  // for (let i = 0; i < 8; i++) {
  //   positions[1][i] = 'p';
  //   positions[6][i] = 'P';
  // }

  positions[0][0] = 'r';
  positions[0][1] = 'n';
  positions[0][2] = 'b';
  positions[0][3] = 'q';
  positions[0][4] = 'k';
  positions[0][5] = 'b';
  positions[0][6] = 'n';
  positions[0][7] = 'r';

  positions[7][0] = 'R';
  positions[7][1] = 'N';
  positions[7][2] = 'B';
  positions[7][3] = 'Q';
  positions[7][4] = 'K';
  positions[7][5] = 'B';
  positions[7][6] = 'N';
  positions[7][7] = 'R';

  return positions;
}
