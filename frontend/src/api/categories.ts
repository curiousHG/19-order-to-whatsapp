
const getCategories = async () => {
  const response = await fetch(`/api/categories/`).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch categories, ${res.status} ${res.statusText}`);
    }
    return res;
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch categories, ${response.status} ${response.statusText}`);
  }
  return response.body;
}

export { getCategories };