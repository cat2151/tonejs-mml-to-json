fn main() {
    #[cfg(feature = "tree-sitter")]
    {
        use std::path::PathBuf;
        
        let dir: PathBuf = ["../tree-sitter-mml", "src"].iter().collect();

        cc::Build::new()
            .include(&dir)
            .file(dir.join("parser.c"))
            .compile("tree-sitter-mml");

        println!("cargo:rerun-if-changed=../tree-sitter-mml/src/parser.c");
        println!("cargo:rerun-if-changed=../tree-sitter-mml/grammar.js");
    }
}
