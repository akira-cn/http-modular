import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: 'dist/es-modular.cjs',
});