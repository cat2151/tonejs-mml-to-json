// Example: Using tonejs_mml_to_json as a Rust library
use tonejs_mml_to_json::mml_to_json;

fn main() {
    println!("tonejs_mml_to_json - Rust Library Example\n");

    let examples = vec![
        ("Simple note", "c"),
        ("Note with duration", "c4"),
        ("Sharp note", "c+"),
        ("Complex sequence", "o4 l16 e"),
        ("Demo MML", "o4 l16 efg+abag+f e8.<e8.>e8"),
    ];

    for (description, mml) in examples {
        println!("Example: {}", description);
        println!("Input MML: {}", mml);
        
        match mml_to_json(mml) {
            Ok(json) => {
                // Pretty print JSON
                if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&json) {
                    println!("Output JSON:\n{}\n", serde_json::to_string_pretty(&parsed).unwrap());
                } else {
                    println!("Output: {}\n", json);
                }
            }
            Err(e) => {
                eprintln!("Error: {}\n", e);
            }
        }
    }
}
