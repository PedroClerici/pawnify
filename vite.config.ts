/// <reference lib="deno.ns" />

import deno from '@deno/vite-plugin';
import preact from '@preact/preset-vite';
import prefresh from '@prefresh/vite';
import unocss from 'unocss/vite';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';

const plugins: (PluginOption | PluginOption[])[] = [deno(), unocss()];

if (Deno.env.get('USE_REFRESH') === 'true') {
  plugins.unshift(prefresh());
} else {
  plugins.push(preact());
}

// https://vitejs.dev/config/
export default defineConfig({ plugins });
