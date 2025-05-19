import podcastClient from "@/lib/apiConfig";
import type { Podcast } from "@/lib/types";
import { ShareIcon, SpinnerGapIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";

type PodcastDetailsProps = { podcastId: string };

const PodcastDetails = ({ podcastId }: PodcastDetailsProps) => {
  const {
    data: podcast,
    isLoading,
    error,
  } = useQuery<Podcast>({
    queryKey: ["podcast-detail", podcastId],
    queryFn: () => podcastClient.podcastDetails(podcastId),
    enabled: !!podcastId,
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

  if (!podcast) return null;

  return (
    <div>
      <p className="mb-10 text-3xl font-medium text-blue-500">
        Podcast / <span className="text-lg text-white/50">{podcast.title}</span>
      </p>
      <section className="flex items-center space-x-6 rounded-lg bg-gradient-to-r from-blue-900 to-zinc-800 p-6">
        <img
          src={podcast.imageUrl}
          alt={podcast.title}
          className="h-36 w-36 rounded object-cover shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">{podcast.title}</h1>
          <p className="mt-2 text-zinc-300">{podcast.description}</p>
          <div className="mt-4 flex items-center space-x-3">
            <button className="rounded-full bg-purple-500 px-5 py-2 font-semibold text-white">
              Play Newest
            </button>
            <button className="rounded-full border border-zinc-400 px-4 py-2 text-zinc-100">
              + Follow
            </button>
            <button className="rounded-full px-2 py-2 text-zinc-400 hover:text-white">
              <ShareIcon />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastDetails;
