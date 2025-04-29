import { api } from "./api";

async function fetchStoreWithProducts() {
  return await api.getStoreWithProducts();
}

export { fetchStoreWithProducts };