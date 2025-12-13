import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['esm'],
  clean: true,
  minify: true,
  target: 'node18',
  shims: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
})
