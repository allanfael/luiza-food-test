import { api } from "./api";

async function fetchProducts() {
  return await api.getProducts();
}

export { fetchProducts };