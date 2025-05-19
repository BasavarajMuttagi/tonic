import SearchResultCard from "@/components/SearchResultCard";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import podcastClient from "@/lib/apiConfig";
import type { PodcastSearchResult } from "@/lib/types";
import { SpinnerGapIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const { searchTerm } = useSearchTerm();

  const { data, isLoading, error } = useQuery<PodcastSearchResult>({
    queryKey: ["search-results", searchTerm],
    queryFn: async () => await podcastClient.search(searchTerm),
    enabled: !!searchTerm.length,
  });

  if (!searchTerm || searchTerm.trim().length === 0) {
    return (
      <div className="mt-44 flex w-full flex-col items-center justify-center text-xl">
        Search for podcasts
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="mt-44 flex w-full flex-col items-center justify-center text-xl">
        <SpinnerGapIcon
          className="animate-[spin_1.3s_linear_infinite] text-blue-500"
          size={34}
        />
      </div>
    );

  if (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return <div>Error: {message}</div>;
  }

  return (
    <div className="my-5 flex h-full w-full flex-col items-center space-y-3">
      <div className="flex flex-col gap-10">
        {data?.bestMatch && (
          <div className="space-y-2">
            <p className="font-medium text-green-500">Top Result</p>
            {data.bestMatch.typeName === "PODCAST" ? (
              <Link to={`/podcasts/podcast/${data.bestMatch.id}`}>
                <SearchResultCard
                  key={data.bestMatch.id}
                  podcast={data.bestMatch}
                  best={true}
                />
              </Link>
            ) : (
              <SearchResultCard
                key={data.bestMatch.id}
                podcast={data.bestMatch}
                best={true}
              />
            )}
          </div>
        )}
        <div className="space-y-2">
          <p className="font-medium text-blue-500">Search Results</p>
          <div className="space-y-2">
            {data?.results && data.results.length > 0 ? (
              data.results.map((eachPodcast) => {
                if (eachPodcast.typeName === "PODCAST") {
                  return (
                    <Link
                      to={`/podcasts/podcast/${eachPodcast.id}`}
                      key={eachPodcast.id}
                    >
                      <SearchResultCard
                        key={eachPodcast.id}
                        podcast={eachPodcast}
                        best={false}
                      />
                    </Link>
                  );
                }

                return (
                  <SearchResultCard
                    key={eachPodcast.id}
                    podcast={eachPodcast}
                    best={false}
                  />
                );
              })
            ) : (
              <div>No search results found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
