import { batch, type ReadonlySignal, signal } from '@preact/signals';
import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import {
  getBishopMoves,
  getKingMoves,
  getKnightMoves,
  getQueenMoves,
  getRookMoves,
} from '@/moves/mod.ts';
import type { FENChar } from '@/types/piece.ts';
import { convertToFen } from '@/utils/convert-to-fen.ts';
import { createPositions } from '@/utils/create-positions.ts';

type ArbiterContextType = {
  positions: ReadonlySignal<FENChar[][]>;
  candidateMoves: ReadonlySignal<number[][]>;
  turn: ReadonlySignal<'black' | 'white'>;
  doMove: (newPositions: FENChar[][]) => void;
  generateCandidateMoves: (piece: FENChar, rank: number, file: number) => void;
  clearCandidateMoves: () => void;
};

const ArbiterContext = createContext({} as ArbiterContextType);

type Props = {
  children: ComponentChildren;
};

export function ArbiterContextProvider({ children }: Props) {
  const positions = signal(createPositions());
  const turn = signal<'black' | 'white'>('white');
  const candidateMoves = signal<number[][]>([]);

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

  return (
    <ArbiterContext.Provider
      value={{
        positions,
        candidateMoves,
        turn,
        doMove,
        generateCandidateMoves,
        clearCandidateMoves,
      }}
    >
      {children}
    </ArbiterContext.Provider>
  );
}

export function useArbiter() {
  return useContext(ArbiterContext);
}
