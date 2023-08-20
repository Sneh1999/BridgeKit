import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import preserveDirectives from "rollup-plugin-preserve-directives";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./dist",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
      },
    ],
    plugins: [
      resolve(),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extract: "styles.css",
        extensions: [".css"],
        minimize: true,
      }),
      preserveDirectives(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: [/node_modules/],
  },
];
