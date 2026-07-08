"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function useUpdateBookingPageComponent(refetch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateBookingPageComponent = async ({ type, data }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/booking-us/content-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, data }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update page component");
      }

      setSuccess(true);
      toast.success("Booking Us Page Content Updated");
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
    handleUpdateBookingPageComponent,
    loading,
    error,
    success,
  };
}
