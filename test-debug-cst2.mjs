import * as TreeSitter from 'web-tree-sitter';

await TreeSitter.Parser.init();
const parser = new TreeSitter.Parser();
const Lang = await TreeSitter.Language.load('./tree-sitter-mml/tree-sitter-mml.wasm');
parser.setLanguage(Lang);

function nodeToCSTJson(node) {
  const result = {
    type: node.type,
    text: node.text,
    children: [],
    fields: {}
  };

  for (let i = 0; i < node.namedChildCount; i++) {
    const child = node.namedChild(i);
    if (child) {
      const fieldName = node.fieldNameForChild(i);
      const childJson = nodeToCSTJson(child);
      
      if (fieldName) {
        if (!result.fields[fieldName]) {
          result.fields[fieldName] = [];
        }
        result.fields[fieldName].push(childJson);
      } else {
        result.children.push(childJson);
      }
    }
  }

  return result;
}

// Test cases
const testCases = [
  'r8.',
  "'c4eg'.",
  "'c4eg'8."
];

for (const mml of testCases) {
  console.log(`\n=== Testing: ${mml} ===`);
  const tree = parser.parse(mml);
  const root = tree.rootNode;
  const cst = nodeToCSTJson(root);
  console.log(JSON.stringify(cst, null, 2));
}
