import { useState, useCallback } from "react";

export default function useUpdateConcert() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedConcert, setUpdatedConcert] = useState(null);

  const updateConcert = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/pages/home/latest-concert`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");

      setUpdatedConcert(json.concert);
      return json;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateConcert, updatedConcert, loading, error };
}
