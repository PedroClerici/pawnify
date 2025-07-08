import { useComputed } from '@preact/signals';
import { useArbiter } from '../hooks/useArbiter/mod.ts';
import type { FENChar } from '../types/piece.ts';
import { Piece } from './Piece.tsx';

type Props = {
  file: number;
  rank: number;
};

export function Tile({ file, rank }: Props) {
  console.log('Tile Render');

  const { positions, candidateMoves, doMove } = useArbiter();

  const piece = useComputed(() => positions.value[rank][file]);

  const isValidMove = useComputed(() =>
    candidateMoves.value.find((move) => move[0] === rank && move[1] === file),
  );

  const highlightType = useComputed(() => {
    if (!isValidMove.value) {
      return null;
    }

    if (positions.value[rank][file]) {
      return 'attacking';
    }

    return 'highlight';
  });

  const highlights = {
    attacking:
      'absolute inset-0 size-full border-10 rounded-full border-black opacity-25',
    highlight:
      'absolute m-auto inset-0 size-1/3 rounded-full bg-black opacity-25',
    '': '',
  };

  const fileChar = String.fromCharCode(file + 97);
  const rankChar = Math.abs(rank - 8);
  const tileClass =
    (file + rank) % 2 === 0
      ? 'bg-tile-dark text-tile-light'
      : 'bg-tile-light text-tile-dark';

  // TODO: Transfer move validation logic to useArbiter
  function handleDrop(event: DragEvent) {
    if (!isValidMove.value) {
      return;
    }

    const updatedPositions = [...positions.value];

    const [piece, originalRank, originalFile] = event
      .dataTransfer!.getData('text')
      .split(',');

    updatedPositions[+originalRank][+originalFile] = '';
    updatedPositions[rank][file] = piece as FENChar;

    doMove(updatedPositions);
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  return (
    <div
      className={tileClass}
      relative
      size="25"
      font-medium
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

      {isValidMove.value ? (
        <span className={highlights[highlightType.value!]} />
      ) : null}

      {rank === 7 ? (
        <span absolute leading-none bottom="1.5" right="1.5">
          {fileChar}
        </span>
      ) : null}
    </div>
  );
}
