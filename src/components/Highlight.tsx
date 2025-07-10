import type { Move } from '@/types/move.ts';

type Props = {
  type: Move['type'];
};

export function Highlight({ type }: Props) {
  const highlightClass = {
    capture: 'size-full border-10  border-black ',
    enPassant: 'size-full border-10  border-black ',
    move: 'm-auto  size-1/3  bg-black ',
  };

  return (
    <span
      absolute
      opacity-25
      inset="0"
      rounded="full"
      className={highlightClass[type]}
    />
  );
}
