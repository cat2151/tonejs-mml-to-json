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
  
  // Wait for WASM to initialize
  console.log('Waiting for WASM initialization...');
  const wasmInitialized = await page.evaluate(() => {
    return new Promise((resolve) => {
      // Set a timeout in case initialization never completes
      const timeout = setTimeout(() => {
        console.log('WASM initialization timeout');
        resolve(false);
      }, 10000);
      
      window.addEventListener('wasmReady', () => {
        console.log('WASM ready event received');
        clearTimeout(timeout);
        resolve(true);
      });
      
      window.addEventListener('wasmError', (e) => {
        console.log('WASM error event received:', e.detail);
        clearTimeout(timeout);
        resolve(false);
      });
    });
  });
  
  console.log('\n=== Test Results ===');
  console.log('WASM Initialized:', wasmInitialized);
  console.log('Page errors:', pageErrors.length);
  
  // Check if web-tree-sitter error is present
  const hasTreeSitterError = pageErrors.some(err => 
    err.includes('web-tree-sitter') || err.includes('module specifier')
  ) || consoleMessages.some(msg => 
    msg.text.includes('web-tree-sitter') && msg.text.includes('module specifier')
  );
  
  console.log('Has Tree-sitter module error:', hasTreeSitterError);
  
  if (pageErrors.length > 0) {
    console.log('\n=== Page Errors ===');
    pageErrors.forEach((err, i) => {
      console.log(`${i + 1}. ${err}`);
    });
  }
  
  // Test mml2json function if initialized
  if (wasmInitialized) {
    console.log('\n=== Testing mml2json ===');
    const testResult = await page.evaluate(() => {
      try {
        const result = window.mml2json('cde');
        return {
          success: true,
          resultLength: result.length,
          hasCommands: result.length > 0
        };
      } catch (e) {
        return { success: false, error: e.message };
      }
    });
    console.log('mml2json test:', JSON.stringify(testResult, null, 2));
  }
  
  console.log('\n=== Summary ===');
  if (wasmInitialized && !hasTreeSitterError) {
    console.log('✓ Demo is working correctly!');
  } else {
    console.log('✗ Demo has issues');
  }
  
  await browser.close();
} catch (error) {
  console.error('Test error:', error);
} finally {
  console.log('\nStopping HTTP server...');
  server.kill();
  process.exit(0);
}
