
interface Category {
  id: number;
  name: string;
}

const getCategories = async () => {
  const response = await fetch(`/store/categories/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories, ${response.status} ${response.statusText}`);
  }
  // console.log("Response received from API:", response);
  // console.log("Response body:", response.body);
  const data = await response.json();
  return data;
}

export { getCategories, type Category };