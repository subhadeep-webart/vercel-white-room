import { useState } from "react";
import { toast } from "sonner"; // optional, for notifications

export default function useUpdateReviewHeader(refetch) {
  const [loading, setLoading] = useState(false);

  const handleUpdateReviewHeader = async (title) => {
    if (!title) return;

    try {
      setLoading(true);

      const res = await fetch("/api/pages/home/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast?.error(json.error || "Failed to update review title");
        throw new Error(json.error || "Failed to update review title");
      }

      toast?.success("Review section title updated successfully");

      if (refetch) {
        refetch(); // optional: refresh the data after update
      }

      return json;
    } catch (err) {
      console.error(err);
      toast?.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateReviewHeader, loading };
}
