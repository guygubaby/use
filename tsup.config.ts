import type { Options } from 'tsup'

export const tsup: Options = {
  splitting: true,
  sourcemap: false,
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  entry: [
    'src/index.ts',
  ],
  external: [
    'vue',
  ],
}
