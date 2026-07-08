import { useState } from "react";
import { toast } from "sonner";

export function useUpdateArtistSectionContent(refetch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleUpdateArtistSectionContent(data) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/home/artist-section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(`Failed to update artist section content ${errData.error}`);
        throw new Error(
          errData.error || "Failed to update artist section content"
        );
      }
      toast.success(`Artist Content Updated`);
      refetch();
      setSuccess(true);
    } catch (err) {
      toast.error(`Error Occured ! ${err?.message}`);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return { handleUpdateArtistSectionContent, loading, error, success };
}
