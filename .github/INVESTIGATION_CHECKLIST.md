# External Library Investigation Checklist

Before investigating or making changes based on external library behavior, follow this checklist to avoid working with outdated versions.

## Version Verification (REQUIRED FIRST STEP)

- [ ] Check `package-lock.json` for current commit SHA
  ```bash
  cat package-lock.json | grep -A 3 "tonejs-json-sequencer"
  ```
- [ ] Check GitHub repository for latest commit
  ```bash
  curl -s "https://api.github.com/repos/cat2151/tonejs-json-sequencer/commits?per_page=1"
  ```
- [ ] Run `npm run check-deps` to compare versions automatically
- [ ] If outdated, run `npm update <package>` and `npm run build:libs`

## Investigation Priority

### 1. Primary Source: GitHub Repository (Latest Code)
   - ✅ Browse latest commit on GitHub
   - ✅ Check for recent changes in relevant files (e.g., `src/factories/`)
   - ✅ Look for new features or refactorings
   - ✅ Check commit messages for functionality changes

### 2. Secondary Source: Local `node_modules`
   - ⚠️  Only use AFTER verifying it's up to date
   - ⚠️  Cross-reference with GitHub if unsure
   - ⚠️  Document which version you investigated

## Documentation Check

- [ ] Check library's README for version-specific features
- [ ] Check library's CHANGELOG for recent changes
- [ ] Check library's open issues for known problems
- [ ] Check library's closed PRs for recently added features

## Before Making Changes

- [ ] Verify the "problem" exists in the LATEST version
- [ ] Check if library already has the needed functionality
- [ ] Consider updating the library instead of working around it
- [ ] Document which version you investigated in your commit/PR

## Common Pitfalls to Avoid

❌ **Don't**:
- Check only `node_modules` without verifying version
- Assume `npm install` updates GitHub dependencies (it doesn't!)
- Make changes based on outdated library behavior
- Create workarounds for problems already fixed upstream

✅ **Do**:
- Always check GitHub repository first
- Use `npm update` for GitHub dependencies
- Verify version before and after investigation
- Document library version in your analysis

## Real-World Example

**Incident**: 2026-02-06 - Chords (Basic) Issue
- **Problem**: Agent investigated `node_modules` with commit `683f941` (2026-01-10)
- **Reality**: Latest version had commit `b8dd6fd` (2026-02-06) with needed feature
- **Root Cause**: `npm install` kept old SHA, agent didn't check GitHub
- **Result**: Incorrect changes made, user had to point out hallucination
- **Lesson**: Always verify version and check GitHub repository first!

See `ROOT_CAUSE_ANALYSIS.md` for full details.

## Quick Commands Reference

```bash
# Check if dependencies are outdated
npm run check-deps

# Update tonejs-json-sequencer to latest
npm update tonejs-json-sequencer

# Rebuild after update
npm run build:libs

# Check current version
cat package-lock.json | grep -A 3 "tonejs-json-sequencer"

# Check latest GitHub version
curl -s "https://api.github.com/repos/cat2151/tonejs-json-sequencer/commits?per_page=1" | grep '"sha"' | head -1
```
