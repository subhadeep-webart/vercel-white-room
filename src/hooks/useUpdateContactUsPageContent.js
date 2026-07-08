import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function useUpdateContactUsPageContent(refetch) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpdateContactUsPageContent = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const res = await fetch("/api/pages/contact-us/banner", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error("Content Updation Failed");
          throw new Error(data.error || "Failed to update contact us content");
        }
        toast.success("Content Updated Successfully");
        setSuccess(true);

        // ✅ Call refetch only if provided
        if (typeof refetch === "function") {
          await refetch();
        }

        return data;
      } catch (err) {
        console.error("Error updating media asset:", err);
        toast.error("Content Updation Failed");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [refetch, router]
  );

  return { handleUpdateContactUsPageContent, loading, error, success };
}
