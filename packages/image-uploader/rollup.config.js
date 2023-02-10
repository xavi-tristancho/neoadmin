import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.js",
  output: {
    sourcemap: true,
    file: "./lib/index.js",
    format: "cjs",
  },
  plugins: [
    peerDepsExternal(),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    postcss([".css"]),
    commonjs(),
  ],
};
