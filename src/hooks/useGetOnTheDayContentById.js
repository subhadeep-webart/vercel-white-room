import { useState, useCallback } from "react";
import { toast } from "sonner";

export function useGetOnTheDayContentById() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async (id) => {
    if (!id) {
      toast.error("Missing content ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/pages/on-the-day/${id}`);

      if (!res.ok) {
        const errData = await res.json();
        toast.error(`Failed to fetch content: ${errData.error}`);
        throw new Error(errData.error || "Failed to fetch content");
      }

      const data = await res.json();
      setContent(data.content);
    } catch (err) {
      toast.error(`Error occurred: ${err?.message}`);
      setError(err?.message);
      setContent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { content, loading, error, refetch };
}
