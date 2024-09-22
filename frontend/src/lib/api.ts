import axios from "axios";

export interface Product {
  id: number;
  product_name: string;
  category: string;
  price: number;
  discount: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get("/products");
  console.log("data", response.data.data);
  return response.data.data;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const response = await apiClient.post("/products", product);
  return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await apiClient.patch(`/products/${product.id}`, product);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};
