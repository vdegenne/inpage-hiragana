import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/content.js',
  output: { file: 'content.js', format: 'es' },
  plugins: [nodeResolve(), json(), terser()]
}