import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSupply,
  getSupplies,
  updateSupply,
  deleteSupply,
} from "@/api/inventoryApi.ts";
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
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplyToEdit, setSupplyToEdit] = useState<SupplyWithCategory | null>(
    null
  );
  const [supplyToDelete, setSupplyToDelete] =
    useState<SupplyWithCategory | null>(null);

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
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
      handleCloseModal();
    },
    onError: (err) => console.error(err),
  });
  const updateSupplyMutation = useMutation({
    mutationFn: updateSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
      handleCloseModal();
    },
    onError: (err) => console.error(err),
  });
  const deleteSupplyMutation = useMutation({
    mutationFn: deleteSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
      setSupplyToDelete(null);
    },
    onError: (err) => console.error(err),
  });
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSupplyToEdit(null);
  };

  const handleEdit = (supply: SupplyWithCategory) => {
    setSupplyToEdit(supply);
    setIsModalOpen(true);
  };
  const handleDelete = (supply: SupplyWithCategory) => {
    setSupplyToDelete(supply);
  };
  const confirmDelete = () => {
    if (supplyToDelete) {
      deleteSupplyMutation.mutate(supplyToDelete.id);
    }
  };

  const handleFormSubmit = (data: SupplyFormData) => {
    if (supplyToEdit) {
      updateSupplyMutation.mutate({ ...data, id: supplyToEdit.id });
    } else {
      createSupplyMutation.mutate(data);
    }
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
        onClose={handleCloseModal}
        title={supplyToEdit ? "Editar Insumo" : "Nuevo Insumo"}
        size="lg"
      >
        <InventoryForm
          onSubmit={handleFormSubmit}
          onClose={handleCloseModal}
          initialData={supplyToEdit}
        />
      </Modal>
      <ConfirmationModal
        isOpen={!!supplyToDelete}
        onClose={() => setSupplyToDelete(null)}
        onConfirm={confirmDelete}
        title="¿Eliminar insumo?"
        description={`¿Estás seguro de que quieres eliminar "${supplyToDelete?.name}"? Esta acción no se puede deshacer y podría afectar a reportes históricos.`}
        confirmText="Eliminar"
        isLoading={deleteSupplyMutation.isPending}
        variant="destructive"
      />
    </div>
  );
}

export default InventoryPage;
