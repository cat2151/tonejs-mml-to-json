import { initWasm, mml2json } from './dist/index.js';

async function test() {
  try {
    await initWasm();
    console.log('WASM initialized');
    
    // Test the "Chords (Basic)" demo MML
    const mml = "o4 l4 'ceg' 'dfb' 'ace' 'gbdf'";
    console.log('Testing MML:', mml);
    
    const result = mml2json(mml);
    console.log('Result:');
    console.log(JSON.stringify(result, null, 2));
    
    console.log('\n✓ Success - No error occurred!');
  } catch (error) {
    console.error('✗ Error occurred:');
    console.error(error);
    process.exit(1);
  }
}

test();
