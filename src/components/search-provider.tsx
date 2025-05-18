import { createContext, type ReactNode, useState } from "react";
import { useDebounce } from "use-debounce";
type SearchTermProviderProps = {
  children: ReactNode;
  defaultValue?: string;
  defaultOpen?: boolean;
};

type SearchTermProviderState = {
  /** Raw input value (updates immediately) */
  rawSearchTerm: string;
  /** Debounced value (updates after 300ms) */
  searchTerm: string;
  setRawSearchTerm: (term: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const initialState: SearchTermProviderState = {
  rawSearchTerm: "",
  searchTerm: "",
  setRawSearchTerm: () => {},
  isOpen: false,
  setIsOpen: () => {},
};

export const SearchTermContext =
  createContext<SearchTermProviderState>(initialState);

export default function SearchTermProvider({
  children,
  defaultValue = "",
  defaultOpen = false,
}: SearchTermProviderProps) {
  const [rawSearchTerm, setRawSearchTerm] = useState(defaultValue);
  const [debouncedSearchTerm] = useDebounce(rawSearchTerm, 300);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <SearchTermContext.Provider
      value={{
        rawSearchTerm,
        searchTerm: debouncedSearchTerm,
        setRawSearchTerm,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SearchTermContext.Provider>
  );
}
