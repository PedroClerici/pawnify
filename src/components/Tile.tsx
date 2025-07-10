import { useComputed } from '@preact/signals';
import { useArbiter } from '@/contexts/Arbiter.tsx';
import type { FENChar } from '../types/piece.ts';
import { Highlight } from './Highlight.tsx';
import { Piece } from './Piece.tsx';

type Props = {
  file: number;
  rank: number;
};

export function Tile({ file, rank }: Props) {
  console.log('Tile Render');

  const { positions, candidateMoves, doMove } = useArbiter();

  const piece = useComputed(() => positions.value[rank][file]);

  const moveType = useComputed(
    () =>
      candidateMoves.value.find(
        (move) => move.coords.x === file && move.coords.y === rank,
      )?.type,
  );

  const fileChar = String.fromCharCode(file + 97);
  const rankChar = Math.abs(rank - 8);
  const tileClass =
    (file + rank) % 2 === 0
      ? 'bg-tile-dark text-tile-light'
      : 'bg-tile-light text-tile-dark';

  function handleDrop(event: DragEvent) {
    const [piece, originalRank, originalFile] = event
      .dataTransfer!.getData('text')
      .split(',');

    doMove(
      piece as FENChar,
      { y: +originalRank, x: +originalFile },
      { y: rank, x: file },
    );
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  return (
    <div
      className={tileClass}
      relative
      size="25"
      font="medium"
      select="none"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {file === 0 ? (
        <span absolute leading-none top="1.5" left="1.5">
          {rankChar}
        </span>
      ) : null}

      {piece.value ? (
        <Piece rank={rank} file={file} piece={piece.value} />
      ) : null}

      {moveType.value ? <Highlight type={moveType.value} /> : null}

      {rank === 7 ? (
        <span absolute leading-none bottom="1.5" right="1.5">
          {fileChar}
        </span>
      ) : null}
    </div>
  );
}
