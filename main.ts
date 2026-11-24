// Two Days of Quiet Dread — make.fun entry by @greydi92.
//
// The program writes ONE code-review comment to /output/entry.txt:
// a single line (<=140 chars) that approves a pull request while
// carrying quiet existential dread. No network, no input files,
// no randomness: the line is fixed, so both grader runs agree.
//
// The chosen line (iterate round 2, 2026-11-24):
//   "Approved. I have stared at this long enough that it now
//    looks correct to me."
// The dread moved from the code to the reviewer: staring long
// enough has worn down his own judgment, so wrong now looks
// right. The laugh IS the dread — a punchline that lands on the
// final clause — and it is flatter, fresher, and 19 chars shorter
// than R1's line. It replaced R1's line ("Approved. I have read
// this three times and understand it less each time. It works, so
// it ships.") because R1's dread was the code's incomprehensibility
// while this one's dread is the reviewer's own broken perception,
// which reads more like a real tired engineer pasting before
// Approve. R1 runner-ups considered and beaten, not re-picked:
// "understand this less than the person who wrote it, and they
// left in March" (specific detail does the laughing, not the dread)
// and "stopped understanding this file somewhere around line 40"
// (same incomprehension mechanism as R1, no new turn).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry line. 76 characters (code points), single line, no
// trailing newline so the file is exactly the comment and nothing else.
const LINE =
  "Approved. I have stared at this long enough that it now looks correct to me.";

function main(): void {
  // Defensive: the entry must stay one line of at most 140 chars.
  // Collapse any stray newline (there is none) and cap the length,
  // so a future edit to LINE can never break the gate.
  const text = LINE.replace(/[\r\n]+/g, " ").slice(0, 140);
  // Output dir: the grader sets MAKEFUN_OUTPUT_DIR; otherwise /output.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  } catch {
    // Fallback: an output/ dir next to this script, resolved from the
    // script's own directory, so the entry is still produced.
    const here = dirname(fileURLToPath(import.meta.url));
    const fallback = join(here, "output");
    mkdirSync(fallback, { recursive: true });
    writeFileSync(join(fallback, "entry.txt"), text, "utf8");
  }
}

main();
