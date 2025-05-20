import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import podcastClient from "@/lib/apiConfig";
import type { PodcastEpisode, PodcastEpisodeMediaResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePodcastStore } from "@/store";
import {
  CheckCircleIcon,
  PlayIcon,
  ShareIcon,
  SpinnerGapIcon,
  TextAlignLeftIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";

type PodcastEpisodeCardProps = { episode: PodcastEpisode };

const PodcastEpisodeCard = ({ episode }: PodcastEpisodeCardProps) => {
  const { setCurrentEpisode } = usePodcastStore();
  const {
    data: episodeWithMedia,
    isLoading,
    error,
  } = useQuery<PodcastEpisodeMediaResponse>({
    queryKey: ["podcast-episode-media", episode.id],
    queryFn: () => podcastClient.podcastEpisodeMedia(episode.id),
    enabled: !!episode.id,
  });

  if (isLoading) {
    return (
      <div
        className="mt-44 flex w-full flex-col items-center justify-center text-xl"
        aria-busy="true"
      >
        <SpinnerGapIcon className="animate-spin text-purple-500" size={34} />
        <span className="mt-2">Loading podcast...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <AccordionItem
      value={String(episode.id)}
      className={cn(
        "group flex w-full flex-col rounded-2xl border border-zinc-200/20 px-6 py-5 shadow-lg transition-colors dark:border-zinc-700/30",
        "bg-white/80 hover:bg-purple-50 dark:bg-zinc-900/80 dark:hover:bg-zinc-800",
        "data-[state=open]:bg-purple-50 dark:data-[state=open]:bg-zinc-800",
      )}
    >
      <div className="flex w-full items-center">
        <button
          className="mr-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg transition-transform hover:scale-105"
          aria-label="Play episode"
          type="button"
          onClick={() => {
            if (episodeWithMedia?.episode) {
              setCurrentEpisode(episodeWithMedia.episode);
            }
          }}
        >
          <PlayIcon size={28} weight="fill" className="text-white" />
        </button>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {episode.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              {new Date(episode.startDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>&bull;</span>
            <span>{Math.round(episode.duration / 60)} min</span>
          </div>
        </div>
        <AccordionTrigger
          className="ml-2 flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-purple-600"
          aria-label="Expand episode details"
        />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-500 transition-colors hover:bg-purple-100 hover:text-purple-700 dark:bg-zinc-800"
          type="button"
        >
          <ShareIcon size={18} weight="regular" />
          Share
        </button>
        <button
          className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-500 transition-colors hover:bg-purple-100 hover:text-purple-700 dark:bg-zinc-800"
          type="button"
        >
          <CheckCircleIcon size={18} weight="regular" />
          Mark as Played
        </button>
        <button
          className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-500 transition-colors hover:bg-purple-100 hover:text-purple-700 dark:bg-zinc-800"
          type="button"
        >
          <TextAlignLeftIcon size={18} weight="regular" />
          Transcript
        </button>
      </div>
      <AccordionContent>
        <div className="mt-6 border-t pt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
          {parse(episode.description) || "No description available."}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PodcastEpisodeCard;
