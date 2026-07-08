import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useUpdateMediaFile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateMedia = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/pages/media`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      toast.success("Media Updated Successfully");
      router.push("/admin/dashboard/media");
      return json;
    } catch (err) {
      toast.error(`Media Updation Failed ${err?.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleUpdateMedia, loading, error };
}
