import type { Podcast } from "@/lib/types";

const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
  return (
    <div className="h-fit shrink-0 overflow-hidden rounded">
      <img
        src={podcast.imageUrl}
        alt={podcast.title}
        className="aspect-square w-full object-contain"
        loading="lazy"
      />
      <div className="mt-3">
        <div className="truncate text-sm font-light text-zinc-300">
          {podcast.title}
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
