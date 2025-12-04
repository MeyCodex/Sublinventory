import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";
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
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < totalPages - 1;

  if (totalCount === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 border-t border-border mt-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground w-full sm:w-auto">
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
          <strong> {totalCount}</strong> resultados
        </span>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Button
          variant="secondary"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={!canPreviousPage || isLoading}
          className="w-auto px-3 py-2 h-9"
          aria-label="Página anterior"
        >
          <RiArrowLeftSLine className="h-5 w-5" />
        </Button>

        <span className="text-sm font-medium text-foreground min-w-12 text-center">
          Página {pageIndex + 1} de {totalPages || 1}
        </span>

        <Button
          variant="secondary"
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={!canNextPage || isLoading}
          className="w-auto px-3 py-2 h-9"
          aria-label="Siguiente página"
        >
          <RiArrowRightSLine className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
