import { supabase } from "@/lib/supabaseClient";
import {
  type Category,
  type SupplyFormData,
  type SupplyWithCategory,
} from "@/schemas/inventorySchema";

export type UpdateSupplyData = SupplyFormData & {
  id: number;
};

// Insumos
export const getSupplies = async (
  searchTerm: string
): Promise<SupplyWithCategory[]> => {
  const { data, error } = await supabase.rpc("get_supplies", {
    search_term_arg: searchTerm,
  });

  if (error) {
    console.error("Error fetching supplies:", error.message);
    throw new Error(`No se pudieron cargar los insumos: ${error.message}`);
  }
  return data || [];
};

export const createSupply = async (supplyData: SupplyFormData) => {
  const { data, error } = await supabase.rpc("create_supply", {
    name_arg: supplyData.name,
    category_id_arg: supplyData.category_id,
    description_arg: supplyData.description,
    color_arg: supplyData.color,
    size_arg: supplyData.size,
    quantity_arg: supplyData.quantity,
    minimum_stock_arg: supplyData.minimum_stock,
    measurement_unit_arg: supplyData.measurement_unit,
    purchase_price_arg: supplyData.purchase_price,
    supplier_arg: supplyData.supplier,
  });

  if (error) {
    console.error("Error creating supply:", error.message);
    throw new Error(`No se pudo crear el insumo: ${error.message}`);
  }
  return data;
};

export const updateSupply = async (supplyData: UpdateSupplyData) => {
  const { data, error } = await supabase.rpc("update_supply", {
    id_arg: supplyData.id,
    name_arg: supplyData.name,
    category_id_arg: supplyData.category_id,
    description_arg: supplyData.description,
    color_arg: supplyData.color,
    size_arg: supplyData.size,
    quantity_arg: supplyData.quantity,
    minimum_stock_arg: supplyData.minimum_stock,
    measurement_unit_arg: supplyData.measurement_unit,
    purchase_price_arg: supplyData.purchase_price,
    supplier_arg: supplyData.supplier,
  });

  if (error) {
    console.error("Error updating supply:", error.message);
    throw new Error(`No se pudo actualizar el insumo: ${error.message}`);
  }
  return data;
};

export const deleteSupply = async (id: number) => {
  const { data, error } = await supabase.rpc("delete_supply", { id_arg: id });

  if (error) {
    console.error("Error deleting supply:", error.message);
    throw new Error(`No se pudo eliminar el insumo: ${error.message}`);
  }
  return data;
};

// Categorías
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.rpc("get_categories");

  if (error) {
    console.error("Error fetching categories:", error.message);
    throw new Error(`No se pudieron cargar las categorías: ${error.message}`);
  }
  return data || [];
};

export const createCategory = async (name: string) => {
  const { data, error } = await supabase.rpc("create_category", {
    name_arg: name,
  });

  if (error) {
    console.error("Error creating category:", error.message);
    throw new Error(`No se pudo crear la categoría: ${error.message}`);
  }
  return data;
};
