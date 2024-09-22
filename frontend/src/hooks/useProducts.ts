import {
  addProduct,
  deleteProduct,
  fetchProducts,
  Product,
  updateProduct,
} from "@/lib/api";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  deleteProduct as removeProduct,
  addProduct as addProductApi,
  updateProduct as updateProductApi,
} from "./productSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { productSchema } from "@/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/components/ui/showtoast";
import { useState } from "react";

export const useFetchProducts = () => {
  const { data, isSuccess, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { data, isSuccess, isLoading, isError };
};

export const useDeleteProduct = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await deleteProduct(id);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      dispatch(removeProduct(id));
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const mutation = useMutation<Product, Error, Product>({
    mutationFn: async (product: Product) => {
      return await addProduct(product);
    },
    onSuccess: (data) => {
      dispatch(addProductApi(data));
      showToast("Product added successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const onSubmit: SubmitHandler<Product> = (data) => {
    mutation.mutate(data);
  };

  return { register, handleSubmit, errors, onSubmit, open, setOpen };
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      product_name: "",
      category: "",
      price: 0,
      discount: 0,
    },
    resolver: zodResolver(productSchema),
  });

  const mutation = useMutation<Product, Error, Product>({
    mutationFn: async (product: Product) => {
      return await updateProduct(product);
    },
    onSuccess: (data) => {
      dispatch(updateProductApi(data));
      showToast("Product updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });

  const handleEdit = (product: Product) => {
    setValue("id", product.id);
    setValue("product_name", product.product_name);
    setValue("category", product.category);
    setValue("price", product.price);
    setValue("discount", product.discount);
    setOpen(true);
  };

  const onSubmit: SubmitHandler<Product> = (data) => {
    mutation.mutate(data);
  };

  return {
    setValue,
    handleSubmit,
    onSubmit,
    errors,
    open,
    setOpen,
    register,
    handleEdit,
  };
};
