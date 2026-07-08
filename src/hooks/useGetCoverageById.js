import { useState, useEffect } from "react";

export default function useGetCoverageById(id) {
  const [coverage, setCoverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCoverage = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/pages/home/press-coverage/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch coverage");
        }

        setCoverage(data.coverage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoverage();
  }, [id]);

  return { coverage, loading, error };
}
