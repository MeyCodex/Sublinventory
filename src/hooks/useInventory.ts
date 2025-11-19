import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSupplies,
  createSupply,
  updateSupply,
  deleteSupply,
  getCategories,
} from "@/api/inventoryApi";

export function useInventory(searchTerm: string = "") {
  const queryClient = useQueryClient();

  const suppliesQuery = useQuery({
    queryKey: ["supplies", searchTerm],
    queryFn: () => getSupplies(searchTerm),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 1,
    networkMode: "always",
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    networkMode: "always",
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
    supplies: suppliesQuery.data,
    isLoading: suppliesQuery.isLoading,
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
