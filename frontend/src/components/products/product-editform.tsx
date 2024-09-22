import { useUpdateProduct } from "@/hooks/useProducts";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Product } from "@/lib/api";
import { useEffect } from "react";

interface ProductEditFormProps {
  product: Product;
}
export function ProductEditForm({ product }: ProductEditFormProps) {
  const { register, handleSubmit, onSubmit, setValue } = useUpdateProduct();

  useEffect(() => {
    if (product) {
      setValue("product_name", product.product_name);
      setValue("category", product.category);
      setValue("price", product.price);
      setValue("discount", product.discount);
    }
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Product Name
          </Label>
          <Input
            id="name"
            {...register("product_name")}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Input
            id="category"
            {...register("category")}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            {...register("price", { valueAsNumber: true })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="discount" className="text-right">
            Discount
          </Label>
          <Input
            id="discount"
            {...register("discount", { valueAsNumber: true })}
            className="col-span-3"
          />
        </div>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}
