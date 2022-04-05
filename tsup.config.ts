import type { Options } from 'tsup'

export const tsup: Options = {
  // splitting: false,
  sourcemap: false,
  format: ['cjs', 'esm'],
  dts: true,
  entry: [
    'src/index.ts',
  ],
  external: [
    'vue',
  ],
}
