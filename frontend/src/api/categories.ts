

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/api/categories/`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export { getCategories };