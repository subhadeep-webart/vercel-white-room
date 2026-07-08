import { useState, useEffect, useCallback } from "react";

export function useGetBookingUsPageContent(type) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Define refetch as a memoized function
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pages/booking-us", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch home page");
      const page = await res.json();

      const requiredSection = page.components.find((c) => c.type === type);
      setData(requiredSection ? requiredSection.data : null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [type]);

  // ✅ Fetch on mount and when `type` changes
  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
