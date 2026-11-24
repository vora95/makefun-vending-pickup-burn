// Vending Machine Pickup Line — burn entry.
// Writes one pickup line (<=200 chars) spoken by a vending machine to a
// passing human, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The joke: the machine has hummed in the corner for three years, and this
// human is the first who ever made its coil turn — the punch lands on the
// last words: B7 is free AND the machine breaks its own strictest rule
// (exact change only) for her. Machine world throughout: humming, coil,
// B7, exact change.
// Validated locally: run it twice, read-back OK, no trailing newline.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "Hey — I've been standing here humming for three years, and you're the first human who ever made my coil turn. B7 is on the house, no exact change required.";

// Validation: 1-200 chars, single line, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 200) throw new Error(`length ${ENTRY.length} out of 1-200`);
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: file on disk must be byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${ENTRY.length} chars, sha256 ${sha}, read-back OK`);
