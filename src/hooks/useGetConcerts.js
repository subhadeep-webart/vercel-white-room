import { useState, useEffect } from "react";

export default function useGetConcerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConcerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pages/home/latest-concert");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load concerts");
      setConcerts(json.concerts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  return { concerts, loading, error, refetch: fetchConcerts };
}
