import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useDeleteOntheDayPageContentById(refetch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteOnTheDayPageContent = useCallback(async (_id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/on-the-day", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Delete failed");
      setSuccess(true);
      refetch();
      toast.success("On The Day Page Content Deleted Successfully");
      return json;
    } catch (err) {
      toast.error("Content Deletion Failed");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleDeleteOnTheDayPageContent, loading, error, success };
}
