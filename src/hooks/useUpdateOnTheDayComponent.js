import { useState } from "react";
import { toast } from "sonner";

export function useUpdateOnTheDayComponent(refetch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleUpdateOnTheDayComponent(data) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/on-the-day/banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(`Failed to update On The Day page: ${errData.error}`);
        throw new Error(errData.error || "Failed to update On The Day page");
      }

      toast.success("On The Day page updated successfully");
      refetch();
      setSuccess(true);
    } catch (err) {
      toast.error(`Error occurred: ${err?.message}`);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return { handleUpdateOnTheDayComponent, loading, error, success };
}
