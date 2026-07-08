"use client";
import { useState } from "react";
import { toast } from "sonner";

export function usePostTrustedByImages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handlePostTrustedImages(data) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log("About images Data=======>", data);

    try {
      const res = await fetch("/api/pages/home/worked-for", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "trusted_us_images",
          url: data,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(
          `Failed to Update Trusted Us section images ${errData.error}`
        );
        throw new Error(errData.error || "Failed to update Trusted Us page");
      }
      toast.success(`Trusted Us Images Updated Successfully`);
      setSuccess(true);
    } catch (err) {
      toast.error(`Error Occured ! ${err?.message}`);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return { handlePostTrustedImages, loading, error, success };
}
