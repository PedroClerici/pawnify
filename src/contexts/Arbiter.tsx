import { batch, type ReadonlySignal, useSignal } from '@preact/signals';
import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import {
  getBishopMoves,
  getKingMoves,
  getKnightMoves,
  getPawnMoves,
  getQueenMoves,
  getRookMoves,
} from '@/moves/mod.ts';
import type { FENChar } from '@/types/piece.ts';
import { createPositions } from '@/utils/create-positions.ts';
import type { Move } from '../types/move.ts';
import type { Vector2 } from '../types/vector2.ts';

type ArbiterContextType = {
  positions: ReadonlySignal<FENChar[][]>;
  previousPositions: ReadonlySignal<FENChar[][]>;
  candidateMoves: ReadonlySignal<Move[]>;
  turn: ReadonlySignal<'black' | 'white'>;
  doMove: (
    piece: FENChar,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) => void;
  generateCandidateMoves: (piece: FENChar, rank: number, file: number) => void;
  clearCandidateMoves: () => void;
};

const ArbiterContext = createContext({} as ArbiterContextType);

type Props = {
  children: ComponentChildren;
};

export function ArbiterContextProvider({ children }: Props) {
  const previousPositions = useSignal<FENChar[][]>([]);
  const positions = useSignal(createPositions());
  const turn = useSignal<'black' | 'white'>('white');
  const candidateMoves = useSignal<Move[]>([]);

  function doMove(piece: FENChar, from: Vector2, to: Vector2) {
    // console.log(from);
    // console.log(to);
    const updatedPositions = structuredClone(positions.value);

    const move = candidateMoves.value.find(
      (move) => move.coords.y === to.y && move.coords.x === to.x,
    );

    if (!move || move.type === 'enPassant') {
      return;
    }

    const enPassant = candidateMoves.value.find(
      (move) => move.type === 'enPassant',
    );

    if (move.type === 'move' || move.type === 'capture') {
      updatedPositions[from.y][from.x] = '';
      updatedPositions[to.y][to.x] = piece;

      if (enPassant) {
        updatedPositions[enPassant.coords.y][enPassant.coords.x] = '';
      }
    }

    batch(() => {
      previousPositions.value = structuredClone(positions.value);
      positions.value = updatedPositions;
      turn.value = turn.value === 'white' ? 'black' : 'white';
      candidateMoves.value = [];
    });

    // Debug only!
    // console.log(previousPositions.value);
    // console.log(positions.value);
    // console.log(convertToFen(positions.value));
    // console.log(turn.value);
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

    if (pieceType === 'p') {
      candidateMoves.value = getPawnMoves(
        positions.value,
        previousPositions.value,
        piece,
        rank,
        file,
      );
    }
  }

  function clearCandidateMoves() {
    candidateMoves.value = [];
  }

  return (
    <ArbiterContext.Provider
      value={{
        previousPositions,
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
