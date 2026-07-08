import { useState } from "react";
import { toast } from "sonner";

export default function useDeleteAboutusImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteAboutusImage = async (url, refetch) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/pages/about/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete image.");
      }

      setSuccess(true);
      toast.success("Image Deleted Successfully");
      refetch();
      return result;
    } catch (err) {
      toast.error(`Image Deleted Failed ${err?.message ?? ""}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteAboutusImage, loading, error, success };
}
