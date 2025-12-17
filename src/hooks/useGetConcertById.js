import { useState, useEffect } from "react";

export default function useGetConcertById(id) {
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchConcert = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/pages/home/latest-concert/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch concert");
        }

        setConcert(data.concert);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, [id]);

  return { concert, loading, error };
}
