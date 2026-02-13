"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useGetReviewsSection() {
  const [title, setTitle] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviewsSection = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/pages/home/reviews");
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch reviews");
      }

      setTitle(json.title || "");
      setReviews(json.reviews || []);

    } catch (err) {
      toast?.error(err.message || "Something went wrong");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsSection();
  }, []);

  return {
    title,
    reviews,
    loading,
    error,
    refetch: fetchReviewsSection,
  };
}
