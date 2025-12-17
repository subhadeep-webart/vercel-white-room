import { useState, useCallback } from "react";
import { toast } from "sonner";
import useGetConcerts from "./useGetConcerts";

export default function useDeleteConcert(refetch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteConcert = useCallback(async (_id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/home/latest-concert", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Delete failed");
      setSuccess(true);
      refetch();
      toast.success("Concert Deleted Successfully");
      return json;
    } catch (err) {
      toast.error("Concert Deletion Failed");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteConcert, loading, error, success };
}
