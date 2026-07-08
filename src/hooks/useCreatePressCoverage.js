import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useCreatePressCoverage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePressCoverage = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/home/press-coverage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");

      toast.success("Coverage Created Successfully");
      return json;
    } catch (err) {
      toast.error(`Coverage Creation Failed ${err?.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleCreatePressCoverage, loading, error };
}
