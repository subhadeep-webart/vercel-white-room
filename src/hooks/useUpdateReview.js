import { useState } from "react";

export default function useUpdateReview(refetch) {
  const [loading, setLoading] = useState(false);

  const handleUpdateReview = async (reviewData) => {
    try {
      setLoading(true);
      const payload = {
        name: reviewData?.reviewer_name,
        rating: Number(reviewData?.ratings),
        comment: reviewData?.reviews,
        position: reviewData?.reviewer_position,
        _id: reviewData?._id,
      };

      const res = await fetch("/api/pages/home/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      refetch();
      return await res.json();
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateReview, loading };
}
