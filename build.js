// bundle all source file into one file by es-build-gas-plugin
// https://github.com/mahaker/esbuild-gas-plugin
const { GasPlugin } = require('esbuild-gas-plugin');

require('esbuild').build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  plugins: [GasPlugin]
}).catch(() => process.exit(1))
