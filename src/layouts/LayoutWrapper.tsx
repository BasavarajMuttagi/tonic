import AppHeader from "@/components/AppHeader";
import PodcastPlayer from "@/components/PodcastPlayer";
import { Button } from "@/components/ui/button";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import MainLayout from "@/layouts/MainLayout";
import SearchResults from "@/pages/SearchResults";
import { usePodcastStore } from "@/store";
import { X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const LayoutWrapper = () => {
  const { currentEpisode } = usePodcastStore();
  const location = useLocation();
  const { isOpen, setIsOpen, setRawSearchTerm } = useSearchTerm();
  const handleReset = useCallback(() => {
    setIsOpen(false);
    setRawSearchTerm("");
  }, [setIsOpen, setRawSearchTerm]);

  useEffect(() => {
    if (isOpen) {
      console.log("reset");
      handleReset();
    }
  }, [location.pathname, setIsOpen, setRawSearchTerm, handleReset]);

  return (
    <MainLayout>
      <MainLayout.Header>
        <AppHeader />
      </MainLayout.Header>
      <MainLayout.Main>
        {isOpen ? (
          <div>
            <Button
              className="hover:bg-background/30 absolute top-5 right-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-700 transition"
              onClick={handleReset}
              type="button"
            >
              <X className="text-muted-foreground h-4 w-4" />
            </Button>

            <SearchResults />
          </div>
        ) : (
          <>
            <Outlet />
          </>
        )}
        <div className="fixed right-0 bottom-4 left-0 z-50 mx-auto max-w-2/3 shadow-lg">
          {currentEpisode && (
            <PodcastPlayer
              bgColor="bg-zinc-900"
              artworkUrl={currentEpisode.imageUrl}
              audioUrl={currentEpisode.mediaUrl!}
              episodeTitle={currentEpisode.title}
              duration={currentEpisode.duration}
            />
          )}
        </div>
      </MainLayout.Main>
    </MainLayout>
  );
};

export default LayoutWrapper;
