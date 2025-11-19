import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSupply, getSupplies } from "@/api/inventoryApi.ts";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { CardSkeleton } from "@/components/ui/CardSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toolbar } from "@/components/ui/Toolbar";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { RiAddLine } from "react-icons/ri";
import type {
  SupplyFormData,
  SupplyWithCategory,
} from "@/schemas/inventorySchema";
import { useDebounce } from "@/hooks/useDebounce";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryCardList } from "@/components/inventory/InventoryCardList";
import { Modal } from "@/components/ui/Modal";
import { InventoryForm } from "@/components/inventory/InventoryForm";

function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: supplies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["supplies", debouncedSearchTerm],
    queryFn: () => getSupplies(debouncedSearchTerm),
  });

  const createSupplyMutation = useMutation({
    mutationFn: createSupply,
    onSuccess: () => {
      console.log("Insumo creado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
      setIsModalOpen(false);
    },
    onError: (err) => {
      console.error("Error al crear el insumo:", err.message);
    },
  });

  const handleEdit = (supply: SupplyWithCategory) => {
    console.log("Editar:", supply.name);
  };
  const handleDelete = (supply: SupplyWithCategory) => {
    console.log("Borrar:", supply.name);
  };

  const handleCreateSubmit = (data: SupplyFormData) => {
    createSupplyMutation.mutate(data);
  };

  if (error) {
    return (
      <div className="text-destructive p-4 bg-destructive/10 rounded-md">
        <p className="font-semibold">Error al cargar el inventario</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <PageHeader
          title="Gestión de inventario"
          description="Gestiona tus materiales y productos en stock."
        />
        <Toolbar className="md:justify-end">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar insumo..."
            className="w-full md:w-auto"
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto"
          >
            <div className="flex items-center justify-center">
              <RiAddLine className="mr-2" />
              Añadir insumo
            </div>
          </Button>
        </Toolbar>
      </div>
      {/* Escritorio */}
      <div className="hidden md:flex flex-1 flex-col">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <InventoryTable
            supplies={supplies || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      {/* Móvil */}
      <div className="block md:hidden flex-1 space-y-4 overflow-y-auto">
        {isLoading ? (
          <CardSkeleton rows={5} hasSubtitle={true} />
        ) : (
          <InventoryCardList
            supplies={supplies || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo insumo"
        size="lg"
      >
        <InventoryForm
          onSubmit={handleCreateSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default InventoryPage;
