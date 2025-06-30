
interface Product {
  id: number;
  category: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  description: string;
}

const getProducts = async (categoryId: number) => {
  const response = await fetch(`/store/category/${categoryId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products, ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  console.log(data)
  return data;
};

export { getProducts, type Product };