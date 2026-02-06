# Root Cause Analysis: Outdated tonejs-json-sequencer Version

## Issue Summary

During PR #[current], an AI agent (Copilot) made changes based on an outdated version of the `tonejs-json-sequencer` library, leading to incorrect implementation that removed necessary `{voice: "...", options: {...}}` format support.

## Timeline

- **2026-01-10**: tonejs-json-sequencer at commit `683f941` (old version without factories)
- **2026-01-18**: tonejs-json-sequencer added `src/factories/instrument-factory.ts` with `createPolySynth()` function that converts voice strings to constructors
- **2026-02-06 (this PR)**: 
  - Initial investigation used the outdated commit `683f941`
  - Made incorrect changes based on old library behavior
  - User pointed out the hallucination
  - Investigation revealed the latest version has the needed functionality

## Root Causes

### 1. **Package Lock File Pinning**

**Problem**: The `package-lock.json` had pinned `tonejs-json-sequencer` to a specific commit SHA:
```json
"resolved": "git+ssh://git@github.com/cat2151/tonejs-json-sequencer.git#683f94154e87de6a7f238c85b2045a85f0dcbb55"
```

**Why**: When using `"tonejs-json-sequencer": "github:cat2151/tonejs-json-sequencer"` in `package.json`, npm locks to a specific commit SHA on first install.

**Impact**: `npm install` reinstalls the same old version even though newer commits exist.

### 2. **No Version Update Process**

**Problem**: There was no documented process for:
- Checking if dependencies need updating
- Knowing when to run `npm update` vs `npm install`
- Verifying dependency versions before investigating issues

**Impact**: Agent assumed installed version was current without verification.

### 3. **Insufficient Library Investigation Guidelines**

**Problem**: The copilot-instructions.md stated:
> **外部ライブラリにパッチや変更を加えないでください**（特に tonejs-json-sequencer）

But provided no guidance on:
- How to verify the current library version
- Where to check for latest library functionality
- When to check the library's source repository directly

**Impact**: Agent checked local `node_modules` (outdated) instead of GitHub repository (latest).

### 4. **npm install vs npm update Misunderstanding**

**Problem**: 
- `npm install` respects package-lock.json and keeps existing SHA
- `npm update` updates to latest within semver range, but with GitHub dependencies it fetches latest commit

**Required**: Need to explicitly use `npm update <package>` to update GitHub-referenced dependencies.

## How the Issue Was Discovered

1. Agent checked `node_modules/tonejs-json-sequencer/dist/esm/index.mjs`
2. Found only `new Tone.PolySynth(element.args)` without string conversion
3. Concluded the library doesn't support voice strings
4. Made changes to "fix" by removing voice parameter
5. User correctly identified this as hallucination
6. Upon checking GitHub repository directly, found the latest version DOES support voice strings

## Preventive Measures

### Immediate Actions (Implemented)

1. ✅ Updated tonejs-json-sequencer to latest version
2. ✅ Reverted incorrect changes
3. ✅ Updated `scripts/copy-libs.js` to copy ESM modules
4. ✅ Documented this root cause analysis

### Long-term Preventive Measures (Recommended)

See PREVENTION_STRATEGY.md for detailed recommendations.

## Key Learnings

1. **Always verify dependency versions before investigating library behavior**
2. **Check GitHub repository directly for latest functionality, not just local node_modules**
3. **Use `npm update <package>` to update GitHub-referenced dependencies**
4. **Document version update processes for GitHub dependencies**
5. **AI agents need explicit instructions about checking library versions**

## Related Files

- `package.json` - Dependency specification
- `package-lock.json` - Version pinning (SHA for GitHub deps)
- `scripts/copy-libs.js` - Library copying for dist
- `.github/copilot-instructions.md` - AI agent guidelines (needs updating)
