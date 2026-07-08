import { useState } from "react";
import { toast } from "sonner";

export function useUpdateAboutUsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleUpdateAboutUs(data) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/pages/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "about_us",
          data,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(`Failed to Update About Page ${errData.error}`);
        throw new Error(errData.error || "Failed to update About page");
      }
      toast.success(`Page Content Updated`);
      setSuccess(true);
    } catch (err) {
      toast.error(`Error Occured ! ${err?.message}`);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return { handleUpdateAboutUs, loading, error, success };
}
