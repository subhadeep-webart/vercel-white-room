import { useState } from "react";
import { toast } from "sonner"; // optional for notifications

export default function useUpdateInstagramFeedHeader(refetch) {
  const [loading, setLoading] = useState(false);

  const handleUpdateInstagramFeedHeader = async (title) => {
    if (!title) return;

    try {
      setLoading(true);

      const res = await fetch("/api/pages/home/instagram-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast?.error(json.error || "Failed to update Instagram Feed");
        throw new Error(json.error || "Failed to update Instagram Feed");
      }

      toast?.success("Instagram Feed header updated successfully");

      if (refetch) refetch(); // refresh data if needed

      return json;
    } catch (err) {
      console.error(err);
      toast?.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateInstagramFeedHeader, loading };
}
