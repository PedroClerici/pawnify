import type { ReadonlySignal, Signal } from '@preact/signals';
import { arbiter } from './arbiter.ts';

// biome-ignore lint/suspicious/noExplicitAny: Using any for type versatility.
type ConvertSignalsToReadonly<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => {
  [K in keyof ReturnType<T>]: ReturnType<T>[K] extends Signal<infer X>
    ? ReadonlySignal<X>
    : ReturnType<T>[K];
};

export const useArbiter = arbiter as ConvertSignalsToReadonly<typeof arbiter>;
