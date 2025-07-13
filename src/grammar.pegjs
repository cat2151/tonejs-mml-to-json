// Simple MML Grammar for testing
// Input: "c" -> Output: "c"
start
  = note

note
  = "c" { return "c"; }
