/**
 * Integration test for the library entry point
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { initWasm, mml2json, mml2ast, ast2json } from '../src/index.js';

describe('Library entry point', () => {
  beforeAll(async () => {
    await initWasm();
  });

  it('should export initWasm function', () => {
    expect(typeof initWasm).toBe('function');
  });

  it('should export mml2json function', () => {
    expect(typeof mml2json).toBe('function');
  });

  it('should export mml2ast function', () => {
    expect(typeof mml2ast).toBe('function');
  });

  it('should export ast2json function', () => {
    expect(typeof ast2json).toBe('function');
  });

  it('should convert MML to JSON using mml2json', () => {
    const mml = 'o4 l16 e';
    const result = mml2json(mml);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    
    // Should contain Tone.js commands
    const hasCreateNode = result.some((cmd) => cmd.eventType === 'createNode');
    const hasTriggerAttackRelease = result.some((cmd) => cmd.eventType === 'triggerAttackRelease');
    expect(hasCreateNode).toBe(true);
    expect(hasTriggerAttackRelease).toBe(true);
  });

  it('should convert MML to AST using mml2ast', () => {
    const mml = 'o4 l16 e';
    const result = mml2ast(mml);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should convert AST to JSON using ast2json', () => {
    const mml = 'o4 l16 e';
    const ast = mml2ast(mml);
    const result = ast2json(ast);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
