import { useState, type ReactNode } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

interface AccordionItemProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  subtitle,
  children,
  className = "",
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-lg border border-border bg-card shadow-md overflow-hidden ${className}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full p-4 text-left transition-colors hover:bg-accent/50"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{title}</p>
          {subtitle && (
            <p className="text-sm text-primary truncate">{subtitle}</p>
          )}
        </div>
        <div className="ml-3">
          {isOpen ? (
            <RiSubtractLine className="h-5 w-5 text-destructive shrink-0" />
          ) : (
            <RiAddLine className="h-5 w-5 text-primary shrink-0" />
          )}
        </div>
      </button>
      {isOpen && <div className="p-4 border-t border-border">{children}</div>}
    </div>
  );
}
