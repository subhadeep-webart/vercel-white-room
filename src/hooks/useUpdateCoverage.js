import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useUpdateCoverage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateCoverage = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/home/press-coverage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      toast.success("Concert Edited Successfully");
      return json;
    } catch (err) {
      toast.error(err?.error ?? "Coverage Edited Failed");
      setError(err?.error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleUpdateCoverage, loading, error };
}
