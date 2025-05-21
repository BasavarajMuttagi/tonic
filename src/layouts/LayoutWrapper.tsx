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
import { motion, AnimatePresence } from "framer-motion";

const searchVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const playerVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0, // Animate to bottom: 0
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

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
      handleReset();
    }
    // Do NOT add isOpen to dependencies!
  }, [location.pathname, handleReset]);

  return (
    <MainLayout>
      <MainLayout.Header>
        <AppHeader />
      </MainLayout.Header>
      <MainLayout.Main>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="search-container"
              variants={searchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <Button
                className="hover:bg-background/30 absolute top-5 right-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-700 transition"
                onClick={handleReset}
                type="button"
              >
                <X className="text-muted-foreground h-4 w-4" />
              </Button>
              <SearchResults />
            </motion.div>
          ) : (
            <Outlet />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {currentEpisode && (
            <motion.div
              key="player-container"
              variants={playerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-2/3 shadow-lg"
            >
              <PodcastPlayer podcastEpisode={currentEpisode} />
            </motion.div>
          )}
        </AnimatePresence>
      </MainLayout.Main>
    </MainLayout>
  );
};

export default LayoutWrapper;
