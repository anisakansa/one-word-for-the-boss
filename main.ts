// One Word for the Boss — entry program.
// Writes exactly one word describing the boss to the grader's output file.
// SPDX-License-Identifier: MIT
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY = "Ghost";

function isSingleWord(text: string): boolean {
  return text.length >= 1 && text.length <= 30 && !/\s/.test(text);
}

if (!isSingleWord(ENTRY)) {
  throw new Error("entry must be exactly one word of 1-30 characters");
}

// The grader mounts the repo read-only, so the entry must never be written
// next to this script. Write to the grader's absolute /output first, and
// only fall back to a cwd-relative output/ directory if /output is unusable.
const TARGETS = ["/output/entry.txt", "output/entry.txt"];

let written = false;
for (const target of TARGETS) {
  try {
    mkdirSync(target.slice(0, target.lastIndexOf("/")) || ".", {
      recursive: true,
    });
    writeFileSync(target, ENTRY, "utf8");
    written = true;
    break;
  } catch {
    // Try the next target; the last resort throws below.
  }
}

if (!written) {
  throw new Error("could not write the entry to any output target");
}
