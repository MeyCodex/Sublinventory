import { useState, useCallback } from "react";
import { DEFAULT_PAGE_SIZE, type PaginationState } from "@/config/constants";

export function usePagination(initialPageSize: number = DEFAULT_PAGE_SIZE) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const setPageIndex = useCallback((pageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, pageIndex: 0 }));
  }, []);

  const resetPagination = useCallback(() => {
    setPagination({ pageIndex: 0, pageSize: initialPageSize });
  }, [initialPageSize]);

  return {
    pagination,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    setPageIndex,
    setPageSize,
    resetPagination,
    setPagination,
  };
}
