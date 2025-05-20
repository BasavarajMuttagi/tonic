import { cn } from "@/lib/utils";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  InfoIcon,
  PauseIcon,
  PlayIcon,
  ShareIcon,
  SpeakerHighIcon,
} from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";

type PodcastPlayerProps = {
  episodeTitle: string;
  artworkUrl: string;
  audioUrl: string;
  duration: number;
  bgColor: string;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  episodeTitle,
  artworkUrl,
  audioUrl,
  duration,
  bgColor,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);

  // Playback speeds to cycle through
  const playbackRates = [1, 1.1, 1.2, 1.3, 1.4, 1.5];

  // Cycle to next playback rate
  const handlePlaybackRate = () => {
    const currentIdx = playbackRates.indexOf(playbackRate);
    const nextIdx = (currentIdx + 1) % playbackRates.length;
    setPlaybackRate(playbackRates[nextIdx]);
  };

  // Handle audio loading states
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [audioUrl]);

  // Set playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Handle audio URL changes with auto-play
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // Auto-play when URL changes
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / duration) * 100);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    const newTime = (value[0] / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(value[0]);
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    let newTime = audioRef.current.currentTime + seconds;
    newTime = Math.max(0, Math.min(duration, newTime));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newVolume = value[0] / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const textBase = "text-zinc-400 hover:text-zinc-500";

  return (
    <div
      className={cn(
        "mb-6 flex items-center space-x-5 rounded-lg border border-zinc-200/10 p-3 shadow-lg",
        bgColor,
      )}
    >
      <img
        src={artworkUrl}
        alt={episodeTitle}
        className="aspect-square h-20 w-20 rounded-lg bg-blue-500 bg-gradient-to-tl to-zinc-400"
      />
      <div className="flex-1">
        {/* Truncated title with Tailwind */}
        <div
          className={`mb-2 text-lg font-bold ${textBase} truncate overflow-hidden whitespace-nowrap`}
        >
          {episodeTitle}
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="relative size-12 cursor-pointer rounded-full bg-purple-400 p-2 text-white shadow"
            onClick={handlePlayPause}
            aria-label={isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircleNotchIcon
                size={48}
                weight="light"
                className="absolute top-0 left-0 animate-spin text-zinc-200"
              />
            ) : isPlaying ? (
              <PauseIcon size={28} weight="fill" className="absolute inset-2.5 text-zinc-200" />
            ) : (
              <PlayIcon size={28} weight="fill" className="absolute inset-2.5 text-zinc-200" />
            )}
          </button>
          <Slider
            min={0}
            max={100}
            value={[progress]}
            onValueChange={handleSeek}
            className="flex-1 border-none accent-zinc-400"
            aria-label="Seek"
          />
          <span className={`text-xs ${textBase}`}>
            {formatTime(currentTime)} | {formatTime(duration)}
          </span>
        </div>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />
        <div className="mt-2 flex items-center justify-between space-x-4">
          <div
            className={`mt-2 flex items-center space-x-6 text-xs font-medium ${textBase}`}
          >
            <button
              className={textBase}
              onClick={() => handleSkip(-15)}
              aria-label="Skip back 15 seconds"
            >
              <ArrowCounterClockwiseIcon size={18} />
            </button>
            <button
              className={cn(textBase, "border px-2")}
              onClick={handlePlaybackRate}
              aria-label="Playback speed"
            >
              {playbackRate}x
            </button>
            <button
              className={textBase}
              onClick={() => handleSkip(15)}
              aria-label="Skip forward 15 seconds"
            >
              <ArrowClockwiseIcon size={18} />
            </button>
            <SpeakerHighIcon size={18} />
            <Slider
              min={0}
              max={100}
              value={[volume * 100]}
              onValueChange={handleVolumeChange}
              className="w-24 border-none accent-zinc-400"
              aria-label="Volume"
            />
            <button className={textBase} aria-label="Share">
              <ShareIcon size={18} />
            </button>
            <button className={textBase} aria-label="More Info">
              <InfoIcon size={18} />
            </button>
          </div>
          <div
            className={`mt-2 flex items-center space-x-6 text-xs font-medium ${textBase}`}
          >
            <button className="hover:underline">SUBSCRIBE</button>
            <button className="hover:underline">SHARE</button>
            <button className="hover:underline">MORE INFO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
