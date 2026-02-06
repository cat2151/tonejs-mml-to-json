# Prevention Strategy: Avoiding Outdated Dependency Issues

## Problem Statement

AI agents investigating library behavior may use outdated versions from `node_modules`, leading to incorrect assumptions and hallucinations.

## Recommended Preventive Measures

### 1. Update Copilot Instructions

Add explicit guidelines to `.github/copilot-instructions.md`:

```markdown
## 外部ライブラリの調査手順

**重要**: 外部ライブラリの機能を調査する際は、必ず以下の手順に従ってください。

1. **最新バージョンの確認**
   - `package-lock.json`のcommit SHAを確認
   - GitHub リポジトリで最新コミットを確認
   - 差分がある場合は`npm update <package>`を実行

2. **調査の優先順位**
   - 1st: GitHubリポジトリの最新ソースコード
   - 2nd: `node_modules`のインストール済みコード
   - 理由: `node_modules`は古い可能性がある

3. **GitHub依存パッケージの更新**
   ```bash
   # パッケージを最新に更新
   npm update tonejs-json-sequencer
   
   # 確認
   cat package-lock.json | grep -A 3 "tonejs-json-sequencer"
   ```

4. **調査前のチェックリスト**
   - [ ] GitHubリポジトリで最新コミット日を確認
   - [ ] package-lock.jsonのSHAと比較
   - [ ] 必要に応じて`npm update`実行
   - [ ] 最新版のソースコードで機能確認
```

### 2. Add Dependency Update Script

Create `scripts/check-deps.js`:

```javascript
#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

console.log('Checking GitHub dependencies...\n');

const packageLock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const deps = packageLock.packages['node_modules/tonejs-json-sequencer'];

if (deps && deps.resolved && deps.resolved.includes('github.com')) {
  const match = deps.resolved.match(/#([a-f0-9]+)$/);
  if (match) {
    const currentSHA = match[1];
    const shortSHA = currentSHA.substring(0, 7);
    
    console.log(`Current: ${shortSHA}`);
    
    // Get latest SHA from GitHub
    const repo = 'cat2151/tonejs-json-sequencer';
    try {
      const latest = execSync(
        `curl -s "https://api.github.com/repos/${repo}/commits?per_page=1" | grep -m1 '"sha"' | cut -d'"' -f4`
      ).toString().trim().substring(0, 7);
      
      console.log(`Latest:  ${latest}`);
      
      if (shortSHA !== latest) {
        console.log('\n⚠️  tonejs-json-sequencer is outdated!');
        console.log('Run: npm update tonejs-json-sequencer');
      } else {
        console.log('\n✅ tonejs-json-sequencer is up to date');
      }
    } catch (err) {
      console.log('\n⚠️  Could not check latest version (network issue)');
    }
  }
}
```

Add to `package.json` scripts:
```json
"check-deps": "node scripts/check-deps.js"
```

### 3. Add Pre-Investigation Checklist

Create `.github/INVESTIGATION_CHECKLIST.md`:

```markdown
# External Library Investigation Checklist

Before investigating or making changes based on external library behavior:

## Version Verification
- [ ] Check `package-lock.json` for current commit SHA
- [ ] Check GitHub repository for latest commit
- [ ] Run `npm run check-deps` to compare versions
- [ ] If outdated, run `npm update <package>` and verify

## Investigation Priority
1. **Primary Source**: GitHub repository (latest code)
   - Clone or browse latest commit on GitHub
   - Check for recent changes in relevant files
   - Look for new features or refactorings

2. **Secondary Source**: Local `node_modules`
   - Only use after verifying it's up to date
   - Cross-reference with GitHub if unsure

## Documentation Check
- [ ] Check library's README for version-specific features
- [ ] Check library's CHANGELOG for recent changes
- [ ] Check library's issues for known problems

## Before Making Changes
- [ ] Verify the "problem" exists in the LATEST version
- [ ] Check if library already has the needed functionality
- [ ] Consider updating the library instead of working around it
```

### 4. Automated Checks in CI

Add to `.github/workflows/check-deps.yml`:

```yaml
name: Check Dependencies

on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly on Monday
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run check-deps
```

### 5. Update Contributing Guidelines

Add to `CONTRIBUTING.md`:

```markdown
## Working with GitHub Dependencies

This project uses `tonejs-json-sequencer` directly from GitHub. Important notes:

1. **Always check for updates** before investigating library behavior
2. **Use `npm update <package>`** not `npm install` to get latest GitHub commits
3. **Verify versions** by checking package-lock.json SHA against GitHub
4. **Check GitHub repository** first when investigating library features
```

## Implementation Priority

### High Priority (Implement Immediately)
1. ✅ Update `.github/copilot-instructions.md` with library investigation guidelines
2. ✅ Create `ROOT_CAUSE_ANALYSIS.md` 
3. ✅ Create `PREVENTION_STRATEGY.md`

### Medium Priority (Implement Soon)
4. Create `scripts/check-deps.js`
5. Add check-deps script to package.json
6. Create `.github/INVESTIGATION_CHECKLIST.md`

### Low Priority (Implement When Convenient)
7. Add automated dependency checking to CI
8. Update CONTRIBUTING.md if it exists

## Success Criteria

An AI agent investigating library behavior should:
1. ✅ Always check GitHub repository first
2. ✅ Verify local version matches latest before concluding anything
3. ✅ Know to run `npm update` for GitHub dependencies
4. ✅ Document which version was investigated
5. ✅ Check for recent changes that might affect their investigation

## Monitoring

Add to PR review checklist:
- [ ] If library behavior is mentioned, verify investigation used latest version
- [ ] If library limitations are cited, check if limitation still exists in latest
- [ ] If workarounds are added, check if library update would eliminate need
