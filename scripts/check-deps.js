#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

console.log('🔍 Checking GitHub dependencies...\n');

try {
  const packageLock = JSON.parse(readFileSync(join(projectRoot, 'package-lock.json'), 'utf8'));
  const deps = packageLock.packages['node_modules/tonejs-json-sequencer'];

  if (deps && deps.resolved && deps.resolved.includes('github.com')) {
    const match = deps.resolved.match(/#([a-f0-9]+)$/);
    if (match) {
      const currentSHA = match[1];
      const shortSHA = currentSHA.substring(0, 7);
      
      console.log(`📦 tonejs-json-sequencer`);
      console.log(`   Current: ${shortSHA}`);
      
      // Get latest SHA from GitHub
      const repo = 'cat2151/tonejs-json-sequencer';
      try {
        const latest = execSync(
          `curl -s "https://api.github.com/repos/${repo}/commits?per_page=1" | grep -m1 '"sha"' | cut -d'"' -f4`,
          { encoding: 'utf8' }
        ).trim().substring(0, 7);
        
        console.log(`   Latest:  ${latest}`);
        
        if (shortSHA !== latest) {
          console.log('\n⚠️  tonejs-json-sequencer is OUTDATED!');
          console.log('   Run: npm update tonejs-json-sequencer');
          console.log('   Then: npm run build:libs');
          console.log('\n   GitHub dependencies use commit SHA pinning.');
          console.log('   npm install does NOT update them - use npm update instead.');
          process.exit(1);
        } else {
          console.log('\n✅ tonejs-json-sequencer is up to date');
          process.exit(0);
        }
      } catch (err) {
        console.log('\n⚠️  Could not check latest version (network issue)');
        console.error(err.message);
        process.exit(0); // Don't fail on network errors
      }
    }
  } else {
    console.log('ℹ️  tonejs-json-sequencer not found or not from GitHub');
    process.exit(0);
  }
} catch (err) {
  console.error('❌ Error checking dependencies:', err.message);
  process.exit(1);
}
