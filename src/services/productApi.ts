import type { Product } from "../types/product";

// Custom async function untuk mengambil data produk.
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Gagal mengambil data produk");
  }

  const data = await response.json();

  return data.products as Product[];
};

// Mengambil data produk menggunakan .then().
export const getProductsWithThen = (): Promise<Product[]> => {
  return fetch("https://dummyjson.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data produk");
      }

      return response.json();
    })
    .then((data) => data.products as Product[])
    .catch((error) => {
      console.error("Error:", error);
      return Promise.resolve([]);
    });
};
