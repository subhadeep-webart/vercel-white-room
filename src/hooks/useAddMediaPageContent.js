"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function useAddMediaContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddMediaContent = async ({ data }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update page component");
      }

      setSuccess(true);
      toast.success("Media Page Content Updated");
      router.push("/admin/dashboard/media");
      return result.page;
    } catch (err) {
      console.error("Error Updating Media Page Content:", err);
      toast.error(`Error Updating Media Page Content: ${err?.error}`);
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAddMediaContent,
    loading,
    error,
    success,
  };
}
