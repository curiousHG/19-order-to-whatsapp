import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";



function Home() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    getCategories()
      .then(setApiData)
      .catch((e) => {
        setApiData("API error");
        console.error("Error fetching API data:", e);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <h2>API Test:</h2>
      <pre>{JSON.stringify(apiData, null, 2)}</pre>
    </div>
  );
}

export default Home;