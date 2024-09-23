"use client";

import { Ellipsis, Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch } from "react-redux";
import {
  useDeleteProduct,
  useFetchProducts,
  useUpdateProduct,
} from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { setProducts } from "@/hooks/productSlice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { format } from "date-fns";

export function ListProduct() {
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState("");
  const { data: products, isLoading, isError } = useFetchProducts();
  const deleteMutation = useDeleteProduct();
  const {
    setOpen,
    open,
    onSubmit,
    handleSubmit,
    register,
    handleEdit,
    errors,
  } = useUpdateProduct();

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading products</p>;
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const filteredProducts = (products ?? []).filter((product) => {
    return product.category
      .toLowerCase()
      .includes(searchCategory.toLowerCase());
  });

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-start text-xl">Products</CardTitle>
          <CardDescription className="text-start">
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative ml-auto flex-1 md:grow-0 left-[350px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-start">Name</TableHead>
                <TableHead className="w-[150px] text-start">Category</TableHead>
                <TableHead className="hidden md:table-cell w-[100px] text-start">
                  Price
                </TableHead>
                <TableHead className="hidden md:table-cell w-[100px] text-start">
                  Discount
                </TableHead>
                <TableHead className="hidden md:table-cell w-[100px] text-start">
                  Created At
                </TableHead>

                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts?.length > 0 ? (
                filteredProducts?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-start">
                      {product.product_name}
                    </TableCell>
                    <TableCell className="text-start">
                      {product.category}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-start">
                      Rp.{product.price}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-start">
                      {product.discount} %
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-start">
                      {format(new Date(product.created_at), "dd MMM yyyy")}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="cursor-pointer ms-2">
                            <Ellipsis className="h-4 w-4 text-black" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p className="text-center text-red-500 text-[20px]">
                  No product found
                </p>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing {products?.length} of {products?.length}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Add a new product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <input type="hidden" {...register("id")} />
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
                  {...register("price", {
                    valueAsNumber: true,
                  })}
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
                  {...register("discount", {
                    valueAsNumber: true,
                  })}
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
  );
}
