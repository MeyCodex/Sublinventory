import { RiSearchLine } from "react-icons/ri";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full rounded-lg border-border bg-input py-2.5 pl-10 pr-4 
          text-foreground shadow-sm transition-all duration-200
          focus:border-primary focus:ring-1 focus:ring-ring focus:outline-none
          placeholder:text-muted-foreground text-sm
        `}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <RiSearchLine className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
}
