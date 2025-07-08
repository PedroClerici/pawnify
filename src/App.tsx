import { Board } from '@/components/Board.tsx';
import { GameContextProvider } from './contexts/GameContext.tsx';

export function App() {
  return (
    <GameContextProvider>
      <Board />
    </GameContextProvider>
  );
}
