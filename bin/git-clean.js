#!/usr/bin/env node

import { execSync } from "child_process";

// Parse args
const args = process.argv.slice(2);

let dryRun = false;
let force = false;
const keepBranches = [];

for (const arg of args) {
  if (arg === "--dry-run") dryRun = true;
  else if (arg === "--force") force = true;
  else keepBranches.push(arg);
}

if (keepBranches.length === 0) {
  console.log("❌ Usage: git-clean [--dry-run] [--force] main develop");
  process.exit(1);
}

// Get current branch
const currentBranch = execSync(
  "git rev-parse --abbrev-ref HEAD"
).toString().trim();

keepBranches.push(currentBranch);

console.log("👉 Keeping branches:", keepBranches.join(", "));
console.log("");

// Get all branches
const branches = execSync(
  "git for-each-ref --format='%(refname:short)' refs/heads/"
)
  .toString()
  .trim()
  .split("\n");

// Filter branches
const toDelete = branches.filter(
  (b) => !keepBranches.includes(b)
);

if (toDelete.length === 0) {
  console.log("✅ Nothing to delete");
  process.exit(0);
}

console.log("🧹 Branches to delete:");
console.log(toDelete.join("\n"));
console.log("");

if (dryRun) {
  console.log("🔍 Dry run — nothing deleted");
  process.exit(0);
}

// Confirm
process.stdout.write(
  "⚠️  Are you sure you want to delete these branches? (y/N): "
);

process.stdin.setEncoding("utf8");
process.stdin.once("data", (data) => {
  const input = data.trim().toLowerCase();

  if (input !== "y") {
    console.log("❌ Aborted");
    process.exit(0);
  }

  const flag = force ? "-D" : "-d";

  for (const branch of toDelete) {
    console.log(`🗑 Deleting ${branch}`);
    execSync(`git branch ${flag} ${branch}`, { stdio: "inherit" });
  }

  console.log("\n✅ Done cleaning branches");
  process.exit(0);
});