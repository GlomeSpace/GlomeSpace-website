import { useState, useEffect } from "react";

// Define the shape of a standard Strapi response
interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Usually, you'd include your Strapi API Token here
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const json: StrapiResponse<T> = await response.json();
        
        // We set json.data because Strapi wraps everything in a 'data' object
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}