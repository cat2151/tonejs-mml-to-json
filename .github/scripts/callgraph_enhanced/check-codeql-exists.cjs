#!/usr/bin/env node
/**
 * check-codeql-exists.cjs
 *
 * CodeQL CLIの存在チェックを行う。
 */
const { execSync } = require('child_process');
try {
  execSync('codeql --version', { stdio: 'inherit' });
  console.log('CodeQL CLI detected.');
} catch (e) {
  console.error('CodeQL CLIが見つかりません。 https://codeql.github.com/docs/codeql-cli/getting-started/ を参照してください。');
  process.exit(1);
}
