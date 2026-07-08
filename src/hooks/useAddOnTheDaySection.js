"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function useAddOnTheDaySection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddOnTheDaySection = async ({ data }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/on-the-day", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to add section");
      }

      setSuccess(true);
      toast.success("New section added successfully");
      router.push("/admin/dashboard/on-the-day/content");
      return result.page;
    } catch (err) {
      console.error("Error Updating On The Day Page Content:", err);
      toast.error(`Error Updating On The Day Page Content: ${err?.error}`);
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAddOnTheDaySection,
    loading,
    error,
    success,
  };
}
