import { useEffect, useState } from "react";
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
import { useInventory } from "@/hooks/useInventory";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/Pagination";

function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const { pageIndex, pageSize, setPageIndex, setPageSize } = usePagination();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplyToEdit, setSupplyToEdit] = useState<SupplyWithCategory | null>(
    null
  );
  const [supplyToDelete, setSupplyToDelete] =
    useState<SupplyWithCategory | null>(null);
  const {
    supplies,
    totalCount,
    isLoading,
    isFetching,
    error,
    categories,
    isLoadingCategories,
    createSupply,
    updateSupply,
    deleteSupply,
    isDeleting,
  } = useInventory(debouncedSearchTerm, pageIndex, pageSize);

  useEffect(() => {
    setPageIndex(0);
  }, [debouncedSearchTerm, setPageIndex]);

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
      deleteSupply(supplyToDelete.id, {
        onSuccess: () => setSupplyToDelete(null),
      });
    }
  };
  const handleFormSubmit = (data: SupplyFormData) => {
    if (supplyToEdit) {
      updateSupply(
        { ...data, id: supplyToEdit.id },
        {
          onSuccess: () => {
            console.log("Insumo actualizado");
            handleCloseModal();
          },
        }
      );
    } else {
      createSupply(data, {
        onSuccess: () => {
          console.log("Insumo creado");
          handleCloseModal();
        },
      });
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
      {/* Escritorio */}
      <div className="hidden md:flex flex-1 flex-col">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <InventoryTable
              supplies={supplies || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <div className="mt-4">
              <Pagination
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalCount={totalCount}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
                isLoading={isFetching}
              />
            </div>
          </>
        )}
      </div>
      {/* Móvil */}
      <div className="block md:hidden space-y-4 pb-4">
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

      {/* Modales */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={supplyToEdit ? "Editar insumo" : "Nuevo insumo"}
        size="lg"
      >
        <InventoryForm
          onSubmit={handleFormSubmit}
          onClose={handleCloseModal}
          initialData={supplyToEdit}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
        />
      </Modal>

      <ConfirmationModal
        isOpen={!!supplyToDelete}
        onClose={() => setSupplyToDelete(null)}
        onConfirm={confirmDelete}
        title="ELIMINAR INSUMO"
        description={`¿Estás seguro de que quieres eliminar "${supplyToDelete?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Sí, eliminar"
        isLoading={isDeleting}
        variant="destructive"
      />
    </div>
  );
}

export default InventoryPage;
