use serde::{Deserialize, Serialize};

/// AST Token types representing parsed MML commands
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum AstToken {
    Note(NoteToken),
    Chord(ChordToken),
    Rest(RestToken),
    Length(LengthToken),
    Octave(OctaveToken),
    OctaveUp(OctaveUpToken),
    OctaveDown(OctaveDownToken),
    Instrument(InstrumentToken),
    TrackSeparator(TrackSeparatorToken),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NoteToken {
    pub note: char,
    pub accidental: String,
    pub duration: Option<u32>,
    pub dots: u32,
    pub length: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChordToken {
    pub notes: Vec<ChordNote>,
    pub duration: Option<u32>,
    pub dots: u32,
    pub length: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChordNote {
    pub note: char,
    pub accidental: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RestToken {
    pub duration: Option<u32>,
    pub dots: u32,
    pub length: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LengthToken {
    pub value: Option<u32>,
    pub length: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OctaveToken {
    pub value: Option<u32>,
    pub length: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OctaveUpToken {
    pub length: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OctaveDownToken {
    pub length: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct InstrumentToken {
    pub value: Option<u32>,
    pub length: usize,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TrackSeparatorToken {
    pub length: usize,
}

impl AstToken {
    pub fn length(&self) -> usize {
        match self {
            AstToken::Note(t) => t.length,
            AstToken::Chord(t) => t.length,
            AstToken::Rest(t) => t.length,
            AstToken::Length(t) => t.length,
            AstToken::Octave(t) => t.length,
            AstToken::OctaveUp(t) => t.length,
            AstToken::OctaveDown(t) => t.length,
            AstToken::Instrument(t) => t.length,
            AstToken::TrackSeparator(t) => t.length,
        }
    }
}
