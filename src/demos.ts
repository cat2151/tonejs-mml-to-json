/**
 * Demo MML examples for the demo page
 * This file contains all demo MML strings for easy maintenance
 */

export interface Demo {
  id: string;
  name: string;
  description: string;
  mml: string;
}

/**
 * Available demo examples
 */
export const demos: Demo[] = [
  {
    id: 'traditional',
    name: 'Traditional Demo',
    description: 'Single track MML demo',
    mml: 'o4 l16 efg+abag+f e8.<e8.>e8'
  },
  {
    id: 'multitrack',
    name: 'Multi-track Demo',
    description: 'Multiple tracks using semicolon separator',
    mml: 'o4 l8 cdefgab; o5 l16 ccccddddeeee; o3 l4 c e g'
  }
];
