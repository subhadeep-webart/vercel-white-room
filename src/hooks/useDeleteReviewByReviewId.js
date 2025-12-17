import { useState, useCallback } from "react";
import { toast } from "sonner";

const useDeleteReviewByReviewId = (refetch) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteReview = async (reviewId) => {
    setLoading(true);
    try {
      const res = await fetch("/api/pages/home/reviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: reviewId }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error("Failed to delete review");
        throw new Error(result.error || "Failed to delete review");
      }
      toast.success(result.message);
      refetch();
      return { success: true, message: result.message };
    } catch (error) {
      console.error("Delete Choose Us Review Error:", error);
      toast.error(`Delete failed! ${error.message}`);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteReview, loading };
};

export default useDeleteReviewByReviewId;
