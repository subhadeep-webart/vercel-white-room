"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function useUpdateShopContent(refetch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateShopContent = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/shop", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update page component");
      }

      setSuccess(true);
      toast.success("Shop Page Content Updated");
      refetch();
      return result.page;
    } catch (err) {
      console.error("Error updating page component:", err);
      toast.error(`Error updating page component: ${err?.error}`);
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdateShopContent,
    loading,
    error,
    success,
  };
}
