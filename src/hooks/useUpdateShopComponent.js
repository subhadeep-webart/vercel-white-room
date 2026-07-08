import { useState } from "react";
import { toast } from "sonner";

export function useUpdateShopComponent(refetch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleUpdateShopComponent(data) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/shop", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(`Failed to update Shop page: ${errData.error}`);
        throw new Error(errData.error || "Failed to update Shop page");
      }

      toast.success("Shop page updated successfully");
      refetch();
      setSuccess(true);
    } catch (err) {
      toast.error(`Error occurred: ${err?.message}`);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return { handleUpdateShopComponent, loading, error, success };
}
