const buble = require('@rollup/plugin-buble')
const commonjs = require('@rollup/plugin-commonjs')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const {terser} = require('rollup-plugin-terser')
const pkg = require('./package.json')

module.exports = [
  // ES5 Non-minified
  {
    input: 'build/es5.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'JSON5',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      buble({transforms: {dangerousForOf: true}}),
    ],
  },
  // ES5 Minified
  {
    input: 'build/es5.js',
    output: {
      file: pkg.browser.replace(/\.js$/, '.min.js'),
      format: 'umd',
      name: 'JSON5',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      buble({transforms: {dangerousForOf: true}}),
      terser(),
    ],
  },
  // ES6 Modules Non-minified
  {
    input: 'lib/index.js',
    output: {
      file: pkg.browser.replace(/\.js$/, '.mjs'),
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs()],
  },
  // ES6 Modules Minified
  {
    input: 'lib/index.js',
    output: {
      file: pkg.browser.replace(/\.js$/, '.min.mjs'),
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs(), terser()],
  },
]
