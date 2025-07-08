import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
import { defineConfig, presetAttributify, presetWind4 } from 'unocss';

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
});
