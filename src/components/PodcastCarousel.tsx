import podcast from "@/lib/apiConfig";
import type { PodcastByCategoryIdResult } from "@/lib/types";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PodcastCard from "./PodcastCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";

const SKELETON_COUNT = 8;

const PodcastCarousel = ({ category }: { category: string | number }) => {
  const {
    data: result,
    isLoading,
    error,
  } = useQuery<PodcastByCategoryIdResult>({
    queryKey: ["podcastsByCategory", category],
    queryFn: () => podcast.podcastsByCategoryId(category),
  });

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <section className="mt-10">
      <div className="mx-auto w-[90vw] p-2">
        {!isLoading && result?.name && (
          <header className="mb-2 flex items-center justify-between text-white">
            <Link
              to={`/${result.id}`}
              className="group flex items-center space-x-2 text-lg font-medium tracking-wide text-blue-500 hover:underline"
              aria-label={`View all podcasts in ${result.name}`}
            >
              <span>{result.name}</span>
              <ArrowUpRightIcon
                size={18}
                weight="regular"
                className="transition-transform group-hover:rotate-12"
              />
            </Link>
          </header>
        )}

        <Carousel opts={{ align: "center" }}>
          <CarouselContent>
            {isLoading ? (
              Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
                <CarouselItem
                  key={idx}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <Skeleton className="mt-10 mb-4 aspect-square w-full object-contain" />
                </CarouselItem>
              ))
            ) : result?.podcasts?.length ? (
              result.podcasts.map((podcast, idx) => (
                <CarouselItem
                  key={podcast.id || idx}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="p-1">
                    <PodcastCard podcast={podcast} />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">
                No podcasts found in this category.
              </div>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PodcastCarousel;
