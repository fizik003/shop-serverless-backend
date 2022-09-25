import { products } from "@/mocks";

class ProductProvider {
  getAll() {
    return Promise.resolve(products);
  }

  getById(id: string) {
    const product = products.find((item) => item.id === id);
    return Promise.resolve(product);
  }
}

export const productProvider = new ProductProvider();
