import { useArbiter } from '@/contexts/Arbiter.tsx';
import type { FENChar } from '../types/piece.ts';
import type { Vector2 } from '../types/vector2.ts';

type Props = {
  rank: number;
  file: number;
  piece: FENChar;
};

export function Piece({ rank, file, piece }: Props) {
  const { turn, generateCandidateMoves, clearCandidateMoves } = useArbiter();
  const color = piece === piece.toLowerCase() ? 'black' : 'white';
  const isDraggable = turn.value === color;

  function handleDragStart(event: DragEvent) {
    const target = event.target as HTMLDivElement;

    const position: Vector2 = {
      x: target.offsetWidth / 2,
      y: target.offsetHeight / 2,
    };

    event.dataTransfer?.setDragImage(target, position.x, position.y);
    event.dataTransfer?.setData('text/plain', `${piece},${rank},${file}`);

    setTimeout(() => {
      target.style.display = 'none';
    });

    // console.log(`y: ${rank} x: ${file}`);
    generateCandidateMoves(piece, rank, file);
  }

  function handleDragEnd(event: DragEvent) {
    (event.target as HTMLImageElement).style.display = 'block';
    clearCandidateMoves();
  }

  return (
    <div
      absolute
      size="full"
      z="1"
      className={`bg-[url(/pieces/${piece}.png)] bg-cover`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
}
