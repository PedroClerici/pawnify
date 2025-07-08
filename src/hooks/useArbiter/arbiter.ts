import { batch } from '@preact/signals';
import { useContext } from 'preact/hooks';
import { GameContext } from '@/contexts/GameContext.tsx';
import type { FENChar } from '@/types/piece.ts';
import { convertToFen } from '@/utils/convert-to-fen.ts';
import {
  getBishopMoves,
  getKingMoves,
  getKnightMoves,
  getQueenMoves,
  getRookMoves,
} from './moves.ts';

export function arbiter() {
  const { positions, candidateMoves, turn } = useContext(GameContext);

  function doMove(newPositions: FENChar[][]) {
    batch(() => {
      positions.value = newPositions;
      turn.value = turn.value === 'white' ? 'black' : 'white';
      candidateMoves.value = [];
    });

    // Debug only!
    console.log(turn.value);
    console.log(positions.value);
    console.log(convertToFen(positions.value));
  }

  function generateCandidateMoves(piece: FENChar, rank: number, file: number) {
    const pieceType = piece.toLowerCase();

    if (pieceType === 'r')
      candidateMoves.value = getRookMoves(positions.value, piece, rank, file);

    if (pieceType === 'n')
      candidateMoves.value = getKnightMoves(positions.value, piece, rank, file);

    if (pieceType === 'b')
      candidateMoves.value = getBishopMoves(positions.value, piece, rank, file);

    if (pieceType === 'q')
      candidateMoves.value = getQueenMoves(positions.value, piece, rank, file);

    if (pieceType === 'k')
      candidateMoves.value = getKingMoves(positions.value, piece, rank, file);
  }

  function clearCandidateMoves() {
    candidateMoves.value = [];
  }

  return {
    turn,
    positions,
    candidateMoves,
    doMove,
    generateCandidateMoves,
    clearCandidateMoves,
  };
}
