import { Board } from '@/components/Board.tsx';
import { ArbiterContextProvider } from './contexts/Arbiter.tsx';

export function App() {
  return (
    <ArbiterContextProvider>
      <Board />
    </ArbiterContextProvider>
  );
}
