import type { PodcastResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const SearchResultCard = ({
  podcast,
  best,
}: {
  podcast: PodcastResult;
  best: boolean;
}) => {
  return (
    <div
      className={cn(
        "dark:hover:bg-accent/60 flex h-fit min-w-2xl shrink-0 cursor-pointer items-center justify-start space-x-4 truncate overflow-hidden rounded pr-2",
        best ? "dark:bg-accent" : "shadow",
      )}
    >
      <img
        src={podcast.image}
        alt={podcast.title}
        className="aspect-square h-18 object-contain"
        loading="lazy"
      />

      <div className="space-y-3">
        <div className="truncate text-sm font-light text-zinc-500 dark:text-zinc-400">
          {podcast.title}
        </div>
        <div className="truncate text-[10px] font-light text-zinc-500 dark:text-zinc-400">
          {podcast.typeName}
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
