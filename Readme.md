# git-clean-branches

A simple CLI tool to delete all local Git branches except the ones you want to keep.

Perfect for keeping your repo clean without manually deleting dozens of branches.

## Installation
Global install (recommended)
`npm install -g git-clean-branches`

Or use with npx
`npx git-clean-branches main develop`

## Usage
> git-clean [options] <branches-to-keep...>

Example
`git-clean main develop`

This will:

Keep main, develop, and your current branch
Delete all other local branches

## Options
> --dry-run

Preview what will be deleted without actually deleting anything.

`git-clean --dry-run main develop`
> --force

Force delete branches (uses git branch -D instead of -d).

`git-clean --force main develop`
## How it works
- Fetches all local branches
- Automatically includes your current branch in the keep list
- Filters out branches you want to keep
- Prompts for confirmation before deletion
- Deletes remaining branches safely (or forcefully if specified)
## Safety Features
- Never deletes the current branch
- Confirmation prompt before deletion
- Dry-run mode to preview changes
- Safe delete by default (-d)
## Sample Output
Keeping branches: main, develop, feature-x

Branches to delete:
feature-old
bugfix-123

Are you sure you want to delete these branches? (y/N):
## Tips
- Use --dry-run first to avoid mistakes
- Use --force only when you're sure branches can be safely removed
- Great to run after merging PRs
## Requirements
- Node.js >= 14
- Git installed and available in PATH
## License

MIT