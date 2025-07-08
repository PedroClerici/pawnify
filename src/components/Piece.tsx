import { useArbiter } from '../hooks/useArbiter/mod.ts';
import type { FENChar } from '../types/piece.ts';

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
    event.dataTransfer?.setData('text/plain', `${piece},${rank},${file}`);
    setTimeout(() => {
      (event.target as HTMLImageElement).style.display = 'none';
    });

    // console.log(`y: ${rank} x: ${file}`);
    generateCandidateMoves(piece, rank, file);

    console.log(color, isDraggable, piece);
  }

  function handleDragEnd(event: DragEvent) {
    (event.target as HTMLImageElement).style.display = 'block';
    clearCandidateMoves();
  }

  return (
    <img
      relative
      size="full"
      z="1"
      src={`/pieces/${piece}.png`}
      alt={piece}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
}
