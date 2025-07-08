import { type Signal, signal } from '@preact/signals';
import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import type { FENChar } from '../types/piece.ts';
import { createPositions } from '../utils/create-positions.ts';

type GameContextType = {
  positions: Signal<FENChar[][]>;
  candidateMoves: Signal<number[][]>;
  turn: Signal<'black' | 'white'>;
};

export const GameContext = createContext({} as GameContextType);

type Props = {
  children: ComponentChildren;
};

function createGameState() {
  const positions = signal(createPositions());
  const turn = signal<'black' | 'white'>('white');
  const candidateMoves = signal<number[][]>([]);

  return { positions, candidateMoves, turn };
}

export function GameContextProvider({ children }: Props) {
  return (
    <GameContext.Provider value={createGameState()}>
      {children}
    </GameContext.Provider>
  );
}
