export const MAJOR_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'Bb', 'Eb', 'Ab']
export const MINOR_KEYS = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m', 'Dm', 'Gm', 'Cm', 'Fm']

export const DURATION_SNIPPETS = [
  { label: '1/4', value: 'C' },
  { label: '1/8', value: 'C/2' },
  { label: '1/16', value: 'C/4' },
  { label: '1/32', value: 'C/8' },
]

export const RHYTHM_SNIPPETS = [
  { label: 'Tie', value: 'C-C' },
  { label: 'Slur', value: '(CDE)' },
  { label: 'Triplet', value: '(3CDE' },
]

const HEADER_LINE = /^[A-Za-z]:/

/** Replace the `K:` line, or insert one at the end of the leading header block. */
export function replaceOrInsertKeyLine(source: string, key: string): string {
  const lines = source.split('\n')
  const keyLine = `K:${key}`
  const idx = lines.findIndex((l) => /^K:/.test(l))
  if (idx >= 0) {
    lines[idx] = keyLine
  } else {
    let end = 0
    while (end < lines.length && HEADER_LINE.test(lines[end])) end++
    lines.splice(end, 0, keyLine)
  }
  return lines.join('\n')
}

/** Insert `snippet` at the selection, returning the new text and caret position. */
export function insertAtPosition(
  source: string,
  start: number,
  end: number,
  snippet: string,
): { text: string; cursor: number } {
  return {
    text: source.slice(0, start) + snippet + source.slice(end),
    cursor: start + snippet.length,
  }
}
