import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";

const SearchBar = ({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch: (term: string) => void;
}) => {
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 300);

  useEffect(() => {
    onSearch(debouncedText.trim());
  }, [debouncedText, onSearch]);

  const handleClear = () => setText("");

  return (
    <div className="relative w-md">
      <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
      <Input
        className="rounded-sm pr-8 pl-8"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete="off"
      />
      {text && (
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
