export type TranscriptLine = {
  start: number; // in seconds
  end: number; // in seconds
  text: string;
};

export function parseSRT(srt: string): TranscriptLine[] {
  return srt
    .split("\n\n")
    .map((block) => {
      const lines = block.split("\n");
      if (lines.length < 3) return null;
      const timeMatch = lines[1].match(
        /(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/,
      );
      if (!timeMatch) return null;
      const start =
        parseInt(timeMatch[1]) * 3600 +
        parseInt(timeMatch[2]) * 60 +
        parseInt(timeMatch[3]) +
        parseInt(timeMatch[4]) / 1000;
      const end =
        parseInt(timeMatch[5]) * 3600 +
        parseInt(timeMatch[6]) * 60 +
        parseInt(timeMatch[7]) +
        parseInt(timeMatch[8]) / 1000;
      const text = lines.slice(2).join("\n");
      return { start, end, text };
    })
    .filter(Boolean) as TranscriptLine[];
}
