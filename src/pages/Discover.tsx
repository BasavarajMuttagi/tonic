import { Skeleton } from "@/components/ui/skeleton";
import podcastClient from "@/lib/apiConfig";
import type { Categories } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const Discover = () => {
  const {
    data: result,
    isLoading,
    error,
  } = useQuery<Categories>({
    queryKey: ["categories/genres"],
    queryFn: async () => await podcastClient.categories(),
  });

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="mx-20 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {isLoading &&
        Array.from({ length: 20 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="mb-4 aspect-square w-full object-contain"
          />
        ))}

      {!isLoading && result?.genres?.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No genres found.
        </div>
      )}

      {!isLoading &&
        result?.genres?.map((genre) => (
          <img
            key={genre.id || genre.genreName}
            src={genre.image}
            alt={genre.genreName}
            className="mb-4 aspect-square w-full cursor-pointer rounded object-contain"
            loading="lazy"
          />
        ))}
    </div>
  );
};

export default Discover;
