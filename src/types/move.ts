import type { Vector2 } from './vector2.ts';

export type Move = {
  coords: Vector2;
  type: 'move' | 'capture' | 'enPassant';
};
