import * as esbuild from "esbuild";
import readdir from "recursive-readdir-files";

const isWatching = process.argv.includes("--watch");

const getAllEntryPoints = async (rootPath) =>
  (await readdir(rootPath))
    .map(({ path }) => path)
    .filter(
      (path) =>
        /\.tsx?$/.test(path) &&
        !path.endsWith(".css.ts") &&
        !path.includes(".test.")
    );

const baseBuildConfig = {
  banner: {
    js: '"use client";', // Required for Next 13 App Router
  },
  bundle: true,
  format: "esm",
  platform: "browser",
  splitting: true,
};

async function main() {
  const mainBuild = await esbuild.context({
    ...baseBuildConfig,
    entryPoints: [
      "./src/index.ts",

      // esbuild needs these additional entry points in order to support tree shaking while also supporting CSS
      //   ...(await getAllEntryPoints('src/themes')),

      // The build output is cleaner when bundling all components into a single chunk
      // This is done assuming that consumers use most of the components in the package, which is a reasonable assumption for now
      "./src/components/index.ts",
    ],
    outdir: "dist",
    plugins: [
      {
        name: "make-all-packages-external",
        setup(build) {
          let filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
          build.onResolve({ filter }, (args) => ({
            external: true,
            path: args.path,
          }));
        },
      },
    ],
  });

  if (isWatching) {
    await mainBuild.watch();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
