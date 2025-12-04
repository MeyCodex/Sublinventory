import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
} from "react-icons/ri";
import { PAGE_SIZE_OPTIONS } from "@/config/constants";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  pageIndex,
  pageSize,
  totalCount,
  setPageIndex,
  setPageSize,
  isLoading = false,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = pageIndex + 1;

  if (totalCount === 0) return null;

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground w-full sm:w-auto justify-center md:justify-start">
        <span>
          Mostrando{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            disabled={isLoading}
            className="bg-card border border-border rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            aria-label="Resultados por página"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>{" "}
          de <strong>{totalCount}</strong> resultados
        </span>
      </div>
      <div className="flex items-center gap-1 w-full sm:w-auto justify-center md:justify-end overflow-x-auto pb-2 sm:pb-0">
        <button
          onClick={() => setPageIndex(0)}
          disabled={pageIndex === 0 || isLoading}
          className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Primera página"
        >
          <RiArrowLeftDoubleLine className="h-4 w-4" />
        </button>

        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0 || isLoading}
          className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Página anterior"
        >
          <RiArrowLeftSLine className="h-4 w-4" />
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="h-9 w-9 flex items-center justify-center text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = pageNum === currentPage;
          return (
            <button
              key={page}
              onClick={() => setPageIndex(pageNum - 1)}
              disabled={isLoading}
              className={`
                h-9 w-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground border border-primary shadow-sm"
                    : "bg-card border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                }
              `}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= totalPages - 1 || isLoading}
          className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Página siguiente"
        >
          <RiArrowRightSLine className="h-4 w-4" />
        </button>
        <button
          onClick={() => setPageIndex(totalPages - 1)}
          disabled={pageIndex >= totalPages - 1 || isLoading}
          className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Última página"
        >
          <RiArrowRightDoubleLine className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
