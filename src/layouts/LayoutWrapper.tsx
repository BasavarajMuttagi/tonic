import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import MainLayout from "@/layouts/MainLayout";
import SearchResults from "@/pages/SearchResults";
import { X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const LayoutWrapper = () => {
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
          <Outlet />
        )}
      </MainLayout.Main>
    </MainLayout>
  );
};

export default LayoutWrapper;
