import { describe, it, expect } from 'vitest';
import { parse } from '../src/grammar.js';

describe('MML Parser', () => {
  it('should parse "c" and return "c"', () => {
    const result = parse('c');
    expect(result).toBeDefined();
    expect(result).toBe('c');
  });
});
