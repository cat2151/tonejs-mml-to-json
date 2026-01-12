//! Tree-sitter grammar for MML (Music Macro Language)
//! 
//! This module defines the grammar for parsing MML strings using rust-sitter.
//! The grammar captures notes, rests, octave commands, length commands, 
//! instruments, chords, and multi-track separators.

#[rust_sitter::grammar("mml")]
pub mod grammar {
    /// The root node representing a complete MML document
    #[rust_sitter::language]
    pub struct Mml {
        pub tokens: Vec<Token>,
    }

    /// A single token in the MML language
    #[derive(Debug, Clone)]
    pub enum Token {
        Note(Note),
        Rest(Rest),
        Length(Length),
        Octave(Octave),
        OctaveUp(OctaveUp),
        OctaveDown(OctaveDown),
        Instrument(Instrument),
        Chord(Chord),
        TrackSeparator(TrackSeparator),
    }

    /// A musical note (c, d, e, f, g, a, b) with optional accidentals, duration, and dots
    #[derive(Debug, Clone)]
    pub struct Note {
        pub pitch: NotePitch,
        pub accidentals: Vec<Accidental>,
        pub duration: Option<Duration>,
        pub dots: Vec<Dot>,
    }

    /// The pitch of a note
    #[derive(Debug, Clone)]
    pub enum NotePitch {
        #[rust_sitter::leaf(text = "c")]
        C,
        #[rust_sitter::leaf(text = "d")]
        D,
        #[rust_sitter::leaf(text = "e")]
        E,
        #[rust_sitter::leaf(text = "f")]
        F,
        #[rust_sitter::leaf(text = "g")]
        G,
        #[rust_sitter::leaf(text = "a")]
        A,
        #[rust_sitter::leaf(text = "b")]
        B,
    }

    /// An accidental (+ for sharp, - for flat)
    #[derive(Debug, Clone)]
    pub enum Accidental {
        #[rust_sitter::leaf(text = "+")]
        Sharp,
        #[rust_sitter::leaf(text = "-")]
        Flat,
    }

    /// A dot for dotted notes
    #[rust_sitter::leaf(text = ".")]
    #[derive(Debug, Clone)]
    pub struct Dot;

    /// Duration (a number)
    #[derive(Debug, Clone)]
    pub struct Duration {
        #[rust_sitter::leaf(pattern = r"\d+", transform = |v| v.parse().unwrap())]
        pub value: u32,
    }

    /// A rest (r) with optional duration and dots
    #[derive(Debug, Clone)]
    pub struct Rest {
        #[rust_sitter::leaf(text = "r")]
        _r: (),
        pub duration: Option<Duration>,
        pub dots: Vec<Dot>,
    }

    /// Length command (l) followed by a number
    #[derive(Debug, Clone)]
    pub struct Length {
        #[rust_sitter::leaf(text = "l")]
        _l: (),
        pub value: Duration,
    }

    /// Octave command (o) followed by a number
    #[derive(Debug, Clone)]
    pub struct Octave {
        #[rust_sitter::leaf(text = "o")]
        _o: (),
        pub value: Duration,
    }

    /// Octave up command (<)
    #[rust_sitter::leaf(text = "<")]
    #[derive(Debug, Clone)]
    pub struct OctaveUp;

    /// Octave down command (>)
    #[rust_sitter::leaf(text = ">")]
    #[derive(Debug, Clone)]
    pub struct OctaveDown;

    /// Instrument command (@) followed by name or number
    #[derive(Debug, Clone)]
    pub struct Instrument {
        #[rust_sitter::leaf(text = "@")]
        _at: (),
        pub name: InstrumentName,
    }

    /// Instrument name (can be a number or an alphanumeric name)
    #[derive(Debug, Clone)]
    pub enum InstrumentName {
        #[rust_sitter::leaf(pattern = r"\d+", transform = |v| v.to_string())]
        Number(String),
        #[rust_sitter::leaf(pattern = r"[A-Za-z][A-Za-z0-9]*", transform = |v| v.to_string())]
        Name(String),
    }

    /// A chord ('ceg') - notes enclosed in single quotes
    #[derive(Debug, Clone)]
    pub struct Chord {
        #[rust_sitter::leaf(text = "'")]
        _open: (),
        #[rust_sitter::repeat(non_empty = true)]
        pub notes: Vec<ChordNote>,
        #[rust_sitter::leaf(text = "'")]
        _close: (),
        pub duration: Option<Duration>,
        pub dots: Vec<Dot>,
    }

    /// A note within a chord
    #[derive(Debug, Clone)]
    pub struct ChordNote {
        pub pitch: NotePitch,
        pub accidentals: Vec<Accidental>,
    }

    /// Track separator (;)
    #[rust_sitter::leaf(text = ";")]
    #[derive(Debug, Clone)]
    pub struct TrackSeparator;

    /// Whitespace (extra node that can be skipped)
    #[rust_sitter::extra]
    #[derive(Debug, Clone)]
    pub struct Whitespace {
        #[rust_sitter::leaf(pattern = r"\s")]
        _whitespace: (),
    }
}

// Re-export the grammar types for use in other modules
pub use grammar::*;

// Expose the parse function
pub fn parse_mml(input: &str) -> Result<Mml, rust_sitter::Error> {
    grammar::parse(input)
}
