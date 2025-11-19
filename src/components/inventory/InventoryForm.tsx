import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/inventoryApi";
import {
  supplyFormSchema,
  type SupplyFormData,
  type SupplyWithCategory,
} from "@/schemas/inventorySchema";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface InventoryFormProps {
  onSubmit: (data: SupplyFormData) => void;
  onClose: () => void;
  initialData?: SupplyWithCategory | null;
}

export function InventoryForm({
  onSubmit,
  onClose,
  initialData,
}: InventoryFormProps) {
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(supplyFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          category_id: initialData.category_id,
          description: initialData.description ?? "",
          color: initialData.color ?? "",
          size: initialData.size ?? "",
          quantity: initialData.quantity,
          minimum_stock: initialData.minimum_stock,
          measurement_unit: initialData.measurement_unit,
          purchase_price: initialData.purchase_price,
          supplier: initialData.supplier ?? "",
        }
      : {
          name: "",
          category_id: undefined,
          description: "",
          color: "",
          size: "",
          quantity: "",
          minimum_stock: "",
          measurement_unit: "",
          purchase_price: undefined,
          supplier: "",
        },
  });

  const handleValidSubmit = (data: SupplyFormData) => {
    onSubmit(data);
  };

  const submitText = initialData ? "Actualizar" : "Guardar";
  const loadingText = initialData ? "Actualizando..." : "Guardando...";

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="md:col-span-2">
          <FormField
            id="name"
            label="Nombre del Insumo"
            register={register("name")}
            error={errors.name}
            placeholder="Ej: Polera Algodón Negra"
          />
        </div>

        <div>
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Categoría
          </label>
          <select
            id="category_id"
            {...register("category_id")}
            disabled={isLoadingCategories}
            className={`mt-1 block w-full rounded-lg border-border bg-input px-4 py-2.5 text-foreground cursor-pointer focus:border-primary focus:ring-1 focus:ring-ring focus:outline-none text-sm 
            ${errors.category_id ? "border-destructive ring-destructive" : ""}`}
          >
            <option value="">
              {isLoadingCategories ? "Cargando..." : "Selecciona una categoría"}
            </option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="mt-1 text-xs text-destructive font-medium">
              {errors.category_id.message}
            </p>
          )}
        </div>
        <FormField
          id="purchase_price"
          label="Precio de Compra"
          type="number"
          register={register("purchase_price")}
          error={errors.purchase_price}
          placeholder="Ej: 3500"
        />
        <FormField
          id="quantity"
          label="Stock Actual"
          type="number"
          register={register("quantity")}
          error={errors.quantity}
          placeholder="Ej: 50"
        />
        <FormField
          id="minimum_stock"
          label="Stock Mínimo"
          type="number"
          register={register("minimum_stock")}
          error={errors.minimum_stock}
          placeholder="Ej: 10"
        />
        <FormField
          id="measurement_unit"
          label="Unidad de Medida"
          register={register("measurement_unit")}
          error={errors.measurement_unit}
          placeholder="Ej: unidades, metros, etc."
        />
        <FormField
          id="supplier"
          label="Proveedor (Opcional)"
          register={register("supplier")}
          error={errors.supplier}
          placeholder="Ej: Importadora Textil"
        />
        <FormField
          id="color"
          label="Color (Opcional)"
          register={register("color")}
          error={errors.color}
          placeholder="Ej: Negro"
        />
        <FormField
          id="size"
          label="Talla/Tamaño (Opcional)"
          register={register("size")}
          error={errors.size}
          placeholder="Ej: L"
        />
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Descripción (Opcional)
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className={`mt-1 block w-full rounded-lg border-border bg-input px-4 py-2.5 text-foreground
                        focus:border-primary focus:ring-1 focus:ring-ring focus:outline-none text-sm
                        placeholder:text-muted-foreground
                        ${
                          errors.description
                            ? "border-destructive ring-destructive"
                            : ""
                        }`}
            placeholder="Añade una descripción del insumo..."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-xs text-destructive font-medium">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6 pt-4 border-t border-border">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="w-full md:w-auto"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          loadingText={loadingText}
          className="w-full md:w-auto"
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}
