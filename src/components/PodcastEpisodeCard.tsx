import {
  Accordion,
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
  console.log(episode);
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
        <SpinnerGapIcon className="animate-spin text-blue-500" size={34} />
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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="episode"
        className={cn(
          "flex w-full flex-col rounded-lg bg-white px-6 py-4 shadow dark:bg-zinc-800",
        )}
      >
        <div className="flex w-full items-center">
          <button
            className="mr-5 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200"
            aria-label="Play episode"
            type="button"
            onClick={() => {
              if (episodeWithMedia?.episode) {
                setCurrentEpisode(episodeWithMedia.episode);
              }
            }}
          >
            <PlayIcon size={28} weight="fill" className="text-zinc-900" />
          </button>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-medium text-zinc-900 dark:text-zinc-100">
              {episode.title}
            </h3>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {new Date(episode.startDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              &bull; {Math.round(episode.duration / 60)} mins
            </div>
          </div>
          <AccordionTrigger
            className="ml-2 text-zinc-400 hover:text-zinc-700"
            aria-label="Expand episode details"
          ></AccordionTrigger>
        </div>

        <div className="mt-4 flex items-center space-x-8 text-sm text-zinc-500 dark:text-zinc-400">
          <button
            className="flex items-center hover:text-zinc-900 dark:hover:text-white"
            type="button"
          >
            <ShareIcon size={18} weight="regular" className="mr-1" />
            Share
          </button>
          <button
            className="flex items-center hover:text-zinc-900 dark:hover:text-white"
            type="button"
          >
            <CheckCircleIcon size={18} weight="regular" className="mr-1" />
            Mark as Played
          </button>
          <button
            className="flex items-center hover:text-zinc-900 dark:hover:text-white"
            type="button"
          >
            <TextAlignLeftIcon size={18} weight="regular" className="mr-1" />
            Transcript
          </button>
        </div>

        <AccordionContent>
          <div className="mt-4 border-t pt-4 text-sm text-zinc-700 dark:text-zinc-200">
            {parse(episode.description) || "No description available."}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PodcastEpisodeCard;
