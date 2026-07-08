import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useUpdatePressCoverageTitle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateTitle = useCallback(async (title) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/home/press-coverage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");

      toast.success("Title Updated Successfully");
      return json;
    } catch (err) {
      toast.error(`Title Update Failed: ${err?.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleUpdateTitle, loading, error };
}
