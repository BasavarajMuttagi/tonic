import { SearchTermContext } from "@/components/search-provider";
import { useContext } from "react";

export function useSearchTerm() {
  const context = useContext(SearchTermContext);
  if (!context) {
    throw new Error("useSearchTerm must be used within a SearchTermProvider");
  }
  return context;
}
