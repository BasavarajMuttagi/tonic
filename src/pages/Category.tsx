import PodcastCard from "@/components/PodcastCard";
import { Skeleton } from "@/components/ui/skeleton";
import podcastClient from "@/lib/apiConfig";
import type { PodcastByCategoryIdResult } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  const {
    data: result,
    isLoading,
    error,
  } = useQuery<PodcastByCategoryIdResult>({
    queryKey: ["category", id],
    queryFn: async () => await podcastClient.podcastsByCategoryId(id as string),
    enabled: !!id,
  });

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="mx-20 p-4">
      <p className="mb-10 text-3xl font-medium text-blue-500">
        Discover / <span className="text-lg text-white">{result?.name}</span>
      </p>

      <div className="grid grid-cols-1 gap-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading &&
          Array.from({ length: 20 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="mb-4 aspect-square w-full object-contain"
            />
          ))}

        {!isLoading && result?.podcasts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No podcasts found.
          </div>
        )}

        {!isLoading &&
          result?.podcasts?.map((podcast) => (
            <Link to={`/podcasts/podcast/${podcast.id}`}>
              <PodcastCard podcast={podcast} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Category;
