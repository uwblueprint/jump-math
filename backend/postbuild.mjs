/* eslint-disable no-console */

import { promises as fs } from "fs";
import glob from "fast-glob";
import path from "path";

const syncFile = async (src) => {
  const dest = path.join("./build", src);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);

  console.info(`Copied ${src} -> ${dest}`);
};

const libFiles = await glob("lib/**/*.cjs");
await Promise.all(libFiles.map(syncFile));

console.info(`Synced ${libFiles.length} CommonJS module(s).`);
