import { File, ListFilter, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAddProduct } from "@/hooks/useProducts";

export function ButtonTrigger() {
  const { register, handleSubmit, errors, onSubmit, open, setOpen } =
    useAddProduct();
  return (
    <>
      <div className="ml-auto flex justify-end gap-2 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Add a new product. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
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
                  {errors.product_name && (
                    <p className="text-red-500 text-[20px]">
                      {errors.product_name.message}
                    </p>
                  )}
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
                  {errors.category && (
                    <p className="text-red-500 text-[20px]">
                      {errors.category.message}
                    </p>
                  )}
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
                  {errors.price && (
                    <p className="text-red-500 text-[20px]">
                      {errors.price.message}
                    </p>
                  )}
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
                  {errors.discount && (
                    <p className="text-red-500 text-[20px]">
                      {errors.discount.message}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
