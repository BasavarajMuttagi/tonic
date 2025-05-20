import podcastClient from "@/lib/apiConfig";
import type { PodcastEpisodesResponse } from "@/lib/types";
import { SpinnerGapIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import PodcastEpisodeCard from "./PodcastEpisodeCard";
import { Accordion } from "./ui/accordion";

type PodcastEpisodesProps = { podcastId: string };

const PodcastEpisodes = ({ podcastId }: PodcastEpisodesProps) => {
  const {
    data: result,
    isLoading,
    error,
  } = useQuery<PodcastEpisodesResponse>({
    queryKey: ["podcast-episodes", podcastId],
    queryFn: () => podcastClient.podcastEpisodes(podcastId),
    enabled: !!podcastId,
  });

  if (isLoading) {
    return (
      <div
        className="mt-4 flex w-full flex-col items-center justify-center text-xl"
        aria-busy="true"
      >
        <SpinnerGapIcon className="animate-spin text-blue-500" size={34} />
        <span className="mt-2">Loading episodes...</span>
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

  if (!result?.data?.length) {
    return <div className="text-center text-zinc-500">No episodes found.</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <div className="flex flex-col items-start space-y-4">
        {result.data.map((episode) => (
          <PodcastEpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </Accordion>
  );
};

export default PodcastEpisodes;
