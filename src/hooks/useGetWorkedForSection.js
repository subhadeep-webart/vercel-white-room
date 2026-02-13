"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useGetWorkedForSection() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkedForSection = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/home/worked-for");
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch Worked For section");
      }

      setTitle(json.title || "");
      setImages(json.images || []);

    } catch (err) {
      toast.error(err?.message || "Something went wrong");
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkedForSection();
  }, []);

  return {
    title,
    images,
    loading,
    error,
    refetch: fetchWorkedForSection,
  };
}
