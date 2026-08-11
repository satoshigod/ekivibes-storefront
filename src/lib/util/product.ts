import { HttpTypes } from "@medusajs/types";

export const isSimpleProduct = (product: HttpTypes.TiendaProduct): boolean => {
    return product.options?.length === 1 && product.options[0].values?.length === 1;
}