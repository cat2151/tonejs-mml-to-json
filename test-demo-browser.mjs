import { chromium } from 'playwright';
import { spawn } from 'child_process';

const repoRoot = '/home/runner/work/tonejs-mml-to-json/tonejs-mml-to-json';

// Start a simple HTTP server
console.log('Starting HTTP server...');
const server = spawn('npx', ['http-server', repoRoot, '-p', '8765', '--cors'], {
  cwd: repoRoot,
  stdio: 'pipe'
});

// Wait for server to start
await new Promise(resolve => setTimeout(resolve, 2000));

try {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
    console.log(`[Browser ${msg.type()}]:`, msg.text());
  });
  
  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
    console.log('[Browser Error]:', error.message);
  });
  
  console.log('Navigating to demo page...');
  await page.goto('http://localhost:8765/src/index.html');
  
  // Wait a bit for page to load and any errors to appear
  await page.waitForTimeout(3000);
  
  console.log('\n=== Summary ===');
  console.log('Console messages:', consoleMessages.length);
  console.log('Page errors:', pageErrors.length);
  
  if (pageErrors.length > 0) {
    console.log('\n=== Page Errors ===');
    pageErrors.forEach((err, i) => {
      console.log(`${i + 1}. ${err}`);
    });
  }
  
  if (consoleMessages.length > 0) {
    console.log('\n=== Console Messages (first 10) ===');
    consoleMessages.slice(0, 10).forEach((msg, i) => {
      console.log(`${i + 1}. [${msg.type}] ${msg.text}`);
    });
  }
  
  await browser.close();
} catch (error) {
  console.error('Test error:', error);
} finally {
  console.log('\nStopping HTTP server...');
  server.kill();
  process.exit(0);
}
