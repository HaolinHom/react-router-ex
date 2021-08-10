import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';
const path = require('path');
const pkg = require('./package.json');
const { babel } = require('@rollup/plugin-babel');

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve('./src/index.ts'),
  output: {
    format: 'esm',
    name: pkg.name,
    file: resolve(pkg.module),
  },
  external: ['lodash-es', 'lodash-es/clone'],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    cleaner({
      targets: ['./lib/index.d.ts', './lib/index.js'],
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
    }),
  ],
};
