import type { TranscriptLine } from "@/lib/parseSRT";
import React, { useEffect, useRef } from "react";

type TranscriptViewProps = {
  transcript: TranscriptLine[];
  currentTime: number;
};

export const TranscriptView: React.FC<TranscriptViewProps> = ({
  transcript,
  currentTime,
}) => {
  const activeIndex = transcript.findIndex(
    (line) => currentTime >= line.start && currentTime <= line.end,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active line
  useEffect(() => {
    if (containerRef.current && activeIndex !== -1) {
      const activeEl = containerRef.current.querySelector(
        `[data-index="${activeIndex}"]`,
      );
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="my-4 max-h-56 overflow-y-auto rounded-lg bg-zinc-50 p-4 shadow-inner dark:bg-zinc-900/60"
      style={{ fontFamily: "monospace", fontSize: "1rem" }}
    >
      {transcript.map((line, idx) => (
        <div
          key={idx}
          data-index={idx}
          className={`py-1 transition-colors ${
            idx === activeIndex
              ? "rounded bg-purple-100/70 font-bold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
};
