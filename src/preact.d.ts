import type { AttributifyAttributes } from 'unocss/preset-attributify';

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
      inset?: string;
    }
  }
}
