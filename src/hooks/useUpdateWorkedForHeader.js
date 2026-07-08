"use client";
import { useState } from "react";
import { toast } from "sonner";

export function useUpdateWorkedForHeader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleUpdateWorkedForHeader(title) {
    if (!title) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/home/worked-for", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "worked_for",
          newTitle: title,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(`Failed to update Worked For section: ${json.error}`);
        throw new Error(json.error || "Failed to update");
      }

      toast.success("Worked For Header Updated Successfully");
      setSuccess(true);
      return json;
    } catch (err) {
      toast.error(`Error Occurred! ${err?.message}`);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return { handleUpdateWorkedForHeader, loading, error, success };
}
