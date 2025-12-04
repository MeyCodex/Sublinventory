import { useState } from "react";
import { DEFAULT_PAGE_SIZE, type PaginationState } from "@/config/constants";

export function usePagination(initialPageSize: number = DEFAULT_PAGE_SIZE) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const setPageIndex = (pageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex }));
  };

  const setPageSize = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, pageIndex: 0 }));
  };

  const resetPagination = () => {
    setPagination({ pageIndex: 0, pageSize: initialPageSize });
  };

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
