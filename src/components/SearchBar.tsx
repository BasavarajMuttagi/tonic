import { useSearchTerm } from "@/hooks/useSearchTerm";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const { rawSearchTerm, setRawSearchTerm, setIsOpen } = useSearchTerm();

  const handleClear = () => setRawSearchTerm("");

  return (
    <div className="relative w-md">
      <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
      <Input
        className="rounded-sm pr-8 pl-8"
        placeholder={placeholder}
        value={rawSearchTerm}
        onChange={(e) => setRawSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        autoComplete="off"
      />
      {rawSearchTerm && (
        <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center">
          <X
            className="text-muted-foreground h-4 w-4 cursor-pointer"
            onClick={handleClear}
          />
        </span>
      )}
    </div>
  );
};

export default SearchBar;
