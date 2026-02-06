import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';
import { ast2json } from '../src/ast2json';

describe('Chord Basic Output', () => {
  it('should generate JSON for Chords (Basic) demo with no args for default PolySynth', () => {
    const mml = "o4 l4 'ceg' 'dfb' 'ace' 'gbdf'";
    console.log('\nTesting Chords (Basic) MML:', mml);
    
    const ast = mml2ast(mml);
    const json = ast2json(ast);
    console.log('\nGenerated JSON:');
    console.log(JSON.stringify(json, null, 2));
    
    // Basic checks
    expect(json).toBeInstanceOf(Array);
    expect(json.length).toBeGreaterThan(0);
    
    // Check for PolySynth with no args (default voice)
    const createNode = json.find(e => e.eventType === 'createNode');
    console.log('\nCreated node:', JSON.stringify(createNode, null, 2));
    expect(createNode.nodeType).toBe('PolySynth');
    
    // Should have no args or empty args (undefined in JSON is omitted or null)
    expect(createNode.args).toBeUndefined();
  });
});
