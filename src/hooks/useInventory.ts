import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  getSupplies,
  createSupply,
  updateSupply,
  deleteSupply,
  getCategories,
} from "@/api/inventoryApi";
import { DEFAULT_PAGE_SIZE } from "@/config/constants";

export function useInventory(
  searchTerm: string = "",
  pageIndex: number = 0,
  pageSize: number = DEFAULT_PAGE_SIZE
) {
  const queryClient = useQueryClient();

  const suppliesQuery = useQuery({
    queryKey: ["supplies", searchTerm, pageIndex, pageSize],
    queryFn: ({ signal }) =>
      getSupplies(searchTerm, pageIndex, pageSize, signal),
    placeholderData: keepPreviousData,
  });
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: createSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
    },
    onError: (err) => console.error("Error creating:", err),
  });
  const updateMutation = useMutation({
    mutationFn: updateSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
    },
    onError: (err) => console.error("Error updating:", err),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
    },
    onError: (err) => console.error("Error deleting:", err),
  });

  return {
    supplies: suppliesQuery.data?.data || [],
    totalCount: suppliesQuery.data?.count || 0,
    isLoading: suppliesQuery.isLoading,
    isFetching: suppliesQuery.isFetching,
    isError: suppliesQuery.isError,
    error: suppliesQuery.error,
    categories: categoriesQuery.data,
    isLoadingCategories: categoriesQuery.isLoading,
    createSupply: createMutation.mutate,
    updateSupply: updateMutation.mutate,
    deleteSupply: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
