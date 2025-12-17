import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useCreateConcert() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [concert, setConcert] = useState(null);

  const createConcert = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/home/latest-concert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");

      setConcert(json.concert);
      toast.success("Concert Created Successfully");
      return json;
    } catch (err) {
        toast.error(`Concert Creation Failed ${err?.message}`)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { createConcert, concert, loading, error };
}
