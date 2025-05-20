import { cn } from "@/lib/utils";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
} from "@phosphor-icons/react";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";

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
  const [isSeeking, setIsSeeking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [audioDuration, setAudioDuration] = useState(duration);

  const playbackRates = [1, 1.1, 1.2, 1.3, 1.4, 1.5];

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleEvents = {
      loadstart: () => !isSeeking && setIsLoading(true),
      canplay: () => setIsLoading(false),
      waiting: () => !isSeeking && setIsLoading(true),
      playing: () => setIsLoading(false),
      durationchange: () => setAudioDuration(audio.duration),
      seeking: () => setIsSeeking(true),
      seeked: () => setIsSeeking(false),
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      ended: () => setIsPlaying(false),
    };

    Object.entries(handleEvents).forEach(([event, handler]) => {
      audio.addEventListener(event, handler);
    });

    return () => {
      Object.entries(handleEvents).forEach(([event, handler]) => {
        audio.removeEventListener(event, handler);
      });
    };
  }, [audioUrl, isSeeking]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      playPromise?.catch(() => setIsPlaying(false));
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / audioDuration) * 100);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    const newTime = (value[0] / 100) * audioDuration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(value[0]);
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(
      0,
      Math.min(audioDuration, audioRef.current.currentTime + seconds),
    );
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / audioDuration) * 100);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newVolume = value[0] / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handlePlaybackRate = () => {
    const currentIdx = playbackRates.indexOf(playbackRate);
    setPlaybackRate(playbackRates[(currentIdx + 1) % playbackRates.length]);
  };

  const iconBtn =
    "p-2 rounded-full transition-colors text-zinc-400 hover:text-purple-600 ";
  const mainBtn =
    "relative size-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg hover:scale-105 transition-transform ";
  const cardBg =
    "max-w-xl mx-auto mb-8 flex items-center space-x-6 rounded-2xl border border-zinc-500/10 bg-white/80 dark:bg-zinc-900/80 p-4 inset-shadow-sm backdrop-blur-lg";

  return (
    <div className={cn(cardBg, bgColor)}>
      <img
        src={artworkUrl}
        alt={episodeTitle}
        className="aspect-square h-24 w-24 rounded-xl border border-zinc-200/30 object-cover shadow-md"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 truncate text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          {episodeTitle}
        </div>
        <Slider
          min={0}
          max={100}
          value={[progress]}
          onValueChange={handleSeek}
          className="w-full accent-purple-500"
          aria-label="Seek"
        />
        <div className="mt-1 mb-3 flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(audioDuration)}</span>
        </div>
        <div className="flex items-center justify-between space-x-3">
          <button
            className={iconBtn}
            onClick={() => handleSkip(-15)}
            aria-label="Skip back 15 seconds"
          >
            <ArrowCounterClockwiseIcon size={28} />
          </button>
          <button
            className={mainBtn}
            onClick={handlePlayPause}
            aria-label={isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircleNotchIcon
                size={40}
                weight="light"
                className="animate-spin"
              />
            ) : isPlaying ? (
              <PauseIcon size={32} weight="fill" />
            ) : (
              <PlayIcon size={32} weight="fill" />
            )}
          </button>
          <button
            className={iconBtn}
            onClick={() => handleSkip(15)}
            aria-label="Skip forward 15 seconds"
          >
            <ArrowClockwiseIcon size={28} />
          </button>
          <button
            className={cn(
              iconBtn,
              "w-12 border border-zinc-200/60 px-3 text-center",
            )}
            onClick={handlePlaybackRate}
            aria-label="Playback speed"
          >
            {playbackRate}x
          </button>

          <div className="ml-2 flex items-center space-x-2">
            <SpeakerHighIcon size={22} className="text-zinc-400" />
            <Slider
              min={0}
              max={100}
              value={[volume * 100]}
              onValueChange={handleVolumeChange}
              className="w-20 accent-purple-500"
              aria-label="Volume"
            />
          </div>
        </div>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default PodcastPlayer;
