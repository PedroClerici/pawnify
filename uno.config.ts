import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
import { defineConfig, presetAttributify, presetWind4 } from 'unocss';

const FENChars = ['r', 'n', 'b', 'q', 'k', 'p', 'R', 'N', 'B', 'Q', 'K', 'P'];

export default defineConfig({
  theme: {
    colors: {
      'tile-dark': '#f0d8b7',
      'tile-light': '#b48764',
      background: '#202020',
    },
  },
  presets: [presetAttributify(), presetWind4()],
  transformers: [transformerAttributifyJsx()],
  safelist: FENChars.map((piece) => `bg-[url(/pieces/${piece}.png)]`),
});
